```java
if (continuousButton.isSelected()) {  
  newCameraData.setLegacyMotion(false);  
  newCameraData.setAdvancedAnalytics(false);  
  newCameraData.setMotionAlarmEnable(false);  
  newCameraData.setPauseRecording(false);  
  // if(loadedAdvancedSchedule)newCameraData.setChanged(true);  
} else if (motionButton.isSelected()) {  
  newCameraData.setLegacyMotion(true);  
  newCameraData.setAdvancedAnalytics(false);  
  newCameraData.setMotionAlarmEnable(alarmSelected);  
  newCameraData.setPauseRecording(false);  
} else if (analyticsButton.isSelected()) {  
  newCameraData.setAdvancedAnalytics(true);  
  newCameraData.setMotionAlarmEnable(alarmSelected);  
  newCameraData.setLegacyMotion(false);  
  newCameraData.setPauseRecording(false);  
} else if (liveOnlyButton.isSelected()) {  
  newCameraData.setLegacyMotion(false);  
  newCameraData.setAdvancedAnalytics(false);  
  newCameraData.setMotionAlarmEnable(false);  
  newCameraData.setPauseRecording(true);  
  // if(loadedAdvancedSchedule)newCameraData.setChanged(true);  
}
```

