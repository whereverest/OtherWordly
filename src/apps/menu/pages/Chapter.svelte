<!-- Level select & Play button -->
<div class="level-select-n-play-but">
  <div class="level-select-n-play-but__level-select-container">
    <div class="level-select-n-play-but__level-select">
    </div>
  </div>
  <div class="level-select-n-play-but__play-but"></div>
</div><!-- / Level select & Play button -->


<div class={ `chapter-details-page
              ${_IS_DEV_ENV && 'chapter-details-page--with-bg-image'}` }>


  <BasicPageLayout class="chapter-details-page__basic-layout-container">

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
      <div class="chapter-details-page__back-button-wrapper">
        <ButtonInCircle
          class={ `chapter-details-page__back-button
                    ${(!isPageLoaded || $transitionTo === 'AllChapters' || $transitionTo === 'Settings')
                                          && 'chapter-details-page__back-button--invisible'}`}
          iconName="arrowLeft"
          backwardsGradient={true}
          isTextOnTop={true}
          text="Chapters"
          on:click={ () => { handleBackToChaptersClick();
                              dispatchIosEvent( {'tapped':'OWJSMsgPlayClickSound'});  } }
        />
      </div>
    </svelte:fragment><!-- / slot: header left -->


    <!-- slot: content -->
    <svelte:fragment slot="content">

      <!-- Flying card -->
      <div class={ `chapter-details-page__flying-card-container
                    ${$transitionFrom === 'Settings'}
                    ${isFlyingCardMoveToTheLeft && $transitionTo !== 'AllChapters'
                                          && 'chapter-details-page__flying-card-container--placed-on-left'}
                    ${($transitionFrom === 'Settings' || $transitionTo === 'Settings')
                                          && 'chapter-details-page__flying-card-container--invisible'}` }>
        <ChapterCard
          class={ `chapter-details-page__chapter-card` }
          card={ currentChapter }
          isClicked={ false }
          positionCoeff={ 0 }
          isOnlyFaceNChapterVisible={ true }
        />
      </div><!-- / Flying card -->


      <div class={ `chapter-details-page__content-divider-line
                    ${(!isAllPageElementsVisible || $transitionFrom === 'Chapter')
                                        && 'chapter-details-page__content-divider-line--invisible'}`}></div>


      <div class={ `chapter-details-page__chapter-description
                    ${(!isAllPageElementsVisible || $transitionFrom === 'Chapter')
                                        && 'chapter-details-page__chapter-description--invisible'}` }>
        { currentChapter.description }
      </div>


      <!-- Level rewards -->
      <div class={ `level-rewards
                    ${(!isAllPageElementsVisible || $transitionFrom === 'Chapter')
                                        && 'level-rewards--invisible'}
                    chapter-details-page__level-rewards` }>

        <div
          class="level-rewards__title"
          id="selectALevel-title"
        >
          { $selectAMissionTitle }
        </div>

        <div
          class="level-rewards__carousel-placeholder"
          id="selectALevel-zone"
        >
        </div>

        {#if $chapterPageState === 'full'}
        <ProgressBar
          class="level-rewards__progressbar"
          type={ ['single','double','triple'][currentChapter?.progressBarNames?.length - 1] }
          progress={currentChapter?.progress}
          titles={currentChapter?.progressBarNames}
          gradientColors={currentChapter?.progressBarGradient}
        />
        {/if}

        <ChapterAchievements
          class="level-rewards__stats"
          chapterDetails={ currentChapter }
          isReducedVersion={ false }
          isOnlyIconShowed={ $chapterPageState === 'minimized' }
        />

      </div><!-- / Level rewards -->

    </svelte:fragment><!-- / slot: content -->


    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div class={ `chapter-details-page__settings-button-wrapper
                    ${($transitionTo === 'Settings')
                                    && 'chapter-details-page__settings-button-wrapper--invisible'}` }>
        <ButtonInCircle
          class="chapter-details-page__settings-button"
          id="optionsButton"
          iconName="gear"
          isTextOnTop={true}
          on:click={ handleSettingsButtonClick }
        />
      </div>
    </svelte:fragment><!-- / slot: footer right -->


  </BasicPageLayout>
</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { onMount } from 'svelte';
import { push } from 'svelte-spa-router';
  
// Props ----------------------------------------------------------------------
export let params = {};

// Components -----------------------------------------------------------------
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import ChapterAchievements from '@components/ChapterCard/ChapterAchievements.svelte';
import ChapterCard from '@components/ChapterCard/index.svelte';
import ProgressBar from '@components/ProgressBar.svelte';


// Data -----------------------------------------------------------------------
let isPageLoaded = false;
let isFlyingCardMoveToTheLeft = false;
let isAllPageElementsVisible = false;


// Stores ---------------------------------------------------------------------
import {
  chaptersList,
  chapterTitleCurvature,
  chapterTitleTopShift,
  isChapterTitleHuge,
  selectAMissionTitle,
  selectedChapterId,
  chapterPageState
} from '@stores-m/chapters.js';
import { transitionFrom, transitionTo } from '@stores-m/transitions.js';
import { previousPage } from '@stores-m/pagesNavigation.js';
import { dispatchIosEvent } from '@helpers/iosEvents.js';


// Computed -------------------------------------------------------------------
$: currentChapter = $chaptersList.find(item => +item.chapterNum === +$selectedChapterId) || $chaptersList[0];


// Lifecycle hooks ------------------------------------------------------------
onMount(() => {
  dispatchIosEvent({'tapped': 'OWJSMsgEnableArea', 'value': 'scroll'});
  dispatchIosEvent({'tapped': 'OWJSMsgEnableArea', 'value': 'play'});

  // show the levels selector. Available menu modes: "chapter", "level", "challenge", "options"
  dispatchIosEvent({'tapped': 'OWJSMsgSetMenuMode', 'value': 'level'});

  if ($transitionFrom === 'Settings') {
    setTimeout(() => isAllPageElementsVisible = true, 100);
  }

  if ($transitionFrom === 'AllChapters') setTimeout(() => isFlyingCardMoveToTheLeft = true, 300);
  else                                    isFlyingCardMoveToTheLeft = true;

  setTimeout(() => transitionFrom.update(() => ''), 100);
  transitionTo.update(() => '');
  setTimeout(() => isPageLoaded = true, 100);
  setTimeout(() => isAllPageElementsVisible = true, 750);

  setTimeout(() => {
    $chapterTitleCurvature = 0;
    $chapterTitleTopShift = -5;
    isChapterTitleHuge.update(() => true);
    selectedChapterId.update(() => +params.chapterId);
  }, 400);
  
});


// Methods --------------------------------------------------------------------
function dispatchIOSMessagesAllChapters() {
  // TODO: use generic function for dispatching iOS events
  if (window.webkit != null) {
    // play sound and haptic for button: 
    window.webkit.messageHandlers.menu.postMessage({'tapped': 'OWJSMsgPlayClickSound'});

    // Stop passing swipes on the game: 
    window.webkit.messageHandlers.menu.postMessage({'tapped': 'OWJSMsgDisableArea', 'value': 'scroll'});
    window.webkit.messageHandlers.menu.postMessage({'tapped': 'OWJSMsgDisableArea', 'value': 'play'});
  }
}

function handleBackToChaptersClick() {
  transitionFrom.update(() => 'Chapter');
  setTimeout(() => { 
    transitionTo.update(() => 'AllChapters')
    $chapterTitleCurvature = 3;
    $chapterTitleTopShift = -3.7;
    isChapterTitleHuge.update(() => false);
  }, 0);
  previousPage.update(() => 'Chapter');
  setTimeout(() => push('/'), 400);

  dispatchIOSMessagesAllChapters();
}

function handleSettingsButtonClick() {
  dispatchIosEvent( {'tapped': 'OWJSMsgPlayClickSound'} );
  dispatchIosEvent( { 'tapped': 'OWJSMsgTapOptions' } );
  
  // transitionFrom.update(() => 'Chapter');
  // setTimeout(() => transitionTo.update(() => 'Settings'), 0);
  // previousPage.update(() => 'Chapter');
  // setTimeout(() => push('/settings'), 400);
}


</script>



<style lang="scss">



// Level select & Play button -------------------------------------------------
.level-select-n-play-but {
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: absolute;
  top: calc(50vh + 0px);
  left: calc(50vw - 5px);
  z-index: 1;
  font-size: calc((100vh + 100vh * 1.5) / 100);

  &__level-select-container {
    /* aspect ratio is 30/13 */
    width: 27.0em;
    height: 11.7em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 10.0em);
    left: calc(25vw - 20.9em);
    //outline: 1px #f00 solid;
  }

    &__level-select {
      width: 27vw;
      height: 100%;
      //background: rgba(255,0,0,.5);
    }

  &__play-but {
    width: 9.0em;
    height: 9.0em;
    position: absolute;
    top: calc(50% - 6.6em);
    left: calc(50vw - 12.3em);
    //background: rgba(0,255,0,.2);
  }
}

