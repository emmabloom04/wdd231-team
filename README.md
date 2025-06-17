# Playlist Maker
## Description
This is an app that will allow users to create playlists of their favorite songs. They can add songs, typing in just the song title, and data gathered from an API will fill in the rest of the information. The goal is that they will be able to add different songs to different playlists.
## Target Audience
Anyone who wants to keep a library of their favorite songs organized into different playlists.
## Features and Functionalities
Adding new songs, seeing album cover art, playing a sample of the song, adding songs to playlists.
## Github Branching

### Introduction

This document provides a direct, step-by-step guide on how to implement and use a Git branching system for our team. Following these instructions will significantly improve collaboration, minimize merge conflicts, and help maintain a stable codebase.

### Recommended Strategy: Feature Branch Workflow

For our team's size, the **Feature Branch Workflow** is the simplest and most effective strategy.

#### Core Concepts:

* **`main` Branch:**
    * This is the primary branch.
    * It **MUST always** hold stable, deployable code.
    * **NEVER work directly on the `main` branch.** All development occurs on separate feature branches.
* **Feature Branches:**
    * These are temporary branches created for every new task, feature, or bug fix.
    * Branch them off `main`, perform your work, and then merge them back into `main`.

---

### Step-by-Step Instructions: Your Branching Workflow

Follow these instructions for each task you begin. Assume your main branch is named `main`.

#### **Step 1: Get Ready for a New Task (Pull the Latest `main`)**

Before you begin any new coding for a task, ensure your local `main` branch is perfectly up-to-date with the remote repository. This prevents you from building on old code.

* **Action:** Switch to the `main` branch.
    ```bash
    git checkout main
    ```
* **Action:** Pull the very latest changes from the remote `main` branch.
    ```bash
    git pull origin main
    ```
    *(**DO THIS** at the beginning of each day, or before starting any new task, to ensure your local `main` is current.)*

#### **Step 2: Create a New Feature Branch for Your Task**

Always create a new, dedicated branch specifically for the task you're about to work on. This isolates your work.

* **Action:** Choose a clear and descriptive name for your branch.
    * **Good Naming Conventions:** `feature/your-task-name`.
* **Action:** Use this command to **create** your new branch and **switch** your working directory to it immediately.
    ```bash
    git checkout -b feature/your-task-name-here
    ```

#### **Step 3: Work on Your Task & Commit Frequently**

Now you are on your isolated feature branch. Make all your code changes, add new files, and modify existing ones here.

* **Action:** As you complete small, logical parts of your task (e.g., "added button UI," "implemented service function," "fixed a specific bug"), **commit your changes regularly**. Don't wait until the very end. Smaller commits are easier to review and debug.
* **Command:** Stage all your changes (new, modified, deleted files).
    ```bash
    git add .
    ```
* **Command:** Commit your staged changes with a clear, concise message describing what you did.
    ```bash
    git commit -m "feat: [Your Feature Name] Implemented X functionality"
    ```

* **Action:** **Push your feature branch to the remote repository often** (e.g., at the end of the day, after significant progress, or before taking a break). This backs up your work and makes it visible for teammates (and review).
    ```bash
    git push origin feature/your-task-name-here
    ```
    *(**Note:** The first time you push a new branch, Git might tell you to use `--set-upstream origin feature/your-task-name-here`. Copy and paste that exact command.)*

#### **Step 4: Merging**
When done with your tasks, make sure you have pushed your branch. Let Emma know when this is done, and she will open a pull request and merge your branch into main. She will let you know if you ever need to pull changes. If you need to pull changes, make sure to switch to main.
Do so by running these commands: 
* **Action:** Switch to the `main` branch.
    ```bash
    git checkout main
    ```
* **Action:** Pull the very latest changes from the remote `main` branch.
    ```bash
    git pull origin main
    ```

## Current Build Link
https://teal-haupia-3fbedf.netlify.app/