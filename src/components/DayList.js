import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, value, onChange }  = props;
  const parsedDay = days.map(dayItem => {
    return <DayListItem 
    key = {dayItem.id} 
    name = {dayItem.name}
    spots = {dayItem.spots}
    selected = {dayItem.name === value}
    setDay={onChange} />
  });
  return (
    <ul>
      {parsedDay}
    </ul>
  );
}
export default DayList;