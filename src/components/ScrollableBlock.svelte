<div class={ `scrollable-block
              ${mixClass}` }>

  <!--{#if scrollbarHeight < containerHeight}-->
  <!--  <div-->
  <!--    class="scrollable-block__scrollbar"-->
  <!--    style="height: {scrollbarHeight}px; top: {scrollbarTopIndent}px;"-->
  <!--    bind:this={ refScrollbar }-->
  <!--  ></div>-->
  <!--{/if}-->

  <div 
    class="scrollable-block__in-wrap1"
    bind:this={ refContainer }
    on:resize={ setScrollbarHeight }
    on:scroll={ setScrollbarPosition }
  >
    <div
      class="scrollable-block__in-wrap2"
      bind:this={ refContent }
    >
      <slot />

    </div>
  </div>
</div>



<script>
let mixClass;
export { mixClass as class };

let refContainer;
let refContent;
let refScrollbar;


// Scrollbar height -----------------------------------------------------------
let scrollbarHeight = 0;

let setHeightInterval;
import { onMount, onDestroy } from 'svelte';
onMount(() => setHeightInterval = setInterval(setScrollbarHeight, 100));
onDestroy(() => clearInterval(setHeightInterval));

let containerHeight = 0;
let contentHeight = 0;
function setScrollbarHeight() {
  if (containerHeight === refContainer.clientHeight && contentHeight === refContent.scrollHeight) {
    return
  }

  containerHeight = refContainer.clientHeight;
  contentHeight = refContent.scrollHeight;

  scrollbarHeight = Math.round(containerHeight * (containerHeight / contentHeight));
  scrollbarHeight = scrollbarHeight > containerHeight ? containerHeight : scrollbarHeight;
}


// Scrollbar position ---------------------------------------------------------
let scrollbarTopIndent = 0;

function setScrollbarPosition(event) {
  const scrollTop = event.target.scrollTop;
  const containerHeight = event.target.clientHeight;

  scrollbarTopIndent = scrollTop / containerHeight * scrollbarHeight;
}

</script>



<style lang="scss">


// Scrollable block -----------------------------------------------------------
.scrollable-block {
  width: 20.0rem;
  max-width: 80.0rem;
  height: 20.0rem;
  position: relative;

  &__scrollbar {
    width: .7rem;
    position: absolute;
    inset: 0 0 auto auto;
    pointer-events: none;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      min-height: 4.0rem;
      border-radius: 1.0rem;
      position: absolute;
      inset: 50% auto auto 0;
      transform: translateY(-50%);
      background-color: rgba(255,255,255,.3);
    }
  }

  &__in-wrap1 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    inset: 0 auto auto 0;
    overflow-x: hidden;
    overflow-y: scroll;
    mask-image: linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%);
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__in-wrap2 {
    padding: 3.0rem;
  }
}

</style>