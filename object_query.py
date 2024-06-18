import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
# import logging

dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'
gsi_name = 'tag-image_url-index'

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

def query_by_tags(tags):
    table = dynamodb.Table(table_name)
    unique_tags = list(set(tags)) 
    image_urls = set()
    try:
        for tag in unique_tags:
            response = table.query(
                IndexName=gsi_name,
                KeyConditionExpression=Key('tag').eq(tag)
            )
            tag_image_urls = set(item['image_url'] for item in response['Items'])
            if not image_urls:
                image_urls = tag_image_urls
            else:
                image_urls.intersection_update(tag_image_urls)
        return list(image_urls)
    except ClientError as e:
        # logger.error(f"Error querying DynamoDB: {e}")
        return []

def lambda_handler(event, context):
    body = json.loads(event['body'])
    tags = body.get('tags', [])
    
    if not tags:
        return {
            'statusCode': 400,
            'body': json.dumps('No tags provided')
        }
    
    image_urls = query_by_tags(tags)
    
    return {
        'statusCode': 200,
        'body': json.dumps(image_urls)
    }