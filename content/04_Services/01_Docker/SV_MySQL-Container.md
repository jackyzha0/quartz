#Services 

---
#### # Create Docker-Folder
	- datadir (empty), .env, docker-compose.yml

![[Pasted image 20230912103901.png]]

----
#### # Create Docker-Files

.env:
``` mySQL
MYSQL_ROOT_USER=root
MYSQL_ROOT_PASSWORD=123mysql
# phpmyadmin
DATABASE_HOST=mysql
```

docker-compose.yml:
```yml
version: "3.8"

services:
  mysql:
    # container_name: mysql
    image: mysql:latest
    command: --default-authentication-plugin=mysql_native_password
    env_file: .env

	# restart: always
    volumes:
      - ./datadir:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - lan1
 
networks:
  lan1:
    external:
      name: lan1
```
----
#### # Command-Prompt

Change into folder where you want to store your container:
```
C:\Users\User\Docker\DockerSQL
```

Create Docker network for your container (+ information):
```
docker network create network1
docker network inspect network1
```

```
docker-compose up -d
```

