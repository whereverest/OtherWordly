import {
  chaptersList,
  selectAMissionTitle,
  selectedChapterId,
  chapterPageState
} from '@stores-m/chapters.js'

import {
  currentChallengeTimer,
  challengeMode,
  hexagonState0Title,
  hexagonState1Title,
  hexagonState2Title,
  hexagonState3Title,
  timeToEarnABadge,
  usersBestTime,

  badgesList,
  wordsPillsList
} from '@stores-m/weeklyChallenges.js'

import {
  startPage
} from '@stores-m/pagesNavigation.js';

import {
  starsEarned
} from '@stores/userInfo';

import { isErrorsOverlayVisible, errorsList, dispatchError } from '@stores/errors.js';




const stores = {
  // chapters,js
  chaptersList,
  selectAMissionTitle,
  selectedChapterId,
  chapterPageState,

  // weeklyChallenge.js
  currentChallengeTimer,
  challengeMode,
  hexagonState0Title,
  hexagonState1Title,
  hexagonState2Title,
  hexagonState3Title,
  timeToEarnABadge,
  usersBestTime,

  badgesList,
  wordsPillsList,

  // pagesNavigation.js
  startPage,

  // userInfo.js
  starsEarned
};


export default stores;