import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { quartInOut } from 'svelte/easing';

const currentChallengeTimer = writable('_____');

const badgesList = writable([
  { date: '17 Oct 2021', elapsed: '84.8s', topic: 'Geography',
    imageFileName: 'challenge_badge_1',
    topPercentage: 5
  },
  { date: '10 Oct 2021', elapsed: '88.2s', topic: 'The 1960’s',
    imageFileName: 'challenge_badge_2' }
]);

const challengeMode = writable('unplayed');

const hexagonState0Title = writable('_______________');
const hexagonState1Title = writable('_______________');
const hexagonState2Title = writable('_______________');
const hexagonState3Title = writable('_______________');
const timeToEarnABadge = writable(0);

const isHexagonRotating = writable(false);
const hexagonRotationAngle = tweened(45, {
  duration: 9000,
  easing: quartInOut
});

const badgesListScrollPosition = writable(0);
const wordsPillsListScrollPosition = writable(0);

const usersBestTime = writable(0);


const rotatingBgWordsList = [
  { id: 181529, position: '-.1rem -.7rem auto auto', circleSize: 'huge',
    scale: 1, opacity: .05,
    word: 'oven' },
  { id: 181539, position: '0 0 auto auto', circleSize: 'medium',
    scale: .6, opacity: .15,
    word: 'mushroom' },
  { id: 181617, position: '2.1rem -3.3rem auto auto', circleSize: 'medium',
    scale: 1, opacity: .15,
    word: 'topping' },
  { id: 181638, position: '3.5rem 2.6rem auto auto', circleSize: 'small',
    scale: 1.4, opacity: .05,
    word: 'cherry' },
  { id: 181713, position: '3.3rem -4.1rem auto auto', circleSize: 'medium',
    scale: 1, opacity: .08,
    word: 'chop' },
  { id: 181738, position: '.4rem 2.0rem auto auto', circleSize: 'medium',
    scale: .6, opacity: .08,
    word: 'pasta' },
  { id: 181800, position: '-1.6rem -1.8rem auto auto', circleSize: 'medium',
    scale: 1, opacity: .1,
    word: 'cucumber' },
  { id: 181818, position: '-.3rem -1.0rem auto auto', circleSize: 'medium',
    scale: 1, opacity: .15,
    word: 'gourmet' },
  { id: 181848, position: '1.1rem -.3rem auto auto', circleSize: 'medium',
    scale: 1, opacity: .08,
    word: 'skillet' },
  { id: 181926, position: '1.9rem 1.5rem auto auto', circleSize: 'small',
    scale: 1, opacity: .1,
    word: 'propagate' },
  { id: 181949, position: '-1.1rem 1.5rem auto auto', circleSize: 'big',
    scale: 1.4, opacity: .15,
    word: 'recipe' },
  { id: 134934, position: '2.1rem -2.5rem auto auto', circleSize: 'huge',
    scale: 1, opacity: .05,
    word: 'swing' },
  { id: 134939, position: '1.3rem -6.5rem auto auto', circleSize: 'huge',
    scale: 1.4, opacity: .15,
    word: 'traveling' },
];

const wordsPillsList = writable([
  { word: 'citrus', color: '#a48731'},
  { word: 'price', color: '#8d2b75'}
]);

export {
  currentChallengeTimer,
  badgesList,

  challengeMode,
  hexagonState0Title,
  hexagonState1Title,
  hexagonState2Title,
  hexagonState3Title,
  timeToEarnABadge,
  usersBestTime,

  isHexagonRotating,
  hexagonRotationAngle,
  badgesListScrollPosition,
  wordsPillsListScrollPosition,

  rotatingBgWordsList,
  wordsPillsList
}