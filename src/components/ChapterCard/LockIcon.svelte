<div class={ `lock-icon 
              ${mixClass}` }>
  
  <div class={ `lock-icon__in-wrap 
                ${!localIsLocked && 'lock-icon__in-wrap--invisible'}` }>

    <svg
      class={ `lock-icon__lock-latch 
                ${isLatchUnlocked && 'lock-icon__lock-latch--unlocked'}` }
      width="240" 
      height="206" 
      viewBox="0 0 240 206"
    >
      <g id="latch">
        <path style="fill-rule:evenodd; fill:#000; opacity:.25;" id="Triangle_1_copy" data-name="Triangle 1 copy" d="M239.284,205.643l-76.662-1.795V121.64c0.089-1.133.147-2.274,0.147-3.429a43.371,43.371,0,0,0-86.742-.294H75.966v85.931L0.008,205.643V119.732H0.175a119.758,119.758,0,0,1,239.515.813c0,3.19-.162,6.34-0.406,9.467v75.631Z"/>
        <path 
          style="fill-rule:evenodd; fill:{'#' + latchColor}" 
          id="Triangle_1" 
          data-name="Triangle 1" 
          d="M224.975,189.484h-46.14v-66.6c0.121-1.544.2-3.1,0.2-4.676a59.153,59.153,0,0,0-118.3-.4H60.649v71.673H14.368V119.435h0.148a105.409,105.409,0,0,1,210.817.716c0,2.808-.143,5.58-0.358,8.333v61Z" 
        />
      </g>
    </svg>

    <svg 
      class="lock-icon__lock-body" 
      width="374" 
      height="375" 
      viewBox="0 0 374 375"
    >
      {#if Array.isArray(bodyColor)}
        <!--
          $basicFontSize, $selectedChapterId and randomRerenderKey is included inside id
          because it should rerender on breakpoint change.
          Otherwise lock body gradient block will not be displayed.
        -->
        <linearGradient id={'bodyGradient' + cardId + $basicFontSize + $selectedChapterId + randomRerenderKey} x1="0" x2="0" y1="0" y2="1">
          {#each bodyColor as color,index (index)}
            <stop offset="{Math.floor(100 / (bodyColor.length - 1) * index)}%" stop-color={'#' + color} />
          {/each}
        </linearGradient>
      {/if}
      <g id="body">
        <path style="fill-rule:evenodd; fill:#000; opacity:.25;" id="Ellipse_1_copy_4" data-name="Ellipse 1 copy 4" d="M186.755,0.643c103.118,0,186.712,83.678,186.712,186.9s-83.594,186.9-186.712,186.9S0.043,290.766.043,187.544,83.637,0.643,186.755.643Z"/>
        <path 
          style="fill-rule:evenodd;
                  { Array.isArray(bodyColor) ? `fill:url(#${'bodyGradient' + cardId + $basicFontSize + $selectedChapterId + randomRerenderKey});` : `fill:#${bodyColor}`}
                " 
          id="Ellipse_1_copy" 
          data-name="Ellipse 1 copy" 
          d="M186.757,15.414c94.968,0,171.954,77.064,171.954,172.128S281.725,359.67,186.757,359.67,14.8,282.606,14.8,187.542,91.789,15.414,186.757,15.414ZM210.986,187.6l12.88,72.887H149.59l12.888-72.914A43.51,43.51,0,1,1,210.986,187.6Z" 
        />
      </g>
    </svg>

    
  </div>
  
</div>



<script>
let mixClass;
export { mixClass as class };

import { beforeUpdate } from 'svelte';


// Props ----------------------------------------------------------------------
export let isLocked = false;
export let latchColor = '0f0';
export let bodyColor = '0f0';
export let cardId = null;


// Stores ---------------------------------------------------------------------
import { basicFontSize } from '@stores/miscellaneous.js';
import { selectedChapterId } from '@stores-m/chapters.js';


// Data -----------------------------------------------------------------------
let isLatchUnlocked = false;
let isLockedOld = isLocked;


// Watch ----------------------------------------------------------------------
let localIsLocked = isLocked;
$: {
  if (!isLocked) {
    setTimeout(() => isLatchUnlocked = true, 200);
    setTimeout(() => localIsLocked = isLocked, 600);
  }
}

let randomRerenderKey = 0;
beforeUpdate(() => {
  randomRerenderKey = Math.random();
});


</script>



<style lang="scss">


// Lock icon ------------------------------------------------------------------
.lock-icon {
  width: 4.4rem;
  height: 5.8rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  
  &__in-wrap {
    opacity: 1;
    transition: opacity .5s ease;

    &--invisible {
      opacity: 0;
    }
  }
    
    &__lock-latch {
      width: 2.8rem;
      height: 2.3rem;
      position: absolute;
      inset: 0 auto auto calc(50% - 1.4rem);
      z-index: 1;
      transform: rotate(0);
      transform-origin: left bottom;
      transition: transform .3s ease;
      
      &--unlocked {
        transform: rotate(-30deg);
      }
    }
    
    &__lock-body {
      width: 4.4rem;
      height: 4.4rem;
      position: absolute;
      inset: auto auto 0 0;
      z-index: 2;
    }

  //@keyframes lockShaking {
  //  0%    { transform: scale(1.5) translateY(-19%) rotate(-0deg);  }
  //  14%   { transform: scale(1.5) translateY(-19%) rotate(18deg);  }
  //  28%   { transform: scale(1.5) translateY(-19%) rotate(-15deg); }
  //  42%   { transform: scale(1.5) translateY(-19%) rotate(12deg);  }
  //  56%   { transform: scale(1.5) translateY(-19%) rotate(-9deg);  }
  //  70%   { transform: scale(1.5) translateY(-19%) rotate(6deg);   }
  //  85%   { transform: scale(1.5) translateY(-19%) rotate(-3deg);  }
  //  100%  { transform: scale(1.5) translateY(-19%) rotate(0deg);   }
  //}
}

</style>