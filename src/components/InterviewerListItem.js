import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


function InterviewerListItem (props) {
  const { name, avatar, setInterviewer, selected } = props;
  
  const imgClass = classNames ("interviewers__item", {
    "interviewers__item--selected":selected,
  });

  return (
    <li className={imgClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && 
        name
      }
    </li>
  );
}

export default InterviewerListItem;