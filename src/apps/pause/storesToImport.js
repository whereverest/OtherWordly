import {
  starsEarned
} from '@stores/userInfo';

import { isErrorsOverlayVisible, errorsList, dispatchError } from '@stores/errors.js';

// options.js
import {
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
} from '@stores/options.js';

// stats.js
import {
  currentLevel,
  currentChapter,
  yourSidekick,
  timeElapsed,
  wordsMatched,
  multiHitCombos,
  minesShattered,
  blocksRemoved,
  wormHolesCreated
} from '@stores/stats.js';

// miscellaneous.js
import { isInGameMode } from '@stores/miscellaneous.js';

// chapters.js
import {
  chaptersList
} from '@stores-m/chapters.js'



const stores = {
  // userInfo.js
  starsEarned,

  // options.js
  difficultyLevel,
  revealLettersLevel,
  isBottomHeavyFont,
  isReduceMotion,
  isFingerTouches,

  isMusic,
  isSoundFx,
  isHaptics,

  isICloudSync,
  isAnalytics,

  // stats.js
  currentLevel,
  currentChapter,
  yourSidekick,
  timeElapsed,
  wordsMatched,
  multiHitCombos,
  minesShattered,
  blocksRemoved,
  wormHolesCreated,

  // miscellaneous.js
  isInGameMode,

  // chapters.js
  chaptersList
};


export default stores;