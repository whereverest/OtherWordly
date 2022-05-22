<section class={ `cards-carousel
                  ${mixClass}` }>
  
  <!-- Cards revolver -->
  <!-- Transform rotate value should always be slightly bigger than 0 because otherwise first card will always move slightly to top after rotation starts. Maybe some kind of render glitch or something. -->
  <div
    class={ `cards-revolver 
              ${isTouchMoveInProgress && 'cards-revolver--slower-transition'}
              ${isNoRotationTransition && 'cards-revolver--no-rotation-transition'}
              cards-carousel__cards-revolver` }
    style="transform: {`rotate(${lodashRound((revolverRotationPosition + $revolverRotationShift), 2) || .1}deg) translateZ(0)`}"
  >
    <ul class="cards-revolver__cards-containers-list">
      
      <li
        class="cards-revolver__card-container"
        style="transform: {`rotate(${Math.round(-1 * 12.95 * 100) / 100}deg)`}"
      >
        <div class={ `cards-revolver__card-container-inner 
                      ${'///isCardsOnTopOutsideViewport' && false
                                        && 'cards-revolver__card-container-inner--on-top-outside-viewport'}` }>
          <ChapterCard
            class="cards-revolver__single-card"
            isEmpty={true}
            isLeftPlaceholder={true}
            positionCoeff={ -1}
            isSlowerTransition={isTouchMoveInProgress}
          />
        </div>
      </li>
      
      {#each $chaptersList as card,index (card.chapterNum)}
        <li 
          class="cards-revolver__card-container"
          style="transform: {`rotate(${Math.round(index * 12.95 * 100) / 100}deg)`}"
        >
          <div class={ `cards-revolver__card-container-inner 
                        ${'///isCardsOnTopOutsideViewport' && false
                                        && 'cards-revolver__card-container-inner--on-top-outside-viewport'}` }>
            <ChapterCard
              class="cards-revolver__single-card"
              {card}
              isLocked={ card.isLocked }
              isClicked={ isClickOnCenterCardActive && activeCardId === card.chapterNum }
              positionCoeff={ positionCoefficients[index] }
              isOnlyFaceNChapterVisible={ $transitionTo === 'Chapter' && activeCardId === card.chapterNum }
              isSlowerTransition={isTouchMoveInProgress}
            />
          </div>
        </li>
      {/each}

      <li
        class="cards-revolver__card-container"
        style="transform: {`rotate(${Math.round(($chaptersList.length) * 12.95 * 100) / 100}deg)`}"
      >
        <div class={ `cards-revolver__card-container-inner 
                      ${'///isCardsOnTopOutsideViewport' && false
                                        && 'cards-revolver__card-container-inner--on-top-outside-viewport'}` }>
          <ChapterCard
            class="cards-revolver__single-card"
            isEmpty={true}
            isRightPlaceholder={true}
            positionCoeff={ positionCoefficients.length + 1 }
            isSlowerTransition={isTouchMoveInProgress}
          />
        </div>
      </li>
      
    </ul>
  </div><!-- / Cards revolver -->
  
  
  <div 
    class="touch-registering-area 
            cards-carousel__touch-registering-area"
    on:touchstart={ handleTouchStart }
    on:touchend={ handleTouchEnd }
    on:touchmove={ handleTouchMove }
  >
    <div 
      class="touch-registering-area__clickable-area 
              touch-registering-area__clickable-area--left"
      on:click={ () => handleClick('left') }
    ></div>
    <div 
      class="touch-registering-area__clickable-area 
              touch-registering-area__clickable-area--center"
      on:click={ handleCardClick }
    ></div>
    <div 
      class="touch-registering-area__clickable-area 
              touch-registering-area__clickable-area--right"
      on:click={ () => handleClick('right') }
    ></div>
  </div>

  <!-- This block is needed as a card width reference
        it helps to calculate scrolling position -->
  <div
    class="cards-carousel__single-card-placeholder"
    bind:this={ refCardPlaceholder }
  ></div>
  
</section>



<script>
let mixClass;
export { mixClass as class };

import { onMount, onDestroy } from 'svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { tweened } from 'svelte/motion';
import { linear, quadInOut } from 'svelte/easing';

// Props ----------------------------------------------------------------------
// export let isScrollingBlocked = false;

// Components -----------------------------------------------------------------
import ChapterCard from './ChapterCard/index.svelte';

// Stores ---------------------------------------------------------------------
import { basicFontSize } from '@stores/miscellaneous.js';
import { chaptersList, selectedChapterId } from '@stores-m/chapters.js';
import { transitionTo } from '@stores-m/transitions.js';

import { dispatchIosEvent } from '@helpers/iosEvents.js';



let localIsScrollingBlocked = false;


// No rotation transition -----------------------------------------------------
// if "selectedChapterId" is not equal to first chapter
// than we will see scrolling animation on first open
// this flag fixes this bug
let isNoRotationTransition = true;
onMount(() => {
  setTimeout(() => isNoRotationTransition = false, 500);
});


// isMounted flag -------------------------------------------------------------
let isMounted = false;
onMount(() => isMounted = true);
onDestroy(() => isMounted = false);


// Card width -----------------------------------------------------------------
let refCardPlaceholder;
let cardWidth = refCardPlaceholder?.clientWidth * $basicFontSize / $basicFontSize;
$: {
  if ($basicFontSize) {
    cardWidth = refCardPlaceholder?.clientWidth * $basicFontSize / $basicFontSize;
  }
}

onMount(() => {
  // sometimes for unknown reason cardWidth returns random values (eg. 668 or 442 instead of 220)
  // and requestAnimationFrame fixes this problem
  requestAnimationFrame(() => {
    cardWidth = refCardPlaceholder?.clientWidth;
  });
});


// Scroll to card on load -----------------------------------------------------
onMount(() => {
  requestAnimationFrame(() => {
    if ($selectedChapterId) {
      scrollListToExactCard($selectedChapterId);
    }
  });
});

function scrollListToExactCard(cardId) {
  const cardIndex = $chaptersList.findIndex(item => item.chapterNum === cardId);

  setScrollPositionRounded(-cardIndex * cardWidth);
}


// Handle swipe events --------------------------------------------------------
let isTouchMoveInProgress = false;
let touchHorizontalDistance = 0;
let touchHorizontalStartPoint = null;

function handleTouchStart(event) {
  isTouchMoveInProgress = true;
  touchHorizontalStartPoint = Math.round(event.changedTouches[0].pageX);
}

function handleTouchEnd() {
  isTouchMoveInProgress = false;
  touchHorizontalStartPoint = null;
  touchHorizontalDistance = 0;
}

function handleTouchMove(event) {
  if (!isTouchMoveInProgress || localIsScrollingBlocked) {
    return
  }
  touchHorizontalDistance = (-(Math.round(touchHorizontalStartPoint) - Math.round(event.changedTouches[0].pageX))) ;
}


// Set scroll position & reset starting point ---------------------------------
let scrollPositionRounded = tweened(0, { duration:100, easing:quadInOut });
$: maxScrollPosition = -cardWidth * ($chaptersList.length - 1);
let throttleTimeStamp = Date.now();

let newScrollPositionRounded;
$: {
    newScrollPositionRounded = $scrollPositionRounded + (touchHorizontalDistance >= 0 ? cardWidth : -cardWidth);


    if (Math.abs(touchHorizontalDistance) >= cardWidth
                          && newScrollPositionRounded <= 0 && newScrollPositionRounded >= maxScrollPosition) {
      touchHorizontalStartPoint = currentFingerPositionPageX;

        setScrollPositionRounded(newScrollPositionRounded);

      if ($scrollPositionRounded < 0 && $scrollPositionRounded !== maxScrollPosition) {
        touchHorizontalDistance = 0;
      }
    }
}

function setScrollPositionRounded(newPosition) {
  if (newPosition === null || newPosition === undefined || isNaN(newPosition)) {
    newPosition = $chaptersList.findIndex(item => item.id === $selectedChapterId) * -cardWidth;
  }

  if (Math.abs(newPosition) % cardWidth === 0) {
    if (newPosition > 0) scrollPositionRounded.set(0);
    else if (newPosition < maxScrollPosition) scrollPositionRounded.set(maxScrollPosition);
    else scrollPositionRounded.set(newPosition)
  }
}
$: {
  if ($basicFontSize || cardWidth) {
    setScrollPositionRounded();
  }
}


// Current finger position ----------------------------------------------------
let currentFingerPosition = 0;
let currentFingerPositionPageX = 0;
function setCurrentFingerPosition(event) {
  currentFingerPosition = event.changedTouches[0].screenX;
  currentFingerPositionPageX = event.changedTouches[0].pageX;
  // console.log('%c event.changedTouches[0].screenX: ', 'background:LightSeaGreen;color:white', event.changedTouches[0].screenX);
}

onMount(() => {
  document.addEventListener('touchmove', setCurrentFingerPosition);
});

// Handle left/right clicks ---------------------------------------------------
function handleClick(areaClicked) {
  const maxPosition = ($chaptersList.length - 1) * cardWidth;

  if (areaClicked === 'left') {
    if ($scrollPositionRounded !== 0) {
      setScrollPositionRounded($scrollPositionRounded + cardWidth);
    } else {
      revolverRotationShift.set(3.5, {duration:100,easing:linear});
      setTimeout(() => revolverRotationShift.set(0, {duration:100,easing:linear}), 150);
    }

  } else if (areaClicked === 'right') {
    if (Math.abs($scrollPositionRounded) !== maxPosition) {
      setScrollPositionRounded($scrollPositionRounded - cardWidth);
    } else {
      revolverRotationShift.set(-3.5, {duration:100,easing:linear});
      setTimeout(() => revolverRotationShift.set(0, {duration:100,easing:linear}), 150);
    }
  }
}


// Handle card click ----------------------------------------------------------
let isClickOnCenterCardActive;
$: activeCardId = $chaptersList[Math.abs($scrollPositionRounded) / cardWidth]?.chapterNum || $chaptersList[0]?.chapterNum;
function handleCardClick() {
  const isCardUnlockable = $chaptersList.find(item => +item.chapterNum === +$selectedChapterId)?.isUnlockable;

  if (isCardUnlockable) {
    dispatchIosEvent({'tapped': 'OWJSMsgPlayClickSound'});
  }
  dispatchIosEvent( {
    'tapped':'OWJSMsgChapterSelect',
    value: $chaptersList.find(chapter => chapter.chapterNum === activeCardId)?.chapterNum.toString()
  } );
  isClickOnCenterCardActive = true;
  setTimeout(() => isClickOnCenterCardActive = false, 200);

  dispatch('cardClick', { activeCardId })
}


// Revolver rotation position -------------------------------------------------
  // I don't know what this coefficient even means but it should be equal to 1.699
$: revolverRotationPosition = $scrollPositionRounded / ($basicFontSize * 1.699);


// Revolver rotation shift ----------------------------------------------------
  // rubber effect imitation
let revolverRotationShift = tweened(0, {duration:120,easing:quadInOut});
$: {
  const listPulledBelowMinPosition = $scrollPositionRounded === 0 && touchHorizontalDistance > 0;
  const listPulledAboveMaxPosition = $scrollPositionRounded === maxScrollPosition && touchHorizontalDistance < 0;
  let coefficient = (listPulledBelowMinPosition || listPulledAboveMaxPosition) ? 120 : 40;

  revolverRotationShift.set(touchHorizontalDistance / coefficient, {duration:100,easing:linear});
}


// Position coefficients ------------------------------------------------------
import lodashRound from 'lodash-es/round.js';
import lodashIsNan from 'lodash-es/isNaN.js';
let positionCoefficients;
$: {
  positionCoefficients = $chaptersList.map((item, index) => {
    const newCoeff = lodashRound($scrollPositionRounded / cardWidth + index);

    // avoid first and last cards to change it's state to "not active" when user pulls the list to "lower than min" and "bigger than max" positions
    if (index === 0 && newCoeff > 0) return 0
    else if (index === $chaptersList.length - 1 && newCoeff < 0) return 0
    else return lodashIsNan(newCoeff) ? index : newCoeff;
  });
}


// Update active chapter on scroll --------------------------------------------
let timeoutForUpdateFunc;
$: {
  if (activeCardId !== null && isTouchMoveInProgress) {
    clearTimeout(timeoutForUpdateFunc);
    timeoutForUpdateFunc = setTimeout(setSelectedChapterId, 500);
  }
}
function setSelectedChapterId() {
  selectedChapterId.update(() => +activeCardId);
}
</script>



<style lang="scss">


  
// Cards revolver -------------------------------------------------------------
.cards-revolver {
  width: 218.4rem;
  min-width: 218.4rem;
  height: 218.4rem;
  min-height: 218.4rem;
  border-radius: 800.0rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transition: top .9s ease, transform .25s ease-out;

  &--slower-transition {
    transition: top .9s ease, transform .4s ease-out;
  }

  &--no-rotation-transition {
    transition: top .9s ease;
  }
  
  &__cards-containers-list {
    width: 2.4rem;
    height: 2.4rem;
    padding: 0;
    margin: 0;
    list-style: none;
    position: absolute;
    inset: calc(50% - 1.2rem) auto auto calc(50% - 1.2rem);
  }
  
    &__card-container {
      width: 1.0rem;
      height: 218.4rem;
      position: absolute;
      inset: calc(50% - 109.2rem) auto auto calc(50% - .5rem);
    }
  
      &__card-container-inner {
        width: 1.0rem;
        height: 32.0rem;
        display: flex;
        justify-content: center;
        transform: translateY(0);
        opacity: 1;
        transition: transform .9s ease, opacity .5s ease;
        
        &--on-top-outside-viewport {
          transform: translateY(-35.0rem);
          opacity: 0;
        }
      }
  
        :global(.cards-revolver__single-card) {
        }
}


// Cards carousel -------------------------------------------------------------
.cards-carousel {
  width: 66.0rem;
  height: 8.9rem;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  position: relative;
  
  &__touch-registering-area {
    position: absolute;
    inset: 3.5rem auto auto 50%;
    transform: translateX(-50%) translateZ(0);
  }
  .touch-registering-area {
    width: 100vw;
    height: 25.0rem;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    touch-action: none;
    
    &__clickable-area {
      width: 33.3%;
      height: 100%;
      
      &--left {
        touch-action: none;
      }
      &--center {
        width: 9.0rem;
        height: 8.0rem;
        position: absolute;
        inset: calc(50% + 3.7rem) auto auto calc(50% - 4.5rem);
        touch-action: none;
      }
      &--right {
        touch-action: none;
      }
    }
  }
  
    // This block is needed as a card width reference
    // it helps to calculate scrolling position
    &__single-card-placeholder {
      width: 22.0rem;
      min-width: 22.0rem;
      max-width: 22.0rem;
      pointer-events: none;
    }
  
  &__cards-revolver {
    position: absolute;
    inset: .7rem auto auto calc(50% - 109.2rem);
  }
}
  
  
</style>
