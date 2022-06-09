<script>
  import { dispatchIosEvent } from "@helpers/iosEvents";

  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Components
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import Icon from "svelte-icon";
  // content slider frames
  import Options from "./Options.svelte";

  // Stores
  // import { basicFontSize } from '@stores/miscellaneous.js';
  import { transitionFrom, transitionTo } from "@stores-fp/transitions.js";
  import { isInGameMode } from "@stores/miscellaneous.js";

  // Icons
  // singles
  import caretLeftIcon from "@icons/caret_left.svg";
  import caretRightIcon from "@icons/caret_right.svg";

  onMount(() => {
    transitionFrom.update(() => "");
    transitionTo.update(() => "");

    window.showHaiku = () => setTimeout(() => push("/haiku-poem"), 600);
    window.tapHelp = () => setTimeout(() => push("/how-to"), 600);
    window.tapInfo = () => setTimeout(() => push("/info"), 600);
    window.tapAccess = () => setTimeout(() => push("/accessibility"), 600);
    window.tapSettings = () => setTimeout(() => push("/settings"), 600);
  });

  // Show elements on page opening ----------------------------------------------
  let isAllPageElementsVisible = false;
  onMount(() => {
    setTimeout(() => (isAllPageElementsVisible = true), 300);
  });

  // Handle swipe events --------------------------------------------------------
  let isTouchMoveInProgress = false;

  let touchHorizontalDistance = 0;
  let touchHorizontalStartPoint = null;

  let touchVerticalDistance = 0;
  let touchVerticalStartPoint = null;

  function handleTouchStart(event) {
    isTouchMoveInProgress = true;
    touchHorizontalStartPoint = Math.round(event.changedTouches[0].pageX);
    touchVerticalStartPoint = Math.round(event.changedTouches[0].pageY);
  }

  function handleTouchEnd() {
    isTouchMoveInProgress = false;

    touchHorizontalStartPoint = null;
    touchHorizontalDistance = 0;

    touchVerticalStartPoint = null;
    touchVerticalDistance = 0;
  }

  function handleTouchMove(event) {
    if (!isTouchMoveInProgress) {
      return;
    }
    touchHorizontalDistance = -(
      Math.round(touchHorizontalStartPoint) -
      Math.round(event.changedTouches[0].pageX)
    );
    touchVerticalDistance = -(
      Math.round(touchVerticalStartPoint) -
      Math.round(event.changedTouches[0].pageY)
    );
  }

  // Detect is swipe horizontal -------------------------------------------------
  let isHorizontalSwipe = false;

  $: {
    if (
      Math.abs(touchHorizontalDistance) > 120 ||
      Math.abs(touchVerticalDistance) > 120
    ) {
      isHorizontalSwipe =
        Math.abs(touchHorizontalDistance) > Math.abs(touchVerticalDistance);
      // console.log('%c touchHorizontalDistance: ', 'background:LightSeaGreen;color:white', touchHorizontalDistance);
    }
  }

  // Frames list shift ----------------------------------------------------------
  import { tweened } from "svelte/motion";
  import { linear, quadInOut } from "svelte/easing";

  let framesListShift = tweened(0, { duration: 50, easing: quadInOut });
  $: {
    if (!isSlideChangeBlocked) {
      framesListShift.set(touchHorizontalDistance / 2.5, {
        duration: 50,
        easing: quadInOut,
      });
    }
  }

  // Change slide & reset starting point ----------------------------------------
  let activeSlide = 0;

  $: {
    if (
      isHorizontalSwipe &&
      Math.abs(touchHorizontalDistance) > 120 &&
      !isSlideChangeBlocked
    ) {
      changeSlide();
    }
  }

  // stop detecting swipe after slide change
  let isSlideChangeBlocked = false;

  function changeSlide() {
    if (isSlideChangeBlocked) {
      return;
    }

    let newActiveSlide =
      touchHorizontalDistance > 0 ? activeSlide - 1 : activeSlide + 1;
    if (newActiveSlide < 0) activeSlide = 0;
    else if (newActiveSlide > 2) activeSlide = 2;
    else activeSlide = newActiveSlide;

    touchHorizontalStartPoint = currentFingerPositionPageX;
    touchHorizontalDistance = 0;
    if (activeSlide === newActiveSlide) {
      framesListShift.set(0, { duration: 50, easing: quadInOut });
    }

    isSlideChangeBlocked = true;
    setTimeout(() => {
      isSlideChangeBlocked = false;
      touchHorizontalStartPoint = currentFingerPositionPageX;
      touchHorizontalDistance = 0;
    }, 150);
  }

  // Current finger position ----------------------------------------------------
  let currentFingerPosition = 0;
  let currentFingerPositionPageX = 0;
  function setCurrentFingerPosition(event) {
    currentFingerPosition = event.changedTouches[0].screenX;
    currentFingerPositionPageX = event.changedTouches[0].pageX;
  }

  onMount(() => {
    document.addEventListener("touchmove", setCurrentFingerPosition);
  });

  // Handle go to page ----------------------------------------------------------
  function handleGoToPage(pageToGoTo) {
    dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
    push(pageToGoTo);
  }
