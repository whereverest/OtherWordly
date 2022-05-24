import { writable } from 'svelte/store';

const basicFontSize = writable(0);
const isDeviceIpad = writable(false);
const isPortraitMode = writable(true);
const isInGameMode = writable(false);

export {
  basicFontSize,
  isDeviceIpad,
  isPortraitMode,
  isInGameMode
}