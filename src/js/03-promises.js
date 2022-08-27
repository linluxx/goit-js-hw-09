const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
};
let promisePosition = 0;
formData = {};

refs.form.addEventListener('submit', createPromise);
refs.form.addEventListener('input', onFormInput);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(console.log(result));
      // Fulfill
    } else {
      reject(console.log(er));
      // Reject
    }
  });
}

createPromise(3, 2000)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
