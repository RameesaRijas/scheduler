import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {

  const fakeData = [
  {
    id: 7,
    time: "1pm",
    interview: {
      student: "Jamal Jordan",
      interviewer: {
        id: 4, 
        name:"BoB",
        avatar: "https://i.imgur.com/FK8V841.jpg" }
    },
    interviewers: [
      { 
        id: 1, 
        name:"Alice",
        avatar: "https://i.imgur.com/LpaY82x.png" }
      
    ],

    bookInterview : null,
    cancelInterview :null
  }];

  it("renders without crashing",  () => {
    render(<Appointment {...fakeData}/>)
  });


})
