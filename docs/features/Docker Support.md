Quartz comes shipped with a Docker image that will allow you to preview your Quartz locally without installing Node.

You can run Quartz in Docker. A container image is available at:

- `ghcr.io/jackyzha0/quartz`

You can create a local build with:

```sh
docker build --load -t ghcr.io/jackyzha0/quartz .
```

This example expects a `content/` directory with the `quartz.*.ts` configuration files and a (empty) `public/` directory to be present in the preesent working directory.

```sh
mkdir -p content/ public/
```

Build the site with running a local development web server for preview:

```sh
docker run --rm -it -p 8080:8080 -v ${PWD}/content:/usr/src/app/content -v ${PWD}/public:/usr/src/app/public --entrypoint sh ghcr.io/jackyzha0/quartz -c "cp content/quartz.*.ts .; npx quartz build --serve"
```

You can now access your dynamically built page at http://localhost:8080

Build the site for deployment

```sh
docker run --rm -it -v ${PWD}/content:/usr/src/app/content -v ${PWD}/public:/usr/src/app/public --entrypoint sh ghcr.io/jackyzha0/quartz -c "cp content/quartz.*.ts .; npx quartz build; rm public/quartz.*.ts"
```

This procedure from building a Quartz page from a content repository without a custom fork of the application could be enhanced by providing a custom entrypoint script.
