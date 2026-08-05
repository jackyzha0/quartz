FROM node:22-slim AS builder

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y git

WORKDIR /usr/src/app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

FROM builder AS plugins

COPY quartz/bootstrap-cli.mjs ./quartz/bootstrap-cli.mjs
COPY quartz/cli/ ./quartz/cli/
COPY quartz.lock.json* quartz.config*.yaml ./
RUN mkdir -p .quartz/plugins && npx quartz plugin install

FROM node:22-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=plugins /usr/src/app/.quartz/ ./.quartz/
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
