import React from "react";

import { render, cleanup, waitForElement, fireEvent , prettyDOM , getByText , getAllByTestId , getByAltText, getByPlaceholderText , debug, queryByText} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";


afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Matt")).toBeInTheDocument();
    });
  });
  //add appointment
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //checking if the name shown 
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
   
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  //delete appointment

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container} = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. get the first show section
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //click delete button
    fireEvent.click(getByAltText(appointment, "Delete"));
    //check have deleting 
    expect(getByText(appointment, "Delete The Appointment?")).toBeInTheDocument();
    //have spots remaining+1
    fireEvent.click(queryByText(appointment, "Confirm"));
    //
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
 

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    
  });

  //edit
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container} = render(<Application />);
   // 2. Wait until the text "Archie Cohen" is displayed.
   await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. get the Archie Cohen show section
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    //4 click edit button
    fireEvent.click(getByAltText(appointment, "Edit"));
    //shows name and interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Cohen" }
    });
    // click save button
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //check changes affected
    fireEvent.click(queryByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Cohen"));
   
    //check if spot is same
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });


  //error when saving
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container} = render(<Application />);
   await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Cohen" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(queryByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Could not Save appointment"));
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Lydia Cohen")).not.toBeInTheDocument();


  });
  //error when deleting
  it("shows the save error when failing to delete an appointment", async () => {

    axios.delete.mockRejectedValueOnce();
    const { container} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete The Appointment?")).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    await waitForElement(() => queryByText(appointment, "Could not delete appointment"));

    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });
});
