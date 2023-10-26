#GitHub 

Git und deren Tools:
[[GitHub_old]]

### Theorie
--> popular version control system.

Used for:
-   Tracking code changes
-   Tracking who made changes
-   Coding collaboration

#### What does Git do?

-   Manage projects with **Repositories**
-   **Clone** a project to work on a local copy
-   Control and track changes with **Staging** and **Committing**
-   **Branch** and **Merge** to allow for work on different parts and versions of a project
-   **Pull** the latest version of the project to a local copy
-   **Push** local updates to the main project

#### Working with Git

-   Initialize Git on a folder, making it a **Repository**
-   Git now creates a hidden folder to keep track of changes in that folder
-   When a file is changed, added or deleted, it is considered **modified**
-   You select the modified files you want to **Stage**
-   The **Staged** files are **Committed**, which prompts Git to store a **permanent** snapshot of the files
-   Git allows you to see the full history of every commit.
-   You can revert back to any previous commit.
-   Git does not store a separate copy of every file in every commit, but keeps track of changes made in each commit!


### Configure Git
```JS
// setzen des Usernames global = für jedes Repo auf meinem PC
git config --global user.name "clemens-sch"
```

### Initialize the Git Folder
```JS
// in gewünschtes Git-Verzeichnis navigieren
git init

// Initialized empty Git repository in /Users/user/myproject/.git/
```

### Git: Adding new files (+ messages)
```JS
// anstatt "." entweder filename oder "." (alle Änderungen)
git add .

// include a message
git commit -m "message"
```

Git: New Branch