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
    '/': Welcome,
    '/challenges': Challenges
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

import Router from 'svelte-spa-router';
import { onMount, tick } from 'svelte';
import { push } from 'svelte-spa-router';
import { scale } from 'svelte/transition'
import storesToImport from './storesToImport.js';
import fillStoresWithData from '@helpers/fillStoresWithData.js';

// Components
import ErrorsOverlay from '@components/ErrorsOverlay.svelte';
  // pages
import Challenges from '@pages-fp/Challenges.svelte';
import Welcome from '@pages-fp/Welcome.svelte';

// Stores
import { basicFontSize, isDeviceIpad, isPortraitMode } from '@stores/miscellaneous.js';
import { isErrorsOverlayVisible, errorsList } from '@stores/errors.js';



onMount(async () => {
  fillStoresWithData(window.dataSource || [], storesToImport);
  document.body.style.backgroundColor = _IS_DEV_ENV ? 'black' : 'none';

  setBasicDeviceParams();
  await tick();
  setTimeout(setBasicDeviceParams, 200);
  setTimeout(setBasicDeviceParams, 400);
  setTimeout(setBasicDeviceParams, 600);
});


// Set basic device params ----------------------------------------------------
import { defineIsDeviceIPad, defineIsPortraitMode, calcFontSize } from '@helpers/deviceOrientationFont.js';

function setBasicDeviceParams() {
  isDeviceIpad.update(defineIsDeviceIPad);
  isPortraitMode.update(defineIsPortraitMode);
  basicFontSize.update(() => calcFontSize($isDeviceIpad, $isPortraitMode));
  document.querySelector('html').style.fontSize = $basicFontSize + 'px';
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