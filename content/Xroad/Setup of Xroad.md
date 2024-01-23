
https://nordic-institute.atlassian.net/wiki/spaces/XRDKB/pages/281739671/How+to+Set+Up+a+Local+Test+Environment+Using+Docker+Compose

```yaml
version: '3.5'
services:
  cs:
    image: niis/xroad-central-server:jammy-7.4.0
    container_name: cs
    environment:
      XROAD_TOKEN_PIN: 1234
    ports:
      - 4000:4000
      - 8888:8888
    volumes:
      - cs-db-volume:/var/lib/postgresql/14/main
      - cs-conf-volume:/etc/xroad
      - cs-test-ca-volume:/home/ca
    networks:
      - xroad-network

  ss1:
    image: niis/xroad-security-server-sidecar:7.4.0
    container_name: ss1
    ports:
      - 1000:4000
      - 1080:8080
      - 1443:8443
    environment:
      XROAD_TOKEN_PIN: 1234
      XROAD_ADMIN_USER: xrd
      XROAD_ADMIN_PASSWORD: secret
      XROAD_LOG_LEVEL: INFO
    volumes:
      - ss1-db-volume:/var/lib/postgresql/12/main
      - ss1-conf-volume:/etc/xroad
      - ss1-archive-volume:/var/lib/xroad
    networks:
      - xroad-network
    depends_on:
      - cs
  ss2:
    image: niis/xroad-security-server-sidecar:7.4.0
    container_name: ss2
    ports:
      - 2000:4000
      - 2080:8080
      - 2443:8443
    environment:
      XROAD_TOKEN_PIN: 1234
      XROAD_ADMIN_USER: xrd
      XROAD_ADMIN_PASSWORD: secret
      XROAD_LOG_LEVEL: INFO
    volumes:
      - ss2-db-volume:/var/lib/postgresql/12/main
      - ss2-conf-volume:/etc/xroad
      - ss2-archive-volume:/var/lib/xroad
    networks:
      - xroad-network
    depends_on:
      - cs

  ss3:
    image: niis/xroad-security-server-sidecar:7.4.0
    container_name: ss3
    ports:
      - 3000:4000
      - 3080:8080
      - 3443:8443
    environment:
      XROAD_TOKEN_PIN: 1234
      XROAD_ADMIN_USER: xrd
      XROAD_ADMIN_PASSWORD: secret
      XROAD_LOG_LEVEL: INFO
    volumes:
      - ss3-db-volume:/var/lib/postgresql/12/main
      - ss3-conf-volume:/etc/xroad
      - ss3-archive-volume:/var/lib/xroad
    networks:
      - xroad-network
    depends_on:
      - cs

volumes:
  cs-db-volume:
    name: cs-db-data
  cs-conf-volume:
    name: cs-conf-data
  cs-test-ca-volume:
    name: cs-test-ca-data
  ss1-db-volume:
    name: ss1-db-data
  ss1-conf-volume:
    name: ss1-conf-data
  ss1-archive-volume:
    name: ss1-archive-data
  ss2-db-volume:
    name: ss2-db-data
  ss2-conf-volume:
    name: ss2-conf-data
  ss2-archive-volume:
    name: ss2-archive-data
  ss3-db-volume:
    name: ss3-db-data
  ss3-conf-volume:
    name: ss3-conf-data
  ss3-archive-volume:
    name: ss3-archive-data

networks:
  xroad-network:
    name: xroad-network
    driver: bridge
```

The UIs of different components are available at:

- Central Server (`cs`): `https://localhost:4000`
    
- Test CA (`cs`): `https://localhost:8888/testca/`
    
- Security Server 1 (`ss1`): `https://localhost:1000`
    
- Security Server 2 (`ss2`): `https://localhost:2000`
    
- Security Server 3 (`ss3`): `https://localhost:3000`.


# Configuring after docker-compose up

https://nordic-institute.atlassian.net/wiki/spaces/XRDKB/pages/215875585/How+to+Configure+Central+Server+version+7.3.0


