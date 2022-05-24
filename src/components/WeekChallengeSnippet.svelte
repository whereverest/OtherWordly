<div 
  class={ `week-challenge-snippet 
            ${mixClass}` }
  on:click
>

  <div class="week-challenge-snippet__title">
    Weekly Challenge!
  </div>
  <div class="challenge-timer 
                    week-challenge-snippet__challenge-timer">
    <div class="challenge-timer__icon-container">
      <Icon data={timerIcon} />
    </div>
    <div class="challenge-timer__text">
      { $currentChallengeTimer }
    </div>
  </div>

  <div class="week-challenge-snippet__bg-layer1">
    <svg width="512" height="86" viewBox="0 0 512 86">
      <path d="M509.705,85.4L498.743,30.475c-3.331-15.585-19.369-27.909-35.906-27.909H49.162c-16.537,0-32.575,12.323-35.9,27.909L2.3,85.4H-0.031L11.229,28.82C14.587,13.06,30.76.6,47.434,0.6H464.566c16.674,0,32.847,12.462,36.205,28.223L512.031,85.4h-2.326Z"/>
    </svg>
  </div>
  <div class="week-challenge-snippet__bg-layer2">
    <svg width="512" height="86" viewBox="0 0 512 86">
      <path d="M-0.031,85.4L11.229,28.82C14.587,13.06,30.76.6,47.434,0.6H464.566c16.674,0,32.847,12.462,36.205,28.223L512.031,85.4H-0.031Z"/>
    </svg>
  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

// Stores ---------------------------------------------------------------------
import { currentChallengeTimer } from '@stores-m/weeklyChallenges.js';

// Components -----------------------------------------------------------------
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import Icon from 'svelte-icon';

// Icons ----------------------------------------------------------------------
  // singles
import timerIcon from '@icons/timer.svg';
  
</script>



<style lang="scss">
  
  
// Challenge timer ------------------------------------------------------------
.challenge-timer {
  display: flex;
  align-content: center;
  align-items: center;
  font-family: 'MuseoSlabRounded-300',serif;
  font-size: 1.1rem;
  line-height: 1.1rem;
  text-transform: uppercase;

  &__icon-container {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .4rem;

    :global(svg) {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }

  &__text {
    padding-top: .2rem;
  }
}
  

// Weekly challenge snippet ---------------------------------------------------
.week-challenge-snippet {
  width: 28.8rem;
  min-width: 28.8rem;
  max-width: 28.8rem;
  height: 4.8rem;
  min-height: 4.8rem;
  max-height: 4.8rem;
  padding-bottom: .6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  touch-action: none;
  
  &::before {
    content: '';
    width: calc(100% + 1.0rem);
    height: calc(100% + 1.0rem);
    position: absolute;
    inset: -.5rem auto auto -.5rem;
    //background: rgba(255,0,0,.2);
  }

  &__title {
    height: 1.6rem;
    margin-right: 1.2rem;
    display: flex;
    align-content: center;
    align-items: center;
    font-size: 2.1rem;
    line-height: 0;
    font-family: 'ZingScriptRustR-Base',serif;
    font-feature-settings: 'swsh';
    color: #fefea3;
  }

  &__challenge-timer {
    height: 1.6rem;
    padding-top: .4rem;
  }

  &__bg-layer1 {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto calc(50% - 14.4rem);
    z-index: -1;
    opacity: .3;
    mask-image: linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 100%);
    transition: transform .1s ease;

    :global(svg) {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }
    &:active {
      .week-challenge-snippet__bg-layer1 {
        transform: scale(1.17, 1.3);
      }
    }
  &__bg-layer2 {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto calc(50% - 14.4rem);
    z-index: -2;
    opacity: .4;
    mask-image: linear-gradient(0deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%);
    transition: transform .1s ease;

    :global(svg) {
      width: 100%;
      height: 100%;
    }
  }

    &:active {
      .week-challenge-snippet__bg-layer2 {
        transform: scale(1.17, 1.3);
      }
    }
}

</style>