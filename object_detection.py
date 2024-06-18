# import the necessary packages
import json
import numpy as np
import sys
import time
import cv2
import os
import boto3
# from os import walk

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'

# construct the argument parse and parse the arguments
confthres = 0.3
nmsthres = 0.1

def get_labels(labels_path):
    # load the COCO class labels our YOLO model was trained on
    lpath=os.path.sep.join([yolo_path, labels_path])

    print(yolo_path)
    LABELS = open(lpath).read().strip().split("\n")
    return LABELS


def get_weights(weights_path):
    # derive the paths to the YOLO weights and model configuration
    weightsPath = os.path.sep.join([yolo_path, weights_path])
    return weightsPath

def get_config(config_path):
    configPath = os.path.sep.join([yolo_path, config_path])
    return configPath

def load_model(configpath,weightspath):
    # load our YOLO object detector trained on COCO dataset (80 classes)
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net

def do_prediction(image,net,LABELS):

    (H, W) = image.shape[:2]
    # determine only the *output* layer names that we need from YOLO
    ln = net.getLayerNames()
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    # construct a blob from the input image and then perform a forward
    # pass of the YOLO object detector, giving us our bounding boxes and
    # associated probabilities
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    #print(layerOutputs)
    end = time.time()

    # show timing information on YOLO
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # initialize our lists of detected bounding boxes, confidences, and
    # class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence (i.e., probability) of
            # the current object detection
            scores = detection[5:]
            # print(scores)
            classID = np.argmax(scores)
            # print(classID)
            confidence = scores[classID]

            # filter out weak predictions by ensuring the detected
            # probability is greater than the minimum probability
            if confidence > confthres:
                # scale the bounding box coordinates back relative to the
                # size of the image, keeping in mind that YOLO actually
                # returns the center (x, y)-coordinates of the bounding
                # box followed by the boxes' width and height
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                # use the center (x, y)-coordinates to derive the top and
                # and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # update our list of bounding box coordinates, confidences,
                # and class IDs
                boxes.append([x, y, int(width), int(height)])

                confidences.append(float(confidence))
                classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres,
                            nmsthres)

    # TODO Prepare the output as required to the assignment specification
    # ensure at least one detection exists
    detected_objects = []
    if len(idxs) > 0:
        for i in idxs.flatten():
            detected_objects.append(LABELS[classIDs[i]])
    return detected_objects

yolo_path  = '/opt/yolo_configs'

## Yolov3-tiny versrion
labelsPath= "coco.names"
cfgpath= "yolov3-tiny.cfg"
wpath= "yolov3-tiny.weights"

Lables=get_labels(labelsPath)
CFG=get_config(cfgpath)
Weights=get_weights(wpath)

# filenames = next(walk(yolo_path), (None, None, []))[2] 

#TODO, you should  make this console script into Lambda compatible design (S3, database connections)
def lambda_handler(event, context):
    try:
        bucket_name = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']
        file_obj = s3_client.get_object(Bucket=bucket_name, Key=key)
        file_content = file_obj['Body'].read()

        img = cv2.imdecode(np.frombuffer(file_content, np.uint8), cv2.IMREAD_COLOR)
        image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
				
        nets = load_model(CFG, Weights)
        detected_objects = do_prediction(image, nets, Lables)

        s3_url = f"https://{bucket_name}.s3.ap-southeast-2.amazonaws.com/{key}"
        
        table = dynamodb.Table(table_name)

        unique_items = { (s3_url, tag) for tag in detected_objects }

        with table.batch_writer() as batch:
            for s3_url, tag in unique_items:
                batch.put_item(Item={
                    'image_url': s3_url,
                    'tag': tag
                })

        # table.put_item(Item={
        #     'image_url': s3_url,
        #     'tag': detected_objects
        # })
        
        return {
            'statusCode': 200,
            'body': json.dumps('Results have been stored in DynamoDB')
        }


    except Exception as e:
        print("Exception  {}".format(e))
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error processing image: {str(e)}")
        }

# if __name__ == '__main__':
#     main()
