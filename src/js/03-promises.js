import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  amount: document.querySelector('input[name="amount"]'),
  step: document.querySelector('input[name="step"]'),
  delayInput: document.querySelector('input[name="delay"]'),
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
  let amountValue = +refs.amount.value;
  let delayValue = +refs.delayInput.value;
  let stepValue = +refs.step.value;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayValue += stepValue;
  }
}
