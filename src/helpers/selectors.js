export function getAppointmentsForDay(state, day) {

  const arrayDays = state.days.filter((item) => (item.name === day));
  const appointmentsArray = [];

  if (arrayDays.length) {
    const interviewArray = arrayDays[0].appointments;
    const object = state.appointments;
    for(const value of interviewArray ) {
      for(const key in object) {
        if(object[key].id === value) {
          appointmentsArray.push(object[key]);
        }
      }
    }
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {

  let interviewObj = null;
  if (interview) {
    interviewObj = {};
    const interviewerObj = state.interviewers;
    const interviewer = interview.interviewer;
    for(const key in interviewerObj) {
      if(interviewerObj[key].id === interviewer) {
        interviewObj["student"] = interview.student;
        interviewObj["interviewer"] = interviewerObj[key];
      }
    }
  }
  return interviewObj;
}