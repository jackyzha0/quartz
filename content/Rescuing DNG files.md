---
profileName: Quantum Gardener
postId: 1726
categories:
  - 4
tags:
  - on/photography
  - on/digital-asset-management
publication-date: 2023-08-13
---
This afternoon, as I was importing DNG files into [[Lightroom]], I found way too many that it won't import. There is some kind of corruption in the DNG file. Likely caused by something I've done in the past converting from one format to another (and quite possibly back again).

Thankfully, [[IMatch]] is able to read the files - or at least appears to do so. Could be full size cache files somewhere. I've recovered everything so far.

My approach?

1. Import a single year's DNG files into Lightroom.
2. Save the list of files that error as a txt file.
3. Open IMatch and bookmark each file that errored.
4. Convert each bookmarked file from DNG to TIFF at full resolution.
5. Wait for IMatch's versioning to do its thing, i.e., copy all metadata from the DNG file to the TIFF version.
6. Delete the original DNG file, keeping the TIFF file in place.

These are unlikely files that I'll ever do much editing on, so not having the original RAW data in DNG format is acceptable.

I estimate only a few percent of files have issues, but what's strange is they are clumped together. Across a year, there are only 2-4 days that have problems. This is why I think it's more likely something I've done. If there was a random corruption somewhere in my system, the occurence of files with issues would have a much more dispersed spread.
