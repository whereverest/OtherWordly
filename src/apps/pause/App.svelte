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
    '/': Main,
    '/how-to': HowTo,
    '/info': Info,
    '/accessibility': Accessibility,
    '/settings': Settings,
    '/haiku-poem': HaikuPoem,
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



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { fade } from "svelte/transition";
import Router from 'svelte-spa-router';
import { onDestroy, onMount, tick } from 'svelte';
import { push } from 'svelte-spa-router';
import { scale } from 'svelte/transition'
import storesToImport from './storesToImport.js';
import fillStoresWithData from '@helpers/fillStoresWithData.js';

// Components
import ErrorsOverlay from '@components/ErrorsOverlay.svelte';
  // pages
import Accessibility from '@pages-ps/Accessibility/index.svelte';
import HowTo from '@pages-ps/HowTo/index.svelte';
import Info from '@pages-ps/Info/index.svelte';
import Main from '@pages-ps/Main.svelte';
import Settings from '@pages-ps/Settings/index.svelte';
import HaikuPoem from '@pages-ps/HaikuPoem/index.svelte';

// Stores
import { basicFontSize, isDeviceIpad, isPortraitMode } from '@stores/miscellaneous.js';
import { isErrorsOverlayVisible, errorsList } from '@stores/errors.js';
import { changeRandomHaiku } from '@stores-ps/haiku.js';


let changeHaikuInterval;

onMount(async () => {
  fillStoresWithData(window.dataSource || [], storesToImport);
  document.body.style.backgroundColor = _IS_DEV_ENV ? 'black' : 'none';

  changeRandomHaiku();
  changeHaikuInterval = setInterval(() => {
    changeRandomHaiku();
  }, 12000);

  setBasicDeviceParams();
  await tick();
  setTimeout(setBasicDeviceParams, 200);
  setTimeout(setBasicDeviceParams, 400);
  setTimeout(setBasicDeviceParams, 600);
});

onDestroy(() => {
  clearInterval(changeHaikuInterval);
});


// Set basic device params ----------------------------------------------------
import { defineIsDeviceIPad, defineIsPortraitMode, calcFontSize } from '@helpers/deviceOrientationFont.js';

function setBasicDeviceParams() {
  isDeviceIpad.update(defineIsDeviceIPad);
  isPortraitMode.update(defineIsPortraitMode);
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
.app-root {

  &__errors-overlay-wrap {
    width: 50vw;
    height: calc(100vh - 6.0rem);
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