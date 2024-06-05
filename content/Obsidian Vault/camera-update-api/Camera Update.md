To update individual camera settings use `PATCH` `/api/v1/admin/camera/save/{cameraNumber}`
```
curl --location --request PATCH 'http://localhost:80/api/v1/admin/camera/save/2' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJraWQiOiJWQ1MiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJWQ1MiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTc0ODcxNjYwMywiaWF0IjoxNzE3MTgwNjAzLCJzY29wZSI6ImFkbWluIn0.l880RzbHH_mxpOjRKp-11ktInpTbldG5Ok4mn4CROE6jY5TiCO6M3Z1B1w-b72Xav0jBGgIb156pvEL6euNCmw' \
--data '[
	{"op":"replace","path":"/recordingOption","value":"Live"},
	{"op":"replace","path":"/enable","value":"true"},
	{"op": "replace", "path": "/scaledLiveFramerate", "value":"3"}
]'
```

## Json Patch
- `op` is the operation field in this case `replace` should be used
- `path` is the property on the object to change `/recordingOption` will apply to the recording option property
- `value` is the value to set the property to.

the body contains json patch to replace the values in the `cameraSaveDTO`
The path can have any field that is inside `cameraSaveDTO` the following fields can be specified in the path field.
```json
"id": 0,
      "cameraDescription": "string",
      "modelName": "string",
      "group": "string",
      "rotated": 0,
      "codec": 0,
      "scaledLiveFramerate": 0,
      "ptzDriver": 0,
      "activeIOPort": 0,
      "server": 0,
      "groupNbr": 0,
      "activeIOText": "string",
      "motionAlarmScheme": "string",
      "intercomIP": "string",
      "intercomName": "string",
      "monitoringIndication": true,
      "receiveAudio": true,
      "motionDetection": true,
      "motionAlarmEnable": true,
      "snapShot": true,
      "pause": true,
      "enabled": true,
      "scaledStream": true,
      "unavailable": true,
      "requiresMask": true,
      "recordingOption": "Continuous",
      "scheduled": true,
      "analytic": true,
      "down": true,
      "ptz": true
```

recordingOption can have the following values. To get this list as json use `GET` `/api/v1/admin/camera/recording-options`
 ```json
 "Continuous",

"LegacyMotion",

"AdvancedAnalytics",

"Live",

"API"
```

