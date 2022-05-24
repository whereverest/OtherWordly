<div 
  class={ `single-card 
            ${isCardInFocus && 'single-card--wide'}
            ${isSlowerTransition && 'single-card--slower-transition'}
            ${mixClass}` }
  style="height: {isCardInFocus ? '26.4rem' : '21.6rem'}; 
          left: {isCardInFocus ? 0 : ((positionCoeff > 0 ? 1.96 : -1.96) + 'rem') }; top: .5rem;"
>
<!--  ${isClicked && 'single-card&#45;&#45;active-clicked'}-->
  <div class={ `single-card__in-wrap
                ${isLocked && 'single-card__in-wrap--blurred'}
                ${flipAnimationStep === 1 && 'single-card__in-wrap--flip-animation-step1'}
                ${flipAnimationStep === 2 && 'single-card__in-wrap--flip-animation-step2'}
                ${flipAnimationStep === 3 && 'single-card__in-wrap--flip-animation-step3'}
                ${flipAnimationStep === 4 && 'single-card__in-wrap--flip-animation-step4'}
                ${isCardCloseToTheCenter && 'single-card__in-wrap--no-top-padding'}
                ${isLeftPlaceholder && 'single-card__in-wrap--left-placeholder'}
                ${isRightPlaceholder && 'single-card__in-wrap--right-placeholder'}
                ${isOnlyFaceNChapterVisible && 'single-card__in-wrap--transparent-bg'}` }>
  <!--              ${isClicked && 'single-card__in-wrap&#45;&#45;active-clicked'}` }>-->

  <div 
    class={ `single-card__progress-bar-wrapper 
              ${(isBlurred || isOnlyFaceNChapterVisible) 
                                          && 'single-card__progress-bar-wrapper--invisible'}` }
    style="opacity: {1 - (Math.abs(positionCoeff) > .6 ? 1 : (Math.abs(positionCoeff) * 3))}"
  >
    <ProgressBar 
      class="single-card__progress-bar"
      type={ ['single','double','triple'][card?.progressBarNames?.length - 1] }
      progress={card?.progress}
      titles={card?.progressBarNames}
      gradientColors={card?.progressBarGradient}
    />
  </div>

  
  <!--<img-->
  <!--  class={ `single-card__lock-icon-overlay -->
  <!--            ${isCardCloseToTheCenter && 'single-card__lock-icon-overlay&#45;&#45;bigger'}-->
  <!--            ${isCardCloseToTheCenter && 'single-card__lock-icon-overlay&#45;&#45;smaller-top-indent'}-->
  <!--            ${isLockIconShaking && 'single-card__lock-icon-overlay&#45;&#45;shaking'}-->
  <!--            ${!isLocked && 'single-card__lock-icon-overlay&#45;&#45;invisible'}-->
  <!--            ${!isLocked && 'single-card__lock-icon-overlay&#45;&#45;on-the-top'} `}-->
  <!--  src={ card?.isUnlockable ? 'src/assets/images/lock_icon_orange.integrated.png' : 'src/assets/images/lock_icon_grey.integrated.png' }-->
  <!--  alt="Lock"-->
  <!--/>-->
  
  <LockIcon
    class={ `single-card__lock-icon-overlay 
              ${isCardCloseToTheCenter && 'single-card__lock-icon-overlay--smaller-top-indent'}
              ${isCardCloseToTheCenter && 'single-card__lock-icon-overlay--bigger'}
              ${isLockIconShaking && 'single-card__lock-icon-overlay--shaking'}` }
    isLocked={ isLocked }
    latchColor={ card?.lockLatchColor }
    bodyColor={ card?.lockBodyColor }
    cardId={ card?.chapterNum }
  />
  
  
  <div class="{ `faces-icons
                  ${isCardCloseToTheCenter && 'faces-icons--bigger'}
                  ${isBlurred && 'faces-icons--40-percent-transparent'}
                  ${isBlurred && 'faces-icons--blurred'}
                  single-card__faces-icons` }">
    
    {#if card?.faceIcons?.length === 1}
        <img
          class="faces-icons__icon 
                  faces-icons__icon--big
                  faces-icons__icon--main"
          src={ charactersImages[card.faceIcons[0]] }
          alt="face"
        />
      {:else if card?.faceIcons?.length === 2}
        <img
          class="faces-icons__icon 
                  faces-icons__icon--one-of-the-two
                  faces-icons__icon--big"
          src={ charactersImages[card.faceIcons[0]] }
          alt="face"
        />
        <img
          class="faces-icons__icon 
                  faces-icons__icon--one-of-the-two
                  faces-icons__icon--big"
          src={ charactersImages[card.faceIcons[1]] }
          alt="face"
        />
      {:else if card?.faceIcons?.length === 3}
        <img
          class="faces-icons__icon"
          src={ charactersImages[card.faceIcons[1]] }
          alt="face"
        />
        <img
          class="faces-icons__icon 
                  faces-icons__icon--big
                  faces-icons__icon--main"
          src={ charactersImages[card.faceIcons[0]] }
          alt="face"
        />
        <img
          class="faces-icons__icon"
          src={ charactersImages[card.faceIcons[2]] }
          alt="face"
        />
    {/if}
  </div>


  {#if !isEmpty}
    <div class="{ `chapter-number 
                    single-card__chapter-number 
                    ${isCardCloseToTheCenter && 'single-card__chapter-number--bigger-bottom-margin'}` }">
      <div class="{ `chapter-number__small-label 
                      ${!isCardCloseToTheCenter && 'chapter-number__small-label--visible'} `}">
        <ArcText
          class="chapter-number__arc-text 
                  chapter-number__arc-text--small"
          debugMode={false}
          roundness="4.6"
          fontSize="18"
          topShift="-.8"
        >
          Chapter{generateNbspString(7)}
        </ArcText>
        
        <ArcText
          class="chapter-number__arc-text 
                  chapter-number__arc-text--small
                  chapter-number__arc-text--digit"
          debugMode={false}
          roundness="4.6"
          fontSize="27"
          topShift="-.7"
        >
          {generateNbspString(15) + card.chapterNum}
        </ArcText>
        
      </div>
      <div class="{ `chapter-number__big-label 
                      ${isCardCloseToTheCenter && 'chapter-number__big-label--visible'}` }">
        <ArcText
          class="chapter-number__arc-text"
          debugMode={false}
          roundness="5"
          fontSize="18"
          topShift="-.8"
        >
          Chapter{generateNbspString(7)}
        </ArcText>
        
        <ArcText
          class="chapter-number__arc-text 
                  chapter-number__arc-text--digit"
          debugMode={false}
          roundness="5"
          fontSize="27"
          topShift="-.7"
        >
          {generateNbspString(15) + card?.chapterNum}
        </ArcText>

        <svg class="chapter-number__svg-stripe-background" width="2266" height="625" viewBox="0 0 2266 625">
          <path style="fill-rule: evenodd; fill: {'#' + card?.stripeColors?.[0]}" id="Layer_2_copy_2" data-name="Layer 2 copy 2" d="M0.35,283.9C65.209,263.127,479.706,163.973,624.158,143.2c0,0,40.79,368.294,40.787,368.282C375.945,543.486,96.9,625.4,96.9,625.4L219.573,406.71S0.374,283.9.35,283.9Zm2265.48,0c-64.86-20.771-479.36-119.925-623.81-140.694,0,0-40.79,368.294-40.78,368.282,289,32,568.04,113.914,568.04,113.914L2046.61,406.71S2265.81,283.9,2265.83,283.9Z"/>
          <path style="fill-rule: evenodd; fill: {'#' + card?.stripeColors?.[1]}" id="Layer_2_copy_3" data-name="Layer 2 copy 3" d="M218.5,102.326l78.373,345.433s232,31.174,368.356,64.251c-0.033-.033-41.636-361.908-41.636-361.908Zm1828.322,0-78.37,345.433s-232,31.174-368.36,64.251c0.03-.033,41.64-361.908,41.64-361.908Z"/>
          <path style="fill-rule: evenodd; fill: #fff" d="M1132.5-.158C1423.19-.107,1728.17,31.124,2047,101.679c0.02,0.008-77.99,346.28-78.07,346.233C1695.61,385.185,1410.97,356,1132.5,356.284c-278.477-.283-563.116,28.9-836.441,91.628-0.08.047-78.085-346.225-78.066-346.233C536.821,31.124,841.8-.107,1132.49-0.158h0.01Z"/>
        </svg>
        
      </div>
    </div>
      
      
    <div class="{ `single-card__title
                    ${isCardCloseToTheCenter && 'single-card__title--bigger-bottom-margin'}
                    ${isCardCloseToTheCenter && 'single-card__title--bigger'}
                    ${$isChapterTitleHuge && 'single-card__title--much-bigger'}` }">
      <ArcText
        class="single-card__title-arc-text"
        debugMode={ false }
        roundness={ $chapterTitleCurvature }
        fontSize="21"
        topShift={ $chapterTitleTopShift }
        color="#fefea3"
      >
        <!-- For some unknown fucking reason desktop Edge browser refuse to update properly topShift and few  CSS properties of this component. And it only works fine when we change the text value along with "tweened"-related changes of the $chapterTitleTopShift value. -->
        { $chapterTitleTopShift.toString().split('').includes('6') ? card?.title : ' ' + card?.title + ' ' }
      </ArcText>
      
      <!-- [0, -4.4] -->
      
    </div>
    
    
    <div class={ `single-card__achiev-n-descript 
                  ${isOnlyFaceNChapterVisible && 'single-card__achiev-n-descript--invisible'}` }>
      
      {#if isDescriptionShowed && !isLocked}
        <div 
          in:fade="{{ duration: 800 }}"
          out:fade="{{ duration: 800 }}"
          class="single-card__level-description-wrapper"
        >
          <LevelDescription 
            class={ `single-card__level-description 
                      ${isLocked && 'single-card__level-description--darkened'}` }
            text={card?.description}
            on:scrollEnd={handleScrollEnd}
          />
        </div>
      {/if}
      
      {#if !isDescriptionShowed || isLocked}
        <ChapterAchievements
          class={ `single-card__achievements 
                    ${isBlurred && 'single-card__achievements--blurred'} 
                    ${isBlurred && 'single-card__achievements--40-percent-transparent'} ` }
          chapterDetails={ card }
          isReducedVersion={ !isCardCloseToTheCenter }
        />
      {/if}
      
    </div>
  
    
    {#if isBlurred}
      <ButtonInCircle
        class={ `single-card__action-button 
                  ${isCardCloseToTheCenter && !isOnlyFaceNChapterVisible 
                                            && 'single-card__action-button--visible'}` }
        iconName="star"
        backwardsGradient={true}
        prominent={true}
        text={ card?.isUnlockable ? 'Unlock' : 'LOCKED' }
        textInCircle={ card?.unlockValue?.toString() }
        isTextInCircleSmall={ true }
        isTextOnTop={true}
        isTextArc={true}
        isThickBorder={true}
        isActive={ isClicked }
      />
      {:else}
      <ButtonInCircle
        class={ `single-card__action-button 
                  ${isCardCloseToTheCenter && !isOnlyFaceNChapterVisible 
                                            && 'single-card__action-button--visible'}
                  single-card__action-button--with-animation` }
        iconName="arrowRight"
        backwardsGradient={true}
        prominent={true}
        isThickBorder={true}
        isActive={ isClicked }
      />
    {/if}
    
  {/if}
  
</div>
</div>



<script>
let mixClass;
export { mixClass as class };

// TODO: remove unused imports
import { onMount, onDestroy } from 'svelte';
import { fade, slide, scale, fly } from 'svelte/transition';
import confetti from 'canvas-confetti';

// Props ----------------------------------------------------------------------
export let card = {};
export let isLocked = false;
export let isEmpty = false;
export let positionCoeff;
export let isLeftPlaceholder = false;
export let isRightPlaceholder = false;
export let isClicked = false;
export let isOnlyFaceNChapterVisible = false;
export let isSlowerTransition = false;

// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import ChapterAchievements from './ChapterAchievements.svelte';
import ProgressBar from '@components/ProgressBar.svelte';
import LevelDescription from './LevelDescription.svelte';
import LockIcon from './LockIcon.svelte';

import { transitionTo } from '@stores-m/transitions.js';
import { 
  selectedChapterId, 
  chapterTitleCurvature, 
  chapterTitleTopShift, 
  isChapterTitleHuge 
} from '@stores-m/chapters.js';


$: positionCoeffAbs = Math.abs(positionCoeff); // absolute value of the position coefficient 
$: isCardInFocus = positionCoeffAbs <= .5;
$: isCardCloseToTheCenter = positionCoeffAbs <= .25;

// Faces images imports -------------------------------------------------------
import charactersImages from '@assets/imports/charactersImagesImports.js';


let canvasContainer = document.querySelector('.confetti-canvas');
let confettiInstance = confetti.create(canvasContainer, { resize: false });

// Confetti params ------------------------------------------------------------
import { basicFontSize, isDeviceIpad } from '@stores/miscellaneous.js';

function fireConfetti() {

  const count = 200;
  const defaults = {
    origin: { y: .7 },
    resize: true
  };


  function fire(particleRatio, opts) {
    confettiInstance(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  const sizeCoefficient = $isDeviceIpad ? .6 : 1.5;
  const spreadCoefficient = $isDeviceIpad ? .5 : 1.3;

  fire(.25, { spread: spreadCoefficient * $basicFontSize * 1.3 / 1.2,
              scalar: sizeCoefficient * $basicFontSize * 0.08, startVelocity: 55,
              colors: card.confettiColors });
  fire(.2, { spread: spreadCoefficient * $basicFontSize * 3.0 / 1.2,
              scalar: sizeCoefficient * $basicFontSize * 0.06,
              colors: card.confettiColors });
  fire(.35, { spread: spreadCoefficient * $basicFontSize * 5.0 / 1.2,
              scalar: sizeCoefficient * $basicFontSize * 0.08, decay: .91,
              colors: card.confettiColors });
  fire(.1, { spread: spreadCoefficient * $basicFontSize * 6.0 / 1.2,
              scalar: sizeCoefficient * $basicFontSize * 0.1, startVelocity: 25, decay: .92,
              colors: card.confettiColors });
  fire(.1, { spread: spreadCoefficient * $basicFontSize * 6.0 / 1.2,
              scalar: sizeCoefficient * $basicFontSize * 0.09, startVelocity: 45,
              colors: card.confettiColors });
}


// Switch between description & Stats -----------------------------------------
let isDescriptionShowed = false;
let showDescriptionTimeout;
let isDescriptionForciblyHidden = false;

onMount(() => {
  document.addEventListener('click', clearNHideDescriptionTimeout);
});

onDestroy(() => {
  document.removeEventListener('click', clearNHideDescriptionTimeout);
});

$: {
  if (positionCoeff === 0) {
    clearDescriptionTimeout()
    setDescriptionTimeout();

  } else {
    removeDescriptionForcibleHiding();
    clearDescriptionTimeout()
    hideDescription();
  }
}

function handleScrollEnd() {
  isDescriptionShowed = false;

  if (!isDescriptionForciblyHidden && positionCoeff === 0) {
    setDescriptionTimeout();
  }
}

function showDescription() { isDescriptionShowed = true; }
function hideDescription() { isDescriptionShowed = false; }
function setDescriptionTimeout() { showDescriptionTimeout = setTimeout(showDescription, 5200); }
function removeDescriptionForcibleHiding() { isDescriptionForciblyHidden = false; }

function clearDescriptionTimeout() {
  clearTimeout(showDescriptionTimeout);
  showDescriptionTimeout = null;
}

function clearNHideDescriptionTimeout() {
  isDescriptionForciblyHidden = true;
  hideDescription();
  clearDescriptionTimeout();
}


// Change card height ---------------------------------------------------------
let heightFromPositionCoeff = 0;
$: heightFromPositionCoeff = calculateNewHeight(positionCoeffAbs);

function calculateNewHeight(coeff) {
  const newHeight = 27 * (coeff < 1 ? (1.23 - coeff / 4.35) : 1);
  return Math.round(newHeight * 10) / 10;
}


// Lock / unlock --------------------------------------------------------------
let isLockIconShaking = false;
let lockShakingTimeout;
let flipAnimationStep = 0;
let isBlurred = isLocked;

$: {
  if (isClicked && !isLockIconShaking && !card.isUnlockable) {
    isLockIconShaking = true;
    lockShakingTimeout = setTimeout(() => isLockIconShaking = false, 900)
  }
}

let isLockedOld = isLocked;
$: {
  if (isLockedOld === true && isLocked === false) {
    setTimeout(() => fireConfetti(), 600);
    setTimeout(() => isBlurred = false, 1100);
    setTimeout(() => flipAnimationStep = 1, 500);
    setTimeout(() => flipAnimationStep = 2, 650);
    setTimeout(() => flipAnimationStep = 3, 800);
    setTimeout(() => flipAnimationStep = 4, 950);
  }

  isLockedOld = isLocked;
}


// Helpers --------------------------------------------------------------------
function generateNbspString(numberOfChars = 1) {
  return Array.from(Array(numberOfChars).keys()).fill(String.fromCharCode(160)).join('')
}

</script>



<style lang="scss">


// Card description -----------------------------------------------------------
.card-description {
  
}


// Faces icons ----------------------------------------------------------------
.faces-icons {
  display: flex;
  align-content: center;
  align-items: center;
  filter: blur(0);
  transform: scale(.9);
  transition: transform .2s ease, filter .5s ease;

  &--bigger {
    transform: scale(1.05);
  }
  
  &--40-percent-transparent {
    opacity: .4;
  }
  
  &--blurred {
    filter: blur(.3rem);
  }

  &__icon {
    width: 7.5rem;
    height: 7.5rem;
    position: relative;
    
    &:first-child {
      z-index: 1;
    }

    &--one-of-the-two {
      margin: -.4rem -2.0rem 0;
    }
    
    &--big {
      width: 10.7rem;
      height: 10.7rem;
    }

    &--main {
      margin: -.4rem -4.0rem 0;
      z-index: 2;
    }
  }
}


// Chapter number -------------------------------------------------------------
.chapter-number {
  width: 8.8rem;
  height: 2.0rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  font-family: 'MuseoSlabRounded-700',serif;
  font-size: .8rem;
  line-height: .8rem;
  color: #000;
  text-transform: uppercase;
  text-align: center;

  //&__text {
  //  margin-right: .2rem;
  //  position: relative;
  //  top: -.1rem;
  //}
  
  &--locked {
    opacity: .3;
  }
  
  :global(.chapter-number__arc-text) {
    width: 8.0rem;
    height: 2.4rem;
    max-height: 2.4rem;
    position: absolute;
    inset: -.1rem auto auto calc(50% - 4.0rem);
  }

  :global(.chapter-number__arc-text--digit) {
    top: -.1rem;
  }

  :global(.chapter-number__arc-text--small) {
    top: -.1rem;
  }

  &__small-label {
    width: 8.8rem;
    height: 2.0rem;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    position: absolute;
    inset: .5rem auto auto 0;
    transform: scale(.5);
    opacity: 0;
    background: 50% 50%/100% auto no-repeat url(../../assets/images/chapter_stripe.integrated.png);
    transition: transform .2s ease, opacity .2s ease;

    &--visible {
      transform: scale(1);
      opacity: 1;
    }

    //:global(svg) {
    //  width: 420%;
    //  min-width: 420%;
    //  position: relative;
    //  inset: -1.3rem auto auto -.4rem;
    //}
  }

  &__big-label {
    width: 8.8rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    position: absolute;
    inset: 1.1rem auto auto 0;
    z-index: 0;
    transform: scale(.5);
    opacity: 0;
    transition: transform .2s ease, opacity .2s ease;

    &--visible {
      transform: scale(1.5);
      opacity: 1;
    }

    //:global(svg) {
    //  width: 420%;
    //  min-width: 420%;
    //  position: relative;
    //  inset: -1.4rem auto auto -.4rem;
    //}
  }

  &__number {
    font-size: 1.2rem;
  }
  
    &__svg-stripe-background {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: -.2rem auto auto 0;
      z-index: -1;
    }
}


// Single card ----------------------------------------------------------------
.single-card {
  width: 21.6rem;
  min-width: 21.6rem;
  height: 21.6rem;
  box-sizing: border-box;
  //border: .3rem #fff solid;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  //transition: height .05s ease, transform .02s ease;
  //transform: translateZ(0) scale(1);
  transform-origin: bottom center;
  transform-style: preserve-3d;
  opacity: 1;
  transition:
    height .1s linear,
    width .15s linear,
    min-width .15s linear,
    padding-top .1s linear,
    left .15s linear,
    transform .1s linear,
    opacity .35s ease
  ;
  will-change: height, left, transform;
  -webkit-perspective: 50.0rem;
  perspective: 50.0rem;
  -webkit-transform: translateZ(-50.0rem);

  &--slower-transition {
    transition:
      height .2s linear,
      width .25s linear,
      min-width .25s linear,
      padding-top .2s linear,
      left .1s linear,
      transform .1s linear,
      opacity .35s ease
  ;
  }
  
  &__in-wrap {
    width: 100%;
    height: 100%;
    padding-top: 2.4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    position: absolute;
    inset: 0 auto auto 0;
    transform: translateZ(0) scale(1) rotateY(0);
    transform-origin: bottom center;
    transform-style: preserve-3d;
    opacity: 1;
    transition: height .2s ease, width .2s ease, min-width .2s ease, padding-top .2s ease, left .2s ease, transform .2s linear, opacity .5s ease;
    //outline: 1px rgba(0,255,0,.2) solid;
    
    &--flip-animation-step1 { transform-origin: center center; transform: translateZ(0) scale(.7) rotateY(-180deg); opacity: .5; }
    &--flip-animation-step2 { transform-origin: center center; transform: translateZ(0) scale(.7) rotateY(-360deg); opacity: .5; }
    &--flip-animation-step3 { transform-origin: center center; transform: translateZ(0) scale(.7) rotateY(-540deg); opacity: .5; }
    &--flip-animation-step4 { transform-origin: center center; transform: translateZ(0) scale(1) rotateY(-720deg); opacity: 1; }

    &::before {
      content: '';
      width: calc(100% + 1.2rem);
      height: calc(100% + 1.8rem);
      box-sizing: border-box;
      position: absolute;
      inset: -.4rem auto auto -.6rem;
      z-index: -1;
      opacity: 1;
      background: 50% 100%/100% auto url(../../assets/images/card_bg.integrated.png) no-repeat;
      transition: transform .1s ease, opacity .5s ease;
      //outline: 1px rgba(255,0,0,.2) solid;
    }

      &--blurred {
        &::before {
          background-image: url(../../assets/images/card_bg_blurred.integrated.png);
        }
      }

    &--left-placeholder {
      &::before { background-image: url(../../assets/images/card_bg_left_placeholder.integrated.png); }
    }
    &--right-placeholder {
      &::before { background-image: url(../../assets/images/card_bg_right_placeholder.integrated.png); }
    }

    &--transparent-bg {
      &::before {
        opacity: 0;
      }
    }

    &--no-top-padding {
      padding-top: 0;
    }

    &--active-clicked {
      &::before {
        transform: scale(1.07);
      }
    }
  }
  
  &--invisible {
    opacity: 0;
  }
  
  //&--active-clicked {
  //  transition: transform .03s ease, opacity .03s ease;
  //  transform: scale(.95) translateZ(0);
  //  opacity: .7;
  //}
  
  &--wide {
    width: 24.8rem;
    min-width: 24.8rem;
  }
  
  &__progress-bar-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    inset: -2.9rem auto auto 0;
    opacity: 1;
    transition: opacity .1s ease;
    
    &--invisible {
      transition: opacity .5s ease;
      opacity: 0 !important;
    }
  }
  
    :global(.single-card__progress-bar) {
    }

  :global(.single-card__lock-icon-overlay) {
    position: absolute;
    inset: 3.9rem auto auto calc(50% - 2.2rem);
    z-index: 4;
    transform: scale(1);
    transition: top .15s ease, transform .15s ease;
    transform-origin: top center;
  }

    :global(.single-card__lock-icon-overlay--smaller-top-indent) {
      top: -1.2rem;
    }
  
    :global(.single-card__lock-icon-overlay--bigger) {
      transform: scale(1.5);
    }

    :global(.single-card__lock-icon-overlay--shaking) {
      animation-name: lockShaking;
      animation-duration: .9s;
    }

    @keyframes lockShaking {
      0%      { transform: scale(1.5) rotate(-0deg )  }
      14%     { transform: scale(1.5) rotate( 18deg)  }
      28%     { transform: scale(1.5) rotate(-15deg) }
      42%     { transform: scale(1.5) rotate( 12deg)  }
      56%     { transform: scale(1.5) rotate(-9deg )  }
      70%     { transform: scale(1.5) rotate( 6deg )   }
      85%     { transform: scale(1.5) rotate(-3deg )  }
      100%    { transform: scale(1.5) rotate( 0deg )   }
    }

    //:global(.single-card__lock-icon-overlay--invisible) {
    //  opacity: 0;
    //}
  
  //&__lock-icon-overlay {
  //  width: 6.0rem;
  //  height: 6.0rem;
  //  position: absolute;
  //  inset: 4.2rem auto auto calc(50% - 3.0rem);
  //  z-index: 4;
  //  opacity: 1;
  //  transform: scale(1);
  //  transform-origin: top center;
  //  transition: top .4s ease, transform .15s ease, opacity .4s ease;
  //  
  //  &--invisible {
  //    opacity: 0;
  //  }
  //  
  //  &--on-the-top {
  //    top: -10.0rem !important;
  //    animation: none !important;
  //  }
  //  
  //  &--bigger {
  //    transform: scale(1.5) translateY(-19%) rotate(0deg);
  //  }
  //  &--smaller-top-indent {
  //    top: .5rem;
  //  }
  //}

  &__faces-icons {
    margin-bottom: -2.0rem;
    position: relative;
    z-index: 3;
  }

  &__chapter-number {
    margin-bottom: .4rem;
    z-index: 3;
    transition: margin-bottom .2s ease;

    &--bigger-bottom-margin {
      margin-bottom: 2.5rem;
    }
  }

  &__title {
    width: 20.0rem;
    height: 3.0rem;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    font-size: 2.3rem;
    line-height: 2.3rem;
    font-family: 'ZingScriptRustR-Base',serif;
    //font-feature-settings: 'swsh', 'flac', 'liga', 'dlig', 'kern', 'fina';
    font-feature-settings: 'swsh';
    transform: scale(1) translateZ(0);
    opacity: 1;
    transition: margin .2s ease, transform .2s ease, opacity .5s ease;
    
    &--invisible {
      opacity: 0;
    }

    &--bigger-bottom-margin {
      margin-bottom: .8rem;
    }

    &--bigger {
      transform: scale(1.4);
    }

    &--much-bigger {
      margin-top: .1rem;
      transform: scale(1.7) translateZ(0);
    }

    //:global(svg) {
    //  width: 200%;
    //  min-width: 200%;
    //  position: relative;
    //  inset: 5.0rem auto auto -.7rem;
    //}
  }

    :global(.single-card__title-arc-text) {
      width: 19.2rem;
      height: 5.9rem;
      max-height: 5.9rem;
      position: absolute;
      inset: .4rem auto auto calc(50% - 9.6rem);
      transform: translateZ(0);
    }
  
  &__achiev-n-descript {
    width: 100%;
    height: 3.1rem;
    position: relative;
    opacity: 1;
    transition: opacity .9s ease;
    
    &--invisible {
      opacity: 0;
    }
  }
  
    :global(.single-card__achievements) {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0 auto auto 0;
      opacity: 1;
      filter: blur(0);
      transition: opacity .9s ease, filter .9s ease;
    }

      :global(.single-card__achievements--invisible) {
        opacity: 0;
      }
    
      :global(.single-card__achievements--blurred) {
        filter: blur(.3rem);
      }
    
      :global(.single-card__achievements--40-percent-transparent) {
        opacity: .4;
      }
  
    .single-card__level-description-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    
      :global(.single-card__level-description) {
        width: calc(100% - 6.0rem);
        height: 100%;
        position: absolute;
        inset: 0 auto auto 3.0rem;
        opacity: 1;
        transform: scale(1);
        transition: transform .35s ease, opacity .35s ease;
      }
      
        :global(.single-card__level-description--darkened) {
          opacity: .5;
        }

  :global(.single-card__action-button) {
    position: absolute;
    inset: 20.4rem auto 0 calc(50% - 1.9rem);
    transform: scale(1.2);
    transform-origin: center center;
    opacity: 0;
    transition: transform .2s ease, opacity .2s ease;
  }

    :global(.single-card__action-button--with-animation) {
      animation: buttonThrobbing;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
  
    @keyframes buttonThrobbing {
      from {transform: scale(1.3);}
      7% {transform: scale(1.45);}
      25% {transform: scale(1.2);}
      50% {transform: scale(1.3);}
      to {transform: scale(1.3);}
    }
  
    :global(.single-card__action-button--visible) {
      transform: scale(1.2);
      opacity: 1;
    }
}
</style>