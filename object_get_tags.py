import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'  

def lambda_handler(event, context):
    body = json.loads(event['body'])
    image_url = body.get('image_url')

    if not image_url:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Image URL is required'})
        }

    try:
        table = dynamodb.Table(table_name)
        response = table.query(
            KeyConditionExpression='image_url = :url',
            ExpressionAttributeValues={
                ':url': image_url
            }
        )

        tags = [item['tag'] for item in response['Items']]
        return {
            'statusCode': 200,
            'body': json.dumps({'image_url': image_url, 'tags': tags})
        }

    except Exception as e:
        print(f"Error fetching tags: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Error fetching tags'})
        }