---
title: "filter-based-sensor-fusion"
aliases: filter based sensor fusion
tags: HCI, CV
---

<% tp.file.cursor(2) %>
**High pass**
- remove lower frequencies

**Low pass**
- remove high frequencies

**Orientation Example**
- low pass on accel + magnet to capture only long term information for absolute orientation
- high pass on gyro to make only small changes and hopefully ignore drift