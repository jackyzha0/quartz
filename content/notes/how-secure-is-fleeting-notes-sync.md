---
title: How secure is Fleeting Notes sync
date: 2022-07-22
lastmod: 2022-07-22
---
When notes are sent to the server, they're transferred through [[notes/secure socket layer|SSL]]. Within the server, notes will be stored in plain text. For an added layer of security, [[posts/end-to-end-encryption-in-fleeting-notes|end-to-end encryption can be enabled]]. This makes notes inaccessible by us or any potential eavesdroppers such as your internet service provider.

We use industry-standard AES-256 to encrypt your data for [[notes/end-to-end encryption|E2EE]]. AES-256 is a military-grade encryption specification that's widely used in for example online banking.