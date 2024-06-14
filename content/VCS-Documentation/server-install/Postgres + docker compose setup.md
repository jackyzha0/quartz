
>[!note]
*Required*
- VCS Server already installed (can be existing or clean install)

To start the process of configuring Postgres and setting up docker compose stop the vcs service using `systemctl stop vcs`

Server ssl needs to be disabled. Nginx will handle ssl.
Disable ssl in `/cfg/settings.xml`, set `WebServerSSL=false`
```xml
<General 
.
.
.
WebServerPort="80"
WebServerSSLPort="443"
WebServerSSL="false"
```

## Configure env.sh to use Postgres
Add the `-Ddatabase.type=postgres` to the `OTHER_JVM_OPTIONS` variable to use postgres as a database.  Set the connection parameters for connecting to postgres as environment variables.

> [!note]
> `OTHER_JVM_OPTIONS` is not an environment variable. It is only read by `startvcs.sh`

Also configure the following connection parameters:
> The `export` denotes that it is an environment variable
```shell
OTHER_JVM_OPTS="-Ddatabase.type=postgres <other-vm-args>"
#  datasource config postgres
export DATABASE_USER=vcs
export DATABASE_PASSWORD=vcs
export DATABASE_URL=jdbc:postgresql://localhost:5445/postgres
```

> NOTE: The `DATABASE_URL` should point to the Postgres server. If Configuring multiple servers there will be a single database and the `localhost` should be replaced with the primary Postgres servers ip when the Postgres instance is not on the same machine as vcs.




# Running docker compose

### Initialize docker and docker compose

**New Server Install**
`docker.zip` and `initialize_docker.sh` will be extracted into `/usr/vcs`(or install dir) at the installation of VCSServer

**Existing Server Upgrade**
`docker.zip` and `initialize_docker.sh` should have been copied into `/usr/vcs`(or install dir) from the the upgrade_package (First step in [[Server Install]])

The initialize script will install docker and the docker compose plugin. Navigate to `/usr/vcs` and run the `initialize_docker.sh` script
```bash
cd /usr/vcs
./initialize_docker.sh
```

 After Running the script there should be a new folder `/usr/vcs/compose-cfg` that contains the configuration for the docker compose environment. Configure `.env` , `.env.local` and `proxyGatewayConfig.json` as specified bellow

### Configure the docker compose environment(.env)

In `/usr/vcs/compose-cfg/.env` change `VCS_SERVER_HTTP_URL=http://` to the VCS servers ip-address, this should be the ip of the machine and also the port that the VCS is listening on *(this should be an http url, see example below).

> NOTE: It is recommended to run VCS on a higher port than 80. If VCS is not on 80 make sure to reflect that in this url. Also, when running VCS on a higher port the existing Swing client will talk directly to VCS so make sure to open that port in the firewall.

Set the `POSTGREST_VOLUME_PGDATA` and `POSTGRES_VOLUME_ARCHIVE` to a location where the database should store files. In this example it is in `/mnt/video00` this might need to change on production servers. The video drive or the root partition could be used.

```shell
APP_USER="vcs"  
APP_PASSWORD="vcs"  
DB_HOST="postgres"  
DB_PORT="5432"  
DB_NAME="postgres"  
SSL_CERTS="./nginx_ssl_certs"  
#Location of docker container configuration for multiserver-proxy and frontend  
CONFIG_DIR="/usr/vcs/compose-cfg"  
  
POSTGRES_VOLUME_PGDATA="/mnt/video00/dockerdata/postgres/pgdata"  
POSTGRES_VOLUME_CONFIG="./postgres/config"  
POSTGRES_VOLUME_ARCHIVE="/mnt/video00/dockerdata/postgres/archive"  
VCS_SERVER_HTTP_URL="http://192.168.3.227:80" # cannot be localhost
```

### New-ui configuration (.env.local)

