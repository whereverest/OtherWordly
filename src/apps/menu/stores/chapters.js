import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { backInOut, quadInOut } from 'svelte/easing';


const chaptersList = writable([
  { title: 'The Matchmaker',
    mainIcon: 'hand_gesture',
    challengeNameWords: ['Tutorial'],
    faceIcons: [ 'menu-image-char01_tyto.png' ],
    chapterNum: 1,
    progress: 10,
    progressBarNames: ['Tyto'],
    isLocked: false,
    isUnlockable: true,
    description: 'The words of Alphazoid Prime are vanishing! Can you help?',
    stripeColors: ['a78f5b', '8e7942'],
    lockLatchColor: 'cdb7c6',
    lockBodyColor: ['f6f2ec','cda29d'],
    stars: { numerator: 10, denominator: 20 },
    gifts: { numerator: 10, denominator: 20 },
    unlockValue: 25,
    confettiColors: ['#ffffff','#dddd66','#666666'],
    progressBarGradient: ['#efd0a9', '#ea924d', '#dd7d50']
  },
  { title: 'All That Glitters',
    mainIcon: 'magic',
    challengeNameWords: ['Stardust','Power'],
    faceIcons: [ 'menu-image-char02_barabell.png', 'menu-image-char03_jaleen.png' ],
    chapterNum: 2,
    progress: 64,
    progressBarNames: ['Barabell','Jaleen'],
    isLocked: true,
    isUnlockable: true,
    description: 'What is the strange object seen flying through Alphazoid Prime?',
    stripeColors: ['73b3b2', '4f8784'],
    lockLatchColor: 'b8b0eb',
    lockBodyColor: ['dfe9f2','9e85c8'],
    stars: { numerator: 10, denominator: 20 },
    gifts: { numerator: 10, denominator: 20 },
    unlockValue: 25,
    confettiColors: ['#ffffff', '#666666', '#69d1fa', '#ea6ff6'],
    progressBarGradient: ['#95c9f2', '#8b8dff', '#b95dea']
  }
]);

// Title that is used on Chapter (Level) page over the level selection carousel
const selectAMissionTitle = writable('_____________');

const selectedChapterId = writable(1);

const chapterPageState = writable('minimized');

// Increase and straighten chapter title on transition from "All Chapters" to "Chapter" page
const chapterTitleCurvature = tweened(3, {
  duration: 400,
  easing: quadInOut
});
const chapterTitleTopShift = tweened(-3.7, {
  duration: 400,
  easing: quadInOut
});
const isChapterTitleHuge = writable(false);

export { 
  chaptersList,
  selectAMissionTitle,
  selectedChapterId,
  chapterPageState,
  chapterTitleCurvature,
  chapterTitleTopShift,
  isChapterTitleHuge
};