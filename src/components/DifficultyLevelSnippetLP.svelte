<div
  class={ `${isMiniFontMode && 'challenge-li-mini-font-mode '}
              option-snippet
              ${isMiniFontMode && 'option-snippet--portrait-mode'}
              ${isMiniFontMode && (!isWithDivider || isActive) && 'option-snippet--portrait-mode--without-divider'}
              ${isMiniFontMode && isActive && !isSimplified && 'option-snippet--portrait-mode--active'}
              ${isMiniFontMode && isActive && isSimplified && 'option-snippet--portrait-mode--active-small'}
              ${isMiniFontMode && isSimplified && 'option-snippet--portrait-mode--small'}
              ${isMiniFontMode && mixClass}

              ${!isMiniFontMode && (!isWithDivider || isActive) && 'option-snippet--without-divider'}
              ${!isMiniFontMode && isActive && !isSimplified && 'option-snippet--active'}
              ${!isMiniFontMode && isActive && isSimplified && 'option-snippet--active-small'}
              ${!isMiniFontMode && isSimplified && 'option-snippet--small'}
              ${!isMiniFontMode && mixClass}` }
  on:click={ () => dispatch('click') }
>

  <!-- Decorative parentheses -->
  <div class="decorative-parentheses
              option-snippet__decorative-parentheses">
    {#each [0,1,2] as parenthesis,index (parenthesis)}
      <div class={ `decorative-parentheses__single-parenthesis
                    ${isMiniFontMode && 'decorative-parentheses__single-parenthesis--portrait-mode'}
                    ${isMiniFontMode && isSimplified && 'decorative-parentheses__single-parenthesis--portrait-mode--higher'}
                    ${isMiniFontMode && index === 1 && 'decorative-parentheses__single-parenthesis--portrait-mode--small'}
                    ${isMiniFontMode && index === 1 && isSimplified
                                  && 'decorative-parentheses__single-parenthesis--portrait-mode--small-simplified'}
                    ${isMiniFontMode && index === 2 && 'decorative-parentheses__single-parenthesis--portrait-mode--tiny'}
                    ${isMiniFontMode && index === 2 && isSimplified
                                  && 'decorative-parentheses__single-parenthesis--portrait-mode--tiny-simplified'}
                    ${isMiniFontMode && !isActive && 'decorative-parentheses__single-parenthesis--portrait-mode--inactive'}

                    ${!isMiniFontMode && isSimplified && 'decorative-parentheses__single-parenthesis--higher'}
                    ${!isMiniFontMode && index === 1 && 'decorative-parentheses__single-parenthesis--small'}
                    ${!isMiniFontMode && index === 1 && isSimplified
                                  && 'decorative-parentheses__single-parenthesis--small-simplified'}
                    ${!isMiniFontMode && index === 2 && 'decorative-parentheses__single-parenthesis--tiny'}
                    ${!isMiniFontMode && index === 2 && isSimplified
                                  && 'decorative-parentheses__single-parenthesis--tiny-simplified'}
                    ${!isMiniFontMode && !isActive && 'decorative-parentheses__single-parenthesis--inactive'}`}
                    >
      </div>
    {/each}
  </div><!-- / Decorative parentheses -->

  <div class={ `option-snippet__complexity
                ${isMiniFontMode && 'option-snippet__complexity--portrait-mode'}
                ${isMiniFontMode && isSimplified && 'option-snippet__complexity--portrait-mode--small'}
                ${!isMiniFontMode && isSimplified && 'option-snippet__complexity--small'}` }>
    { levelComplexity }
  </div>
  <div class={ `${isMiniFontMode && 'snippet-name-mini-font-mode '} option-snippet__name
                ${isSimplified && 'option-snippet__name--small'}
                ${isActive && !isSimplified && 'option-snippet__name--active-big'}
                ${isActive && isSimplified && 'option-snippet__name--active-small'}`}>
    { levelName }
  </div>
  <div class={ `${isMiniFontMode && 'snippet-description-mini-font-mode '} option-snippet__description
                ${isSimplified && 'option-snippet__description--small'}` }>
    {#if isMiniFontMode}
      {levelDescription[0]}{levelDescription[1]}
    {:else}
      {levelDescription[0]}<br/>{levelDescription[1]}
    {/if}
  </div>

  {#if !isSimplified}
    <div class="option-snippet__buttons-section">
      <div class={ `option-snippet__button-wrapper
                    ${!isActive && 'option-snippet__button-wrapper--hidden'}
                    ${!isActive && 'option-snippet__button-wrapper--inactive'}` }>
        <ButtonInCircleLP
          class="option-snippet__button"
          backwardsGradient={true}
          prominent={true}
          iconName="arrowReturnBack"
          on:click={ () => dispatch('deactivate') }
        />
      </div>
      <div class={ `option-snippet__button-wrapper
                    ${!isActive && 'option-snippet__button-wrapper--inactive'}` }>

        <CircleProgressBarLP
          class={ `option-snippet__button-progressbar
                    ${!isActive && 'option-snippet__button-progressbar--invisible'}` }
          progress={ $activeChallengeTimeout }
        />

        <ButtonInCircleLP
          class="option-snippet__button"
          backwardsGradient={true}
          prominent={true}
          iconName="arrowRight"
          isMiniFontMode={isMiniFontMode}
          on:click={() => {
            dispatchIosEvent({ tapped: "OWJSMsgFirstPlayHide" });
          }}
        />
      </div>
    </div>
  {/if}

</div>



<script>
let mixClass;
export { mixClass as class };

import { dispatchIosEvent } from "@helpers/iosEvents.js";
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

// Props
export let isSimplified = false;
export let levelName = '';
export let levelComplexity = '';
export let levelDescription = [];
export let isActive = false;
export let isWithDivider = false;
export let isMiniFontMode = false;

// Components
import ButtonInCircleLP from '@components/ButtonInCircleLP.svelte';
import CircleProgressBarLP from '@components/CircleProgressBarLP.svelte';



// Active Challenge timeout ---------------------------------------------------
import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';

const activeChallengeTimeout = tweened(0);
$: {
  if (isActive) {
    activeChallengeTimeout.set(100, {
      duration: 5000,
      easing: linear
    });
  } else {
    activeChallengeTimeout.set(0, {
      duration: 1,
      easing: linear
    });

  }
}

import { onMount } from 'svelte';
onMount(() => {

});

</script>



<style lang="scss">



// Decorative parentheses -----------------------------------------------------
.decorative-parentheses {
  position: relative;
  overflow: hidden;

  &__single-parenthesis {
    width: calc(120% - 4.0rem);
    height: 140%;
    box-sizing: border-box;
    border: .2rem rgba(255,255,174,.6) solid;
    border-radius: 50%;
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -45%) scaleX(.75);
    mask-image: linear-gradient(0deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 75%);
    opacity: 1;
    transition: width .25s ease, opacity .25s ease;
    transition-delay: .3s;

    &--portrait-mode {
      margin-top: -3rem;
      width: calc(140% - 4.0rem);
      height: 180%;
      &--higher {
        height: 190%;
        top: calc(50% - 1.0rem);
      }

      &--small {
        width: calc(140% - 3.2rem);
        mask-image: linear-gradient(0deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%);
        transition-delay: .33s;
        opacity: .7;
      }

        &--small-simplified {
          width: calc(140% - 3.3rem);
        }

      &--tiny {
        width: calc(140% - 2.4rem);
        mask-image: linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 65%);
        transition-delay: .36s;
        opacity: .4;
      }

        &--tiny-simplified {
          width: calc(140% - 2.6rem);
        }

      &--inactive {
        opacity: 0;
        width: 85%;
        transition-delay: .2s;
      }
    }

    &--higher {
      height: 190%;
      top: calc(50% - 1.0rem);
    }

    &--small {
      width: calc(120% - 3.2rem);
      mask-image: linear-gradient(0deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%);
      transition-delay: .33s;
      opacity: .7;
    }

      &--small-simplified {
        width: calc(120% - 3.3rem);
      }

    &--tiny {
      width: calc(120% - 2.4rem);
      mask-image: linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 65%);
      transition-delay: .36s;
      opacity: .4;
    }

      &--tiny-simplified {
        width: calc(120% - 2.6rem);
      }

    &--inactive {
      opacity: 0;
      width: 85%;
      transition-delay: .2s;
    }
  }
}


