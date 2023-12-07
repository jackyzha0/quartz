---
title: How to extend an Ubuntu vdisk on unRaid
tags:
  - unraid
  - ubuntu
  - vdisk
  - guide
---
When running virtual machines in unRaid (or on any virtualization management server), you sometimes run out of space and need to extend the virtual disk (vdisk) of the VM. This is a guide on how to do that (for Ubuntu, LVM-based VMs). 

## Extend the vdisk on unRaid
- open terminal
- navigate to the vdisk, usually `/mnt/user/domains/<VM name>/vdisk1.img`
- extend via `qemu-img resize vdisk1.img +200G` or whatever size you want to extend it to
## Make the VM recognize the vdisk change
I have found [this article](https://packetpushers.net/ubuntu-extend-your-default-lvm-space/) to be most useful in extending the logical volume on the VM