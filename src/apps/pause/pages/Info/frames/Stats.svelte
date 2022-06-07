<div class={ `stats-container
              ${mixClass}` }>

  <ScrollableBlock class="stats-container__scrollable-block">
    <div class={ `stats-container__in-wrap
                  ${$isPortraitMode && 'stats-container__in-wrap--vertical'}` }>

    <div class={ `stats-container__column
                  ${$isPortraitMode && 'stats-container__column--margin-bottom'}
                  ${$isPortraitMode && 'stats-container__column--wide'}` }>

      <TwoColorsTitle
        class={ `stats-container__title
                  ${$isPortraitMode && 'stats-container__title--smaller-bot-margin'}` }
        text="Level Stats"
        isNoWrap={ true }
        fontSize={ isSmallerFont ? '2.8' : '3.6' }
      />

      <ul class="stats-container__stats-list">
        {#each stats.levelStats as stat,index (index)}
          <!-- Stats snippet -->
          <li class="stats-snippet
                      stats-container__stats-snippet">
            <div class={ `stats-snippet__value
                          ${isSmallerFont && 'stats-snippet__value--smaller-font'}
                          ${$isPortraitMode && 'stats-snippet__value--narrow--portrait-mode'}` }>
              { allStatsStores[lodashCamelCase(stat.name)] }
            </div>
            <div class={ `stats-snippet__description
                          ${isSmallerFont && 'stats-snippet__description--smaller-font'}
                          ${$isPortraitMode && 'stats-snippet__description--narrow'}` }>
              { stat.name }
            </div>
          </li><!-- / Stats snippet -->
        {/each}
      </ul>

    </div>

    {#if $isPortraitMode}
      <div class="stats-container__horizontal-divider"></div>

      {:else}
      <div class="stats-container__vertical-divider"></div>
    {/if}

    <div class={ `stats-container__column
                  ${$isPortraitMode && 'stats-container__column--wide'}` }>

      <TwoColorsTitle
        class={ `stats-container__title
                  ${$isPortraitMode && 'stats-container__title--smaller-bot-margin'}` }
        text="All-Time Stats"
        isNoWrap={ true }
        fontSize={ isSmallerFont ? '2.8' : '3.6' }
      />

      <ul class="stats-container__stats-list">
        {#each stats.allTimeStats as stat,index (index)}
          <!-- Stats snippet -->
          <li class="stats-snippet
                      stats-container__stats-snippet">
            <div class={ `stats-snippet__value
                          ${isSmallerFont && 'stats-snippet__value--smaller-font'}
                          ${$isPortraitMode && 'stats-snippet__value--narrow'}` }>
              { allStatsStores[lodashCamelCase(stat.name)] }
            </div>
            <div class={ `stats-snippet__description
                          ${isSmallerFont && 'stats-snippet__description--smaller-font'}
                          ${$isPortraitMode && 'stats-snippet__description--narrow'}` }>
              { stat.name }
            </div>
          </li><!-- / Stats snippet -->
        {/each}
      </ul>

    </div>

    </div>
  </ScrollableBlock>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let isSmallerFont = false;

import lodashCamelCase from 'lodash-es/camelCase.js';

import stats from './stats.json';

// Stores
import {
  currentLevel,
  currentChapter,
  yourSidekick,
  timeElapsed,
  wordsMatched,
  multiHitCombos,
  minesShattered,
  blocksRemoved,
  coreWordsCompleted
} from '@stores/stats.js';
import { isPortraitMode } from '@stores/miscellaneous.js';

$: allStatsStores = {
  currentLevel: $currentLevel,
  currentChapter: $currentChapter,
  yourSidekick: $yourSidekick,
  timeElapsed: $timeElapsed,
  wordsMatched: $wordsMatched,
  multiHitCombos: $multiHitCombos,
  minesShattered: $minesShattered,
  blocksRemoved: $blocksRemoved,
  coreWordsCompleted: $coreWordsCompleted
};


// Components
import ScrollableBlock from '@components/ScrollableBlock.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

</script>



<style lang="scss">


// Stats snippet --------------------------------------------------------------
.stats-snippet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;

  &__value {
    // width: calc(50% - .5rem);
    // display: flex;
    // align-items: center;
    // justify-content: flex-end;
    // font-size: 3.5rem;
    // line-height: 2.0rem;
    // font-weight: 100;
    // color: #ffffae;
    // min-width: 10rem;
    // justify-content: flex-start;
    // padding-right: 3rem;
    font-size: 3.5rem;
    line-height: 6rem;
    color: #ffffae;
    padding-right: 3rem;
    padding-left: 0rem;

    &--narrow {
      // width: calc(50% - .7rem);
      
      &--portrait-mode {
      }
    }
  }

  &__description {
    // width: calc(50% - .5rem);
    // display: flex;
    // align-items: center;
    // text-align: left;

    font-size: 1.9rem;
    line-height: 2.5rem;
    text-align: right;

    &--narrow {
      width: calc(50% - .7rem);
    }

    &--smaller-font {
      font-size: 1.3rem;
    }
  }
}


// Stats container ------------------------------------------------------------
.stats-container {
  display: flex;
  position: relative;

  :global(.stats-container__scrollable-block) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 100%;
  }

  &__in-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;

    &--vertical {
      flex-direction: column;
      align-items: center;
    }
  }

  &__vertical-divider {
    width: .2rem;
    height: 70vh;
    position: fixed;
    inset: calc(50% - 35vh) auto auto 50%;
    background-image: linear-gradient(to bottom, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
  }

  &__horizontal-divider {
    width: 87vw;
    min-width: 100%;
    height: .2rem;
    margin-bottom: 6.0rem;
    background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
  }

  &__column {
    width: calc(50% - 2.0rem);
    display: flex;
    flex-direction: column;
    align-items: center;

    &--wide {
      width: 100%;
    }

    &--margin-bottom {
      margin-bottom: 3.5rem;
    }
  }

    :global(.stats-container__title) {
      margin-bottom: 4.5rem;
    }

    :global(.stats-container__title--smaller-bot-margin) {
      margin-bottom: 3.5rem;
    }

    &__stats-list {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      // align-items: center;
      list-style: none;
    }

      &__stats-snippet {
        margin-bottom: .8rem;
      }
}

</style>