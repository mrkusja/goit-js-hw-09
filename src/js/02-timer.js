import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  amoutOfDays: document.querySelector('[data-days]'),
  amoutOfHours: document.querySelector('[data-hours]'),
  amoutOfMinutes: document.querySelector('[data-minutes]'),
  amoutOfSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);

let startDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    startDate = selectedDates[0];

    if (startDate > currentDate) {
      refs.startBtn.removeAttribute('disabled', true);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  const timerId = setInterval(() => {
    const actualDate = Date.now();
    const timerDate = startDate - actualDate;
    const convertTimerDate = convertMs(timerDate);
    console.log(convertTimerDate);
    // console.log(typeof(convertTimerDate.days))
    if (
      convertTimerDate.days === '00' &&
      convertTimerDate.hours === '00' &&
      convertTimerDate.minutes === '00' &&
      convertTimerDate.seconds === '00'
    ) {
      clearInterval(timerId);
    }
    updateTimerDate(convertTimerDate);
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDate({ days, hours, minutes, seconds }) {
  refs.amoutOfDays.textContent = days;
  refs.amoutOfHours.textContent = hours;
  refs.amoutOfMinutes.textContent = minutes;
  refs.amoutOfSeconds.textContent = seconds;
}
