import { writable } from 'svelte/store';


const difficultyLevel = writable('X');
const revealLettersLevel = writable('M');
const isBottomHeavyFont = writable(false);
const isReduceMotion = writable(true);
const isFingerTouches = writable(false);

const isMusic = writable(true);
const isSoundFx = writable(false);
const isHaptics = writable(false);

const isICloudSync = writable(true);
const isAnalytics = writable(false);



export {
  difficultyLevel,
  revealLettersLevel,
  isBottomHeavyFont,
  isReduceMotion,
  isFingerTouches,

  isMusic,
  isSoundFx,
  isHaptics,

  isICloudSync,
  isAnalytics
};