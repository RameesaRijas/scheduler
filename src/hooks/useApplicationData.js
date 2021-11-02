import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducer/Application";


const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = day => dispatch({ type: SET_DAY, day });

  //datafetching
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      })
    )
  }, []);

  //Websocket

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8001");

    webSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (typeof data === "object" && data.type === SET_INTERVIEW) {
        dispatch(data);
      }
    }
    return (() => webSocket.close());
  }, [dispatch]);
///
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        dispatch({type:SET_INTERVIEW, id, interview});
      })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type:SET_INTERVIEW, id, interview :null});
    }) 
  }
  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;