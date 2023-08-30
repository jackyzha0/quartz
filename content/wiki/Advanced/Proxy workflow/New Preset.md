---
title: "New Preset"
tag: editorial
---
A new “Encoding Preset” can be created in Media Encoder to customize export settings. Then, an “Ingest Preset” must be created to transfer that preset into Premiere’s proxy workflow.

Step 1 – Select “Preset” -> “Create Encoding Preset.” Determine the “Export Settings.” Click Okay. This new preset will appear in Media Encoder’s Preset Browser and can be used when exporting in Media Encoder and Premiere’s export tab (once imported).

Step 2 – Next, create an “Ingest Preset” for Premiere’s proxy workflow. In Media Encoder, select “Preset” -> “Create Ingest Preset.” Name the preset, ending in “_IngestPreset.” Check the box next to “Transcode files to Destination” (Premiere will reset the destination), choose a Format, select a Preset, (i.e. the preset from Step 1), and click Okay.

Step 3 – It will now appear in Media Encoder’s Preset Browser. Right clicking and selecting “Reveal Preset File” will reveal a file with extension “.epr” to be imported into Premiere.

Step 4 – Import this file into Premiere by clicking “Add Ingest Preset.” This new preset can now be used when creating proxies in Premiere.