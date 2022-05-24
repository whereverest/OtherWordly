<div class={ `level-results-page
              ${_IS_DEV_ENV && 'level-results-page--with-bg-image'}
              ${!isPageLoaded && 'level-results-page--invisible'}` }>

  <BasicPageLayout class="level-results-page__basic-layout-container">

    <!-- slot: content -->
    <svelte:fragment slot="content">

      <div class={ `stats-container
                    ${$isPortraitMode && 'stats-container--vertical'}
                    level-results-page__stats-container
                    ${!isPageLoaded && 'level-results-page__stats-container--invisible'}
                    ${$isPortraitMode && 'level-results-page__stats-container--bottom-margin'}` }>
        <StatsFrame
          class="stats-container__stats-frame"
          isSmallerFont={ true }
        />
      </div>

    </svelte:fragment><!-- / slot: content -->


    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">

      <div class={ `level-results-page__footer-button-wrapper
                    ${$isPortraitMode && 'level-results-page__footer-button-wrapper--small-right-margin'}` }>
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--left
                  level-results-page__footer-button--translucent"
          iconName="recap"
          on:click={ () => { isPageLoaded = false;
                              setTimeout(() => push('/recap'), 200)} }
          text="Recap"
        />
      </div>
      <div class="level-results-page__footer-button-wrapper">
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--right"
          iconName="cross"
          on:click={ () => { isPageLoaded = false;
                              setTimeout(() => push('/'), 200)} }
          isWithBounceAnimation={ true }
          text="Stats"
        />
      </div>

    </svelte:fragment><!-- / slot: footer left -->


    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div class={ `level-results-page__footer-button-wrapper
                    ${$isPortraitMode && 'level-results-page__footer-button-wrapper--small-right-margin'}` }>
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--left"
          iconName="arrowRefresh"
          on:click={ () => {} }
          text="Replay mission"
        />
      </div>
      <div class="level-results-page__footer-button-wrapper">
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--right"
          iconName="menu"
          on:click={ () => {} }
          text="Menu"
        />
      </div>
    </svelte:fragment><!-- / slot: footer right -->


  </BasicPageLayout>

</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { push } from 'svelte-spa-router';

// Components
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import StatsFrame from '@/apps/pause/pages/Info/frames/Stats.svelte';

// Stores
import { isPortraitMode } from '@stores/miscellaneous.js';



// Show elements on page load -------------------------------------------------
let isPageLoaded = false;
import { onMount } from 'svelte';

onMount(() => {
  setTimeout(() => isPageLoaded = true, 20);
});

</script>



<style lang="scss">



// Stats container ------------------------------------------------------------
.stats-container {
  width: calc(100vw - 18.0rem);
  min-width: calc(100vw - 18.0rem);
  height: calc(100vh - 10.0rem);
  min-height: calc(100vh - 10.0rem);
  padding: 0 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &--vertical {
    width: calc(100vw - 7.0rem);
    min-width: calc(100vw - 7.0rem);
    padding: 2.5rem 0;
  }

  &__title {
    margin: -3.0rem 0 2.5rem;
    font-size: 3.0rem;
    text-transform: uppercase;
  }

  :global(.stats-container__stats-frame) {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
}


// Level results page ---------------------------------------------------------
.level-results-page {

  &--with-bg-image {
    background: 50% 50%/cover url(../../../assets/images/pause_app_bg.jpg) no-repeat;
  }

  & > * {
    opacity: 1;
    transition: opacity .2s ease;
  }
  &--invisible > * {
    opacity: 0;
  }

    &__stats-container {
      margin-top: -3.0rem;
      opacity: 1;
      transition: opacity .5s ease;

      &--bottom-margin {
        margin-bottom: 3.0rem;
      }

      &--invisible {
        opacity: 0;
      }
    }

    &__footer-button-wrapper {
      margin-right: 4.0rem;
      transform: scale(1.2);
      opacity: 1;
      transition: opacity .5s ease;

      &:last-child {
        margin-right: 0;
      }

      &--invisible {
        opacity: 0;
      }

      &--small-right-margin {
        margin-right: 2.5rem;
      }
    }

      :global(.level-results-page__footer-button) {
      }

        :global(.level-results-page__footer-button--left::before) {
          width: calc(100% + 1.5rem);
          min-width: calc(100% + 1.5rem);
          left: -1.0rem;
          transform: translate(0,-50%);
        }
        :global(.level-results-page__footer-button--right::before) {
          width: calc(100% + 2.0rem);
          min-width: calc(100% + 2.0rem);
          left: -1.0rem;
          transform: translate(0,-50%);
        }
        :global(.level-results-page__footer-button--translucent) {
          opacity: .33;
        }
}

</style>