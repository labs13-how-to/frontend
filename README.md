***Must create .env file inside of client folder and include environment variables provided below***

# Review It Yourself (formerly How To)

1️⃣ You can find the deployed project at [https://how-tutor.netlify.com/](https://how-tutor.netlify.com/).

## 4️⃣ Contributors


|                                       [Patrick Steveson](https://github.com/Mrsteveson)                                        |                                       [Matt Poloni](https://github.com/matt-poloni)                                        |                                       [Austin James](https://github.com/AJLambda)                                        |                                       [Nick Stricker](https://github.com/NickStrick)                                        |                                       [Meera Anderson](https://github.com/meera-andersen)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://avatars3.githubusercontent.com/u/46543946?s=460&v=4" width = "200" />](https://github.com/Mrsteveson)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/matt-poloni)                       |                      [<img src="https://avatars1.githubusercontent.com/u/47574824?s=460&v=4" width = "200" />](https://github.com/AJLambda)                       |                      [<img src="https://avatars3.githubusercontent.com/u/43568886?s=460&v=4" width = "200" />](https://github.com/NickStrick)                       |                      [<img src="https://avatars1.githubusercontent.com/u/38503526?s=460&v=4" width = "200" />](https://github.com/meera-andersen)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mrsteveson)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/matt-poloni)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/AJLambda)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NickStrick)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/meera-andersen)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/patricktsteveson/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/austin-james27/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/meera-andersen-6a57a0178) |

<br> 
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
![Netlify Status](https://api.netlify.com/api/v1/badges/b5c4db1c-b10d-42c3-b157-3746edd9e81d/deploy-status)](https://how-tutor.netlify.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

1️⃣ [Trello Board](https://trello.com/b/vZ0hvT9Q/labs-13-how-to)

1️⃣ [Product Canvas](https://docs.google.com/document/d/15nZaRpPzZzk1_5YSAk8HZCX6QhrLdlSqTy4NZZlJHSU/edit?usp=sharing)

1️⃣ [UX Design files](https://invis.io/P4S6N4XWEC7), [UX Whimsical](https://whimsical.com/YUtnHkNyd6fEnYrJ6oyMLi)

This web app will target people who want to get up and get productive and learn different skills to do projects themselves.  There will be a rating system on which one is better. This will lead to the tutorials that are accurate and precise to be on top. 

How To aims to provide a central location for anyone looking to find reliable, highly-rated projects reviewed and tested by users like them. Users can find and become apart of a community that has similar passions to their own, where they can read, follow, and post about projects they are interested in.


### 4️⃣ Key Features

-    Ability to register an account and login
-    Ability to create/view/edit/delete posts
-    Ability to add steps on posts and delete them
-    Ability to upload images for those posts
-    Ability to leave reviews
-    Ability to embed a YouTube video
-    Ability to search
-    Ability to view account info and user specific posts
-    Ability to add categories to posts

## 1️⃣ Tech Stack

### Front end built using:

#### React.js

-    Easy to use and flexible to suit our needs
-    Team is most familiar with it
-    Reusable components greatly increase efficiency
-    Fast rendering with virtual DOM

#### Redux

-    Total separation of data and presentation
-    Stops cluttered passing down of props
-    State management and organization

#### Bootstrap

-    Saves time and is easy to use
-    Consistency in styling
-    Easy customization


#### Front end deployed to `Netlify`.

#### [Back end](https://github.com/labs13-how-to/backend) built using:

#### Node.js and Express

-    It is more dynamic and easier to read than other frameworks.
-    Express gives us route support.
-    Node.js is known for offering high performance, and the freedom to develop without restrictions.
-    Express offers lightweight middleware support for routes.

#### Postgres

-    Works better with our deployment sites
-    Large scale, can hold lots of data 

#### Cloudinary

-    Manages our images and videos
-    Large scale, can hold lots of data 


# APIs

## Passport.js

Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

## 2️⃣ Payment API here

## Stripe

Future releases are intending to implement stripe for any new features that require payment.

## Cloudinary

A cloud-based image and video management solution. It enables users to upload, store, manage, manipulate and deliver images and video for websites and apps.

# 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

- REACT_APP_BE_URL=http://localhost:5000
- REACT_APP_FE_ROOT=http://localhost:3000


# 4️⃣ Testing

Internal QA, we utilized manual testing as a form of quality control in order to prompt quick reaction times to bug fixes and necessary on the fly adjustments under our strict time constraints.

# 4️⃣ Installation Instructions

In order to properly install this project, a user must either use yarn or npm. To install using yarn, simply enter the command yarn install in your terminal and allow the necessary dependencies to be installed. Upon a successful installation, then input the command yarn start to prompt your react-app to load into your browser. For additional information on how to do this process using NPM please see the README.md file within our client folder for a full list of instructions.

## Other Scripts

* typecheck - runs the TypeScript compiler
* build - creates a build of the application
* start - starts the production server after a build is created
* test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/labs13-how-to/backend/blob/master/README.md) for details on the backend of our project.
