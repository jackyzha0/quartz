---
title: "End to end encryption in Fleeting Notes"
date: 2022-07-20
lastmod: 2022-07-20
---
Privacy and security are a big concern for many users. Especially with something as personal as note-taking this is doubly important. In a survey within my [discord channel](https://discord.gg/xrj6yuGNmx), for every person that wanted markdown support in Fleeting Notes, 7 people wanted [[notes/end-to-end encryption|end-to-end encryption]]. With such high demand for [[notes/end-to-end encryption|E2EE]], I had no choice but to work hard to add this crucial feature into the application.

![end-to-end encryption discord poll](posts/img/e2e-discord-poll.png)

## Enabling E2EE in Fleeting Notes
1. Navigate to the settings in the Fleeting Notes application 
2. Find "End-to-end Encryption" and click the "Enable" button
3. Type in your encryption password (**Note**: you cannot change this password, and if you forget this password, data will remain unusable forever)
4. Click "Ok"

Then you're done! End-to-end encryption is enabled. From now on, notes that are saved will be encrypted on the server. Unaccessible by me or anyone without your custom encryption key. 

**Note**: previous notes won't be retroactively encrypted

## E2EE with the Obsidian plugin
1. Navigate to the settings of the plugin
2. Type the same encryption key you used for in the Fleeting Notes application
3. Perform the sync!

{{< youtube Dpih3dlu098>}}