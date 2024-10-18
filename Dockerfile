FROM node:20-slim AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

FROM node:20-slim

RUN apt update ; \
    apt install --no-install-recommends -y git; \
    rm -rf /var/cache/apt/*
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .

ENTRYPOINT ["npx", "quartz" ]
CMD ["build", "--serve"]
