import { writable } from 'svelte/store';

const transitionFrom = writable('');
const transitionTo = writable('');


export {
  transitionFrom,
  transitionTo
};