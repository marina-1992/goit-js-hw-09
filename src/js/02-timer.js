import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');


const TIMER_DELAY = 1000;

let intervalId = null;



startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);


dateTimePicker.addEventListener('click', () => {
    dateTime;
});

function onStartBtn() {
  const selectDate = new Date(dateTimePicker.value).getTime();
  const currentDate = Date.now();
  const timer = selectDate - currentDate;
  startTimer(timer);
};

function startTimer(duration) {
 startBtn.disabled = true;
 dateTimePicker.disabled = true;
  intervalId = setInterval(() => {

      const time = convertMs(duration);

      daysRef.textContent = addLeadingZero(time.days);
      hoursRef.textContent = addLeadingZero(time.hours);
      minutesRef.textContent = addLeadingZero(time.minutes);
      secondsRef.textContent = addLeadingZero(time.seconds);
    
    if (duration <= 0) {
      clearInterval(intervalId);
       dateTimePicker.disabled = false;
         daysRef.textContent = "00";
         hoursRef.textContent = "00";
         minutesRef.textContent = "00";
         secondsRef.textContent = "00";
    };
    duration -= TIMER_DELAY;
  }, TIMER_DELAY)
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}; 

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
  
};

const dateTime = flatpickr('#datetime-picker', {
  enableTime: true, 
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
       Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notify.success('Lets go?');
      startBtn.disabled = false;
    } 
  },
});