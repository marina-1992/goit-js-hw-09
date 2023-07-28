import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', formClick => {
  formClick.preventDefault();
  const { delay, step, amount } = formClick.target.elements;

  const dataForm = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };

  for (let i = 0; i < dataForm.amount; i += 1) {
    const delayValue = dataForm.delay + i * dataForm.step;
  
    createPromise(i + 1, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
 
