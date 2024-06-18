# import the necessary packages
import json
import base64
import numpy as np
import sys
import time
import cv2
import os
import boto3
from boto3.dynamodb.conditions import Key, Attr
# from os import walk
# import logging

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table_name = 'tagged-images'
gsi_name = 'tag-image_url-index'

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

    # if len(idxs) > 0:
    #     # loop over the indexes we are keeping
    #     for i in idxs.flatten():
    #         print("detected item:{}, accuracy:{}, X:{}, Y:{}, width:{}, height:{}".format(LABELS[classIDs[i]],
    #                                                                                          confidences[i],
    #                                                                                          boxes[i][0],
    #                                                                                          boxes[i][1],
    #                                                                                          boxes[i][2],
    #                                                                                          boxes[i][3]))


    # TODO Prepare the output as required to the assignment specification
    # ensure at least one detection exists
    detected_objects = []
    if len(idxs) > 0:
        for i in idxs.flatten():
            detected_objects.append(LABELS[classIDs[i]])
    return detected_objects
    
def query_dynamodb(tags):
    table = dynamodb.Table(table_name)
    image_urls = set()
 
    results = []
    for tag in tags:
        response = table.query(
            IndexName=gsi_name,
            KeyConditionExpression=Key('tag').eq(tag)
        )
        for item in response['Items']:
            image_urls.add(item['image_url'])
        # tag_image_urls = set(item['image_url'] for item in response['Items'])
        # # if not image_urls:
        # image_urls = tag_image_urls
        # # else:
        # #     image_urls.intersection_update(tag_image_urls)
    return list(image_urls)

yolo_path  = '/opt/yolo_configs'

## Yolov3-tiny version
labelsPath= "coco.names"
cfgpath= "yolov3-tiny.cfg"
wpath= "yolov3-tiny.weights"

Lables=get_labels(labelsPath)
CFG=get_config(cfgpath)
Weights=get_weights(wpath)

# filenames = next(walk(yolo_path), (None, None, []))[2] 

#TODO, you should  make this console script into Lambda compatible design (S3, database connections)
def lambda_handler(event, context):
    # logger.info('Event: %s', json.dumps(event))

    try:
        file_content = base64.b64decode(event['body'])

        img = cv2.imdecode(np.frombuffer(file_content, np.uint8), cv2.IMREAD_COLOR)
        image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
				
        nets = load_model(CFG, Weights)
        detected_objects = do_prediction(image, nets, Lables)
        
        matched_image_urls = query_dynamodb(detected_objects)

        return {
            'statusCode': 200,
            'body': json.dumps(matched_image_urls)
        }

    except Exception as e:
        print("Exception  {}".format(e))
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error processing image: {str(e)}")
        }

# if __name__ == '__main__':
#     main()
