import { writable } from 'svelte/store';

const starsEarned = writable(0);

export {
  starsEarned
};