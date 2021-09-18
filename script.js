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

  let id;
  // diff is less than 0 it means the alarm will ring the next day
  if (differenceInTime <= 0) {
    const alarmTimeForNextDay =
      NumberOfMillisecondsInOneDay -
      alarmInputAsNumber +
      totalTimeInMilliseconds;
    id = setTimeout(initializeAlarm, alarmTimeForNextDay);
  } else {
    id = setTimeout(initializeAlarm, differenceInTime);
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

  newAlarm.innerText = "Random";
  newAlarm.classList.add("alarm-item");
  // append li to alarm div
  alarmDiv.appendChild(newAlarm);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  // append delete button to alarm div
  alarmDiv.appendChild(deleteButton);

  // append alarm div to the list
  alarmList.appendChild(alarmDiv);
}

function initializeAlarm() {
  alert("The Alarm is going off");
}

function updateTime() {
  let date = new Date();

  let hours = date.getHours() - 12;
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
