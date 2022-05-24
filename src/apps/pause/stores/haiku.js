import { writable } from 'svelte/store';
import lodashRandom from 'lodash-es/random';

import haiku from '../pages/Info/frames/haiku.json';

let randomHaiku = writable([]);

function deriveHaikuNumFromTime() {
  const numberOfHaikus = haiku.haikuList.length;
  const msInOneDay = 24 * 60 * 60 * 1000;

  const todaysYear = new Date().getFullYear();
  let todaysMonth = (new Date().getMonth() + 1).toString();
  todaysMonth = todaysMonth.length === 1 ? '0' + todaysMonth : todaysMonth;
  const todaysDay = new Date().getDate();

  const date1 = Date.parse(`${todaysYear}-${todaysMonth}-${todaysDay}`);
  const date2 = new Date().getTime();
  // const date2 = Date.parse('2022-01-24T01:00:59.000Z');
  const timePassed = date2 - date1;

  let numberOfHaikuToShow = Math.floor(timePassed / (msInOneDay / (numberOfHaikus + 1) )); // dunno why we should add 1 but only in that way it returns correct result

  if (numberOfHaikuToShow < 0) numberOfHaikuToShow = 0;
  if (numberOfHaikuToShow > haiku.haikuList.length) numberOfHaikuToShow = haiku.haikuList.length;

  return numberOfHaikuToShow;
}

function changeRandomHaiku() {
  const refinedHaikuList = haiku.haikuList.map(haiku => {
    return haiku
      .replace(/(<em.*<\/em>)|(<i.*<\/i>)/gim, '') // remove author and book name
      .replace(/<p>|<\/p>|“/gim, '') // remove tag and quotes
      .trim()
      .split(' / ') // split by symbol
  });

  randomHaiku.update(() => refinedHaikuList[ deriveHaikuNumFromTime() ]);
}


export {
  randomHaiku,
  changeRandomHaiku
};