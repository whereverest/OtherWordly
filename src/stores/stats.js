import { writable } from 'svelte/store';


const currentLevel = writable(6);
const currentChapter = writable(1);
const yourSidekick = writable('Astra');
const timeElapsed = writable('1:15');
const wordsMatched = writable(15);
const multiHitCombos = writable(16);
const minesShattered = writable(119);
const blocksRemoved = writable(115);
const coreWordsCompleted = writable(2);
const currentMission = writable(21);



export {
  currentLevel,
  currentChapter,
  yourSidekick,
  timeElapsed,
  wordsMatched,
  multiHitCombos,
  minesShattered,
  blocksRemoved,
  coreWordsCompleted,
  currentMission
};