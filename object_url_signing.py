import json
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    object_key = event['queryStringParameters']['objectKey']

    try:
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': 'ito5225-image-bucket',
                'Key': object_key
            },
            ExpiresIn=3600 
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'url': url})
        }

    except ClientError as e:
        print(f"ClientError: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Failed to generate pre-signed URL'})
        }
        