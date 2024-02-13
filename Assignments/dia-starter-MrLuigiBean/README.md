[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/9GW6JC5p)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13320991)
# WEEK01: Starter

Welcome :wave: to the repository for the first class in DIA (Developing Immersive Applications).
For the 2024 cohort, the module you are taking is named "Introduction to VR".

If you see this, it means that you have successfully joined the GitHub classroom for this module, as well as joined the sit-dia GitHub organization. Congratulations! :tada:

## The GitHub classroom
The GitHub classroom will be primarily used for us to monitor, and provide feedback on, the progress of your team project. We may also use it for your _Individual Programming Assessment_.

## The sit-dia GitHub organization 
This will house all your development repositories related to this module.

### Discussion Board
Importantly, it also provides a discussion board, easily integrated in your repositories, that we will use for all of our communication on this module.

Every week, there will be an announcement post on the discussion board. This will give you an idea of what our learning objectives are and generally what is happening for the week, including where the learning materials can be found.

For this week, here's the post: 
https://github.com/orgs/sit-dia/discussions/1

Now if you're new to GitHub, or have not used it extensively yet, you may want to read the following section carefully. Otherwise you can skip to the [Tasks to complete](#tasks-to-complete-in-this-lab)

## Introduction to GitHub

**So why are we using GitHub?**
GitHub is a tool that allows us to collaborate on code. It is a tool that is used by many software engineers and is a great tool to learn. It is also a great tool to use for our class because it allows us to easily share code and collaborate on code.

To complete the tasks you will need to know your way around GitHub. You can learn about the basics of GitHub [here](github-fundamentals.md). Note that collaborative workflows with GitHub may be crucial for this module as you will work in large teams.

Once you're comfortable to get your hands dirty on **completing the tasks**, you can continue below.

# Tasks to complete in this lab

## An identifiable GitHub profile

Make sure your GitHub profile contains your full name. This is important for us to be able to identify you in assessments, discussions, etc.

## Clone repository

Make sure you can successfully clone this repository to your computer locally.

If you choose to use the GitHub codespace cloud IDE, theoretically you don't need to clone the repository, but for this exercise, you should still clone the repository to your computer locally. It is important to be able to know how to work on your project independent of cloud resources.

## Writing markdown

In your team project, you will have to write a lot of documentation. We will use markdown for this. Markdown is a lightweight markup language that is easy to learn. It is also the language that is used to write this README file, issue descriptions, discussion posts, wiki, etc.

Create a new markdown file in this repository. Name it `about-me.md`. In this file, write a short paragraph about yourself. You can write about your hobbies, interests, or anything else you want to share. Also let us know what you hope to get out of this module.
- have at least two headings with different subheadings
- include at least an image in there
- You can learn about markdown [here](https://guides.github.com/features/mastering-markdown/).

## Writing code

Much of the module's implementation examples and assessment will be done through Typescript. In case you have not used it before, we should certainly go through the rite of passage Hello World assignment!

Your tasks is simple, write code that makes the test cases pass. You should already be familiar with this TDD style of programming in other modules :).

In particular, you need to print the "Hello, immersive world!" message in the browser console. You should write it in Typescript as we will be using Typescript for the rest of the module. Copilot suggested (whilst I was typing this readme in my dev environment) [this website](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html) for an ultra quick primer to typescript for those of you who have some C# experience, but certainly do your own research as necessary.

Since this is the "immersive" version of Hello World, the tests will also check whether the web page rendered in the browser is actually an immersive 3D XR-ready scene. We are using BabylonJS as the graphics/XR library to do this.

Feel free to use ChatGPT, copilot, and the likes of course, as this is not a module focused on programming fundamentals. In terms of coding, you mainly need to demonstrate the ability to translate your design into algorithms, and algorithms into code.

Some notes on what you need to do;
- you will need to install Node: https://nodejs.org , you you don't have it already
- you may need to modify existing files to make the test file work
- you may also need to create a new file named in a way the test file can find it
- you need to git add, commit, and push the file to the repository in order for the test files to be triggered by GitHub actions
- also make sure you know how to view the file and commit history on GitHub

## Testing

Goes without saying that testing is important. We will use the GitHub actions CI system to run test files that will check whether your code prints the right message in the browser console. The test files are already provided in the repository. You do not need to modify it. This is mainly as an example of how you may implement your own automated tests.

Read the test files to understand what they are doing. Again feel free to use AI tools as necessary.

The test files will be automatically triggered on each commit but you should make sure you know how to run the test file in your local programming environment.

As much as possible, _perform all development steps on the command line_. This will help form important associations with the underlying tools that are used in the background behind the GUI.

If you have not done this before, the two essential command line commands to know are:
- `npm install` to install all the dependencies
- `npm test` to run the test file

## Submitting the assignment

There is **no submit button** for these assignments. Instead, submissions are actually **just a commit to the repository**. To submit this assignment, you need to add, commit, and push your changes to the repository. You can do this in the GitHub codespace or on your own machine.
- once your changes are pushed to the repository, the tests will automatically run
- you can check the status of the test file by going to the "Actions" tab and clicking on the latest workflow run
- you can determine whether the test passed or failed by looking at the green tick or red cross on the commit hash

