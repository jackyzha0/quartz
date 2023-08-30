---
title: "Folder structure"
---
All VAULT [[wiki/The Team/VAULT Motion Artists|Motion Artists]] and [[wiki/The Team/VAULT Video Editors|Video Editors]] have to work from the same folder structure.
[Click here to download it](https://github.com/mcanelson/quartz/raw/ac275f7e20e43dee172f6e6d59b7a1aaa7fd10e2/content/_VAULT_DefaultProjects_2023.zip).

Unzip the file inside the main client folder on the server and rename the root folder (VAULT_DefaultProjects_2023) with the name of the project you are going to work on.

> [!info]
> The base structure must be kept, but you can add more folders if needed.

- Client_ProjectName ***> Rename this with your project name.***
	- 00_Outputs 
		- 01_Version ***> Export your renders for review here.***
		- 02_Approved
			- 01_Deliverables
			- 02_Masters
			- 03_Splits
		- 03_Collect
	- 01_Projects
		- 01_AfterEffects
			- 00_Increments
		- 02_Cinema4D
			- frames
			- tex
		- 03_Premiere
			- 00_Archive 
		- 04_ProTools ***> For exclusive use of the Audio Team.***
			- 00_Outputs
			- 01_Sessions
			- 01_Assets
				- 00_OMF
				- 01_Music
				- 02_VO
				- 03_SFX
	- 02_Assets
		- 01_Footage ***> If it's video, it goes here.***
		- 02_Audio
			- 00_MixPrep ***> Use this folder to export .OMFs/AAFs to ProTools.***
			- 01_Music
			- 02_VO
			- 03_SFX
			- 04_SyncSound
			- 05_Mix ***> Store the mixes and splits from ProTools here.***
		- 03_Images
			- 01_Layered ***> For PSDs, AIs, etc.***
			- 02_Stills
		- 04_Animation *> **Motion graphics artists will export their renders here.***
			- 00_AnimationPrep
		- 05_Color
			- 00_ColorPrep ***> Use this folder to send XMLs to the colorist.***
		- 06_Captions
	- 03_Documents ***> Save scripts, decks, fonts and everything else here.***