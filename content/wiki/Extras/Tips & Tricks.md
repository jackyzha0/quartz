---
title: "Tips & Tricks 🪄"
---

> [!tip]- How to download .m3u8 files
> 1) Get the URL of the video you want to download and paste it somewhere handy.
> 2) Download ffmpeg from here >  [https://evermeet.cx/ffmpeg/](https://evermeet.cx/ffmpeg/) (top right column).
> 3) Double click the zip to get the file and copy it to the Applications folder.
> 4) Open Terminal.app and type:
> 
> /Applications/ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i "[http://www.URL.com/file.m3u8](http://www.url.com/file.m3u8)" -c copy videoname.mp4
> 
> 5) Replace "[http://www.URL.com/file.m3u8](http://www.url.com/file.m3u8)" with the URL of your video you got in step 1 (keep the quotation marks).
> 6) Hit enter and wait until the process is finished. Your video will be stored in the Home folder (CMD+Shift+H)
> 
> To download more files, you just need to repeat steps 4, 5, 6.

> [!tip]- Tik-Tok VO Generator
> 
> This website does text-to-speech using Tik-Tok voices.
> [https://weilbyte.github.io/tiktok-tts/](https://weilbyte.github.io/tiktok-tts/)