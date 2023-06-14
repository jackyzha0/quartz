---
title: "Git for Data Analysts"
tags:
- articles
---

> [!note] Note
>
> My boss asked me to write this up for a previous role for the company blog, although he completely forgot to ever post it. At least it's here now.

Git has suddenly leapt to the forefront of the minds of many data analysts, data engineers, and BI engineers as tools like [dbt](https://www.getdbt.com/product/what-is-dbt/) and [Terraform](https://www.terraform.io/intro) begin to take over analytics and data engineering department everywhere. To say that these tools are gaining popularity ***because*** of their compatibility with git and similar version control systems is not an overstatement. dbt's own website highlights
> Git-enabled version control [enabling] collaboration and a return to previous states.

BI tools, especially no-code tools like Alteryx, have long had a gap in their usefulness when it comes to version control and CI/CD; maintaining versioning means saving a slate of files, reverting one feature may mean reverting many, and working collaboratively with others is difficult. Tools delivering analytics as code aim to bring the efficiency of the software development life cycle to analytics teams.

# The Building Blocks of Git
While hearing software engineers and the like discuss version control might initially sound like Greek to BI analysts, git at its core is just a way of keeping track of changes to text files. Git uses "units" of commit, branch, and repository to keep track of changes to a given set of files. For the following sections, imagine that your team is working on a project with two text files:
	- *todos.md*
	- *done.md*

## The Commit
A commit is the most granular unit tracked by git. It is essentially a collection of changes to the way that files were when you started working on them. In our example, you might receive the two files above in a blank state. You decide to add the below lines to *todos.md* on the default branch, called **main**:

```
- [ ] Water the office plant
- [ ] Talk to John
```

Once done, you use `git add .` and `git commit -m "add 2 todos"` to add and package up these changes as a commit, name it, and send it to your repository.

## The Branch
A branch is a string of commits. Each commit has a parent, the commit immediately preceding it, and may have children, any commits that come after it. Say that your boss started working on these files at the same time as you, also starting with the empty files in their own "branch". They decide to start their own branch before working on the project, as best practices would recommend. Before they make any changes, they execute the command `git switch -c boss_branch`. This command creates a branch called **boss_branch** and switches to it. Now, any commits they add will be tracked on this branch.

They first add a to-do items in *todos.md*. Their file looks like this when they are finished:
```
- [ ] Get Coffee
```
They add and commit this using `git add .` and `git commit -m "add a todo"`, naming their commit, "add a todo". However, after finishing, they remember something that they did this morning.

They open up *done.md*, and add the following:
```
- [x] Fire John
```
Your boss adds and commits this change using `git add .` and `git commit -m "add done item"`. Now their branch is a string of two commits. The most recent commit in their branch, also known as the HEAD, contains the files with changes from both of their commits included.

## The Repository (The Tree)
The repository is easily imagined as a tree, with its collection of branches and leaves (commits) along each of those branches. A repository can have essentially endless branches, or versions of the same directory that users can easily switch between. In our case, we have two branches, one with your changes and one with changes made by your boss. But how do we combine our work into one set of files?

![[Pasted image 20211220122238.png]]

# The Merge
You've heard plenty about git's enabling of collaboration, now it's time to see it in action. As you see in the overview of the repository, we have two branches: **main** and **boss_branch**. **main** contains only your changes to *todos.md*. **boss_branch**, however, contains changes to both files. How will git know whose changes to take when it comes to *todos.md*?

The answer is that git will take all changes. It does this not by comparing the two versions of *todos.md* directly, but by comparing both files to their most common ancestor, in this case the commit labeled 'root' in the diagram above. Since both files were blank in the common ancestor, git will see the actions taken in each branch as the below:

**main**
- add line 1 to *todos.md*: `- [ ] Water the office plant`
- add line 2 to *todos.md*: `[ ] Talk to John`

**boss_branch**
- add line 1 to *todos.md*:  `- [ ] Get Coffee`
- add line 1 to *done.md*: `- [x] Fire John`

Now that we have an idea of what git will do, let's try it out. You navigate to the **main** branch using `git switch main`. Once there, you run `git merge boss_branch` to merge your changes into the main branch.

## Merge Conflicts
Oh no, a merge conflict! If you look at the list of actions taken in each branch above, you can see where the conflict arises from: you and your boss both added different line 1's to *todos.md*. Fortunately, this can be fixed relatively easily. If you return to *todos.md*, you will see that it looks like the below:

![[Pasted image 20211220124645.png]]

Git has added markers to show the conflict. Above the line, you have your boss's version of the file. Below the line, you have your version of the file. You need to just (1) delete the markers git has added, and (2) edit the file so that it is in your final desired state.

You decide that you don't want to lose your to-do items, and you really do not want to remove the to-do items your boss added. So, you edit the file until it is in the below state:

![[Pasted image 20211220124809.png]]

All done! Git will ask you to commit these changes, but after you do so the merge will be complete. Now, on your main branch, you will have all the changes made by both you and your boss. Your repository now looks like:

![[Pasted image 20211220125312.png]]

And your files look like:
*todos.md*
```
- [ ] Get Coffee
- [ ] Water the office plant
- [ ] Talk to John
```

*done.md*
```
- [x] Fire John
```

Unfortunately, it looks like you will be unable to complete your last to-do item today.

# Every Command You Need
When using git in the real world, there are a few more commands and steps that you will need in your workflow:

## Cloning
Cloning a repository creates a copy of the git repository on the web (on Github, Gitlab, Azure DevOps, etc.) *on your local machine*. This allows you to add and test changes on your laptop before sending them to the repository that the rest of your team sees online. To clone a repository, obtain the https or SSH key from your online (remote) repository, and run the following command on your local machine:
`git clone <key>`

You will then see a replica of the online version of your repository in your local file system that you can work on.

## Managing Branches
Before starting any work, you will always want to make sure that you have the most updated version of the branch on which you are working. Therefore, before making any changes, always run `git pull origin <current branch name>` to pull any changes in the remote repository that are not in your local repository.

If you would like to add a new branch for your work, you can simply add and switch to a new branch using `git switch -c <new branch name>`. Note that, to start, your new branch will be a copy of the branch *that you were on when running the command*.

Once working, you can easily pop around between existing branches using the `git switch <branch name>` command.

## Making Changes
Once you have made changes to the files of your branch, you need to make sure that these are reflected in the remote repository. At first, all of your changes will be considered by git as *unstaged*. This means that they cannot currently be committed. Git offers the *staging area* as a place to bundle changes up before committing them. To move relevant changes to specific files to the staging area, you can use `git add <filename>`. To add all changes to the staging area, use `git add .`. You can check which changes are staged and which are unstaged by running `git status`.

Once you have your changes staged, you need to add a new commit to your current branch. To do this, run `git commit -m "<description of changes>"`. It's always beneficial to add very descriptive commit messages. You can add as many commits to your branch locally as you'd like before you proceed.

Now your local repository has changes, but the online repository does not know they exist. To send these changes to the online location, you need to "push" your version of the current branch to the remote repository. You can do this with `git push origin <current branch name>`. After running this command, you will be able to see your committed changes in the online repository.

## The Pull Request
A pull request, or PR, is a feature present only in online git hosting services, like GitHub or Azure DevOps. A pull request allows teams to ask their teammates to review and test their code before `git merge` is run and the code enters a branch used by the entire team. More details about *when* to create a PR are in the following section.

Opening a PR varies slightly between different providers, but for all PRs you will need to know the difference between a base branch and the compare branch. A PR will always merge the compare branch *into the* base branch. In the section below you will learn about the typical base branches in PRs (master, development), and the typical compare branches in PRs (development, feature branches).


# How Teams Use Git
Git's collaborative power is most commonly used in a *feature branch* workflow. In this system, there are three types of branches:
- **Master/Main:** The master branch is stable production code. You should never add commits directly to the master branch but should instead collect changes on the development branch before merging it to the master. There is only one master branch.
- **Development:** The development branch is where new features and projects are collected before going to production as a *release*. You should never commit directly to the development branch, but instead merge individual feature branches to development as they are completed. There is only one development branch.
- **Feature:** Feature branches are where individual features are developed. Members of the team will commit directly to each feature branch as they do their work. You can have as many feature branches as you would like, but as a rule you should only develop *one feature per feature branch*.

So, in a typical workflow to develop a new feature, you would follow the following steps:
1. Create a new feature branch based on the development branch. Be sure to give your branch a descriptive name based on the feature you are adding.
2. Add and test your feature, committing your changes as you go.
3. Push your changes to the remote, and open a pull request from your feature branch into development.
4. Once your code has been reviewed by a teammate, they will approve the PR, merging it into development.
5. You want to release your feature today, but your teammate moved a few feature to the development branch yesterday. Before you request that the development branch features are moved to production, you open up the development branch in your IDE and test that all the new features are playing nicely with each other.
6. Everything seems to be working properly so you open another PR from development into the master branch. Once again your teammate reviews and completes the PR, and your code is merged into the production codebase.

While steps three through six may seem redundant, they are essential for testing code before moving it to production and for managing release timing. It allows teams to collect a "critical mass" of features and test them together before releasing them into a production environment.

           
# Git for Data Analysts

There’s many more commands, intricacies, and working styles when it comes to git, but the basics in this article can get you 90% of the way to where you need to go. As it is with most things, it’s much easier to share your changes correctly the first time than it is to fix it later, so always prioritize best practices over speed as you move forward.



