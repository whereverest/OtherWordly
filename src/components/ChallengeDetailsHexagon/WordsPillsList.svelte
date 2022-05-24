<div class={ `words-pills-list 
              ${mixClass}` }>

  <!-- Words pills title -->
  <div class="words-pills-title 
              words-pills-list__title">
    <div class="words-pills-title__main">Speed Run</div>
    <div class="words-pills-title__additional">with:</div>
  </div><!-- / Words pills title -->

  <div
    class={ `words-pills-list__list-wrap 
              ${scrollPosition >= maxScrollPosition && maxScrollPosition > 0 
                                          && 'words-pills-list__list-wrap--hidden-left'} 
              words-pills-list__list-wrap--hidden-right
              ${( (scrollPosition > 0 && scrollPosition < maxScrollPosition)
                                || (scrollPosition && maxScrollPosition === 0) )
                                            && 'words-pills-list__list-wrap--hidden-left-n-right'}` }
    on:scroll={ event => { scrollPosition = event.target.scrollLeft;
                            updateScrollPositionStore() } }
    bind:this={ refWordsListWrapper }
  >

    <ul
      class="words-pills-list__list-line 
              words-pills-list__list-line--1st"
      bind:this={ refWordsList1 }
    >
      {#each wordsPillsListLines[0] as word,index (index)}
        <!-- Word pill -->
        <li
          class="word-pill 
                      words-pills-list__word-pill"
          style="transform: rotate({updateAgentIntervalId ? lodashRandom(-6,7) + updateAgent : 0}deg) 
                            translateZ(0)
                            translateY({updateAgentIntervalId ? lodashRandom(-3,4) + updateAgent : 0}px);
                  background: { word.color};"
        >
          { word.word }
        </li><!-- / Word pill -->
      {/each}
    </ul>

    <ul
      class="words-pills-list__list-line 
              words-pills-list__list-line--2nd"
      bind:this={ refWordsList2 }
    >
      {#each wordsPillsListLines[1] as word,index (index)}
        <!-- Word pill -->
        <li
          class="word-pill 
                  words-pills-list__word-pill"
          style="transform: rotate({updateAgentIntervalId ? lodashRandom(-6,7) + updateAgent : 0}deg)
                            translateZ(0)
                            translateY({updateAgentIntervalId ? lodashRandom(-2,3) + updateAgent : 0}px);
                  background: { word.color};"
        >
          { word.word }
        </li><!-- / Word pill -->
      {/each}
    </ul>

  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

import { onMount, onDestroy } from 'svelte';
import lodashRandom from 'lodash-es/random.js';

// Props ----------------------------------------------------------------------
export let isWordPillsWobbles = false;



// Words pills list lines -----------------------------------------------------
import { wordsPillsList } from '@stores-m/weeklyChallenges.js';

let wordsPillsListLines = [];

$: {
  const calcAllWordsLength = arr => arr.map(item => item.word).join('').length;
  const allWordsHalfLength = Math.round(calcAllWordsLength($wordsPillsList) / 2);

  wordsPillsListLines = $wordsPillsList.reduce((acc,value) => {
    if (calcAllWordsLength(acc[0]) < allWordsHalfLength - 5) {
      return [ [...acc[0], value], [] ];
    } else {
      return [ acc[0], [...acc[1], value] ];
    }
  }, [[],[]]);
}


// Words pills list curtains --------------------------------------------------
let maxScrollPosition = 0;
let scrollPosition = 0;

let refWordsListWrapper;
let refWordsList1;
let refWordsList2;

onMount(() => {
  setTimeout(() => {
    setMaxScrollWidth();
  }, 200);
});

function setMaxScrollWidth() {
  let listWrapperWidth = refWordsListWrapper?.clientWidth;

  let list1Width = 0;
  let list2Width = 0;

  const allList1Elements = document.querySelectorAll('.words-pills-list__list-line--1st .word-pill');
  const allList2Elements = document.querySelectorAll('.words-pills-list__list-line--2nd .word-pill');

  for (let i = 0; i < allList1Elements.length; i++) list1Width += allList1Elements[i].getBoundingClientRect().width;
  for (let i = 0; i < allList2Elements.length; i++) list2Width += allList2Elements[i].getBoundingClientRect().width

  maxScrollPosition = refWordsListWrapper?.scrollWidth - refWordsListWrapper?.clientWidth;
}


// Word pills wobbling --------------------------------------------------------
let updateAgent = 0.00001;
let updateAgentIntervalId = null;

onMount(() => {
  if (isWordPillsWobbles) {
    setTimeout(() => {
      updateAgentIntervalId = setInterval(() => {
        updateAgent = lodashRandom(.00001, .0003);
        // console.log('%c updateAgent: ', 'background:greenyellow;color:black;', updateAgent);
      }, 1000);
    }, 100);
  }
});

onDestroy(() => {
  if (updateAgentIntervalId) {
    clearInterval(updateAgentIntervalId);
  }
});


// Synchronize words list scroll ----------------------------------------------
import { wordsPillsListScrollPosition } from '@stores-m/weeklyChallenges.js';

function updateScrollPositionStore() {
  wordsPillsListScrollPosition.update(() => scrollPosition);
}

onMount(() => {
  refWordsListWrapper.scrollLeft = $wordsPillsListScrollPosition;
});

</script>



<style lang="scss">


// Word pill ------------------------------------------------------------------
.word-pill {
  height: 2.3rem;
  padding: 0 .7rem .2rem;
  box-sizing: border-box;
  border: .2rem #fff solid;
  border-radius: 10.0rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 1.3rem;
  line-height: 1.3rem;
  transition: transform 2.7s ease;
}


// Words pills title ----------------------------------------------------------
.words-pills-title {
  display: flex;
  align-items: center;

  &__main {
    margin-right: 1.0rem;
    font: 2.1rem/2.1rem 'ZingScriptRustR-Base',serif;
    color: #fcff9c;
  }

  &__additional {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
}


// Words pills list -----------------------------------------------------------
.words-pills-list {

  &__title {
    margin-bottom: .6rem;
  }

  &__list-wrap {
    width: 17.5rem;
    height: 6.9rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: hidden;
    overflow-x: scroll;
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    &--hidden-right {
      mask-image: linear-gradient(90deg, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
    }

    &--hidden-left {
      mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%);
    }

    &--hidden-left-n-right {
      mask-image: linear-gradient(90deg, 
        rgba(0,0,0,0) 0%, 
        rgba(0,0,0,1) 20%, 
        rgba(0,0,0,1) 80%, 
        rgba(0,0,0,0) 100%
      );
    }
  }

  &__list-line {
    height: 45%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    list-style: none;

    &::after {
      content: '';
      min-width: .3rem;
      height: .3rem;
    }
  }

  &__word-pill {
    margin-right: .5rem;
  }
}

</style>