import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'

def lambda_handler(event, context):
    body = json.loads(event['body'])
    image_url = body.get('image_url')
    tag = body.get('tag')

    if not image_url or not tag:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Image URL and Tag are required'})
        }

    try:
        table = dynamodb.Table(table_name)
        table.put_item(
            Item={
                'image_url': image_url,
                'tag': tag
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Tag added successfully'})
        }

    except Exception as e:
        print(f"Error adding tag: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error adding tag'})
        }