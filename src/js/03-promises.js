import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  // amount: document.querySelector('input[name="amount"]'),
  // step: document.querySelector('input[name="step"]'),
  // delayInput: document.querySelector('input[name="delay"]'),
};
refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target.elements;
  let delayValue = +delay.value;

  for (let i = 1; i <= +amount.value; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += +step.value;
  }
  evt.currentTarget.reset();
}
