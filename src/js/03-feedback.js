// ----------------------------servis--------------------------------------
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
// ---------------------------------------------------------------------------------------
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let emailInput = form.elements.email;
let messageInput = form.elements.message;
// console.log(emailInput);
// // ----------------------------------------------------------------
const FORM_KEY = 'feedback-form-state';
// // --------------------------------------------------------------------------

let parseInfo = load(FORM_KEY);
console.log('parseInfo', parseInfo);
function auditInfo() {
  if (parseInfo) {
    emailInput.value = load(FORM_KEY).email ?? '';
    messageInput.value = load(FORM_KEY).message ?? '';

    //   messageInput.value =JSON.parse(localStorage.getItem(FORM_KEY)).message ?? '';
    //   emailInput.value = JSON.parse(localStorage.getItem(FORM_KEY)).email ?? '';
    console.log('localeStorage__is__full');
  } else {
    console.log('LS_is_empty');
  }
}
auditInfo();
// -------------------------------------------------------------------
form.addEventListener('input', handleInput);
function handleInput(event) {
  event.preventDefault();
  const formInfo = {
    email: emailInput.value,
    message: messageInput.value,
  };
  save(FORM_KEY, formInfo);
  console.log('formInfo', formInfo);

  auditInfo();
}
// ------------------------------------------------------------------------

// // -----------------------------------------------------------------------
form.addEventListener('submit', evt => {
  evt.preventDefault();
  let parseInfo = load(FORM_KEY);
  if (parseInfo) {
    console.log('console', parseInfo);

    localStorage.removeItem(FORM_KEY), form.reset();
  }
});
const throttledSaveFormInfo = throttle(handleInput, 500);
form.addEventListener('input', throttledSaveFormInfo);
