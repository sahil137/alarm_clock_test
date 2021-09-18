// Constants
const NumberOfMillisecondsInOneDay = 86400000;
const NumberOfMillisecondsInOneHour = 3600000;
const NumberOfMillisecondsInOneMinute = 60000;
const NumberOfMillisecondsInOneSecond = 1000;
// Selectors

const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm-button");
const alarmList = document.getElementById("alarm-list");
// Event Listeners

setAlarmButton.addEventListener("click", setAlarm);
alarmList.addEventListener("click", deleteAlarm);

// Variables
var timoutId = 0;
// Functions

function setAlarm(event) {
  // prevents default behaviour on submit i.e. prevents web page from reloading
  event.preventDefault();

  // Main functionality of set alarm
  let alarmInputAsNumber = alarmInput.valueAsNumber;
  console.log(alarmInputAsNumber);
  if (isNaN(alarmInputAsNumber)) {
    alert("Please Enter a valid time");
    return;
  }
  const currDate = new Date();

  const hours = currDate.getHours();
  const minutes = currDate.getMinutes();
  const seconds = currDate.getSeconds();

  // converting values into milliseconds
  const hoursInMilliseconds = NumberOfMillisecondsInOneHour * hours;
  const minutesInMilliseconds = NumberOfMillisecondsInOneMinute * minutes;
  const secondsInMilliseconds = NumberOfMillisecondsInOneSecond * seconds;

  const totalTimeInMilliseconds =
    hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;

  const differenceInTime = alarmInputAsNumber - totalTimeInMilliseconds;

  // diff is less than 0 it means the alarm will ring the next day
  if (differenceInTime <= 0) {
    const alarmTimeForNextDay =
      NumberOfMillisecondsInOneDay -
      alarmInputAsNumber +
      totalTimeInMilliseconds;
    timeOutId = setTimeout(ringAlarm, alarmTimeForNextDay);
  } else {
    timoutId = setTimeout(ringAlarm, differenceInTime);
  }

  // add alarm to alarm list
  addListItemToAlarmList();
}

function addListItemToAlarmList() {
  // create div
  const alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");

  // Create LI
  const newAlarm = document.createElement("li");
  let alarmTimeAsString = alarmInput.value;
  const nums = alarmTimeAsString.split(":");
  console.log(nums);
  let hrs = parseInt(nums[0]);
  let mins = parseInt(nums[1]);
  let secs = parseInt(nums[2]);

  if (hrs > 12) {
    hrs -= 12;
  }
  if (hrs == 0) {
    hrs = 12;
  }

  let amOrpm = hrs < 12 ? "AM" : "PM";

  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  newAlarm.innerText = `${hrs} : ${mins} : ${secs} ${amOrpm}`;
  newAlarm.classList.add("alarm-item");
  // append li to alarm div
  alarmDiv.appendChild(newAlarm);

  // add Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  // append delete button to alarm div
  alarmDiv.appendChild(deleteButton);

  // append alarm div to the list
  alarmList.appendChild(alarmDiv);
}

function ringAlarm() {
  alert("The Alarm is going off");
}

// removes alarm from list and removes the timeout
function deleteAlarm(event) {
  console.log(event.target);
  const item = event.target;
  if (item.classList[0] === "delete-button") {
    const alarm = item.parentElement;
    // add animation
    alarm.classList.add("drop");
    // will execute function when transition ends
    alarm.addEventListener("transitionend", () => {
      alarm.remove();
    });
  }
  clearTimeout(timoutId);
}

// function which runs the clock
function updateTime() {
  let date = new Date();

  let hours = date.getHours();
  if (hours > 12) {
    hours -= 12;
  }
  if (hours == 0) {
    hours = 12;
  }
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let ampm = date.getHours() < 12 ? "AM" : "PM";

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = `${hours} : ${minutes} : ${seconds} ${ampm}`;

  document.querySelector("#time").innerText = time;
  setTimeout(updateTime, 1000);
}

updateTime();
