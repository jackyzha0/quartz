The configuration for multi server with the new ui is done with `proxyGatewayConfig.json`. This file will specify for each server the ip and serverID. The same configuration can be applied to each server setup.

The following json is an example of setting up two servers. By default `"port"` is set to 80 the port should be the same port used for nginx on the server. To override the default port add a `"port"` property.
```json
{
    "servers": [
        {
            "ip": "192.168.3.227",
            "id": "VCS-DEV_INT-1"
        },
        {
            "ip": "localhost",
            "id":"Mac-Pro-dev",
            "port": 1080 //example of using specific port for a server
        }
    ],
    "secretKey": "secretKey",
    "listeningPort": 3090,
    "allowedOrigins" : ["*"]
}
```

For the new-ui to work with multi-server a modification is needed in the `.env.local` file.
set the `NEXT_PUBLIC_API_SUB_PATH` to `/gateway`. The new-ui will use the server defined as `NEXT_PUBLIC_API_SERVER` as a gateway to the other servers. Any servers defined in the `proxyGatewayConfig.json` can be accessed through this single server.
```
NEXT_PUBLIC_API_SUB_PATH = "/gateway"  
```
