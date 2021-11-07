# Interview Scheduler
A React application that allows the users to add, edit and delete interview appointments across Monday to Friday.

API end point - [scheduler-api](https://github.com/RameesaRijas/scheduler-api) - Go through scheduler-api README for setup

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```
## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- classNames
- sass

## Techs Used

- Jest
- StoryBook
- Cypress
- circleCi - Pipeline
- Heroku - Deploment Api Server
- Netlify - Deployment

## How Works
- Can book appointment
  - Select Time slot Enter Student Name Select available Interviewers click Save.

- Can Edit Appointment
  - Click Edit button on interview      card for editing an existing interview

- Can Cancel Interview
  - Click Delete button- pop up a confirmation box - when clicks confirm will delete the interview


- Used WebSocket for realtime changes

- Deployed On netlify - https://romantic-wescoff-8bec82.netlify.app



## ScreenShots
!["Home screenshot, Listed Interviews, Days, Remaining spots in that perticular day"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Home.png)

!["Create New Appointment, input field for typing student name, Interviewer List to Select"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Create.png)

!["When hover Edit & Delete Button"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Edit%26Delete.png)

!["Validation When Creating and editing Appointment"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Validation.png)

!["When Saving User Friendly status loader"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Saving.png)

!["When Click Delete confirmation box"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Delete.png)

!["Click Confirm status loader with message Deleting"](https://raw.githubusercontent.com/RameesaRijas/scheduler/master/docs/Deleting.png)