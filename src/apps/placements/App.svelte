<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import Router from "svelte-spa-router";
  import { onMount, tick } from "svelte";
  import { push } from "svelte-spa-router";
  import { scale } from "svelte/transition";
  import storesToImport from "./storesToImport.js";
  import fillStoresWithData from "@helpers/fillStoresWithData.js";

  // Components
  import ErrorsOverlay from "@components/ErrorsOverlay.svelte";
  // pages
  import Lottie from "@pages-lp/Lottie.svelte";

  // Stores
  import {
    basicFontSize,
    isDeviceIpad,
    isPortraitMode,
  } from "@stores/miscellaneous.js";
  import { isErrorsOverlayVisible, errorsList } from "@stores/errors.js";

  onMount(async () => {
    fillStoresWithData(window.dataSource || [], storesToImport);
    // document.body.style.backgroundColor = _IS_DEV_ENV ? "black" : "none";

    setBasicDeviceParams();
    //await tick();
    setTimeout(setBasicDeviceParams, 200);
    // setTimeout(setBasicDeviceParams, 400);
    // setTimeout(setBasicDeviceParams, 600);
  });

  // Set basic device params ----------------------------------------------------
  import {
    defineIsDeviceIPad,
    defineIsPortraitMode,
    calcFontSize,
  } from "@helpers/deviceOrientationFont.js";

  function setBasicDeviceParams() {
    isDeviceIpad.update(defineIsDeviceIPad);
    isPortraitMode.update(defineIsPortraitMode);
    basicFontSize.update(() => calcFontSize($isDeviceIpad, $isPortraitMode));
    document.querySelector("html").style.fontSize = $basicFontSize + "px";
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
  }
</script>

<svelte:window
  on:resize={setBasicDeviceParams}
  on:orientationchange={setBasicDeviceParams}
/>

