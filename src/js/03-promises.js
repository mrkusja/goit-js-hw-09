import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitFormHandler);

function onSubmitFormHandler(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let currentDalay = Number(delay.value);
  let currentStep = Number(step.value);
  let currentAmount = Number(amount.value);
  console.log(
    `Delay: ${delay.value}, Step: ${step.value}, Amount ${amount.value}`
  );
  // event.currentTarget.reset();
  for (let position = 1; position <= currentAmount; position += 1) {
    const logSuccess = ([position, time]) => {
      // console.log(`✅ Fulfilled promise ${position} in ${time}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${time}ms`);
    };

    const logError = ([position, time]) => {
      // console.log(`❌ Rejected promise ${position} in ${time}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${time}ms`);
    };

    function createPromise(el) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve([el.position, el.delay]);
          } else {
            reject([el.position, el.delay]);
          }
        }, el.delay);
        currentDalay += currentStep;
        console.log(currentDalay);
      });
    }
    createPromise({ position: position, delay: currentDalay })
      .then(logSuccess)
      .catch(logError);
  }
}
