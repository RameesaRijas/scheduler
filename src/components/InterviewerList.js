import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const InterviwersList = interviewers.map(item =>    <InterviewerListItem  
    key={item.id}
    name={item.name}
    avatar={item.avatar}
    selected={item.id === value} 
    setInterviewer={() => onChange(item.id)}/>);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviwersList}
      </ul>
    </section>
  )
}
export default InterviewerList;