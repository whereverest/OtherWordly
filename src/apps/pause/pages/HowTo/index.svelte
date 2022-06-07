<div class={ `how-to-page
              ${_IS_DEV_ENV && 'how-to-page--with-bg-image'}` }>


  <BasicPageLayout class="how-to-page__basic-layout-container">

    <!-- slot: header right -->
    <svelte:fragment slot="header-right">

      {#if !$isInGameMode}
        <div class="how-to-page__close-button-wrapper">
          <ButtonInCircle
            class="how-to-page__close-button"
            iconName="cross"
            on:click={ () => {
              dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'});
              dispatchIosEvent({'tapped':'OWJSMsgDismissPause'});
            }}
            prominent={ true }
            isThickBorder={ true }
            backwardsGradient={ true }
          />
        </div>
      {/if}

    </svelte:fragment><!-- / slot: header right -->


    <!-- slot: content -->
    <svelte:fragment slot="content">

      <ScrollableBlock class={`how-to-page__scrollable-block ${$isPortraitMode && 'how-to-page__scrollable-block__portrait-mode'}`}>

        <!-- How to manual -->
        <div class="how-to-manual
                    how-to-page__how-to-manual">

          <TwoColorsTitle
            class="how-to-manual__main-title"
            text="How to Play"
            isNoWrap={ true }
          />

          <section class="how-to-manual__section">
            {#if !$isPortraitMode}
              <div
                class="how-to-manual__section-column
                        how-to-manual__section-column--left"
                contenteditable="true"
                bind:innerHTML={ data.howToPlay[0] }
              >
              </div>
              <div
                class="how-to-manual__section-column
                        how-to-manual__section-column--right"
                contenteditable="true"
                bind:innerHTML={ data.howToPlay[1] }
              >
              </div>
            {:else}
              <div
                class="how-to-manual__section-column--portrait-mode"
                contenteditable="true"
                bind:innerHTML={ oneColumnData }
              >
              </div>
            {/if}
          </section>

          <div class="how-to-manual__divider-horizontal"></div>

          <div class="how-to-manual__secondary-title">
            Here are core gameplay details...
          </div>

          {#if !$isPortraitMode}
            {#each gameplayDetailsSections as section,index (section[0].name + section[1].name)}
              <section class="how-to-manual__section">

                {#each section as column (column.name)}
                  <div class={ `how-to-manual__section-column
                                ${index === 0 && 'how-to-manual__section-column--left' }
                                ${index === 1 && 'how-to-manual__section-column--right' }` }>
                    <!-- Manual snippet -->
                    <ManualSnippet
                      class="how-to-manual__manual-snippet"
                      title={ column.name }
                      inlineIcon={ featureIcons[column.iconName] }
                      text={ column.text }
                    />
                  </div>
                {/each}

              </section>

              <div class="how-to-manual__divider-horizontal"></div>
            {/each}
          {:else}
            {#each gameplayDetailsSections as section,index (section[0].name + section[1].name)}
              <section class="how-to-manual__section--portrait-mode">

                {#each section as column (column.name)}
                  <div class={ `how-to-manual__section-column--portrait-mode` }>
                    <!-- Manual snippet -->
                    <ManualSnippet
                      class="how-to-manual__manual-snippet"
                      title={ column.name }
                      inlineIcon={ featureIcons[column.iconName] }
                      text={ column.text }
                    />
                  </div>
                {/each}

              </section>

              <div class="how-to-manual__divider-horizontal"></div>
            {/each}
          {/if}

          <TwoColorsTitle
            class="how-to-manual__main-title"
            text="The Story"
            isNoWrap={ true }
          />

          <section class="how-to-manual__section">
            {#if !$isPortraitMode}
              <div
                class="how-to-manual__section-column
                        how-to-manual__section-column--left"
                contenteditable="true"
                bind:innerHTML={ data.theStory[0] }
              >
              </div>
              <div
                class="how-to-manual__section-column
                        how-to-manual__section-column--right"
                contenteditable="true"
                bind:innerHTML={ data.theStory[1] }
              >
              </div>
            {:else}
              <div
                class="how-to-manual__section-column
                        how-to-manual__section-column--portrait-mode"
                contenteditable="true"
                bind:innerHTML={ oneDataStory }
              >
              </div>
            {/if}
          </section>

          <div class="how-to-manual__divider-horizontal"></div>

          <TwoColorsTitle
            class="how-to-manual__main-title
                    how-to-manual__main-title--bigger-bottom-margin"
            text="Meet your New Friends"
            isNoWrap={ true }
          />

          {#if !$isPortraitMode}
            {#each newFriendsSections as section,index (section[0].name + section[1].name)}
              <section class="how-to-manual__section">

                {#each section as column (column.name)}
                  <div class={ `how-to-manual__section-column
                                ${index === 0 && 'how-to-manual__section-column--left' }
                                ${index === 1 && 'how-to-manual__section-column--right' }` }>
                    <!-- Manual snippet -->
                    <ManualSnippet
                      class="how-to-manual__manual-snippet"
                      title={ column.name }
                      inlineIcon={ characterImages[column.iconName] }
                      text={ column.text }
                    />
                  </div>
                {/each}

              </section>

              {#if index !== newFriendsSections.length - 1}
                <div class="how-to-manual__divider-horizontal"></div>
              {/if}
            {/each}
          {:else}
            {#each newFriendsSections as section,index (section[0].name + section[1].name)}
              <section class="how-to-manual__section--portrait-mode">
                {#each section as column (column.name)}
                  <div class={ `how-to-manual__section-column--portrait-mode` }>
                    <!-- Manual snippet -->
                    <ManualSnippet
                      class="how-to-manual__manual-snippet"
                      title={ column.name }
                      inlineIcon={ characterImages[column.iconName] }
                      text={ column.text }
                    />
                  </div>
                {/each}
              </section>
              {#if index !== newFriendsSections.length - 1}
                <div class="how-to-manual__divider-horizontal"></div>
              {/if}
            {/each}
          {/if}

        </div><!-- / How to manual -->

      </ScrollableBlock>

    </svelte:fragment><!-- / slot: content -->


    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      {#if !$isInGameMode}
        <div class="how-to-page__footer-button-wrapper">
          <ButtonInCircle
            class="how-to-page__footer-button
                    how-to-page__footer-button--left"
            iconName="cross"
            on:click={ () => handleGoToPage('/') }
            text="Help"
            isWithBounceAnimation={ true }
            prominent={ true }
            isThickBorder={ true }
          />
        </div>
        <div class="how-to-page__footer-button-wrapper">
          <ButtonInCircle
            class="how-to-page__footer-button
                    how-to-page__footer-button--right
                    how-to-page__footer-button--translucent"
            iconName="info"
            on:click={ () => handleGoToPage('/info') }
            text="Info"
            prominent={ true }
            isThickBorder={ true }
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: footer left -->


    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      {#if !$isInGameMode}
        <div class="how-to-page__footer-button-wrapper">
          <ButtonInCircle
            class="how-to-page__footer-button
                    how-to-page__footer-button--left
                    how-to-page__footer-button--translucent"
            iconName="access"
            on:click={ () => handleGoToPage('/accessibility') }
            text="Accessibility<br>& Privacy"
            prominent={ true }
            isThickBorder={ true }
          />
        </div>
        <div class="how-to-page__footer-button-wrapper">
          <ButtonInCircle
            class="how-to-page__footer-button
                    how-to-page__footer-button--right
                    how-to-page__footer-button--translucent"
            iconName="gear"
            on:click={ () => handleGoToPage('/settings') }
            text="Settings"
            prominent={ true }
            isThickBorder={ true }
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: footer right -->


  </BasicPageLayout>
</div>



<script>
import {dispatchIosEvent} from "@helpers/iosEvents";
import { isPortraitMode } from "@stores/miscellaneous.js";

const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { push } from 'svelte-spa-router';
import { onMount } from 'svelte';
import lodashCamelCase from 'lodash-es/camelCase.js'

// Components
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import ManualSnippet from './ManualSnippet.svelte';
import ScrollableBlock from '@components/ScrollableBlock.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

// Stores
// import { basicFontSize } from '@stores/miscellaneous.js';
import { transitionFrom, transitionTo } from '@stores-fp/transitions.js';
import { isInGameMode } from '@stores/miscellaneous.js';

// Images
import characterImages from '@images/characters/batchedImports.js';

// Icons
import featureIcons from '@icons/features/batchedImports.js';



onMount(() => {
  transitionFrom.update(() => '');
  transitionTo.update(() => '');

  window.showHaiku = () => setTimeout(() => push('/'), 600);
  window.tapHelp = () => setTimeout(() => push('/how-to'), 600);
  window.tapInfo = () => setTimeout(() => push('/info'), 600);
  window.tapAccess = () => setTimeout(() => push('/accessibility'), 600);
  window.tapSettings = () => setTimeout(() => push('/settings'), 600);
});


// Convert Data into sections list --------------------------------------------
import data from './data.json';

let oneColumnData = data.howToPlay[0] + ' ' + data.howToPlay[1];
let oneDataStory = data.theStory[0] + ' ' + data.theStory[1];

$: gameplayDetailsSections = convertItemsListIntoPairsList(data.gameplayDetails);
$: newFriendsSections = convertItemsListIntoPairsList(data.newFriends);

function convertItemsListIntoPairsList(itemsList) {
  const sectionsList = itemsList.reduce((acc, item) => {
    const lastIndex = acc.length - 1;
    let newArray = [];

    if (!acc.length) {
      newArray = [[item]];

    } else if (acc[lastIndex].length === 2) {
      newArray = [...acc];
      newArray.push([item]);

    } else if (acc[lastIndex].length === 1) {
      newArray = [...acc];
      newArray[lastIndex] = [...newArray[lastIndex], item]
    }

    return newArray
  }, []);

  return sectionsList;
}


// Show elements on page opening ----------------------------------------------
let isAllPageElementsVisible = false;
onMount(() => {
  setTimeout(() => isAllPageElementsVisible = true, 300);
});

// Go to Challenges page ------------------------------------------------------
function goToChallengesPage() {

  setTimeout(() => transitionFrom.update(() => 'Welcome'), 300)
  setTimeout(() => transitionTo.update(() => 'Challenges'), 300)
  setTimeout(() => push('/challenges'), 600);
}


// Handle go to page ----------------------------------------------------------
function handleGoToPage(pageToGoTo) {
  dispatchIosEvent( {'tapped':'OWJSMsgPlayClickSound'} );
  push(pageToGoTo);
}

</script>



<style lang="scss">


// Manual snippet -------------------------------------------------------------
.manual-snippet {

  &__title-n-icon {
    display: flex;
    align-items: center;
  }

    &__title {
      margin-right: 1.8rem;
      font: 2.0rem/2.0rem 'Fractura Bol',sans-serif;
      color: #fcff9c;
    }

    &__icon {
      width: 8.5rem;
      height: 8.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: 50% 50%/110% no-repeat;
    }

  &__description {}
}


// How to manual --------------------------------------------------------------
.how-to-manual {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.7rem;
  line-height: 2.8rem;

  :global(.how-to-manual__main-title) {
    margin-bottom: 1.5rem;
  }

    :global(.how-to-manual__main-title--bigger-bottom-margin) {
      margin-bottom: 3.5rem;
    }

  &__secondary-title {
    margin-bottom: 2.7rem;
    font-size: 2.5rem;
    font-weight: 500;
  }

  &__section {
    width: 100%;
    margin-bottom: 3.0rem;
    display: flex;
    justify-content: space-between;

    &--portrait-mode {
      display: block;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

    &__section-column {
      width: calc(50% - 1.6rem);
      text-align: left;

      &--portrait-mode {
        text-align: left;
        width: 100%;
      }

      &--left {}
      &--right {}

      p {}

        :global(b) {
          font-weight: normal;
          color: #ffffa3
        }
    }

      &__manual-snippet {
        margin-bottom: 1.0rem;
      }

  &__divider-horizontal {
    width: calc(100% - 12.0rem);
    height: .15rem;
    margin-bottom: 4.0rem;
    background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
  }
}


// How to page ----------------------------------------------------------------
.how-to-page {
  &--with-bg-image {
    background: 50% 50%/cover url(../../../../assets/images/pause_app_bg.jpg) no-repeat;
  }

  // header ---------------------------
    &__close-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity .5s ease;
    }

      :global(.how-to-page__close-button) {}

  // content --------------------------
    :global(.how-to-page__scrollable-block) {
      width: calc(100vw - 18.0rem);
      min-width: calc(100vw - 18.0rem);
      height: calc(100vh - 10.0rem);
      min-height: calc(100vh - 10.0rem);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      inset: calc(50% - (50vh - 5.0rem)) auto auto calc(50% - (50vw - 9.0rem));
    }

    :global(.how-to-page__scrollable-block__portrait-mode) {
      width: calc(100vw - 10rem);
      left: calc(50% - (50vw - 5rem));
    }

  // footer ---------------------------
    &__footer-button-wrapper {
      padding-bottom: 1.2rem;
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

      :global(.how-to-page__footer-button) {
      }

        :global(.how-to-page__footer-button--left::before) {
          width: calc(100% + 1.5rem);
          min-width: calc(100% + 1.5rem);
          left: -1.0rem;
          transform: translate(0,-50%);
        }
        :global(.how-to-page__footer-button--right::before) {
          width: calc(100% + 2.0rem);
          min-width: calc(100% + 2.0rem);
          left: -1.0rem;
          transform: translate(0,-50%);
        }

        :global(.how-to-page__footer-button--translucent) {
          opacity: .33;
        }

}

</style>