# Degree Map
> A scheduling application designed to reduce the complexity of creating a degree plan at Georgia Tech.
## License & Copyright Notice
This project loosely follows the design language of [GT Scheduler](https://github.com/64json/gt-scheduler) project maintained by Jinseo Park and Bits of Good. 
### Original Work
Copyright (c) 2022 Abhiram Ghanta (abhiramg2021@gmail.com)
## Overview
 - The app is a React application (built using [create-react-app](https://github.com/facebook/create-react-app) ) that is written in Javascript, and uses [SCSS](https://sass-lang.com/) (a preprocessor for CSS that supports advanced features) for styling. 
 - The app uses a state management library called [React Redux](https://react-redux.js.org) that enables global state management in the app.
 - The app uses [GT Scheduler's Crawler](https://github.com/gt-scheduler/crawler) to form the basis for the course directory in the application. This information and any changes made to your degree map are saved in **cookies**.
 - The app was designed using [Figma](http://figma.com) and drafts of the application can be viewed [here](https://github.com/abhiramg2021/degree-map/tree/master/references).
## Running the App Locally
### Required Software
[Node.js](https://nodejs.org/en/) \
[npm](https://www.npmjs.com) - node package manager


### Running the application
After cloning the repository to your computer, run the following commands in the repo's folder.

```
npm install
```
This installs all the dependancies for the project and stores them in a folder called `node_modules`. You only need to do this process once. 

```
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Bucket List 
There are several features that I wish to add this application, but have not have the time to do so. 

- Degree Component - Originally there was going to be another component in the application that showed the user how the courses they were taking fit into their degree requirements. I was going to scrape the table from a website like this and use SCSS to restyle the table to match the design of the rest of the application.

 - Transfer Credits - I wanted to create an import button that allowed users to upload the [Class History](https://github.com/abhiramg2021/degree-map/blob/master/references/Class%20History.pdf) pdf found in [Ellucian DegreeWorks](https://degreeaudit.gatech.edu/DashboardServlet/) to speed up the process of old classes to the degree map. 

 - Mobile Usage - I need to change the app's use of `:hover` actions to create a better user experience on mobile. 
  