<svelte:head>
  <meta name="apple-touch-fullscreen" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <style class="darkreader darkreader--fallback" media="screen"></style>
  <style class="darkreader darkreader--text" media="screen"></style>
  <style class="darkreader darkreader--invert" media="screen">
    .jfk-bubble.gtx-bubble, .captcheck_answer_label > input + img, span#closed_text > img[src^="https://www.gstatic.com/images/branding/googlelogo"], span[data-href^="https://www.hcaptcha.com/"] > #icon, #bit-notification-bar-iframe, ::-webkit-calendar-picker-indicator
    {
      filter: invert(100%) hue-rotate(180deg) contrast(90%) !important;
    }
  </style>
  <style class="darkreader darkreader--inline" media="screen">
    [data-darkreader-inline-bgcolor] {
      background-color: var(--darkreader-inline-bgcolor) !important;
    }
    [data-darkreader-inline-bgimage] {
      background-image: var(--darkreader-inline-bgimage) !important;
    }
    [data-darkreader-inline-border] {
      border-color: var(--darkreader-inline-border) !important;
    }
    [data-darkreader-inline-border-bottom] {
      border-bottom-color: var(--darkreader-inline-border-bottom) !important;
    }
    [data-darkreader-inline-border-left] {
      border-left-color: var(--darkreader-inline-border-left) !important;
    }
    [data-darkreader-inline-border-right] {
      border-right-color: var(--darkreader-inline-border-right) !important;
    }
    [data-darkreader-inline-border-top] {
      border-top-color: var(--darkreader-inline-border-top) !important;
    }
    [data-darkreader-inline-boxshadow] {
      box-shadow: var(--darkreader-inline-boxshadow) !important;
    }
    [data-darkreader-inline-color] {
      color: var(--darkreader-inline-color) !important;
    }
    [data-darkreader-inline-fill] {
      fill: var(--darkreader-inline-fill) !important;
    }
    [data-darkreader-inline-stroke] {
      stroke: var(--darkreader-inline-stroke) !important;
    }
    [data-darkreader-inline-outline] {
      outline-color: var(--darkreader-inline-outline) !important;
    }
    [data-darkreader-inline-stopcolor] {
      stop-color: var(--darkreader-inline-stopcolor) !important;
    }
  </style>

  <style class="darkreader darkreader--variables" media="screen">
    :root {
      --darkreader-neutral-background: #131516;
      --darkreader-neutral-text: #d8d4cf;
      --darkreader-selection-background: #004daa;
      --darkreader-selection-text: #e8e6e3;
    }
  </style>

  <style class="darkreader darkreader--root-vars" media="screen"></style>

  <style class="darkreader darkreader--user-agent" media="screen">
    html {
      background-color: #181a1b !important;
    }
    html,
    body,
    input,
    textarea,
    select,
    button {
      background-color: #181a1b;
    }
    html,
    body,
    input,
    textarea,
    select,
    button {
      border-color: #736b5e;
      color: #e8e6e3;
    }
    a {
      color: #3391ff;
    }
    table {
      border-color: #545b5e;
    }
    ::placeholder {
      color: #b2aba1;
    }
    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      background-color: #555b00 !important;
      color: #e8e6e3 !important;
    }
    ::-webkit-scrollbar {
      background-color: #202324;
      color: #aba499;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #454a4d;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #575e62;
    }
    ::-webkit-scrollbar-thumb:active {
      background-color: #484e51;
    }
    ::-webkit-scrollbar-corner {
      background-color: #181a1b;
    }
    ::selection {
      background-color: #004daa !important;
      color: #e8e6e3 !important;
    }
    ::-moz-selection {
      background-color: #004daa !important;
      color: #e8e6e3 !important;
    }
  </style>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <style>
    html {
      height: 100%;
      font-size: calc(9px + 2vmin);
      overflow: hidden;
    }

    body {
      overflow: hidden;
      height: 100%;
      width: 100vw;
      padding: 0px 0px 0px 0px;
      margin: 0;
      -webkit-text-size-adjust: none;
      margin-left: env(safe-area-inset-left);
      margin-right: env(safe-area-inset-right);
      background-color: rgba(80, 80, 80, 1);
    }

    a,
    u {
      color: white;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    /* a toolkit of various helper/multi-use classes */

    /* row - contains columns */
    .row {
      display: flex;
    }

    /* columns of various sizes */
    .col-16 {
      flex: 16%;
    }
    .col-50 {
      flex: 50%;
    }
    .col-33 {
      flex: 33%;
    }
    .col-40 {
      flex: 40%;
    }
    .col-60 {
      flex: 60%;
    }
    .col-66 {
      flex: 66%;
    }
    .col-25 {
      flex: 25%;
    }
    .col-75 {
      flex: 75%;
    }

    /* top margins of various sizes */
    .m-t-zero {
      margin-top: 0;
    }
    .m-t-s {
      margin-top: 0.16rem;
    }
    .m-t-m {
      margin-top: 0.29rem;
    }
    .m-t-l {
      margin-top: 0.65rem;
    }
    .m-t-xl {
      margin-top: 1.94rem;
    }
    .m-t-xxl {
      margin-top: 2.47rem;
    }

    /* bottom margins of various sizes */
    .m-b-zero {
      margin-bottom: 0;
    }
    .m-b-s {
      margin-bottom: 0.16rem;
    }
    .m-b-m {
      margin-bottom: 0.29rem;
    }
    .m-b-l {
      margin-bottom: 0.65rem;
    }
    .m-b-xl {
      margin-bottom: 1.94rem;
    }

    /* left margins of various sizes */
    .m-l-m {
      margin-left: 0.65rem;
    }
    .m-l-l {
      margin-left: 1.29rem;
    }
    .m-l-xl {
      margin-left: 2.47rem;
    }

    /* right margins of various sizes */
    .m-r-m {
      margin-right: 0.65rem;
    }
    .m-r-l {
      margin-right: 1.29rem;
    }
    .m-r-xl {
      margin-right: 2.47rem;
    }

    /* left & right paddings */
    .p-lr-xs {
      padding-left: 0.41rem;
      padding-right: 0.41rem;
    }
    .p-lr-s {
      padding-left: 0.76rem;
      padding-right: 0.76rem;
    }
    .p-lr-m {
      padding-left: 1.53rem;
      padding-right: 1.53rem;
    }
    .p-lr-l {
      padding-left: 3.12rem;
      padding-right: 3.12rem;
    }

    /* alignment via flex */
    .v-center-flex {
      align-items: center;
    }
    .v-center-flex-content {
      display: flex;
      align-items: center;
    }
    .h-rightalign-flex-content {
      display: flex;
      align-items: right;
    }

    /* centering */
    .v-center {
      margin: 0;
      position: relative;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .h-center {
      margin: 0;
      position: relative;
      left: 50%;
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    .h-alignright {
      margin: 0;
      position: relative;
      right: 0;
    }

    /* horizontal & vertical centering */
    .hv-center {
      margin: 0;
      position: relative;
      top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    /* horizontal alignment of content */
    .h-center-content {
      text-align: center;
    }
    .h-alignleft-content {
      text-align: left;
    }
    .h-alignright-content {
      text-align: right;
    }

    .position-relative {
      position: relative;
    }

    .position-absolute-top {
      position: absolute;
      top: 0;
    }

    .fullheight {
      height: 100vh;
    }

    .hidden {
      display: none !important;
    }

    .invisible {
      visibility: hidden !important;
    }

    #content-win,
    #content-lose,
    #content-readytoplay,
    #content-readytoplay-dialogue,
    #content-tutorial,
    #content-bonus,
    #content-bonus-lose,
    #content-firstplay,
    #content-premium {
      height: auto;
      -webkit-mask-image: none;
      width: calc(
        100% - 20px - env(safe-area-inset-right) - env(safe-area-inset-left)
      );
      overflow: hidden;
      margin: 0;
      padding: 0;
      margin-left: auto;
      margin-right: auto;
    }

    .content-common {
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        black 20px,
        black calc(100% - 20px),
        transparent 100%
      );
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 1rem;
      overflow: auto;
      overflow-x: hidden;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      top: 0px;
      padding: 0 0 0 0;
      left: 0px;
      right: 0px;
    }

    .content-common-interior {
      position: relative;
      /*top: 10px;*/
      margin-left: 5%;
      margin-right: 5%;
      margin-bottom: 20px;
      background-color: rgba(100, 4, 40, 0);
    }

    .sidekick-placeholder-normal,
    .sidekick-placeholder-normal-lose,
    .sidekick-placeholder-readytoplay,
    .sidekick-placeholder-tutorial,
    .sidekick-placeholder-firstplay {
      border: 1px dashed rgba(255, 255, 255, 0.2);
      width: 10rem;
      height: 10rem;
    }

    .sidekick-placeholder-bonus,
    .sidekick-placeholder-bonus-lose,
    .sidekick-placeholder-readytoplay-dialogue,
    .sidekick-placeholder-readytoplay-dialogue-b,
    .sidekick-placeholder-premium,
    .sidekick-placeholder-bonus-b {
      border: 1px dashed rgba(255, 255, 255, 0.2);
      width: 8.53rem;
      height: 8.53rem;
    }

    .sidekick-placeholder-bonus-b-transformed {
      border: 1px dashed rgba(255, 255, 255, 0.2);
      width: 16.47rem;
      height: 16.47rem;
    }

    .speech-bubble-toptobottom {
      padding-top: 2rem;
    }

    .text-highlight {
      font-family: "ZingScriptRustR-Base";
      font-size: 1.29rem;
      vertical-align: -3%;
      color: #fafe9a;
    }

    .noborder {
      border: none !important;
    }

    .chapterend-wrapper {
      width: 100%;
      height: 100vh;
      position: absolute;
    }

    @media screen and (max-width: 568px) {
      .content-common-interior {
        margin-left: 2%;
        margin-right: 2%;
      }
    }

    @media screen and (min-width: 897px) {
      .content-common-interior {
        margin-left: 12%;
        margin-right: 12%;
      }
    }
  </style>
  <style class="darkreader darkreader--sync" media="screen"></style>
  <script>
    /* helps remove horizontal scroll - to be confirmed */
    document.ontouchmove = function (e) {
      e.preventDefault();
    };

    var initialSettings;

    function loadInitialSettings(val) {
      initialSettings = val;
    }

    function insertVariables() {
      document.getElementById("body").scroll("body", 0);
    }
  </script>
  <meta name="darkreader" content="52dead5e439f4f9d80b2b75b59631b17" />
  <style class="darkreader darkreader--override" media="screen">
    .vimvixen-hint {
      background-color: #7b5300 !important;
      border-color: #d8b013 !important;
      color: #f3e8c8 !important;
    }
    ::placeholder {
      opacity: 0.5 !important;
    }
    a[href="https://coinmarketcap.com/"] > svg[width="94"][height="16"] > path
    {
      fill: var(--darkreader-neutral-text) !important;
    }
    #edge-translate-panel-body {
      color: var(--darkreader-neutral-text) !important;
    }
    gr-main-header {
      background-color: #0f3a48 !important;
    }
    embed[type="application/pdf"] {
      filter: invert(100%) contrast(90%);
    }
  </style>
</svelte:head>

<Router
  routes={{
    "/": Lottie,
  }}
/>

<div class="app-root">
  {#if $isErrorsOverlayVisible}
    <div
      class="app-root__errors-overlay-wrap"
      transition:scale={{ duration: 200, opacity: 0, start: 0.92 }}
    >
      <ErrorsOverlay
        class="app-root__errors-overlay"
        errorsList={$errorsList}
      />
    </div>
  {/if}
</div>
