// Selectors

const alarmInput = document.getElementById("alarm-time");
const setAlarmButton = document.getElementById("set-alarm-button");

// Event Listeners

setAlarmButton.addEventListener("click", setAlarm);

// Functions

function setAlarm(event) {
  event.preventDefault();
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

  const hoursInMilliseconds = 3600000 * hours;
  const minutesInMilliseconds = 60000 * minutes;
  const secondsInMilliseconds = 1000 * seconds;

  const totalTimeInMilliseconds =
    hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;

  const differenceInTime = alarmInputAsNumber - totalTimeInMilliseconds;

  const id = setTimeout(initializeAlarm, differenceInTime);
}

function initializeAlarm() {
  alert("The Alarm is going off");
}

function updateTime() {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = `${hours}:${minutes}:${seconds}`;

  document.querySelector("#time").innerText = time;
  setTimeout(updateTime, 1000);
}

updateTime();
