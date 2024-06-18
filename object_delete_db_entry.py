import json
import boto3
from botocore.exceptions import ClientError
# import logging

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'

def delete_entries_from_dynamodb(object_url):
    table = dynamodb.Table(table_name)
    try:
        response = table.query(
            KeyConditionExpression='image_url = :object_url',
            ExpressionAttributeValues={':object_url': object_url}
        )
        
        # Delete each item using image_url and tag
        for item in response['Items']:
            table.delete_item(
                Key={
                    'image_url': item['image_url'],
                    'tag': item['tag']
                }
            )
        return True
    except ClientError as e:
        # logger.error(f"Error deleting entries from DynamoDB: {e}")
        return False

def lambda_handler(event, context):
    # logger.info('Event: %s', json.dumps(event))
    
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']
    
    object_url = f"https://{bucket_name}.s3.ap-southeast-2.amazonaws.com/{object_key}"
    
    dynamodb_deleted = delete_entries_from_dynamodb(object_url)
    if not dynamodb_deleted:
        return {
            'statusCode': 500,
            'body': json.dumps('Failed to delete entry from DynamoDB')
        }
    
    return {
        'statusCode': 200,
        'body': json.dumps('Entry deleted successfully')
    }