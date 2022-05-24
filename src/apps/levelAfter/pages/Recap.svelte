<div class={ `level-results-page
              ${_IS_DEV_ENV && 'level-results-page--with-bg-image'}
              ${!isPageLoaded && 'level-results-page--invisible'}` }>

  <BasicPageLayout class="level-results-page__basic-layout-container">

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <!-- Words recap -->
      <div class={ `words-recap
                    level-results-page__words-recap
                    ${!isPageLoaded && 'level-results-page__words-recap--invisible'}` }>

        <div class="words-recap__title">
          Words recap
        </div>

        <div class={ `words-recap__words-list-n-description
                      ${$isPortraitMode && 'words-recap__words-list-n-description--vertical'}` }>

          <!-- Words list -->
          <div class={ `words-list
                        ${$isPortraitMode && 'words-list--vertical'}
                        words-recap__words-list
                        ${$isPortraitMode && 'words-recap__words-list--vertical'}` }>
            <ScrollableBlock class="words-list__scrollable-block">
              <ul class="words-list__list-itself">
                {#each recapTestData as wordRecap (wordRecap.term)}
                  <li 
                    class={ `words-list__word
                              ${wordRecap.term === selectedWord && 'words-list__word--active'}` }
                    on:click={ () => chooseWord(wordRecap.term) }
                  >
                    { wordRecap.term }
                  </li>
                {/each}
              </ul>
            </ScrollableBlock>
          </div><!-- / Words list -->

          <!-- Description -->
          <div class={ `description
                        ${$isPortraitMode && 'description--vertical'}
                        words-recap__description
                        ${$isPortraitMode && 'words-recap__description--vertical'}` }>

            {#if !selectedWord}
              <div class="description__title">
                Check out how you did!
              </div>
              <div class="description__hint">
                Tap <em>words</em> you hit <em>{ $isPortraitMode ? 'above' : 'on the left' }</em><br>
                to see hints.
              </div>

              {:else}
              <div
                class="description__hint"
                contenteditable="true"
                bind:innerHTML={ recapTestData[recapTestData.findIndex(item => item.term === selectedWord)].example }
              >
              </div>
              <div
                class="description__citation"
                contenteditable="true"
                bind:innerHTML={ recapTestData[recapTestData.findIndex(item => item.term === selectedWord)].citation }
              >
              </div>

            {/if}


          </div><!-- / Description -->

        </div>

      </div><!-- / Words recap -->
    </svelte:fragment><!-- / slot: content -->


    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">

      <div class={ `level-results-page__footer-button-wrapper
                    ${$isPortraitMode && 'level-results-page__footer-button-wrapper--small-right-margin'}` }>
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--left"
          iconName="cross"
          on:click={ () => { isPageLoaded = false;
                              setTimeout(() => push('/'), 200)} }
          isWithBounceAnimation={ true }
          text="Recap"
        />
      </div>
      <div class="level-results-page__footer-button-wrapper">
        <ButtonInCircle
          class="level-results-page__footer-button
                  level-results-page__footer-button--right
                  level-results-page__footer-button--translucent"
          iconName="info"
          on:click={ () => { isPageLoaded = false;
                              setTimeout(() => push('/stats'), 200)} }
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
import recapTestData from '../data/recapTestData.json';

// Stores
import { isPortraitMode } from '@stores/miscellaneous.js';

// Components
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import ScrollableBlock from '@components/ScrollableBlock.svelte';



// Show elements on page load -------------------------------------------------
let isPageLoaded = false;
import { onMount } from 'svelte';

onMount(() => {
  setTimeout(() => isPageLoaded = true, 20);
});


// Choose word ----------------------------------------------------------------
let selectedWord = '';
function chooseWord(wordId) {
  console.log(111);
  selectedWord = wordId;
}

</script>



<style lang="scss">


// Description ----------------------------------------------------------------
.description {
  padding: 0 5.0rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  line-height: 2.7rem;
  user-select: none;

  &--vertical {
    padding: 3.0rem 0;
    font-size: 2.1rem;
    line-height: 3.0rem;
  }

  &__title {
    margin-bottom: 1.1rem;
    font-size: 1.4rem;
    text-transform: uppercase;
  }

  &__hint {
    margin-bottom: 1.7rem;
    pointer-events: none;
    touch-action: none;
    user-select: none;

    :global(em) {
      font-style: normal;
      font-size: 2.3rem;
      font-family: 'ZingScriptRustR-Base',serif;
      color: #ffffae;
    }
  }

  &__citation {
    font-size: 1.4rem;
    line-height: 1.95rem;
    font-style: italic;
    opacity: .6;
  }
}


// Words list -----------------------------------------------------------------
.words-list {
  padding: 0;
  margin: 0;
  display: flex;

  :global(.words-list__scrollable-block) {
    width: 100%;
    height: 100%;
  }

    :global(.scrollable-block__in-wrap2) {
      min-height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__list-itself {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
    }

      &__word {
        padding: .6rem 0;
        position: relative;
        font-size: 1.8rem;

        &::before,
        &::after {
          content: '';
          width: .4rem;
          height: .4rem;
          border-radius: 100px;
          position: absolute;
          top: calc(50% - .2rem);
          background: #ffffae;
          opacity: 0;
        }
        &::before { left: -1.0rem; }
        &::after { right: -1.0rem; }

        &--active {
          color: #ffffae;

          &::before,
          &::after {
            opacity: 1;
          }
        }
      }
}


// Words recap ----------------------------------------------------------------
.words-recap {
  width: calc(100vw - 13.0rem);
  min-width: calc(100vw - 13.0rem);
  height: calc(100vh - 12.0rem);
  min-height: calc(100vh - 12.0rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &__title {
    margin: 0;
    font-size: 3.0rem;
    text-transform: uppercase;
  }

  &__words-list-n-description {
    width: 100%;
    height: calc(100% - 5.0rem);
    display: flex;
    position: relative;

    &::before {
      content: '';
      width: .2rem;
      height: 45vh;
      min-height: 45vh;
      max-height: 45vh;
      position: absolute;
      inset: calc(50% - 22.5vh) auto auto 25.0rem;
      overflow: hidden;
      background-image: linear-gradient(to bottom, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
    }

    &--vertical {
      flex-direction: column;

      &::before {
        width: 100%;
        height: .2rem;
        min-height: .2rem;
        max-height: .2rem;
        inset: calc(40% + 2.0rem) auto auto 0;
        background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
      }
    }
  }

    &__words-list {
      width: 25.0rem;
      height: 100%;

      &--vertical {
        width: 100%;
        height: 40%;
      }
    }

    &__description {
      flex-grow: 1;
      width: calc(100% - 24.0rem);
      height: 100%;

      &--vertical {
        width: 100%;
        height: 60%;
      }
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

  :global(.level-results-page__basic-layout-container) {
  }

    &__words-recap {
      opacity: 1;
      transition: opacity .5s ease;

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