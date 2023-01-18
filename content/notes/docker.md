---
title: "Hosting with Docker"
tags:
- setup
---

If you want to host Quartz on a machine without using a webpage hosting service, it may be easier to [install Docker Compose](https://docs.docker.com/compose/install/) and follow the instructions below than to [install Quartz's dependencies manually](notes/preview%20changes.md).
## Hosting Quartz Locally
You can serve Quartz locally at `http://localhost:1313` with the following script, replacing `/path/to/quartz` with the 
actual path to your Quartz folder.

docker-compose.yml
```
services:
  quartz-hugo:
    image: ghcr.io/jackyzha0/quartz:hugo
    container_name: quartz-hugo
    volumes:
      - /path/to/quartz:/quartz
    ports:
      - 1313:1313

    # optional
    environment:
      - HUGO_BIND=0.0.0.0
      - HUGO_BASEURL=http://localhost
      - HUGO_PORT=1313
      - HUGO_APPENDPORT=true
      - HUGO_LIVERELOADPORT=-1
```

Then run with: `docker-compose up -d` in the same directory as your `docker-compose.yml` file.

While the container is running, you can update the `quartz` fork with: `docker exec -it quartz-hugo make update`.

## Exposing Your Container to the Internet

### To Your Public IP Address with Port Forwarding (insecure)

Assuming you are already familiar with [port forwarding](https://en.wikipedia.org/wiki/Port_forwarding) and [setting it up with your router model](https://portforward.com):

1. You should set the environment variable `HUGO_BASEURL=http://your-public-ip` and then start your container.
2. Set up port forwarding on your router from port `p` to `your-local-ip:1313`.
3. You should now be able to access Quartz from outside your local network at `http://your-public-ip:p`.

However, your HTTP connection will be unencrypted and **this method is not secure**.

### To a Domain using Cloudflare Proxy

1. Port forward 443 (HTTPS) from your machine.
2. Buy a custom domain (say, `your-domain.com`) from [Cloudflare](https://www.cloudflare.com/products/registrar/). Point a DNS A record from `your-domain.com` to your public IP address and enable the proxy.
3. Set the environment variables `HUGO_BASEURL=https://your-domain.com`, `HUGO_PORT=443`, and `HUGO_APPENDPORT=false`. Change `1313:1313` to `443:443` for the `ports` in `docker-compose.yml`.
4. Spin up your Quartz container and enjoy it at `https://your-domain.com`!

### To a Domain using a Reverse Proxy

If you want to serve more than just Quartz to the internet on this machine (or don't want to use the Cloudflare registrar and proxy), you should follow the steps in the section above (as appropriate) and also set up a reverse proxy, like [Traefik](https://doc.traefik.io/traefik). Be sure to configure your TLS certificates too!
