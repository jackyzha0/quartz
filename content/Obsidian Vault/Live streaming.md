
To stream images you will need to use the protobuf specs to generate a javascript implementation. The websocket for alarms can also be used to get live video from a camera.
## Starting a video subscription (mjpeg)
To start a video subscription follow the steps bellow. This will get video in mjpeg format that will be displayable as a jpeg in the browser.

1. Make a `PUT` request to `http://{{server}}:{{port}}/api/v1/video/{websocket-session-id}`
```json
{

"category": "video",

"spec": {

"videoStreamKey": {

"cameraNumber": <replace-with-camera-number>,

"scaled": true

},

"codec": "mjpeg"

}

}
```

### Ending the subscription
To end the subscription make a `DELETE` request with the same body used to start the subscription `http://{{server}}:{{port}}/api/v1/video/{websocket-session-id}`
```json
{

"category": "video",

"spec": {

"videoStreamKey": {

"cameraNumber": <replace-with-camera-number>,

"scaled": true

},

"codec": "mjpeg"

}

}
```

## Reading the binary messages
install `@protobuf-ts/plugin`

Generate the protobuf javascript classes
```
SRC_DIR="<pathToProtofiles>"  
  
npx protoc \  
  --ts_out lib/generated/proto \  
  --ts_opt long_type_string \  
  --proto_path $SRC_DIR \  
  $SRC_DIR/*.proto
```

The javascript will be output to lib/generated/proto 

in the websocket handleing code parse the binary messages using the generated javascript.
```javascript
if (msg.data instanceof Blob) {  
    // receiving binary  
    this.incomingBinary(msg.data);  
}  else if (typeof Buffer !== 'undefined' && msg.data instanceof Buffer) {  
    // receiving binary  
    this.incomingBuffer(msg.data);  
} else {  
    // receiving text  
    this.incomingText(msg.data);  
}
```

`incomingBinary` and `incomingText` are defined like this
```javascript
private incomingBinary(blob: Blob) {  
    blob.arrayBuffer().then(ab => {  
        const uint = new Uint8Array(ab);  
        const streamMessage = StreamMessageToClient.fromBinary(uint);  
        this.incomingStreamMessage(streamMessage);  
    });  
}  
  
private incomingBuffer(data: Buffer) {  
    const uint = new Uint8Array(data); // Adjust for Node.js; data is already a Buffer  
    const streamMessage = StreamMessageToClient.fromBinary(uint);  
    this.incomingStreamMessage(streamMessage);  
}
```

`StreamMessageToClient` is generated from the protobuf specs the following method is an example of how to parse the contents of the message
```javascript
private incomingStreamMessage(msg: StreamMessageToClient) {  
    if (msg.data.oneofKind === "videoMessage") {  
        this.incomingVideo(msg.data.videoMessage);  
    } else {  
        console.debug("Type " + msg.data.oneofKind + " not implemented, yet");  
    }  
}

private incomingVideo(msg: VideoMessage) {  
    if (msg.videoStreamKey) {  
        const videoStreamKey: VideoStreamKey = {  
            cameraNumber: msg.videoStreamKey.cameraNumber,  
            scaled: msg.videoStreamKey.scaled,  
        };  
  
        // msg.streamMetrics;  
        if (msg.frame.oneofKind === "h264VideoMessage") {  
            console.debug('received h264VideoMessage. length=%d', msg.frame.h264VideoMessage.nalUnit.length);  
            const videoMessage: VideoMessageH264 = {  
                videoStreamKey: videoStreamKey,  
                iframe: msg.frame.h264VideoMessage.iframe,  
                isParameterSet: msg.frame.h264VideoMessage.isParameterSet,  
                nalUnit: msg.frame.h264VideoMessage.nalUnit,  
            }  
            this.videoH264.next(videoMessage);  
        } else if (msg.frame.oneofKind === "mjpegImage") {  
            // console.debug('received mjpegImage. length=%d', msg.frame.mjpegImage.image.length);  
            const videoMessage: VideoMessageMjpeg = {  
                videoStreamKey: videoStreamKey,  
                image: msg.frame.mjpegImage.image,  
            }  
            this.videoMjpeg.next(videoMessage);  
        } else {  
            console.debug("Unsupported video codec: " + msg.frame.oneofKind);  
        }  
    } else {  
        console.error("Missing expected 'videoStreamKey' on VideoMessage");  
    }  
}
```

The source of this code can be found at https://github.com/Acuity-vct/vcscollab/tree/main/node/vcs-client-ts-api 