//get appointment for day
export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(days => days.name === day);
  if (filteredDay.length !== 0) {
    return filteredDay[0]["appointments"].map(element => state["appointments"][element]);
  } else {
    return [];
  }
  
}

//getInterview
export function getInterview(state, interview) {

  return !interview ? 
            null :
            {student: interview.student, 
            interviewer: state.interviewers[interview.interviewer]};

}

//getInterviewerForDay
export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.filter(days => days.name === day);
  if (filteredDay.length !== 0) {
    return filteredDay[0]["interviewers"].map(element => state["interviewers"][element]);
  } else {
    return [];
  }
}