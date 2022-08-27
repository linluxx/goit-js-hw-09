import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');
const refs = {
  start: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let selectedDateMs = null;
refs.start.disabled = true;
///////////////////////////////////////////////////////////////////////////////
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDateMs = selectedDates[0].getTime();
    console.log(selectedDateMs);
    if (selectedDateMs < new Date()) {
      refs.start.disabled = true;
      Notiflix.Report.failure(
        'Date Failure',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      refs.start.disabled = false;
      refs.input.disabled = true;
      updateClockFace(convertMs(selectedDateMs - new Date().getTime()));
    }
  },
};
flatpickr('#datetime-picker', options);
////////////////////////////////////////////////////////////////////////////////

const timer = {
  intervalId: null,
  isActive: false,

  timerStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const deltaTime = selectedDateMs - new Date().getTime();
      console.log(deltaTime);
      const time = convertMs(deltaTime);
      console.log(time);
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        return;
      } else {
        updateClockFace(time);
      }
    }, 1000);
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.innerText = `${days}`;
  refs.hours.innerText = `${hours}`;
  refs.minutes.innerText = `${minutes}`;
  refs.seconds.innerText = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
refs.start.addEventListener('click', timer.timerStart);

document.body;

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const refs = {
//   start: document.querySelector('button[data-start]'),
//   input: document.querySelector('#datetime-picker'),
//   days: document.querySelector('span[data-days]'),
//   hours: document.querySelector('span[data-hours]'),
//   minutes: document.querySelector('span[data-minutes]'),
//   seconds: document.querySelector('span[data-seconds]'),
// };
// let selectedDateMs = null;
// refs.start.disabled = true;
// ///////////////////////////////////////////////////////////////////////////////
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   intervalId: null,
//   isActive: false,

//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     selectedDateMs = selectedDates[0].getTime();
//     console.log(selectedDateMs);
//     if (selectedDateMs < new Date()) {
//       refs.start.disabled = true;
//       Notiflix.Notify.failure('Please choose a date in the future');
//       return;
//     } else {
//       refs.start.disabled = false;
//       refs.input.disabled = true;
//     }
//     // const timer = convertMs(selectedDateMs - new Date().getTime());
//     // updateClockFace(timer);
//   },
//   timerStart() {
//     if (this.isActive) {
//       return;
//     }

//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       if (
//         refs.days.textContent === '00' &&
//         refs.hours.textContent === '00' &&
//         refs.minutes.textContent === '00' &&
//         refs.seconds.textContent === '00'
//       ) {
//         clearInterval(this.intervalId);
//         return;
//       }
//       const deltaTime = selectedDateMs - new Date().getTime();
//       console.log(deltaTime);
//       const time = convertMs(deltaTime);
//       updateClockFace(time);
//     }, 1000);
//   },
// };
// flatpickr('#datetime-picker', options);
// ////////////////////////////////////////////////////////////////////////////////

// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.innerText = `${days}`;
//   refs.hours.innerText = `${hours}`;
//   refs.minutes.innerText = `${minutes}`;
//   refs.seconds.innerText = `${seconds}`;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }
// refs.start.addEventListener('click', options.timerStart);
