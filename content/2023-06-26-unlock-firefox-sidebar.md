---
title: Unlock the Sidebar Width in Firefox
description: How-to guide about unlocking the max-width of Firefox's sidebar. Doing so net's you a better experience when using extensions within the sidebar.
date: 2023-06-26
compartir: true
category: Turtorials
tags:
  - firefox
  - tutorial
---
This post will guide you through unlocking the sidebar width in Firefox. It will let you resize it beyond what is possible by default. We will be setting both the maximum, and the minimum width. You will have a chance to customize these values once at the right step.

## Why Would Anyone Want to Do This?

- To enhance the use of the Firefox [Side View](https://addons.mozilla.org/en-US/firefox/addon/side-view/) extension.
- To compliment the use of one of my Firefox sidebar [extensions](https://addons.mozilla.org/en-US/firefox/user/17772574/).

## Step-by-Step Instructions

1. In a new tab, navigate to _about:support_.
2. Under _Application Basics_, find _Profile Folder_.
3. Locate and click the _Open Folder_ button next to it. It will be next to an address similar to:[^1]

```sh
%appdata%\Mozilla\Firefox\Profiles\{profile-id}.default
```

1. Inside your _Firefox Profile Folder_, create a new folder named `chrome`.
2. Inside the newly created `chrome` folder, create a new file named `userChrome.css`.
3. Copy the following code,[^2] paste as content and save:

```css
#sidebar-box {
  max-width: 40% !important;
  min-width: 300px !important;
}
```

1. You may change the units to any length you find more convenient.
2. Finally, in a new tab, navigate to _about:config_, and search for:

```sh
toolkit.legacyUserProfileCustomizations.stylesheets
```

1. Change its value to `true`.
2. Restart Firefox and test it out!

[^1]: In windows, `%appdata%` is equivalent to `C:\Users\{username}\AppData\Roaming`.
[^2]: After Firefox 107, `#sidebar` was deprecated, and `#sidebar-box` was introduced as a replacement.
