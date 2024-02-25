---
page-title: "windows 10 - How to extend C: drive to claim unallocated space? - Super User"
url: https://superuser.com/questions/1256334/how-to-extend-c-drive-to-claim-unallocated-space/1256357#1256357
date: 2023-07-05 12:00:41
tags:
  - windows
  - unallocated
  - partition
  - disk
public: true
created: 2024-02-03
updated: 2024-02-09
---

> My verified solution to dealing with unallocated space on a disk (Windows operating system):
> 
> 1.  BACK YOUR STUFF UP.
> 2.  When the unallocated space is not immediately next to the partition you want to extend, Disk Management falls short on the task. Install the free third-party tool [MiniTool Partition Wizard](https://www.partitionwizard.com/free-partition-manager.html), which seems to have good support and is kept up to date. It's a standalone application that doesn't require any booting from a CD.
> 3.  Run the program as administrator (recommended [here](https://superuser.com/questions/1018246/how-to-extend-c-drive-in-windows-8-1)).
> 4.  This step involves moving partitions around. We want the C: partition to be immediately next to the unallocated space.
>     1.  Right click on the partition currently next to the unallocated space, blocking the way. Select `Move/Resize`.
>     2.  In the block labeled `Size And Location`, there will be a slider. It's unintuitive, but it represents where your partition lives in memory. Drag the center of the slider all the way to the other side (of the unallocated space), making sure none of the byte sizes change (obviously we want the location to change). Click `OK`.
>     3.  Changes haven't occurred yet. Click `Apply` at the top. Follow the instructions.
>     4.  Repeat these steps for any other blocking partitions.
> 5.  Go back into Disk Management (or use the wizard...) and extend the volume.
> 6.  Reboot for good measure to make sure things still work.
> 
> Some notes about my solution in particular -- I had a partition next to my C: drive that didn't have any recognizable file system format. I'm fairly sure it was a leftover of un-dual-booting a Linux OS long ago. I deleted it and everything was fine.

---

I bought a new SSD for my laptop (Windows 10), and after successfully cloning the old SSD to the new larger one, my C: drive is still the old size. I then had a huge unallocated space to the far right on Disk Management (not next to C:).

I then found [MiniTool Partition Wizard](https://www.partitionwizard.com/free-partition-manager.html), which allowed me to move around **some** of my partitions (without having to reboot). However, my Disk Management looks like this now:

![my Disk Management](https://i.stack.imgur.com/Njf3x.png)

As you can see, I got the 16 GB one to the right of the unallocated space now. However, the Partition Wizard says that the 11.88 GB space is of file system type "Other" and doesn't even give me the option to move it out of the way.

What do I do from here? Surely someone has dealt with this issue before; the question is all over the Internet, though without any coherent answers.

*Please note*: I'm not looking for alternatives to the question I'm posing. I don't want an extra drive letter. I'm looking to extend my C: drive.

**Edit**: What Partition Wizard shows about the 11.88 GB drive -- ![enter image description here](https://i.stack.imgur.com/gWhfs.png)

___

**Related**
- [[FUSE|FUSE]]