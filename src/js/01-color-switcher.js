const COLOR_DELAY = 1000;
let timerInterval = null;
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body')
}

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

function onClickStart() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timerInterval = setInterval(() => {
    refs.body.style.background = getRandomHexColor()
  }, COLOR_DELAY);
};
function onClickStop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timerInterval);
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
