<div class={ `settings-page
              ${_IS_DEV_ENV && 'settings-page--with-bg-image'}` }>


  <BasicPageLayoutLP class="settings-page__basic-layout-container">

    <div
      class="test-button"
      on:click={ () => {
                  window.webkit?.messageHandlers?.menu?.postMessage({ 'tapped': 'OWJSMsgOpenDebugOptions' });
                } }
      style="
        width: 150px;
        height: 150px;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 100000000;
        /*background: rgba(255,0,0,.4);*/
      "
    ></div>


    <!-- slot: header left -->
    <svelte:fragment slot="header-left">

      <div class="settings-page__back-button-wrapper">
        <ButtonInCircle
          class={ `settings-page__back-button
                    ${!isPageLoaded && 'settings-page__back-button--invisible'}
                    ${($transitionTo === 'AllChapters'
                            || $transitionTo === 'Chapter'
                            || $transitionTo === 'WeekChallenge')
                                    && 'settings-page__back-button--invisible'}`}
          iconName="arrowLeft"
          backwardsGradient={true}
          isTextOnTop={true}
          text="Back"
          on:click={ () => {
              handleBackClick();
              dispatchIosEvent( {'tapped':'OWJSMsgPlayClickSound'});
            }
          }
        />
      </div>

    </svelte:fragment><!-- / slot: header left -->


  </BasicPageLayoutLP>
</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { push } from 'svelte-spa-router';
import { onMount, onDestroy } from 'svelte';
import { dispatchIosEvent } from '@helpers/iosEvents.js';

// Stores ---------------------------------------------------------------------
import { transitionFrom, transitionTo } from '@stores-m/transitions.js';
import { previousPage } from '@stores-m/pagesNavigation.js';
import { selectedChapterId } from '@stores-m/chapters.js';

// Components -----------------------------------------------------------------
import BasicPageLayoutLP from '@components/BasicPageLayoutLP.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';



// Lifecycle flags ------------------------------------------------------------
let isMounted = false;
let isPageLoaded = false;
onMount(() => {
  isMounted = true;
  setTimeout(() => isPageLoaded = true, 300);
});
onDestroy(() => {
  isMounted = false;
});


// Page transitions -----------------------------------------------------------
onMount(() => {
  // show the levels selector. Available menu modes: "chapter", "level", "challenge", "options"
  dispatchIosEvent({'tapped': 'OWJSMsgSetMenuMode', 'value': 'options'});

  setTimeout(() => transitionFrom.update(() => ''), 300);
});
onDestroy(() => {
  transitionFrom.update(() => 'Settings');
});


// Back click -----------------------------------------------------------------
function handleBackClick() {
  if ($previousPage === 'WeekChallenge') {
    transitionTo.update(() => 'WeekChallenge');
    setTimeout(() => push('/weekly-challenge'), 250);

  } else if ($previousPage === 'Chapter') {
    transitionTo.update(() => 'Chapter');
    setTimeout(() => push(`/chapters/${$selectedChapterId || 0}`), 250);

  } else if (!$previousPage || $previousPage === 'AllChapters' ) {
    transitionTo.update(() => 'AllChapters');
    setTimeout(() => push('/'), 250);
  }
}

</script>



<style lang="scss">


// Settings page --------------------------------------------------------------
.settings-page {
  z-index: 0;
  overflow: hidden;

  &--with-bg-image {
    background: 50% 50%/cover url(../../../assets/images/menu_bg.jpg) no-repeat;
  }

  &__basic-layout-container {}

  // header ---------------------------
    &__back-button-wrapper {
      transform-origin: top center;
      transform: scale(1.5);
    }
    
      :global(.settings-page__back-button) {
        opacity: 1;
        transition: opacity .5s ease;
      }
    
        :global(.settings-page__back-button--invisible) {
          opacity: 0;
        }
  
}

</style>