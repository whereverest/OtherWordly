<div 
  class={ `level-description 
            ${scrollPosition >= maxScrollPosition && maxScrollPosition > 0 
                                            && 'level-description--hidden-top'}
            ${scrollPosition === 0 && maxScrollPosition > 0 
                                            && 'level-description--hidden-bottom'}
            ${scrollPosition > 0 && scrollPosition < maxScrollPosition 
                                            && 'level-description--hidden-top-n-bottom'}
            ${mixClass}`}
  bind:this={refRootContainer}
>
  <div 
    class="level-description__inner"
    bind:this={refDescriptionInner}
    style="transform: translateY({-scrollPosition}px)"
  >
    {text}
  </div>
</div>



<script>
let mixClass;
export { mixClass as class };

import { onMount, onDestroy } from 'svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();


// Props ----------------------------------------------------------------------
export let text = '';


// Data -----------------------------------------------------------------------
let scrollStartTime;
let scrollPosition = 0;
let maxScrollPosition = 0;


// Refs (pointers to DOM elements) --------------------------------------------
let refRootContainer;
let refDescriptionInner;


// Methods --------------------------------------------------------------------
function scrollTextToTop(timeStamp) {
  if (maxScrollPosition === 0) {
    return
  }
  
  if (scrollStartTime === 0) {
    scrollStartTime = timeStamp;
  }
  
  if (timeStamp - scrollStartTime < 100) {
    requestAnimationFrame(scrollTextToTop);
    return;
  } else if (scrollPosition >= maxScrollPosition) {
    setTimeout(() => dispatch('scrollEnd'), 2500);
    return;
  }

  scrollStartTime = timeStamp
  scrollPosition += 2;
  requestAnimationFrame(scrollTextToTop);
}

// function scrollTextToBottom(timeStamp) {
//   if (timeStamp - scrollStartTime < 100) {
//     requestAnimationFrame(scrollTextToBottom);
//     return;
//   } else if (scrollPosition <= 0) {
//     setTimeout(() => dispatch('scrollEnd'), 3500);
//     return;
//   }
//
//   scrollStartTime = timeStamp
//   scrollPosition -= 2;
//   requestAnimationFrame(scrollTextToBottom);
// }

function calcMaxScrollPosition() {
  const wrapperHeight = refRootContainer.clientHeight;
  const textHeight = refDescriptionInner.clientHeight;
  
  if (textHeight > wrapperHeight) {
    maxScrollPosition = textHeight - wrapperHeight;
  }
}


// Lifecycle hooks ------------------------------------------------------------
onMount(() => {
  calcMaxScrollPosition();
  
  setTimeout(() => requestAnimationFrame(scrollTextToTop), 1500);
  
  if (maxScrollPosition <= 0) {
    setTimeout(() => dispatch('scrollEnd'), 4500);
  }
});

</script>



<style lang="scss">


// Level description ----------------------------------------------------------
.level-description {
  //outline: 1px rgba(255,255,255,.05) solid;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  font-family: 'MuseoSlabRounded-300',serif;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: rgba(255,255,255,.7);
  text-align: center;
  //background: red;
  
  &--hidden-bottom {
    mask-image: linear-gradient(180deg, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%);
  }

  &--hidden-top {
    mask-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 25%);
  }

  &--hidden-top-n-bottom {
    mask-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%);
  }

  &__inner {
    width: 100%;
    position: absolute;
    inset: 0 auto auto 0;
    transform: translateY(0);
    transition: transform .1s ease;
  }
}

</style>