@media (min-width: 927px) {

  .level-select-n-play-but {
    font-size: calc((100vh + 100vh * .8) / 100);

    &__level-select-container {
      width: 25.0em;
      height: 9.4em;
      top: calc(50% - 9.5em);
      left: calc(25vw - 14.9em);
    }

      &__level-select {
        //width: 27vw;
        //height: 100%;
      }

    &__play-but {
      width: 7.6em;
      height: 7.6em;
      //inset: calc(50% - 6.6em) auto auto calc(50vw - 12.3em);
      top: calc(50% + 18.6em);
      left: calc(50% - 3.8em);
    }
  }

}



// Level rewards --------------------------------------------------------------
.level-rewards {
  width: 22.0rem;
  min-width: 22.0rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity .5s ease;
  //outline: 1px #f00 solid;

  &--invisible {
    opacity: 0;
  }
  
  &__title {
    font-size: 1.1rem;
    color: rgba(255,255,255,.5);
    text-transform: uppercase;
    text-align: center;
    font-family: 'MuseoSlabRounded-300',serif;
    position: relative;
    right: .5rem;
  }
  
  &__carousel-placeholder {
    width: 100%;
    height: 14.0rem;
    flex-grow: 1;
  }
  
  :global(.level-rewards__progressbar) {
    margin-bottom: 1.1rem;
    transform: scale(1.5);
    position: relative;
    right: .5rem;
  }
  
  :global(.level-rewards__stats) {
    transform: scale(1.35);
  }
}

