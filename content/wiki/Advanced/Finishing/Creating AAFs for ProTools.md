---
title: "Creating AAFs for ProTools"
tag: editorial
---
> [!warning] NEEDS REVIEW
> This is a copy/paste from Kyle's workflow. Needs a review for minimal adjustment.

# Step 01 - Creating a Reference Video

A reference video is an export of the offline edit that is used as a reference during audio mix, color, VFX, and conform. It includes a 2-pop and burned-in timecode. You can skip this step if you have already created one. 

-   Duplicate the sequence and rename it with the suffix "-REF"
    
-   In the timeline window, right-click the "-REF" sequence tab and select "Start Time…" from the dropdown menu. 
    
-   In the pop-up window, type in 00:59:58:00.
    
-   In the sequence, move the first frame of the edit to 01:00:00:00.
    
-   At 00:59:58:00, overwrite exactly 1 frame of Bars and Tone.
    
-   Set your In/Out for the entire sequence and open the Export menu. 
    
-   Under the Export menu's effects tab, check the Timecode Overlay box.
    
-   Under Timecode Overlay, set Time Source to Media File. This will make the burn-in timecode match the sequence timecode.
    
-   Set your export codec to h.264. Match the video settings to your sequence settings.
    
-   Export the video.
    

# Step 02 - Creating an AAF

An AAF is a file that is used to send the audio from a Premiere sequence to an audio mixing program such as ProTools.

- Duplicate the REF sequence and rename it by replacing "-REF" with "-MixPrep"
- Delete any unused/muted audio clips.
- Un-nest any nested audio.
- Make sure your audio tracks are labeled and organized by type; VO, Dialog, SFX, Ambient, Music, etc.
- Delete all unused audio tracks.    
- Set In/Out for the whole sequence and go to File—> Export—> AAF


-  In the AAF pop-up window: 
![[Assets/AAF_ExportSettings.png]]
* Mixdown Video:  uncheck    
* Use tape sources when present: uncheck
* Sample Rate: 48000
* Bits per Sample: 24
* Files: Embed Audio
* Preserve media directory name: uncheck
* Format: Broadcast Wave
* Render: Trim Audio Files
* Handle Frames: 48

  Click OK and select where you want the OMF to save to. A metadata text file will be created alongside the OMF file.


# Step 03 - Sending Files to the Audio Engineer

By following the above steps, you will have created 3 files; 1 reference video, 1 AAF, and 1 text file with metadata. Send these 3 files to the audio engineer.

If you used any MP3s or watermarked audio in the edit, make sure to send the hi-res/unwatermarked files to the audio engineer.

This is also a good time to communicate with the engineer. Ask to see if they need anything else or have any questions.

# Step 04 - Receiving Mix and Splits

Once the audio engineer has done their magic and the mix is client approved, the audio engineer should send you the Mix and Splits as WAV files.

If you received the mix in a video file, that audio is compressed and should not be used. Ask the engineer to send you the uncompressed WAV files.

# Step 05 - Syncing the Mix to the Conformed Picture

-   Take the conformed sequence and add a 2-pop if it doesn’t already have one.
    
-   Delete all audio in the sequence.
    
-   Under Audio Track Mixer, remove any and all audio track effects. Make sure the pan and track sliders are set to 0.0. This step is crucial because if these settings are modified, it will mess up the mix!
    
-   Import your mixed audio file and sync it to the sequence by syncing the mix's audio "pop" to the picture's 1 frame of color bars.
    
-   Delete all unused audio tracks.
    

Make sure to only use the Mix WAV file for the conform. Putting all the splits together does not equal a mix. Splits are for archiving and for making additional edits after the mix session. If you use the splits for additional editing, be sure to send the audio engineer updated prep so that they can make changes and provide you with a new mix.

# Step 06 - Quality Control

Playback the sequence with the newly synced audio mix to make sure everything is correct. If there is a sync problem or other audio mistakes, double-check to make sure Step 05 was done correctly.

If you are still having audio issues, then it is most likely a mistake that was made during the initial prep or a mistake the audio engineer made. Reach out to the audio engineer; they should be able to help you with any issues you are having.

