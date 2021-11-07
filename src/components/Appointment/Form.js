import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

function Form(props) {
  const { interviewers , onCancel, onSave } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer|| null);
  const [error, setError] = useState({
    studentNameField : "",
    InterviewerField: ""
  });
 

  function reset() {
    setStudent("");
    setInterviewer("");
    setError({studentNameField:"",
      InterviewerField:""});
  }

  function cancel() {
    reset();
    onCancel();
  }

  function validate() {
    if (student.trim() === "" && interviewer === null) {
      setError({ 
        studentNameField:"Student name cannot be blank",
        InterviewerField:"Please Select Interviewer"})
        return;
    }
    if (interviewer === null) {
        setError({
           InterviewerField:"Please Select Interviewer"});
        return;
    }
    if (student.trim() === "") {
      setError({
        studentNameField:"Student name cannot be blank"});
      return;
    }
    setError({
      studentNameField:"",
      InterviewerField:""});
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error.studentNameField}</section>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
        <section className="appointment__validation">{error.InterviewerField}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;