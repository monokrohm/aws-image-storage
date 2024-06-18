import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('tagged-images')

def lambda_handler(event, context):
    image_url = event['image_url']
    tag = event['tag']
    
    try:
        response = table.delete_item(
            Key={
                'image_url': image_url,
                'tag': tag
            }
        )
        return {
            'statusCode': 200,
            'body': f'Tag "{tag}" deleted successfully for image_url "{image_url}"'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error deleting tag "{tag}" for image_url "{image_url}": {str(e)}'
        }