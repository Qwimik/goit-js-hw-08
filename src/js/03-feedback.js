import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY))
  ? JSON.parse(localStorage.getItem(STORAGE_KEY))
  : {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('[name="email"]');
const textarea = document.querySelector('[name="message"]');

savedInputs();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value == '' && textarea.value == '') {
    return Notify.failure('Please fill out all fields!');
  }
  if (input.value.trim() == '' || textarea.value.trim() == '') {
    return Notify.warning('Please fill out ALL fields!!!');
  }
  Notify.success('Thank you! All is well :)');
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
});

form.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedInputs() {
  if (formData.email) {
    input.value = formData.email;
  }
  if (formData.message) {
    textarea.value = formData.message;
  }
}
