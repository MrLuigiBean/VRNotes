[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/mAhT2ygU)
# Individual Programming Assessment

This assignment allows us to get familiar with implementing interactions in a WebXR-based application primarily using BabylonJS.

Your goal is to continue to build up more working experience using the BabylonJS framework. In particular, we will use differentiate code constructs (behaviours, actions and observables) to implement interactions on objects in a WebXR scene.

As with previous assignments, this should be a fairly straightforward exercise to complete as long as you read the test cases in detail. Do continue to make effort to understand every line of code and pick up any missing knowledge (e.g., observer design pattern) as necessary.
Also, one last reminder that no matter what tech stack you choose in your Team Project, the Individual Programming Assessment still expects you to have a working knowledge in TypeScript, BabylonJS to create a WebXR app.

# Tasks to complete in this test

We will similarly follow the spirit of TDD (Test-Driven Development) in this test. The tests are already written for you, and you will need to write the code to make the tests pass.

The tasks are as follows.

First, create a **basic scene** with:
1. A textured skybox.
2. A large textured ground plane.
3. A hemispheric light source.
4. A point light source to illuminate the center of the ground.
5. A camera that represents the user.

Next let's **populate the virtual environment** with:

6. A cylinder object.
7. A button object implemented with a plane.
8. A custom dragon object implemented with the dragon.glb mesh, since it is the year of the dragon :) . (courtesy of the [Georgia Tech Dragon asset](https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb)

Finally, let's **implement interactions** with the objects:

9. Able to grab the cylinder object and move it around.
10. Able to use the cylinder object to press the button object in order to turn off the spotlight.
11. Able to use the cylinder object to tap the dragon object to change its color.

The final scene should look something like below:

![](/public/images/ipa.gif)

## Testing and Submission

For testing, perform the usual:
- `npm install` to install all the dependencies
- `npm test` to run the test files

For submission, it is similarly just a matter of committing (and pushing) your changes.
- if GitHub Classroom Bot is behaving today, the tests will be run automatically when you submit your solution.
- else you can simply perform the tests locally to check your implementations as usual.

_If the automated GitHub Classroom tests fail to trigger, it will not affect your grade. We will clone and run offline tests to mark your last commit before the deadline._

The test cases are designed to test your implementation in a variety of ways. You should not assume that the tests are exhaustive, but you should assume that they are representative of the kinds of tests that will be used to grade your work. In other words, there will be more test cases in our grading process.

Implementation of Test Cases:
1. (Done) A textured skybox.
2. (Done) A large textured ground plane.
3. (Done) A hemispheric light source.
4. (Done) A point light source to illuminate the center of the ground.
5. (Done) A camera that represents the user.

6. (Done) A cylinder object.
7. (Done) A button object implemented with a plane.
8. (Partial, mesh appears but test doesn't pass) A custom dragon object implemented with the dragon.glb mesh, since it is the year of the dragon :) . (courtesy of the [Georgia Tech Dragon asset](https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb)

9. (Done) Able to grab the cylinder object and move it around.
10. (Not implemented) Able to use the cylinder object to press the button object in order to turn off the spotlight.
11. (Not implemented) Able to use the cylinder object to tap the dragon object to change its color.
