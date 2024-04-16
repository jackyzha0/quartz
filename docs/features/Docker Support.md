Quartz comes shipped with a Docker image that will allow you to preview your Quartz locally without installing Node.

You can run the below one-liner to run Quartz in Docker:

```sh
docker run --rm -itp 8080:8080 $(docker build -q .)
```

Run the following command to start Quartz using Docker Compose:

```sh
docker compose up -d
```

This command will pull the Quartz Docker image (if not already available locally).
