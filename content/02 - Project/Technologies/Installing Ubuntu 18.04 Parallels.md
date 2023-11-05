---
title: Installing Ubuntu 18.04 Parallels
creation_date: 2023年03月01日
modification_date: NaN
banner: "https://images.unsplash.com/photo-1629654297299-c8506221ca97"
banner_y: 0.49988
banner_lock: false
week: 2023-09
---
# Installing Ubuntu 18.04 Parallels

1. Download Ubuntu Server 18.04.6 LTS (Bionic Beaver) for ARMv8 at https://cdimage.ubuntu.com/releases/18.04/release/. Have a copy on the computer.
2. Burn the ubuntu-18.04.6-server-arm64.iso onto a USB stick `DD Mode` with Rufus at https://rufus.ie/downloads/
3. Boot with your ubuntu-18.04.6-server-arm64.iso as the `cdrom`. **Check customize settings before installation to do so**
4. After booting has started, plug in the Burned USB stick and tell Parallels to share it with Linux guest (guest USB passthrough)
5. The installer will automatically find the image on the USB stick, mount it, and load the appropriate modules so it can access your Parallels HDD.
6. Follow directions and prepare your ubuntu! 

## Create new image
![](https://s2.loli.net/2023/03/02/kQqdCSeEAsclOuL.png)
## Customize settings

![](https://s2.loli.net/2023/03/02/htZGK8EIF2PSqka.png)

## Boot as Cdrom
![](https://s2.loli.net/2023/03/02/dOg1n5D4wvpcsuF.png)

