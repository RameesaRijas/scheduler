import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

function Appointment(props) {
  const { id, interview, time , interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));
  }

  const deleteInterview = (event) => {
    transition(DELETING, true);
    cancelInterview(id)
     .then(() => transition(EMPTY))
     .catch(err => transition(ERROR_DELETE, true));
  }
//side effects
  useEffect(() => {
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [interview, transition, mode]);

  return (
        <article className="appointment">
          <Header time={time}/>
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && interview && (
            <Show
              student={interview.student}
              interviewer={interview.interviewer}
              onDelete={() => transition(CONFIRM)}
              onEdit={() => transition(EDIT)}
            />
          )}
          { mode === CREATE && (
          <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>
          )}

          {mode === SAVING && (
            <Status message="Saving"/>
          )}

          {mode === DELETING && (
            <Status message="Deleting"/>
          )} 

          {mode === CONFIRM && (
            <Confirm message="Delete The Appointment?"
            onConfirm={deleteInterview} onCancel={()=>back()} />
          )}
         {mode === EDIT && (
           <Form student={interview.student}
           interviewer = {interview.interviewer.id}
           interviewers = {interviewers}
           onSave={save} onCancel={()=>back()}/>
         )}

         {mode === ERROR_DELETE && (
           <Error message="Could not delete appointment" onClose={() => back()}/>
         )}

          {mode === ERROR_SAVE && (
           <Error message="Could not Save appointment" onClose={() => back()}/>
         )} 
          
        </article>
  );
}

export default Appointment;
