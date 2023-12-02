---
title: "Waku-based metrics aggregator and notification system"
tags:
- waku
- metrics
- future project
---

This is a project that I think needs to be built but I don't have the time to do it myself, so I'll publish my thoughts on it in hopes that someone else does, and so that I don't forget about it. 

The general concept is a local binary that collects the metrics exhaust of various local softare (blockchain nodes, rotki, anything you want to monitor), processes those metrics appropriately, and gives updates/notifications to a waku/status identity. 

Because we've built a fork of [Mattermost bridge](https://github.com/status-im/matterbridge) that is compatible with Waku (Waku v1 only for now, v2 in the works), you could also bridge to chat app if you wanted, but managed by you and self-hosted. This would require more self-hosting and configuration though.

What this provides is a private solution to monitoring the services you're running instead of the data-aggregation and responsibility offloading software that we currently rely on (email / centralized services / etc). 

## Example "modules"
- Ethereum Validator notifications - [Nimbus](https://nimbus.team) (like other consenesus clients) emits a metrics endpoing which can be consumed by an aggregator like Prometheus to be used for creating dashboards in something like Grafana. This could also consume those metris (also probably attach to Prometheus itself) and be configured to lookfor specific (user-specific) states that emit a private message to me so that I can respond quickly, for instance:
    - I've missed an attestation
    - I proposed a block
    - latency is at a dangerous range
    - bandwidth is above a given threshold
    - connection to execution client isn't healthy
    - available memory is dangerously low
    - etc

    If run locally, you'll clearly lose some of the things you'd like to monitor (like the power to the systsem is down) but this can be handled by putting the service on its own instance, which is a devops issue and can be handled easily.
- Ditto for any blockchain node, but obviously configured (via some created module) to monitor what you care about as a user. If popular enough, these modules could be commissioned and informed by the projects themselves. 
- [Rotki](https://rotki.com) notifications - A service that consumes metrics (not sure if they are emitted though, would have to investigate). If I'm tracking my portfolio locally via Rotki, then this module could notify me if a specific asset behaves in a way I either don't expect, or am looking forward to that requires some action, for example:
    - A wallet is being used that should be
    - An assset price reached a "sell/buy" price point that requires my action
    - One of my Ethereum validators produced a block
    - A defi position is is getting close to needing topped up. 
    - etc

## Potential improvements once MVP is done
- two way communication - The initial idea is for sending notifications to a user so that they can be updated and respond accordingly if need be. The obvious next feature is to allow a response within the channel that is getting notification. Since it is inherently a secure channel (subject to appropriate Waku topic and encryption configuration), it would be easy to send reponse messages back to the service instance to perform need maintennce. It should be noted that this change drastically increases the security risk of the application itself, and the assocaited devops of deploying it would need to be taken into consideration such that it is less easy to gain undesired access to. 
