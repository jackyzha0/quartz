Upgrade procedures for a server running with postgres. The following steps will update docker images if they have changed and will also apply any liquibase change scripts.
1. stop vcs
```bash
systemctl stop vcs
```
2. download the upgrade pack
2. extract the docker folder from the upgrade pack the existing docker folder can be replaced with the new one.
3. execute the following commands to teardown the existing containers and create new ones
```bash
cd /usr/vcs/docker
docker compose --env-file ../compose-cfg/.env down -d
docker compose --env-file ../compose-cfg/.env up -d
```

## Running liquibase manually
If the liquibase scripts need to be ran without stoping the entire docker compose deployment use.
```bash
docker start docker-liquibase-1
```
or use docker compose to start a single container
```bash
docker compose --env-file ../compose-cfg/.env up -d liquibase
```