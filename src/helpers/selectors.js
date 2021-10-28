export function getAppointmentsForDay(state, day) {

  const arrayDays = state.days.filter((item) => (item.name === day));
  const returnAray = [];

  if (arrayDays.length) {
    const appointmentsArray = arrayDays[0].appointments;
    const obj = state.appointments;
    for(const val of appointmentsArray ) {
      for(const hel in obj) {
        if(obj[hel].id === val) {
          returnAray.push(obj[hel]);
        }
      }
    }
  }
  return returnAray;
}