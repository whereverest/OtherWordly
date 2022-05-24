import { writable } from 'svelte/store';

// From where to start the app: 'chapter','level','challenge' or 'settings' page
const startPage = writable('chapter');

// this variable is needed because svelte-spa-router doesn't provide list of visited pages
// so because of that we can't return back from settings page when we open it as first page
const previousPage = writable('');

export {
  startPage,
  previousPage
}