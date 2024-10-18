# Docker Support

Quartz comes shipped with a Docker image that will allow you to preview your Quartz locally without installing Node.

You can run Quartz in Docker. A container image is available at:

- `ghcr.io/jackyzha0/quartz`

## Building

You can create a local build with this command issued from the root of the repository:

```sh
docker build --load -t ghcr.io/jackyzha0/quartz .
```

## Usage

The way how the container is built expects your content present in the directory structure of the application.

You can use the image to build a fork of Quartz that includes your changes.

From within the root of your local clone of your Quartz fork, run this to build the site and to launch a preview webserver:

```sh
docker run --rm -it -p 8080:8080 -v ${PWD}:/usr/src/app ghcr.io/jackyzha0/quartz
```

Given you have just built your Quartz image from this repository, which deviates from the convention to hold content in a directory called `content/` and instead uses `docs/`, you could use this command to preview the Quartz documentation:

```sh
docker run --rm -it -p 8080:8080 -v ${PWD}:/usr/src/app ghcr.io/jackyzha0/quartz build --serve -d docs
```

Open http://localhost:8080 to show the locally built site.

## Advanced usage

This image can also act on repositories which only contain a `content/` directory, next to an optional `.quartz` directory for files overlayed on top of the Quartz application packaged in the image.

The expected file system layout of such a repository is as follows:

```console
.
├── .quartz
│   ├── quartz # optional
│   │   └── …
│   ├── quartz.config.ts
│   └── quartz.layout.ts
└── content
    └── index.md
```

This example expects a `content/` directory with the content and a `.quart/` directory with `quartz.*.ts` configuration files and other overlays to be present in the working directory.

```sh
mkdir -p content/ public/
```

Build the site with running a local development web server for preview:

```sh
docker run --rm -it -p 8080:8080 -v ${PWD}/.quartz:/usr/src/app/.quartz -v ${PWD}/content:/usr/src/app/content -v ${PWD}/public:/usr/src/app/public --entrypoint sh ghcr.io/jackyzha0/quartz -c "cp -R .quartz/* /usr/src/app/; npx quartz build --serve"
```

You can now access your dynamically built page at http://localhost:8080

Build the site for deployment

```sh
docker run --rm -it -p 8080:8080 -v ${PWD}/.quartz:/usr/src/app/.quartz -v ${PWD}/content:/usr/src/app/content -v ${PWD}/public:/usr/src/app/public --entrypoint sh ghcr.io/jackyzha0/quartz -c "cp -R .quartz/* /usr/src/app/; npx quartz build"
```

This procedure from building a Quartz page from a content repository without a custom fork of the application

- lacks permission handling. The output in the `public/` directory is owned by root, when run with rootful Docker. It is advised to use rootless (Docker/Podman) containers with subuid mapping.
- could be improved by
  - providing a custom entrypoint script.
  - publishing Quartz as an independent Node package to NPM to install it from a release version.

## CI Usage

The Quartz container image can also be used in CI.

This pipeline example works for building a Quartz site from a content repository with `.quartz` and `content/` overlays with GitLab CI and pushing to GitLab Pages:

```yaml
image:
  name: ghcr.io/jackyzha0/quartz:v4
  entrypoint: [""]

pages:
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  stage: deploy
  environment: live

  before_script:
    - cd /usr/src/app
    - mkdir -p public

  script:
    - cp -R $CI_PROJECT_DIR/.quartz/* .
    - npx quartz build -d $CI_PROJECT_DIR/content
    - mv public $CI_PROJECT_DIR

  artifacts:
    paths:
      - public
```
