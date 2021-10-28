import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
function DayListItem(props) {
  const { name, spots, setDay , selected} = props;

  const dayClass = classNames("day-list__item" , {
    "day-list__item--selected" : selected,
    "day-list__item--full" : spots === 0,
  });

  function formatSpots (){
    let char;
    char = `${spots} spots`
    if (spots === 0) {
      char = "no spots";
    } if (spots === 1) {
      char = "1 spot";
    }
    return char;
  }

  return (
    <li className={dayClass} onClick={()=> setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}

export default DayListItem;