// Option snippet -------------------------------------------------------------
.option-snippet {
  width: 24.2rem;
  min-width: 24.2rem;
  height: 15.0rem;
  position: relative;
  transform: scale(1) translateZ(0);
  font-size: 1.0rem;
  line-height: 1.6rem;
  text-align: center;
  transition: transform .5s ease, opacity .2s ease;

  &--portrait-mode {
    &::after {
      content: '';
      width: 19rem !important;
      height: 0.3rem !important;
      inset: calc(100% - 1.7rem) 0 auto auto !important;
      mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%) !important;
      left: 3rem !important;
    }

    &--small {
      &::after {
        height: 9.0rem !important;
        right: .7rem !important;
      }
    }

    &--without-divider {
      &::after {
        opacity: 0 !important;
      }
    }

    &--active {
      transform: scale(1.25) translateZ(0);
      transition: transform .5s cubic-bezier(0.65, -1.8, 0.36, 3.5), opacity .2s ease;
    }

    &--active-small {
      transform: scale(1.15) translateZ(0);
      transition: transform .5s cubic-bezier(0.65, -1.8, 0.36, 3.5), opacity .2s ease;
    }
  }

  &--small {
    width: 17.2rem;
    min-width: 17.2rem;
    height: 9.0rem;
  }

  &--active {
    transform: scale(1.25) translateZ(0);
    transition: transform .5s cubic-bezier(0.65, -1.8, 0.36, 3.5), opacity .2s ease;
  }

  &--active-small {
    transform: scale(1.15) translateZ(0);
    transition: transform .5s cubic-bezier(0.65, -1.8, 0.36, 3.5), opacity .2s ease;
  }

  &::after {
    content: '';
    width: .2rem;
    height: 12.0rem;
    position: absolute;
    inset: calc(50% - 4.0rem) 0 auto auto;
    background: rgba(255,255,255,.2);
    mask-image: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);;
    opacity: 1;
    transition: opacity .2s ease;
  }

  &--small {
    &::after {
      height: 9.0rem;
      right: .7rem;
    }
  }

  &--without-divider {
    &::after {
      opacity: 0;
    }
  }

  &__decorative-parentheses {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }

  &__complexity {
    font-size: 1.2rem;
    color: rgba(255,255,255,.35);
    text-transform: uppercase;

    &--portrait-mode {
      padding-bottom: .5rem;
      font-size: 1.4rem;
    }

    &--small {
      font-size: 1.0rem;
      margin-bottom: -1.0rem;
    }
  }

  &__name {
    margin-bottom: .7rem;
    font: 3.4rem/4.0rem 'ZingScriptRustR-Base',sans-serif;
    color: #FFFFAE;
    transform: scale(1) translateZ(0);
    transition: transform .5s ease;

    &--active-big {
      transform: scale(1.18) translateZ(0);
      transition: transform .5s cubic-bezier(0.65, -2.8, 0.36, 4.5);
    }

    &--small {
      margin-bottom: -.3rem;
      transform: scale(.6) translateZ(0);
    }

    &--active-small {
      transform: scale(.8) translateZ(0);
      transition: transform .5s cubic-bezier(0.65, -2.8, 0.36, 4.5);
    }
  }

  &__description {
    margin-bottom: 2.0rem;
    font-size: 2.1rem;
    line-height: 2.3rem;

    &--small {
      font-size: 1.5rem;
      line-height: 1.8rem;
    }
  }

  &__buttons-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

    &__button-wrapper {
      width: 6.0rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transform: scale(1.3);
      opacity: 1;
      transition: width .2s ease, opacity .6s ease;

      &--inactive {
        pointer-events: none;
      }

      &--hidden {
        width: 0;
        opacity: 0;
        transition: width .2s ease, opacity .2s ease;
      }
    }

      :global(.option-snippet__button-progressbar) {
        width: 3.2rem;
        height: 3.2rem;
        margin-top: -.35rem;
        position: absolute;
        inset: 50% auto auto 50%;
        transform: translate(-50%,-50%);
        transition: opacity .15s ease;
        opacity: .35;
      }

      :global(.option-snippet__button-progressbar--invisible) {
        opacity: 0;
      }

    :global(.option-snippet__button) {}
}

.snippet-name-mini-font-mode {
  font-size: 3.2rem;
  line-height: 2rem;
}

.snippet-description-mini-font-mode {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.challenge-li-mini-font-mode {
  margin-bottom: 1.7vh;
}

</style>