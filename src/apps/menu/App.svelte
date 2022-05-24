<svelte:window
  on:resize={ setBasicDeviceParams }
  on:orientationchange={ setBasicDeviceParams }
/>

<svelte:head>
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
</svelte:head>

<Router
  routes={{
    '/': AllChapters,
    '/weekly-challenge': WeekChallenge,
    '/chapters/:chapterId': Chapter,
    '/settings': Settings,
  }}
/>


<div class="app-root">

  {#if $isErrorsOverlayVisible}
    <div
      class="app-root__errors-overlay-wrap"
      transition:scale={{ duration:200, opacity:0, start:.92 }}
    >
      <ErrorsOverlay
        class="app-root__errors-overlay"
        errorsList={ $errorsList }
      />
    </div>
  {/if}

</div>


<div
  style="
    width: 100vw;
    height: var(--app-height);
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 99999;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  "
>
  <canvas
    class="confetti-canvas"
    width={ $isDeviceIpad ? ($basicFontSize * 3 * 40) : ($basicFontSize * 105) }
    height={ $isDeviceIpad ? ($basicFontSize * 3 * 40 / 1.5) : ($basicFontSize * 105 / 2) }
    style="
      width: {$isDeviceIpad ? 300 : 100}vw;
      min-width: {$isDeviceIpad ? 300 : 100}vw;
      height: {$isDeviceIpad ? 300 : 100}vh;
      min-height: {$isDeviceIpad ? 300 : 100}vh;
      margin-bottom: {$isDeviceIpad ? 90 : 0}vh;
    "
  ></canvas>
</div>


<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import Router from 'svelte-spa-router';
import { onMount, tick } from 'svelte';
import { push } from 'svelte-spa-router';
import { scale } from 'svelte/transition'

import storesToImport from './storesToImport.js';
import fillStoresWithData from '@helpers/fillStoresWithData.js';

// Components
import ErrorsOverlay from '@components/ErrorsOverlay.svelte'
  // pages
import AllChapters from '@pages-m/AllChapters.svelte'
import Chapter from '@pages-m/Chapter.svelte'
import Settings from '@pages-m/Settings.svelte'
import WeekChallenge from '@pages-m/WeekChallenge.svelte'

// Stores
import { basicFontSize, isDeviceIpad, isPortraitMode } from '@stores/miscellaneous.js';
import { startPage } from '@stores-m/pagesNavigation.js';
import { selectedChapterId } from '@stores-m/chapters.js';
import { isErrorsOverlayVisible, errorsList } from '@stores/errors.js';



onMount(() => {
  setBasicDeviceParams();
  fillStoresWithData(window.dataSource || [], storesToImport);
  document.body.style.backgroundColor = _IS_DEV_ENV ? 'black' : 'none';

  // TODO: rename all of the pages according to START.js
  if ($startPage) {
    if ($startPage === 'chapter')   {  }
    if ($startPage === 'level')     { push(`/chapters/${$selectedChapterId || 0}`) }
    if ($startPage === 'challenge') { push('/weekly-challenge') }
    if ($startPage === 'options')   { push('/settings') }
  }
});


// Set basic device params ----------------------------------------------------
import { defineIsDeviceIPad, defineIsPortraitMode, calcFontSize } from '@helpers/deviceOrientationFont.js';

function setBasicDeviceParams() {
  isDeviceIpad.update(defineIsDeviceIPad);

  isPortraitMode.update(defineIsPortraitMode);
  // hack by Michael Douma
  //isPortraitMode.update(false);
  basicFontSize.update(() => calcFontSize($isDeviceIpad, $isPortraitMode));
  document.querySelector('html').style.fontSize = $basicFontSize + 'px';
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', appHeight)
  appHeight()

}

</script>


<style lang="scss">



// App root -------------------------------------------------------------------
:global(:root){
  --app-height: 100%;
}
.app-root {

  &__errors-overlay-wrap {
    width: 50vw;
    height: calc(var(--app-height) - 6.0rem);
    display: flex;
    position: absolute;
    inset: 3.0rem auto auto calc(50% - 25vw);
    z-index: 999999;
  }

    :global(.app-root__errors-overlay) {
      width: 100%;
      height: 100%;
    }
}

</style>
