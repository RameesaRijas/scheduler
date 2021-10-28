import React , { useEffect, useState } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application() {

  //states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay({...state}, state.day)

  const setDay = day => setState({ ...state, day });
  
  //datafetching
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all);
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data}));
    })
  }, [])


  const appointmentsData = dailyAppointments.map(item => <Appointment  key = {item.id} 
    {...item} />);
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointmentsData}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
