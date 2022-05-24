<div
  class={ `badges-vertical-list 
            ${mixClass}` }
>

  <div class="badges-vertical-list__in-wrap">

  <div class="badges-vertical-list__title">
    Previous Challenges
  </div>

  <div
    class={ `badges-vertical-list__list-wrapper 
              ${scrollPosition >= maxScrollPosition && maxScrollPosition > 0 
                                          && 'badges-vertical-list__list-wrapper--hidden-top'}
              badges-vertical-list__list-wrapper--hidden-bottom
              ${scrollPosition > 0 && scrollPosition < maxScrollPosition 
                                          && 'badges-vertical-list__list-wrapper--hidden-top-n-bottom'}`}
    on:scroll={ event => { scrollPosition = event.target.scrollTop;
                          updateScrollPositionStore() } }
    bind:this={ refBadgesListWrapper }
  >
    <ul
      class="badges-vertical-list__list"
    >
      <!--style="transform: translateY({-scrollPosition}px) translateZ(0);"-->
      <!--&gt;-->

      {#each $badgesList as badge,index (index)}
        <ChallengeBadge
          class="badges-vertical-list__badge-snippet"
          data={badge}
          isMirrored={ index % 2 !== 0 }
        />
      {/each}

    </ul>
  </div>

  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

import { onMount, onDestroy } from 'svelte';


// Components -----------------------------------------------------------------
import ChallengeBadge from '@components/ChallengeBadge.svelte';


// Stores ---------------------------------------------------------------------
import { badgesList } from '@stores-m/weeklyChallenges.js';


// Lifecycle hooks ------------------------------------------------------------
onMount(() => {
  requestAnimationFrame(() => {
    setMaxScrollHeight();
  });
});


// Refs (pointers to DOM elements) --------------------------------------------


// Set curtains visibility  ---------------------------------------------------
let refBadgesListWrapper;
let maxScrollPosition = 0;
let scrollPosition = 0;

function setMaxScrollHeight() {
  let listWrapperHeight = refBadgesListWrapper?.clientHeight;
  let singleBadgeHeight = document.querySelector('.badges-vertical-list__badge-snippet')?.clientHeight;
  let allBadgesHeight = singleBadgeHeight * $badgesList.length;
  maxScrollPosition = allBadgesHeight > listWrapperHeight ? (allBadgesHeight - listWrapperHeight) : 0;
}


// Synchronize badges list scroll ---------------------------------------------
import { badgesListScrollPosition } from '@stores-m/weeklyChallenges.js';

function updateScrollPositionStore() {
  badgesListScrollPosition.update(() => scrollPosition);
}

onMount(() => {
  refBadgesListWrapper.scrollTop = $badgesListScrollPosition;
});

</script>



<style lang="scss">


// Badges vertical list -------------------------------------------------------
.badges-vertical-list {
  width: 19.4rem;
  height: 33.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: auto !important;

  * {
    touch-action: auto !important;
  }

  &__in-wrap {
    width: 100%;
    height: 100%;
  }

  &__title {
    height: 2.5rem;
    padding-left: 2.9rem;
    margin-bottom: .5rem;
    display: flex;
    align-content: center;
    align-items: center;
    font-family: 'MuseoSlabRounded-500',serif;
    font-size: 1.07rem;
    line-height: 1.07rem;
    color: rgba(255,255,255,.5);
    text-transform: uppercase;
    text-align: right;
  }

  &__list-wrapper {
    width: 100%;
    height: calc(100% - 3.3rem);
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: translateZ(0);
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    &--hidden-bottom {
      mask-image: linear-gradient(180deg, rgba(255,255,255,1) 90%, rgba(255,255,255,0) 100%);
    }

    &--hidden-top {
      mask-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 10%);
    }

    &--hidden-top-n-bottom {
      mask-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,1) 90%, rgba(255,255,255,0) 100%);
    }
  }

  &__list {
    padding: .3rem 0 .2rem;
    margin: 0;
    box-sizing: border-box;
    transition: transform .08s ease;
    list-style: none;
  }

    :global(.badges-vertical-list__badge-snippet) {
      margin-top: -4.05rem;
      pointer-events: none;
    }

      :global(.badges-vertical-list__badge-snippet:first-child) {
        margin-top: 0;
      }

      :global(.badges-vertical-list__badge-snippet:nth-child(1n)) {
      }

      :global(.badges-vertical-list__badge-snippet:nth-child(2n)) {
        position: relative;
        right: -9.7rem;
      }
}

@media (min-width: 927px) {
  // Badges vertical list -----------------------------------------------------
  .badges-vertical-list {
    width: 19.4rem;
    height: 69vmax;

    &__in-wrap {
      transform: scale(.87) !important;
    }
  }
}

</style>