</script>

<div
  class={`options-page
              ${_IS_DEV_ENV && "options-page--with-bg-image"}`}
>
  <BasicPageLayout class="options-page__basic-layout-container">
    <!-- slot: header right -->
    <svelte:fragment slot="header-right">
      {#if !$isInGameMode}
        <div class="options-page__close-button-wrapper">
          <ButtonInCircle
            class="options-page__close-button"
            iconName="cross"
            on:click={() => {
              dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
              dispatchIosEvent({ tapped: "OWJSMsgDismissPause" });
            }}
            prominent={true}
            isThickBorder={true}
            backwardsGradient={true}
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: header right -->

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div
        class="options-page__content-in-wrap"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
        on:touchmove={handleTouchMove}
      >
        <Options class="options-page__options-container" />
      </div>
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      {#if !$isInGameMode}
        <div class="options-page__footer-button-wrapper">
          <ButtonInCircle
            class="options-page__footer-button
                    options-page__footer-button--left
                    options-page__footer-button--translucent"
            iconName="howto"
            on:click={() => handleGoToPage("/how-to")}
            text="Help"
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="options-page__footer-button-wrapper">
          <ButtonInCircle
            class="options-page__footer-button
                    options-page__footer-button--right
                    options-page__footer-button--translucent"
            iconName="info"
            on:click={() => handleGoToPage("/info")}
            text="Info"
            prominent={true}
            isThickBorder={true}
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: footer left -->

    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      {#if !$isInGameMode}
        <div class="options-page__footer-button-wrapper">
          <ButtonInCircle
            class="options-page__footer-button
                    options-page__footer-button--left
                    options-page__footer-button--translucent"
            iconName="access"
            on:click={() => handleGoToPage("/accessibility")}
            text="Accessibility<br>& Privacy"
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="options-page__footer-button-wrapper">
          <ButtonInCircle
            class="options-page__footer-button
                    options-page__footer-button--right"
            iconName="cross"
            on:click={() => handleGoToPage("/")}
            text="Settings"
            isWithBounceAnimation={true}
            prominent={true}
            isThickBorder={true}
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayout>
</div>

<style lang="scss">
  // Options page ---------------------------------------------------------------
  .options-page {
    &--with-bg-image {
      background: 50% 50% / cover
        url(../../../../assets/images/pause_app_bg.jpg) no-repeat;
    }

    // header ---------------------------
    &__close-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.options-page__close-button) {
    }

    // content --------------------------
    :global(.options-page__options-container) {
      width: calc(100vw - 18rem);
      min-width: calc(100vw - 18rem);
      height: calc(100vh - 10rem);
      min-height: calc(100vh - 10rem);
      box-sizing: border-box;
      padding-bottom: 1rem;
      display: flex;
    }

    // footer ---------------------------
    &__footer-button-wrapper {
      padding-bottom: 1.2rem;
      margin-right: 2.5rem;
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;

      &:last-child {
        margin-right: 0;
      }

      &--invisible {
        opacity: 0;
      }
    }

    :global(.options-page__footer-button) {
    }

    :global(.options-page__footer-button--left::before) {
      width: calc(100% + 1.5rem);
      min-width: calc(100% + 1.5rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
    :global(.options-page__footer-button--right::before) {
      width: calc(100% + 2rem);
      min-width: calc(100% + 2rem);
      left: -1rem;
      transform: translate(0, -50%);
    }

    :global(.options-page__footer-button--translucent) {
      opacity: 0.33;
    }
  }
</style>
