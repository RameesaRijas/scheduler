import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment(props) {
  const { interview, time , interviewers} = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
        <article className="appointment">
          <Header time={time}/>


          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
          )}
          { mode === CREATE && (
          <Form interviewers={interviewers}
            onSave={() => console.log("Save")} onCancel={() => back()}/>
          )}
          
        </article>
  );
}

export default Appointment;

{/* <Form student="Rameesa" interviewer = {3} interviewers = {interviewers} onSave={action("onSave")} onCancel={action("onCancel")}/>) */}
  // .add("Create", () => <Form interviewers = {interviewers} onSave={action("onSave")} onCancel={action("onCancel")}/>)