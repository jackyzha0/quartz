---
title: "12-automation"
tags: 
- cosc202
- lecture
---
links: [cosc-202-lectures](notes/cosc-202-lectures.md)

---

The use of automatic equipment in a production process. We desire to remove repetive work within software development

1. Automation within existing tools
2. Tools that control other tools

This automation should be designed to be efficient and easy to use quickly for a useful purpose. It should also be reliable and safe

Dont spend more time automating than the time you will save. It's good to periodically re-check whether maintaining/developing an automation is warranted
[Relevant xkdc](https://i.imgur.com/RvYHIUW.png)

# 1 Beware

Automation bugs can rapidly cause big messes which can be difficult to undo

So it is useful to do a 'dry run' first to check you automation works

As always, keep backups


# 2 Automating GUI's

- Windows: AutoHotkey
- macOS: Open Scripting Architecture
- Linux: most tools aren't GUI-only


# 3 Automating web apps

[selenium](notes/selenium) can automate access to websites.


# 4 Macros and snippets

[integrated-development-environments](notes/integrated-development-environments.md) can create macros. For example within vscode you can define snippets. These are are often included in laguage extensions. These snippets are templates for often repeated chunks of text.

For example a snippet to create a latex slide

```
"dframe": {
	"prefix": "BDF"
	"body": "\\begin{dframe}{$1}\n \\1 $2\n\\end{dframe}
	"description": "New dframe" },
}
```


## 4.1 Programming language macros

Many programming languages include macros. These are "text replacement" macros.

For example you can define a macro "pi 3.14....". This will then be expanded  when the program is compiled


## 4.2 Shell automation

Most command [shell](notes/shell.md) faciliate automation using shell scripts with loops and conditions.

These are more suited to quick and simple tasks, as more with more complex tasks it is hard to handle edge cases and quirks.

A good way to make scripts safetly is to test the steps interactively before making them into a script

If a script is becoming complex, it is worth switching to python or some other language


## 4.3 Office 365 automation

Office 365 has built in tools for automation. You can record macros using a GUI. You can use Visual Basic for applications. They also have a tool called Power Automate or Flow, which is used for building cloud based automations between products. This can faciliate forms of [continuous-integration](notes/continuous-integration.md)

[Example Flow](https://i.imgur.com/Liiqzlh.png)

# 5 Using tools to automate other tools

## 5.1 Using code to create code

You can you a program to product source code. For example you can write a java program to generate java code. This is suited for producing repetitive error prone source code. 

For example. You are building a command line tool. You want to have a help option. You can create a YAML definition to define command line arguments. You could then create code to parse this YAML and create generate the source code. 

[finite-state-machine](notes/finite-state-machine.md) are another example of something that may benefit from being created programatically


## 5.2 Code generation using spreadsheets

Spreadsheets allow a mix of pattern (using formula) and exceptions (overriding formula for a particular row). This allows you to "eye ball" your shell commands.

For example. each row is a command invocation. Columns build up command's invocation, including formulae. Then use concatenate function to join text from other columns. And copy and paste the rows into your shell

This is useful for idempotent commands. i.e., change happens once. As nothing bad will happen if a command is run twice