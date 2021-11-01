import React , { useEffect, useState } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application() {

  //states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersOfDay = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  //datafetching
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers :all[2].data}));
    })
  }, [])

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({...state, appointments});
      })
  }

  const cancelInterview = (id) => {

  return axios.delete(`/api/appointments/${id}`)
      .then(res => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
  })
    
  }

  const appointmentsData = dailyAppointments.map(item => {
    const interview = getInterview(state, item.interview);
    return ( <Appointment  
    key={item.id} 
    {...item} interview={interview} interviewers={interviewersOfDay} bookInterview={bookInterview} cancelInterview={cancelInterview}/>)
  });
  

  

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