The new ui configuration is located in `.env.local`. In `/usr/vcs/compose-cfg/.env.local` change the `NEXT_PUBLIC_API_SERVER` to the ip address of the VCS server.
`NEXT_PUBLIC_API_HOST` should be set to `http` if not going to use https for the new ui otherwise set this to `https`. `NEXT_PUBLIC_WS_SCHEMA` should be set to `wss` if using https or `ws` if using http. `NEXT_PUBLIC_API_PORT` should be set to the http or https port that NGINX is listening on *(not the VCS http/https port)*. The ports are listed in the `/usr/vcs/docker/compose.yml` file. 
Example:
```
  nginx-proxy:  
    #    image: ghcr.io/acuity-vct/nginx-proxy:beta-1.2  
    build:  
      context: ./nginx  
    ports:  
      - "1080:80"  
      - "10443:443"
```

`NEXT_PUBLIC_API_SUB_PATH` should be left blank if configuring for single server otherwise it will need to be `/gateway` to have it route requests to the mutiserver gateway. For more information on the multi server setup see //TODO:

Replace `<server-ip>` inside `NEXTAUTH_URL` with the ip address of the server. Also replace the `<nginxprt-1080>` with the same port used for the `NEXT_PUBLIC_API_PORT`

```shell
NEXT_PUBLIC_API_SERVER = <server-ip> #public ip  used outside of the container to access the proxyGateway or vcs server (cannot be localhost as it will attempt to authenticate inside the container at vcs /api/v1/authenticate)  
NEXT_PUBLIC_API_HOST = http  
NEXT_PUBLIC_API_PORT = 1080  
NEXT_PUBLIC_WS_SCHEMA = ws  
NEXT_PUBLIC_API_SUB_PATH = ""  
  
NEXT_PUBLIC_PROJECT = "Acuity-VCT"    # "Acuity-VCT" | "Art Sentry",  
  
NEXTAUTH_SECRET = my_ultra_secure_nextauth_secret  
NEXTAUTH_URL = http://<server-ip>:<nginxport-1080>/artsentry/api/auth
NEXTAUTH_URL_INTERNAL = http://localhost:3000
```

### Gateway server config

The gateway server configuration is located inside `/usr/vcs/compose-cfg/proxyGatewayConfig.json` This file contains a list of servers and their server-ids.

This is an example of configuring the gateway for two servers.
The only thing that should change in this file is the `servers` array. For a single server setup just define the ip of the single server in this json array. When the new ui is configured to go to `/gateway` this configuration will need to be correct in order to use multiserver in the new ui.
```json
{  
  "servers": [  
    {  
      "ip": "192.168.3.227",  
      "id": "VCS-DEV-INT-1"  
    },  
    {  
      "ip": "192.168.2.31",  
      "id": "290WPD2"  
    }  
  ],  
  "secretKey": "secretKey",  
  "listeningPort": 3090,  
  "allowedOrigins": [  
    "*"  
  ]  
}
```

## Start the docker compose
### Login to GitHub docker repo

The server will need to authenticate with the GitHub package repo. Generate a jwt token that has access to Artsentry and has package read access. 

````bash
docker login ghcr.io -u USERNAME 
````

>[!tip]
>When not root to add the user to the docker group `sudo usermod -aG docker $USER`

Change the directory to `/usr/vcs/docker`, make sure the `.env` file is located in `/usr/vcs/compose-cfg` and is configured as described above.

To start all the services that VCS requires, run:
```
docker compose --env-file ../compose-cfg/.env up -d
```

To stop all the docker images, run:
```
docker compose --env-file ../compose-cfg/.env stop
```

Note: Since the `.env` file is not located next to the compose file it needs to be specified to each docker compose command.

To remove all the docker images
```
docker compose --env-file ../compose-cfg/.env down
```

>NOTE: Make sure the VCS server is not running until all the services are running and the database is properly configured in the VCS `env.sh` file 

To check all the running services see:  [[running services.png]]

After the docker compose services are running follow the [[Database Migration Scripts]] before starting the VCS Server
