---
title: Unlock the Sidebar Width in Firefox
description: "How-to guide about unlocking the max-width of Firefox's sidebar. Doing so net's you a better experience when using extensions within the sidebar."
date: 2023-06-26
compartir: true
category: [Posts]
tags: [firefox, tutorial]
updated: 2023-10-19
---

This post will guide you through unlocking the sidebar width in Firefox. It will let you resize it beyond what is possible by default. We will be setting both the maximum, and the minimum width. You will have a chance to customize these values once at the right step.

## Why Would Anyone Want to Do This?

* To enhance the use of the Firefox [Side View](https://addons.mozilla.org/en-US/firefox/addon/side-view/) extension.
* To compliment the use of one of my Firefox sidebar [extensions](https://addons.mozilla.org/en-US/firefox/user/17772574/).

## Step-by-Step Instructions

1. In a new tab, navigate to `about:support`.
2. Under `Application Basics`, find `Profile Folder`.
3. Locate and click the `Open Folder` button next to it. It will be next to an address similar to:  
`%appdata%\Mozilla\Firefox\Profiles\{profile-id}.default`[^1]
4. Inside your Firefox Profile Folder, create a new folder named: `chrome`.
5. Inside the newly created chrome folder, create a new file named: `userChrome.css`.
6. Copy the following code,[^2] paste as content and save:

```css
/* You may change the units to any length you find more convenient. */
#sidebar-box {
  max-width: 40% !important;
  min-width: 300px !important;
}
```

7. Finally, in a new tab, navigate to `about:config`, search for `toolkit.legacyUserProfileCustomizations.stylesheets`, and change its value to `true`.
8. Restart Firefox and test it out!
