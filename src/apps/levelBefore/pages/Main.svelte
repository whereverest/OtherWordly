<div class={ `main-page
              ${_IS_DEV_ENV && 'main-page--with-bg-image'}` }>

  <div
    class="test-button2"
    on:click={ toggleIsTutorial }
  ></div>

  <div 
    class="test-button"
    on:click={ changeCurrentLevelData }
  ></div>

  <BasicPageLayout class="main-page__basic-layout-container">


    <!-- slot: header left -->
    <svelte:fragment slot="header-left">

      {#if !isTutorial}
        <UserStatsSnippet
          class="main-page__user-stats-snippet"
          currentChapter={ $currentChapter }
          isCentered={ true }
        />
      {/if}
    </svelte:fragment><!-- / slot: header left -->


    <!-- slot: header right -->
    <svelte:fragment slot="header-right">

      {#if !isTutorial}
        <UserStatsSnippet
          class="main-page__user-stats-snippet"
          currentMission={ randomMissionNumber || $currentMission }
          isCentered={ true }
        />
      {/if}
    </svelte:fragment><!-- / slot: header right -->


    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div
        class="main-page__page-content"
        on:click={ goToNextSpeechDialog }
      >
        <!-- Character speech -->
        <div class={ `character-speech
                      ${$isPortraitMode && 'character-speech--vertical'}
                      ${$isDeviceIpad && $isPortraitMode && 'character-speech--vertical-small'}
                      main-page__character-speech` }>

          <div class={ `character-speech__avatar-n-name
                        ${$isPortraitMode && 'character-speech__avatar-n-name--no-right-margin'}` }>
            <img
              class={ `character-speech__avatar
                        ${$isPortraitMode && 'character-speech__avatar--slightly-bigger'}` }
              src={ char01_tyto }
              alt="Avatar"
            />

            <RibbonStraight
              class="character-speech__name-ribbon"
              text="Tyto"
              ribbonColors={ [ 'white', '#8e7942', '#a78f5b' ] }
            />
          </div>


          {#if currentStoryArray[storyIndex].title}
            <TwoColorsTitle
              class={ `character-speech__level
                        ${$isPortraitMode && 'character-speech__level--centered'}
                        ${$isPortraitMode && 'character-speech__level--small'}` }
              text={ currentStoryArray[storyIndex].title }
              isNoWrap={ true }
              isLeftAlign={ !$isPortraitMode }
            />
          {/if}

          <div class={ `character-speech__chatbox-wrap
                        ${$isPortraitMode && 'character-speech__chatbox-wrap--no-bottom-margin'}
                        ${!$isPortraitMode && !currentStoryArray[storyIndex].title
                                            && 'character-speech__chatbox-wrap--higher'}` }>
            <SpeechChatbox
              class={ `character-speech__chatbox
                        ${$isPortraitMode && 'character-speech__chatbox--no-bottom-margin'}` }
              content={ currentStoryArray[storyIndex].speech }
              isVertical={ $isPortraitMode }
            />

            {#if isTapToContinueVisible && !$isPortraitMode}
              <!-- Tap to continue but -->
              <div
                class="tap-to-continue-but
                        character-speech__tap-to-continue-but"
                transition:fade={{ duration: 400 }}
              >
                Tap to Continue
              </div><!-- / Tap to continue but -->
            {/if}
          </div>

          {#if isTapToContinueVisible && $isPortraitMode}
            <!-- Tap to continue but -->
            <div
              class="tap-to-continue-but
                      character-speech__tap-to-continue-but"
              transition:fade={{ duration: 400 }}
            >
              Tap to Continue
            </div><!-- / Tap to continue but -->
          {/if}


        </div><!-- / Character speech -->
      </div>
    </svelte:fragment><!-- / slot: content -->


    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      {#if !isTutorial && currentStoryArray.length > 1 && storyIndex + 1 !== currentStoryArray.length }
        <div class="main-page__footer-button-wrapper">
          <ButtonInCircle
            class="main-page__footer-button
                    main-page__footer-button--left"
            iconName="flashForward"
            on:click={ () => storyIndex = currentStoryArray.length - 1 }
            text="Skip"
            isWithBounceAnimation={ true }
          />
        </div>
      {/if}

      {#if !isTutorial && currentStoryArray.length > 1 && storyIndex > 0}
        <div
          class="main-page__footer-button-wrapper"
          on:click={ () => storyIndex = 0 }
        >
          <ButtonInCircle
            class="main-page__footer-button
                    main-page__footer-button--right"
            iconName="toBeginning"
            on:click={ () => {} }
            text="Rewind"
          />
        </div>
      {/if}

    </svelte:fragment><!-- / slot: footer left -->


    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">

      <div class="main-page__footer-button-wrapper">
        <ButtonInCircle
          class="main-page__footer-button"
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

import { onMount, onDestroy } from 'svelte';
import { fade } from 'svelte/transition';
import lodashRandom from 'lodash-es/random.js';

// Stores
import { transitionFrom, transitionTo } from '@stores-fp/transitions.js';
import { currentChapter, currentMission } from '@stores/stats.js';
import { isPortraitMode, isDeviceIpad } from '@stores/miscellaneous.js';
import { defaultLevelDataNormal, defaultLevelDataTutorial, levelData } from '@stores/dialogsData.js';

// Components
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import RibbonStraight from '@components/ribbons/RibbonStraight.svelte';
import SpeechChatbox from '@components/SpeechChatbox.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';
import UserStatsSnippet from '@components/UserStatsSnippet';

// Icons
import chatBubbleIcon from '@icons/chat-bubble.svg';
import ellipsisIcon from '@icons/ellipsis-icon.svg';

// Images
import char01_tyto from '@images/characters/char01_tyto.png';



onMount(() => {
  transitionFrom.update(() => '');
  transitionTo.update(() => '');
});


// Show elements on page opening ----------------------------------------------
let isAllPageElementsVisible = false;
onMount(() => {
  setTimeout(() => isAllPageElementsVisible = true, 300);
});


// Level data -----------------------------------------------------------------
let currentLevelDataIndex = 2;
function changeCurrentLevelData() {
  if (currentLevelDataIndex === 2)        currentLevelDataIndex = 3;
  else if (currentLevelDataIndex === 3)   currentLevelDataIndex = 4;
  else if (currentLevelDataIndex === 4)   currentLevelDataIndex = 8;
  else if (currentLevelDataIndex === 8)   currentLevelDataIndex = 2;

  storyIndex = 0;

  changeMissionNumber();
}


let storyIndex = 0;
function goToNextSpeechDialog() {
  if (currentStoryArray.length <= 1) {
    return
  }

  let _storyIndex = storyIndex;

  _storyIndex += 1;
  if (_storyIndex > currentStoryArray.length - 1) {
    _storyIndex = 0;
  }

  storyIndex = _storyIndex;
}

$: currentStoryArray = isTutorial ? defaultLevelDataTutorial.story : (levelData[currentLevelDataIndex].story || defaultLevelDataNormal.story);


// Show tap to continue button ------------------------------------------------
let isTapToContinueVisible = false;
let tapToContinueToggleTimeout;

onMount(() => {
  tapToContinueToggleTimeout = setTimeout(() => {
    isTapToContinueVisible = true;
  }, 3000);
})

onDestroy(() => {
  clearTimeout(tapToContinueToggleTimeout);
});



// Random mission number ------------------------------------------------------
let randomMissionNumber;
function changeMissionNumber() {
  randomMissionNumber = lodashRandom(3,21);
}


// Set tutorial data ----------------------------------------------------------
let isTutorial = false;
function toggleIsTutorial() {
  storyIndex = 0;
  isTutorial = !isTutorial;
}

</script>



<style lang="scss">



// Tap to continue but --------------------------------------------------------
.tap-to-continue-but {
  width: 15.0rem;
  position: relative;
  font: 600 1.6rem/1.6rem monospace;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(255,255,255,0), 0 0 22px rgba(255,255,255,0);
  transition: text-shadow .2s ease;
  animation: textGlowThrob;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  @keyframes textGlowThrob {
    0% { text-shadow: 0 0 8px rgba(255,255,255,0), 0 0 22px rgba(255,255,255,0); }
    15% { text-shadow: 0 0 8px rgba(255,255,255,1), 0 0 22px rgba(255,255,255,1); }
    30% { text-shadow: 0 0 8px rgba(255,255,255,.5), 0 0 22px rgba(255,255,255,.5); }
    45% { text-shadow: 0 0 8px rgba(255,255,255,1), 0 0 22px rgba(255,255,255,1); }
    60% { text-shadow: 0 0 8px rgba(255,255,255,0), 0 0 22px rgba(255,255,255,0); }
    100% { text-shadow: 0 0 8px rgba(255,255,255,0), 0 0 22px rgba(255,255,255,0); }
  }
}


// Test button ----------------------------------------------------------------
.test-button2 {
  width: 8.0rem;
  height: 8.0rem;
  border-radius: 2.0rem;
  position: absolute;
  inset: 1.0rem 10.0rem auto auto;
  z-index: 999999999999999;
  transform: scale(1);
  background: rgba(255,255,255,.1);
  transition: transform .07s ease, background .07s ease;

  &:active {
    transform: scale(1.1);
    background: rgba(255,255,255,.05);
  }
}


// Test button ----------------------------------------------------------------
.test-button {
  width: 8.0rem;
  height: 8.0rem;
  border-radius: 2.0rem;
  position: absolute;
  inset: 1.0rem 1.0rem auto auto;
  z-index: 999999999999999;
  transform: scale(1);
  background: rgba(255,0,0,.1);
  transition: transform .07s ease, background .07s ease;

  &:active {
    transform: scale(1.1);
    background: rgba(255,0,0,.05);
  }
}


// Character speech -----------------------------------------------------------
.character-speech {
  width: 55.0rem;
  min-width: 55.0rem;
  max-width: 55.0rem;
  height: 70vh;
  max-height: 25.0rem;
  display: grid;
  grid-template-columns: 1fr 60px 2fr;
  grid-template-rows: repeat(20, 5%);
  //outline: 1px #f00 solid;

  &--vertical {
    width: 65vw;
    min-width: 65vw;
    max-width: 65vw;
    max-height: 70vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    transform: scale(1.2);
  }

  &--vertical-small {
    transform: scale(.85);
  }

  &__avatar-n-name {
    grid-column: 1 / span 1;
    grid-row: 5 / span 14;
    margin-bottom: 6.0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    //outline: 2px #0f0 solid;

    &--no-right-margin {
      margin-right: 0;
    }
  }

    &__avatar {
      width: 16.0rem;
      height: 16.0rem;
      margin-bottom: -2.7rem;

      &--slightly-bigger {
        width: 19.0rem;
        height: 19.0rem;
      }
    }

    :global(.character-speech__name-ribbon) {}

  :global(.character-speech__level) {
    order: 1;
    grid-column: 3 / span 1;
    grid-row: 4 / span 1;
    width: 20.0rem;
    height: 3.0rem;
    min-height: 3.0rem;
    margin: 0 0 1.8rem 0;
    transform: scale(1.4);
    transform-origin: left center;
    //outline: 2px rgba(0,255,0,.2) solid;
  }

    :global(.character-speech__level--centered) {
      transform-origin: center center;
    }

    :global(.character-speech__level--small) {
      transform: scale(1.1);
      margin-bottom: 1.1rem;
    }

  &__chatbox-wrap {
    grid-column: 3 / span 1;
    grid-row: 8 / span 4;
    width: 100%;
    max-width: 70vw;
    margin: 0 0 4.0rem 0;
    //outline: 2px rgba(0,255,0,.2) solid;
    //display: none;

    &--higher {
      grid-row: 6 / span 4;
    }

    &--no-bottom-margin {
      margin-bottom: 0;
    }
  }
    :global(.character-speech__chatbox) {
      width: 100%;
      margin-bottom: 2.0rem;
    }

      :global(.character-speech__chatbox--no-bottom-margin) {
        margin-bottom: 0;
      }

    &__tap-to-continue-but {
      order: -1
    }
}


// Main page ------------------------------------------------------------------
.main-page {

  &--with-bg-image {
    background: 50% 50%/cover url(../../../assets/images/menu_bg3.jpg) no-repeat;
  }

  &__basic-layout-container {}

    &__character-speech {
    }

    &__footer-button-wrapper {
      margin-right: 2.5rem;
      transform: scale(1.2);
      opacity: 1;
      transition: opacity .5s ease;
  
      &:last-child {
        margin-right: 0;
      }
  
      &--invisible {
        opacity: 0;
      }
    }
    
      :global(.main-page__footer-button) {
      }
}

</style>