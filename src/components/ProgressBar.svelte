<div class={ `progress-bar 
              ${type === 'single' && 'progress-bar--single'}
              ${type === 'double' && 'progress-bar--double'}
              ${type === 'triple' && 'progress-bar--triple'}
              ${mixClass}` }>
  <div 
    class="{ `progress-bar__bullet-revolver 
              ${type === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}` }"
    style="transform: rotate({progress / (type === 'single' ? 5.76 : 3.56) + 'deg'})"
  >
    <div 
      class="progress-bar__bullet-container"
      style="transform: rotate({type === 'single' ? -8.7 : -14}deg);"
    >
      <div class="progress-bar__bullet"></div>
    </div>
  </div>
  
  <div class={ `progress-bar__scale-container 
                ${type === 'single' && 'progress-bar__scale-container--single'}
                ${type === 'double' && 'progress-bar__scale-container--double'}
                ${type === 'triple' && 'progress-bar__scale-container--triple'}` }>

    <div
      class="{ `progress-bar__bullet-revolver 
                ${type === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}` }"
      style="transform: rotate({progress / (type === 'single' ? 5.76 : 3.56) + 'deg'})"
    >
      <div 
        class="progress-bar__bullet-container"
        style="transform: rotate({type === 'single' ? -8.7 : -14}deg);"
      >
        <div class="progress-bar__bullet-shadow"></div>
      </div>
    </div>
    
    <div class="{ `progress-bar__scale-wrapper 
                    ${type === 'single' && 'progress-bar__scale-wrapper--narrow'}` }">
      <div 
        class="progress-bar__color-line 
                progress-bar__color-line--left"
        style="width: {progress}%;"
      >
        <div 
          class={ `progress-bar__color-line-inner 
                    progress-bar__color-line-inner--left 
                    ${type === 'single' && 'progress-bar__color-line-inner--narrow'}` }
          style="background: linear-gradient(90deg, 
            rgb({convertHexToRgbString(gradientColors[0])}) 0%, 
            rgb({convertHexToRgbString(gradientColors[1])}) 45%, 
            rgb({convertHexToRgbString(gradientColors[1])}) 55%, 
            rgb({convertHexToRgbString(gradientColors[2])}) 
            100%);"
        ></div>
      </div>
      <div 
        class="progress-bar__color-line 
                progress-bar__color-line--right"
        style="width: {100 - progress}%;"
      >
        <div 
          class={ `progress-bar__color-line-inner 
                    progress-bar__color-line-inner--right 
                    ${type === 'single' && 'progress-bar__color-line-inner--narrow'}` }
          style="background: linear-gradient(90deg,
            rgb({convertHexToRgbString(gradientColors[0])}) 0%,
            rgb({convertHexToRgbString(gradientColors[1])}) 45%,
            rgb({convertHexToRgbString(gradientColors[1])}) 55%,
            rgb({convertHexToRgbString(gradientColors[2])})
            100%);"
        ></div>
      </div>
      <div 
        class="progress-bar__scale"
        style="left: {progress}%;"
      >
      </div>
    </div>
    
  </div>
  
  <div class="titles 
              progress-bar__titles">
    
    {#if type === 'single'}
      <ArcText
        class="titles__title 
                titles__title--single"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[0]?.toUpperCase() }
      </ArcText>
      
      {:else if type === 'double'}
      <ArcText
        class="titles__title 
                titles__title--double-first"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[0]?.toUpperCase() }
      </ArcText>
      
      <ArcText
        class="titles__title 
                titles__title--double-second"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[1]?.toUpperCase() }
      </ArcText>

    {:else if type === 'triple'}
      <ArcText
        class="titles__title 
                titles__title--triple-first"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[0]?.toUpperCase() }
      </ArcText>

      <ArcText
        class="titles__title 
                titles__title--triple-second"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[1]?.toUpperCase() }
      </ArcText>

      <ArcText
        class="titles__title 
                titles__title--triple-third"
        debugMode={false}
        roundness="3.9"
        fontSize="18"
        topShift="-.9"
        color="#fff"
      >
        { titles[2]?.toUpperCase() }
      </ArcText>
      
    {/if}
    
  </div>

</div>


<script>
let mixClass;
export { mixClass as class };

import { hexToRgb } from '@utils/colors';

// Props ----------------------------------------------------------------------
export let progress = 0;
export let type = 'single';
export let titles = [];
export let gradientColors = [];

// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';


// Convert hex to rgb string --------------------------------------------------
function convertHexToRgbString(hex) {
  if (hex === undefined) return '0,0,0'
  const colorObj = hexToRgb(hex);
  const r = colorObj.r, 
        g = colorObj.g,
        b = colorObj.b;
  
  return `${r},${g},${b}`
}

</script>


<style lang="scss">
  
  
// Titles ---------------------------------------------------------------------
.titles {
  position: relative;
  
  :global(.titles__title) {
    width: 8.0rem;
    height: 100%;
    max-height: 100%;
    position: absolute;
  }
  
    :global(.titles__title--single) {
      inset: .8rem auto auto calc(50% - 4.0rem);
    }
  
  
    :global(.titles__title--double-first) {
      inset: .8rem auto auto calc(29% - 4.0rem);
      transform: rotate(-8deg);
    }
    :global(.titles__title--double-second) {
      inset: .8rem auto auto calc(71% - 4.0rem);
      transform: rotate(8deg);
    }

  
    :global(.titles__title--triple-first) {
      inset: 1.0rem auto auto calc(19.8% - 4.0rem);
      transform: rotate(-10deg);
    }
    :global(.titles__title--triple-second) {
      inset: .6rem auto auto calc(50.1% - 4.0rem);
    }
    :global(.titles__title--triple-third) {
      inset: 1.0rem auto auto calc(80.4% - 4.0rem);
      transform: rotate(10deg);
    }
}


// Progress bar ---------------------------------------------------------------
.progress-bar {
  width: 15.6rem;
  min-width: 15.6rem;
  height: 3.2rem;
  padding-top: .4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transform: scale(1.1);
  background: 50% .2rem/100% auto no-repeat;

    &--single {
      background-image: url(../assets/images/progressbar_single_bg2.integrated.png);
    }
    &--double {
      background-image: url(../assets/images/progressbar_double_bg.integrated.png);
    }
    &--triple {
      background-image: url(../assets/images/progressbar_triple_bg.integrated.png);
    }

    &__bullet-revolver {
      width: 56.8rem;
      height: 56.8rem;
      border-radius: 200.0rem;
      position: absolute;
      top: .7rem;
      z-index: 2;
      transition: transform .15s ease;
      
      &--bigger-top-indent {
        top: 1.0rem;
      }
    }
  
      &__bullet-container {
        width: 1.6rem;
        height: 100%;
        position: absolute;
        inset: 0 auto auto calc(50% - .8rem);
      }
  
      &__bullet {
        width: 0;
        height: 0;
        position: absolute;
        inset: 0 auto auto 50%;
        z-index: 2;
        transition: bottom .15s ease, left .15s ease;
    
        &::before {
          content: '';
          width: .5rem;
          min-width: .5rem;
          height: .5rem;
          min-height: .5rem;
          border-radius: 8.0rem;
          position: absolute;
          inset: 0 auto auto calc(50% - .2rem);
          background: #fff;
        }
      }
  
  &__scale-container {
    width: 100%;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 1;
    
    mask-size: 100%;
    mask-repeat: no-repeat;
    mask-position: center;

    &--single {
      mask-image: url(../assets/images/progressbar_single_clipping_mask.integrated.png);
    }
    &--double {
      mask-image: url(../assets/images/progressbar_double_clipping_mask.integrated.png);
    }
    &--triple {
      mask-image: url(../assets/images/progressbar_triple_clipping_mask6.integrated.png);
    }
  }
    
    &__bullet-shadow {
      width: .9rem;
      height: 300%;
      position: absolute;
      inset: 0 auto auto calc(50% - .4rem);
      z-index: 2;
      background: black;
      opacity: .5;
      mix-blend-mode: multiply;
      transition: top .15s ease, left .15s ease;
    }
  
    &__scale-wrapper {
      width: calc(100% - .8rem);
      height: 100%;
      position: absolute;
      inset: 0 auto auto .4rem;
      
      &--narrow {
        width: calc(100% - 6.4rem);
        left: 3.2rem;
        outline: .1rem #f00 solid;
      }
    }
  
      &__color-line {
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        inset: 0 auto auto auto;
        overflow: hidden;
        
        &--left { 
          justify-content: flex-start;
          left: 0;
        }
        &--right { 
          justify-content: flex-end;
          right: 0; 
        }
      }
  
        &__color-line-inner {
          width: calc(15.6rem - 1.6rem);
          min-width: calc(15.6rem - 1.6rem);
          height: 100%;
          position: absolute;
          top: 0;
          
          &--narrow {
            width: calc(15.6rem - 6.4rem);
            min-width: calc(15.6rem - 6.4rem);
          }
          
          &--left {
            background: rgba(255,0,0,1);
          }
          &--right {
            opacity: .25;
            background: rgba(255,255,255,.3);
          }
        }
  
      &__scale {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        position: absolute;
        inset: 0 auto auto 0;
        z-index: 1;
        transform: translateX(-50%);
        transition: top .15s ease, left .15s ease;
      }
  
  &__titles {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
  }
}

</style>