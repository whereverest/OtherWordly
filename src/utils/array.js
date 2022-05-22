import lodashCloneDeep from 'lodash-es/cloneDeep';


function shuffleArrayElements(array) {
  const newArray = lodashCloneDeep(array);
  
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

function nextIndex(arrayLength, currentIndex) {
  const probableNextIndex = currentIndex + 1;

  if (probableNextIndex >= arrayLength || probableNextIndex < 0)  return 0
  else if (probableNextIndex < arrayLength)                       return probableNextIndex
}

export {
  shuffleArrayElements,
  nextIndex
}