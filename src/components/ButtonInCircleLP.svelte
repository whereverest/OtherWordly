<div 
  class={ `single-nav-button 
              ${isActive && 'single-nav-button--active'}
              ${mixClass}` }
  {id}
  on:click
>
  
  <div class={ `single-nav-button__icon-container 
                ${backwardsGradient && 'single-nav-button__icon-container--backwards-gradient'}
                ${isThickBorder && 'single-nav-button__icon-container--thick-border'}
                ${prominent && 'single-nav-button__icon-container--prominent'}` }>

    {#if textInCircle && typeof textInCircle === 'string'}
        <span class={ `single-nav-button__text-in-circle
                        ${isTextInCircleSmall && 'single-nav-button__text-in-circle--small'}` }>
          { textInCircle }
        </span>
      {:else if textInCircle && Array.isArray(textInCircle) }
        <span class={ `single-nav-button__text-in-circle
                        ${isTextInCircleSmall && 'single-nav-button__text-in-circle--small'}` }>
          <span class="single-nav-button__text-in-circle-line1">{ textInCircle[0] }</span>
          <span class="single-nav-button__text-in-circle-line2">{ textInCircle[1] }</span>
        </span>
    {/if}
    
    {#if icons[iconName]?.type === 'svg'}
        <Icon
          class={ `single-nav-button__svg-icon
                    ${textInCircle && 'single-nav-button__svg-icon--small'}
                    ${isWithBounceAnimation && 'single-nav-button__svg-icon--with-bounce-animation'}
                    ${isTextInCircleSmall && 'single-nav-button__svg-icon--tiny'}` }
          data={ icons[iconName].import }
        />
      {:else if icons[iconName]?.type === 'img'}
        <img
          class={ `single-nav-button__png-icon 
                    ${textInCircle && 'single-nav-button__png-icon--small'}
                    ${isWithBounceAnimation && 'single-nav-button__png-icon--with-bounce-animation'}
                    ${isTextInCircleSmall && 'single-nav-button__png-icon--tiny'}` }
          alt="Forward"
          src={ icons[iconName].import }
        />
    {/if}

  </div>

  {#if text && !isTextArc}
      <div
        class={ `single-nav-button__text
                  ${isTextOnTop && 'single-nav-button__text--on-top'}` }
        contenteditable="true"
        bind:innerHTML={ text }
      >
      </div>
    {:else if isTextArc}
      <ArcText
        class={ `single-nav-button__arc-text 
                  ${isTextOnTop && 'single-nav-button__arc-text--on-top'}` }
        debugMode={false}
        roundness="22"
        fontSize="33"
        topShift=".8"
        color="#fff"
        viewPortStart="0 -40"
      >
        {text}
      </ArcText>
  {/if}
  
</div>



<script>
let mixClass;
export { mixClass as class };


// Props ----------------------------------------------------------------------
export let iconName = '';
export let text = '';
export let textInCircle = '';
export let isTextInCircleSmall = false;
export let backwardsGradient = false;
export let prominent = false;
export let id = '';
export let isTextOnTop = false;
export let isTextArc = false;
export let isThickBorder = false;
export let isMiniFontMode = false;
export let isActive = false;
export let isWithBounceAnimation = false;


// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';
import Icon from 'svelte-icon';


import houseIcon from '@icons/house.svg';
import gearIcon from '@icons/gear.svg';
import starIcon from '@icons/star.svg';
import giftBoxIcon from '@icons/gift_box.svg';
import howToIcon from '@images/how_to_icon.integrated.png';
import accessIcon from '@icons/access.svg';
import infoIcon from '@icons/info.svg';
import flashForwardIcon from '@icons/flash-forward.svg';
import toBeginningIcon from '@icons/to-beginning.svg';
import recapIcon from '@icons/recap.svg';
import menuIcon from '@icons/menu.svg';

import arrowReturnBack from '@images/arrow_return_back3.integrated.png';
import arrowRefresh from '@images/arrow_refresh.integrated.png';
import arrowRightIconImage from '@images/arrow_right_icon.integrated.png';
import arrowLeftIconImage from '@images/arrow_left_icon.integrated.png';
import stopIconImage from '@images/stop_icon.integrated.png';
import crossIconImage from '@images/cross_icon.integrated.png';

const icons = {
  house: { type: 'svg', import: houseIcon },
  gear: { type: 'svg', import: gearIcon },
  star: { type: 'svg', import: starIcon },
  gift: { type: 'svg', import: giftBoxIcon },
  access: { type: 'svg', import: accessIcon },
  info: { type: 'svg', import: infoIcon },
  flashForward: { type: 'svg', import: flashForwardIcon },
  toBeginning: { type: 'svg', import: toBeginningIcon },
  recap: { type: 'svg', import: recapIcon },
  menu: { type: 'svg', import: menuIcon },

  howto: { type: 'img', import: howToIcon },
  arrowReturnBack: { type: 'img', import: arrowReturnBack },
  arrowRefresh: { type: 'img', import: arrowRefresh },
  arrowRight: { type: 'img', import: arrowRightIconImage },
  arrowLeft: { type: 'img', import: arrowLeftIconImage },
  stop: { type: 'img', import: stopIconImage },
  cross: { type: 'img', import: crossIconImage }
};

</script>



<style lang="scss">
  
  
// Single nav button ----------------------------------------------------------
.single-nav-button {
  width: 4.0rem;
  min-width: 4.0rem;
  height: 4.0rem;
  min-height: 4.0rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  position: relative;
  transform: scale(1);
  transform-origin: bottom center;
  opacity: 1;
  transition: transform .05s ease, opacity .05s ease;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  
  * {
    pointer-events: none;
  }
  
  &::before {
    content: '';
    width: calc(100% + 3.0rem);
    min-width: calc(100% + 3.0rem);
    height: calc(100% + 3.0rem);
    min-height: calc(100% + 3.0rem);
    position: absolute;
    inset: 50% auto auto 50%;
    z-index: 2;
    transform: translate(-50%,-50%);
    touch-action: none;
  }

  &__icon-container {
    width: 3.2rem;
    height: 3.2rem;
    min-height: 3.2rem;
    padding-bottom: .2rem;
    margin-bottom: -.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    z-index: 0;
    font-size: 1.3rem;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: .15rem rgba(255,255,255,.3) solid;
      border-radius: 40.0rem;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      position: absolute;
      inset: 0 auto auto 0;
      z-index: -1;
      background: rgba(0,0,0,.25);
      mask-image: linear-gradient(0deg, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 90%);
      transition: transform .1s ease;
    }
    
    &--backwards-gradient {
      &::before {
        mask-image: linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%);
      }
      
      :global(svg),
      :global(img) {
        top: .1rem;
      }
    }

    &--prominent {
      &::before {
        border-color: rgba(255,255,255,.8);
        background: rgba(0,0,0,.45);
      }
    }

    &--thick-border {
      &::before { border-width: .2rem !important; }
    }
  }

    &:active,
    &--active {
      .single-nav-button__icon-container::before {
        transform: scale(1.3);
      }
    }
  
    :global(.single-nav-button__svg-icon) {
      width: 32%;
      height: 32%;
      position: relative;
      fill: #fff;
    }

      :global(.single-nav-button__svg-icon--small) {
        width: 35%;
        height: 35%;
      }

      :global(.single-nav-button__svg-icon--tiny) {
        width: 23%;
        height: 23%;
        top: .2rem;
      }

      :global(.single-nav-button__svg-icon--with-bounce-animation) {
        animation-duration: 6s;
        animation-name: bounce-spin;
        animation-iteration-count: infinite;
      }

    :global(.single-nav-button__png-icon) {
      width: 32%;
      position: relative;
    }

      :global(.single-nav-button__png-icon--small) {
        width: 35%;
        height: 35%;
      }

      :global(.single-nav-button__png-icon--tiny) {
        width: 23%;
        height: 23%;
        top: .2rem;
      }

      :global(.single-nav-button__png-icon--with-bounce-animation) {
        animation-duration: 6s;
        animation-name: bounce-spin;
        animation-iteration-count: infinite;
      }

  &__text {
    position: relative;
    z-index: -1;
    font-family: 'MuseoSlabRounded-300',serif;
    font-size: .7rem;
    line-height: .9rem;
    text-transform: uppercase;
    white-space: nowrap;
    pointer-events: none;
    touch-action: none;
    user-select: none;
    
    &--on-top {
      width: 100%;
      position: absolute;
      inset: -.2rem auto auto 0;
      text-align: center;
    }
  }

  :global(.single-nav-button__arc-text) {
    width: 1.8rem;
    height: 4.8rem;
    position: absolute;
    inset: -1.9rem auto auto 50%;
    transform: translateX(-50%) scale(.55);
    font-family: 'MuseoSlabRounded-300',serif;
    font-size: .7rem;
    line-height: .7rem;
    color: #fff;
    text-transform: uppercase;
  }

    :global(.single-nav-button__arc-text--on-top) {
    }
  
    &__text-in-circle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      top: .2rem;
      line-height: 1.0rem;
      
      &--small {
        font-size: 1.0rem;
      }
    }

      &__text-in-circle-line1 {
        font-size: .6rem;
        line-height: .75rem;
      }
      &__text-in-circle-line2 {
        font-size: .6rem;
        line-height: .75rem;
      }
}

@keyframes bounce-spin {
  from {transform-origin: center center; transform: scale(1);animation-timing-function: ease-out;}
  50% {transform-origin: center center; transform: scale(1);animation-timing-function: ease-out;}
  52% {transform-origin: center center; transform: scale(1.3) rotateZ(30deg);animation-timing-function: ease-in-out;}
  57% {transform-origin: center center; transform: scale(1) rotateZ(-10deg);animation-timing-function: ease-in-out;}
  60% {transform-origin: center center; transform: scale(1) rotateZ(0deg);}
  to {transform-origin: center center; transform: scale(1) rotateZ(0deg);}
}
  
</style>