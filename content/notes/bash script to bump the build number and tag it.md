---
id: 51ff6f20-a22f-11ec-a651-5f6a285d9d33
title: bash script to bump the build number and tag it
notetype: feed
date: 2022-03-12
---
```
#!/bin/bash
set -e

# Find and increment the version number.
perl -i -pe 's/^(version:\s+\d+\.\d+\.\d+\+)(\d+)$/$1.($2+1)/e' client/pubspec.yaml

# Commit and tag this change.
version=`grep 'version: ' client/pubspec.yaml | sed 's/version: //'`
git commit -m "Bump version to $version" client/pubspec.yaml
git tag $version
```

---

https://github.com/flutter/flutter/issues/41955