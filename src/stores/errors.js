import { writable } from 'svelte/store';

const isErrorsOverlayVisible = writable(false);
const errorsList = writable([]);

function dispatchError(errorTitle, errorContent, isImportant) {
  isErrorsOverlayVisible.update(() => true);
  errorsList.update(currentValue => [...currentValue, { title:errorTitle, content:errorContent, isImportant } ]);
}


export {
  isErrorsOverlayVisible,
  errorsList,
  dispatchError
}