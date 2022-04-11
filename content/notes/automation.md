---
title: "automation"
aliases: Automation, Automations, automations
tags: 
- cosc202
---

Automatation is the use of automatic equipment in a productions process. The goal is to remove repetitive tasks. Automation can be built within a tool, or it can be a tool that controls other tools. Any automation should be easy and quick to use, reliable, and safe. 

# Implementation/Use tradeoff
Automations should save enough time to warrant their creation ([xkdc](https://i.imgur.com/RvYHIUW.png)). It is good to re-check your time spent periodically. 

Be careful when creating automations as bugs can rapildly case a mess.

# Examples of Automation
- [IDEs](notes/integrated-development-environments.md) can  contain user defined [2 1 Snippets](notes/integrated-development-environments.md#2%201%20Snippets). 
- Selenium can be used to control websites using code
- On windows, AutoHotKey is a scripting language that can be used for keyboard shortcuts, macro creation and more
-  [shell](notes/shell.md)s can be used to automate quick and simple tasks. They are not suited for more complex tasks as edge cases and quirks become hard to handle and are usually not worth the time. For these tasks you could python or some other language.
	- You should create these incrementally, testing steps as you go before combining them into a script
- Office 365 can be automated using Flow (a.k.a, Power Automate)
	- Macros are recorded by a gui or created manually
	- This can faciliate forms of [continuous-integration](notes/continuous-integration.md)
	- For [example](https://i.imgur.com/Liiqzlh.png)

# Using code to create code
You can you a program to product source code. For example you can write a java program to generate java code. This is suited for producing repetitive error prone source code. 

For example. You are building a command line tool. You want to have a help option. You can create a YAML definition to define command line arguments. You could then create code to parse this YAML and create generate the source code. 

[finite-state-machine](notes/finite-state-machine.md) are another example of something that may benefit from being created programatically

## Code generation using spreadsheets

Spreadsheets allow a mix of pattern (using formula) and exceptions (overriding formula for a particular row). This allows you to "eye ball" your shell commands.

For example. each row is a command invocation. Columns build up command's invocation, including formulae. Then use concatenate function to join text from other columns. And copy and paste the rows into your shell

This is useful for idempotent commands. i.e., change happens once. As nothing bad will happen if a command is run twice

AutoHotKey on windows can be used to automate GUIs. Selenium can be used to automate web apps

