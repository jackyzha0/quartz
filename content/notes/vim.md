---
title: "Vim - The Personal Man"
tags:
- vim
---

<details open>
this shoyld wodrlj
</details>

## Navigation 👻
### Exiting
|                 |                                       |
| --------------- | ------------------------------------- |
| :q              | to `quit` the file                    |
| :e!             | to `trash` all changes and **reload** |
| :q!             | to `trash` all changes and **quit**   |
| :wq             | to `save` the changes and **quit**    |
| ZZ (Shift + zz) | to `save` the changes and **quit**    |
|                 |                                       |
### Movements
|                                    |                                              |
| ---------------------------------- | -------------------------------------------- |
| h j k l                            |    ⃪ ↓ ↑ →                                      |
| 0                                  | to the `start` of the line                   |
| $ (Shit + 4)                       | to the `end` of the line                     |
| e                                  | to `end` of word                             |
| w                                  |`forward` one **word**                       |
| W                                  |`forward` one **Word**                       |
| b                                  |`backward` one **word**                      |
| B                                  |`backword` one **Word**                      |
| *<`number`>* wW / e / bB / h j k l | Move *<`number`>* times *<`text objects`>* |
| *<`number`>* G                         | to **specific line**                             |
| %                                  | to **matching parenthesis {} () []**             |
| zz                                 | re-center                                             |

## Text manipulation
|                                      |                                                      |                          
| ------------------------------------ | ---------------------------------------------------- |
| x                                    | **delete** *`at`* the cursor (→ in normal mode still)        |                          
| i                                    | **insert** *`before`* the cursor                             |                          
| I                                    | **insert** *`beginning`* of the line                         |                          
| a                                    | **insert** *`after`* the cursor                              |                          
| A                                    | **append** *`after`* the line                                |                          
| o                                    | **open** line *`above`*                                      |                         
| O                                    | **open** line *`below`*                                      |                          
| s                                    | **delete** character and insert                          |                          
| S                                    | **delete** line and insert                               |                          
| R overstrike mode                    | **replace** text character by character (max 1 line)     |                          
| c *<`movement`>* wW / bB / 2j / $/ 0 | **change** till (→ in *insert* mode now)  *`cc`* - change one line     |
| d *<`movement`>* wW / bB / 2j / $/ 0 | **delete** till (→ in *normal* mode still) *`dd`* - delete one line ... |
| r                                    | replace single character (→ don’t have to press ESC) |                          
| *<`number`>* ~                       | **change** letter case                                   |                          

> Remember - **(command)*(number)(text object)****





