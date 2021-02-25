const calcDaysFromCreated = created => {

  let today = new Date();
  let posted = new Date(created);
  let diff = today.getTime() - posted.getTime();
  let miliSecsInDay = 1000 * 60 * 60 * 24;
  let days = Math.round(diff / miliSecsInDay); 
 
  return days;

} 

module.exports = {
calcDaysFromCreated
};


