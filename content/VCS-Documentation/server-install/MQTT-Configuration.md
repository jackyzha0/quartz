# MQTT Configuration

## Rules

When configuring MQTT in a camera or other device, these rules need to be respected due to assumptions made in how we process and route messages.

### Connection messages

Currently we receive connect, but not disconnect messages.  AppMqtt does receive a disconnect, but it is not converted and sent in the pipeline today.  These standards presume that the disconnected message can be added one day.  

- Topics end with "/event/connection". 
- Payload has a boolean `connected` showing the connection state.
- Payload has a `description` of the event of "Connected" or "Disconnected".

### Application event messages

For axis cameras, these events come from the ACAP applications.  

- Payload contains `topic`, with 3 parts delimited by "/".  The 2nd part is the application name.  E.g., "VMD".  The 3rd part is the profile identifier (aka "zone").  E.g., "Camera1ProfileANY" indicates any zone.
- Payload contains `message` object, which contains `data`.  For zone triggering, `data` contains `active`, with a string value of "1" or "0".

