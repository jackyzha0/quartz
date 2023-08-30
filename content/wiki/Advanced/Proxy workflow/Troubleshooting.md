---
title: "Troubleshooting"
tag: editorial
---
Audio Channel Mismatch –  
If the audio channels of the proxies don’t match the raw footage, corrected proxies will need to be re-exported.

”Search” Doesn’t Work –  
Having trouble finding the corresponding footage may be due to the proxy file name. Double check the proxies use the full raw footage name as the base file name. You may need to search manually.

Baked In LUT? –  
If your RAW footage or proxies seem to have a LUT that isn’t showing up in Effect Controls, click “Source” along the top of the Effect Controls. This will reveal RAW and proxy settings, including RED Source Settings where you may need to change the “Image Pipeline” from “IPP2” to “Legacy.”

Squished or Incorrect Proxy Playback –  
Check that the proxies were made with the correct pixel ratio, dimensions, and frame rate. See “Export Settings” for details.

Proxy Error on Export –  
If Premiere fails to export some or all proxies, try re-exporting them again or use Media Encoder and link them to the RAW in Premiere.