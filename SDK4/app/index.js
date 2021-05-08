import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Get a handle on the <text> element
const labelTimeShadow = document.getElementById("labelTimeShadow");
const time = document.getElementById("time");

let date = document.getElementById("date");

let quoteText = document.getElementById("quoteText");

// This is for rotating quote at bottom of screen
setTimeout(() => {
    quoteText.state = "enabled";
}, 2000);

var today = new Date();
/********************** Get Day number : Ref: https://www.epochconverter.com/daynumbers*********
01 Jan - 0th day  of year
02 Jan - 1st day of year
31 Dec - 364th day ( 365th day for Leap year)
************************************************************************************************/
var dayNumber = parseInt(Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000));
if (util.quotes[dayNumber-1][dayNumber]){
      quoteText.text = util.quotes[dayNumber-1][dayNumber];
  }
else { // Default quote if something goes wrong during app processing
  quoteText.text = util.quotes[366][367];
}

// update clock every minute
clock.granularity = "minutes";

// Update the <text> element for clock every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;

  let dayName = util.Day[today.getDay()]; // Mon, Tue
  let dayNumber = util.zeroPad(today.getDate()); //01, 02, 28, 30, 31
  let monthName = util.monthsSmall[today.getMonth()];
  
  let hours = today.getHours();
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());

  let timeString = `${hours}:${mins}`;
  let  dateString = `${dayName}, ${dayNumber} ${monthName}`; //Mon, 01 Jan
  
  time.text = timeString;
  labelTimeShadow.text = timeString; 
  date.text = dateString;
}