@media (min-width: 927px) {

  .level-rewards {
  }

}


// Chapter details page -------------------------------------------------------
.chapter-details-page {
  z-index: 0;

  &--with-bg-image {
    background: 50% 50%/cover url(../../../assets/images/menu_bg.jpg) no-repeat;
  }

  &__basic-layout-container {}

  // header ---------------------------
    &__back-button-wrapper {
      transform-origin: top center;
      transform: scale(1.5);
    }
      
      :global(.chapter-details-page__back-button) {
        opacity: 1;
        transition: opacity .5s ease;
      }
        :global(.chapter-details-page__back-button--invisible) {
          opacity: 0;
        }

  // content --------------------------
    &__flying-card-container {
      width: 30.0rem;
      min-width: 30.0rem;
      height: 22.0rem;
      min-height: 22.0rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      position: absolute;
      inset: -15.2rem auto auto calc(50% - 15.0rem);
      overflow: hidden;
      transform: translate(0,0) translateZ(0);
      opacity: 1;
      transition: transform .5s ease, opacity .5s ease;
      //outline: 1px #0f0 solid;

      &--placed-on-left {
        transform: translate(-25.5vw, 10vh) translateZ(0);
      }

      &--invisible {
        opacity: 0;
      }
    }

      :global(.chapter-details-page__chapter-card) {
      }

    &__content-divider-line {
      width: .1rem;
      min-width: 2px;
      height: 70vh;
      position: absolute;
      inset: calc(50% - 34vh) calc(50% + 3.1rem) auto auto;
      opacity: .15;
      background: rgb(255,255,255);
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,1) 65%, rgba(255,255,255,0) 100%);
      transition: opacity .5s ease;
      
      &--invisible {
        opacity: 0;
      }
    }
  
    &__chapter-description {
      width: 30.0rem;
      min-width: 30.0rem;
      height: 7.0rem;
      min-height: 7.0rem;
      padding: 0 3.0rem;
      box-sizing: border-box;
      position: absolute;
      inset: 2.14rem auto auto calc(50% - 12.0rem);
      transform: translate(-29.5vw, 12vh) translateZ(0);
      opacity: 1;
      transition: opacity .5s ease;
      //outline: 1px #f00 solid;

      &--invisible {
        opacity: 0;
      }
    }
  
    &__level-rewards {
      //width: 22.0rem;
      //min-width: 22.0rem;
      position: absolute;
      inset: calc(50% - 12.0rem) auto auto calc(25vw - 18.5rem);
      //outline: 1px #f00 solid;
    }


  // footer ---------------------------
    &__settings-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity .5s ease;

      &--invisible {
        opacity: 0;
      }
    }

      :global(.chapter-details-page__settings-button) {
      }
}

@media (min-width: 927px) {

  .chapter-details-page {

    // content ------------------------
      &__flying-card-container {
        //inset: -15.14rem auto auto calc(50% - 15.0rem);

        &--placed-on-left {
          transform: translate(-21.5vw, 0) translateZ(0);
        }
      }

      &__content-divider-line {
        height: 44vh;
        inset: calc(50% - 22vh) calc(50% - .5rem) auto auto;
        //opacity: 0;
      }

      &__chapter-description {
        inset: 2.14rem auto auto calc(50% - 12.0rem);
        transform: translate(-25.5vw, 2vh) translateZ(0);
      }

      &__level-rewards {
        //inset: calc(50% - 14.0rem) auto auto calc(25vw - 18.5rem);
        inset: calc(50% - 12.5rem) auto auto calc(25vw - 12.5rem);
      }

  }

}

</style>
