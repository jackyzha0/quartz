#OS 

Auf USB-Stick
- [[Linux_MountUSB-Stick]]

Vorbereitungen:
- Router-Portfreigabe: 8080

```js
// herunterladen
docker pull nextcloud

// ausführen
docker run --name nextcloud -d -p 8080:80 nextcloud
```


In Browser IP-Adresse:8080 aufrufen

NextCloud verwendet standardmäßig SQLite DB
- Wir ändern DB auf MongoDB

```JS
// zuerst beenden und dann löschen
docker stop nextcloud && docker rm nextcloud

// DB-Software postgres herunterladen
docker pull postgres

// Docker Netzwerk erstellen
docker network create --driver bridge nextcloud-net

// DB-Container starten
docker run --name postgres -e POSTGRES_PASSWORD=123456 --network nextcloud-net -d postgres

// nextcloud-Container starten
docker run --name nextcloud -d -p 8080:80 -v /media/usb/nextcloud-folder:/var/www/html --network nextcloud-net nextcloud

```
