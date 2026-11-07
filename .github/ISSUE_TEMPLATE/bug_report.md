---
name: Bug report
about: Something about Quartz isn't working the way you expect
title: ""
labels: bug
assignees: ""
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots and Source**
If applicable, add screenshots to help explain your problem.

You can help speed up fixing the problem by either

1. providing a simple reproduction
2. linking to your Quartz repository where the problem can be observed

**Quartz info**
Run `npx quartz info` in your Quartz folder and paste its output here. It lists your Quartz version, Node/npm/OS and every plugin with its version — no content or site URL is included.

```
Paste the output of `npx quartz info` here
```

(Quartz older than 5.1 doesn't have `npx quartz info`: give the Quartz version from `package.json` and the output of `git log -1 --format=%h`, plus your `node` and `npm` versions and OS.)

**Browser** (for display problems): [e.g. Firefox 140, Safari on iOS 18]

**Build output**
If the build failed or printed warnings, paste the full output of `npx quartz build`, including the summary at the end.

**Additional context**
Add any other context about the problem here.
