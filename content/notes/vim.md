---
title: "Vim - The Personal Man"
tags:
- vim
---
## Making your own Quartz
Setting up Quartz requires a basic understanding of `git`. If you are unfamiliar, [this resource](https://resources.nwplus.io/2-beginner/how-to-git-github.html) is a great place to start!

### Forking
> A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.

Navigate to the GitHub repository for the Quartz project:

📁 [Quartz Repository](https://github.com/jackyzha0/quartz)

Then, Fork the repository into your own GitHub account. If you don't have an account, you can make on for free [here](https://github.com/join). More details about forking a repo can be found on [GitHub's documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### Cloning
After you've made a fork of the repository, you need to download the files locally onto your machine. Ensure you have `git`, then type the following command replacing `YOUR-USERNAME` with your GitHub username.

```shell
$ git clone https://github.com/YOUR-USERNAME/quartz
```

## Editing
Great! Now you have everything you need to start editing and growing your digital garden. If you're ready to start writing content already, check out the recommended flow for editing notes in Quartz.

✏️ [Editing Notes in Quartz](notes/editing.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).

## Updating
Haven't updated Quartz in a while and want all the cool new optimizations? On Unix/Mac systems you can run the following command for a one-line update! This command will show you a log summary of all commits since you last updated, press `q` to acknowledge this. Then, it will show you each change in turn and press `y` to accept the patch or `n` to reject it. Usually you should press `y` for most of these unless it conflicts with existing changes you've made! 

```shell
make update

# or, if you don't want the interactive parts and just want the update
make update-force
```

Or, manually checkout the changes yourself.

> ⚠️ **WARNING** ⚠️
>
> If you customized the files in `data/`, or anything inside `layouts/`, your customization may be overwritten!
> Make sure you have a copy of these changes if you don't want to lose them.


```shell
# add Quartz as a remote host
git remote add upstream git@github.com:jackyzha0/quartz.git

# index and fetch changes
git fetch upstream
git checkout -p upstream/hugo -- layouts .github Makefile assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data 
```


## Exiting 👻
|                 |                                       |
| --------------- | ------------------------------------- |
| :q              | to `quit` the file                    |
| :e!             | to `trash` all changes and **reload** |
| :q!             | to `trash` all changes and **quit**   |
| :wq             | to `save` the changes and **quit**    |
| ZZ (Shift + zz) | to `save` the changes and **quit**    |


## Navigation
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

|     |                                               |
| --- | --------------------------------------------- |
| x   | delete at the cursor (→ in normal mode still) |
| i | insert before the cursor |
| I | insert beginning of the line |
| a | insert after the cursor |
| A | append after the line |
| o | open line above |
| O | open line below |
| s | delete character and insert |
| S | delete line and insert |
| R overstrike mode | replace text character by character (max 1 line) |
| c *<`movement`>* wW / bB / 2j / $/ 0 | change till (→ in insert mode now) | cc - change one line |
| d *<`movement`>* wW / bB / 2j / $/ 0 | delete till (→ in normal mode still) | dd - delete one line ... |
| r | replace single character (→ don’t have to press ESC) |
| *<`number`>* ~ | change letter case |

> Remember - **(command)*(number)(text object)****






