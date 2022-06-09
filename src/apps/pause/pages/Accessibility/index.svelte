<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { dispatchIosEvent } from "@helpers/iosEvents";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Components
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import Icon from "svelte-icon";
  // content slider frames
  import AccessibilityFrame from "./frames/Accessibility.svelte";
  import PlayTestingFrame from "./frames/PlayTesting.svelte";
  import PrivacyNDataFrame from "./frames/PrivacyNData.svelte";
  import { isPortraitMode } from "@stores/miscellaneous.js";

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
  import Accessibility from "@pages-ps/Accessibility/frames/Accessibility";

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
  class={`accessibility-page
              ${_IS_DEV_ENV && "accessibility-page--with-bg-image"}`}
>
  <BasicPageLayout class="accessibility-page__basic-layout-container">
    <!-- slot: header right -->
    <svelte:fragment slot="header-right">
      {#if !$isInGameMode}
        <div class="accessibility-page__close-button-wrapper">
          <ButtonInCircle
            class="accessibility-page__close-button"
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
        class="accessibility-page__content-in-wrap"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
        on:touchmove={handleTouchMove}
      >
        <!-- Frames list -->
        <div
          class="frames-list
                  accessibility-page__frames-list"
        >
          {#if activeSlide !== 0}
            <div
              transition:fade={{ duration: 120 }}
              class={`arrow-btn
                    arrow-btn--left
                    frames-list__arrow-btn
                    frames-list__arrow-btn--left
                    ${$isPortraitMode && "arrow-btn--left--portrait-mode"}
                    `}
              on:click={() =>
                (activeSlide = activeSlide === 0 ? 0 : activeSlide - 1)}
            >
              <Icon class="arrow-btn__icon-itself" data={caretLeftIcon} />
            </div>
          {/if}

          {#if activeSlide !== 2}
            <div
              transition:fade={{ duration: 120 }}
              class={`arrow-btn
                    arrow-btn--right
                    frames-list__arrow-btn
                    frames-list__arrow-btn--right
                    ${$isPortraitMode && "arrow-btn--right--portrait-mode"}
                    `}
              on:click={() =>
                (activeSlide = activeSlide === 2 ? 2 : activeSlide + 1)}
            >
              <Icon class="arrow-btn__icon-itself" data={caretRightIcon} />
            </div>
          {/if}

          <!-- Position bullets -->
          <div
            class="position-bullets
                    frames-list__position-bullets"
          >
            <ul class="position-bullets__all-bullets">
              <li
                class="position-bullets__bullet
                      position-bullets__bullet--active-indicator"
                style="transform: translateX({100 * activeSlide}%);"
              />
              {#each [0, 1, 2] as bullet (bullet)}
                <li class="position-bullets__bullet" />
              {/each}
            </ul>
          </div>
          <!-- / Position bullets -->

          <div class="frames-list__in-wrap1">
            <div
              class="frames-list__in-wrap2"
              style="
            margin-left: -{100 * activeSlide}%;
            transform: translateX({$framesListShift}px) translateZ(0);
          "
            >
              <div class="frames-list__frame-wrap">
                <AccessibilityFrame class="frames-list__frame" />
              </div>
              <div class="frames-list__frame-wrap">
                <PlayTestingFrame class="frames-list__frame" />
              </div>
              <div class="frames-list__frame-wrap">
                <PrivacyNDataFrame class="frames-list__frame" />
              </div>
            </div>
          </div>
        </div>
        <!-- / Frames list -->
      </div>
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      {#if !$isInGameMode}
        <div class="accessibility-page__footer-button-wrapper">
          <ButtonInCircle
            class="accessibility-page__footer-button
                    accessibility-page__footer-button--left
                    accessibility-page__footer-button--translucent"
            iconName="howto"
            on:click={() => handleGoToPage("/how-to")}
            text="Help"
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="accessibility-page__footer-button-wrapper">
          <ButtonInCircle
            class="accessibility-page__footer-button
                    accessibility-page__footer-button--right
                    accessibility-page__footer-button--translucent"
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
        <div class="accessibility-page__footer-button-wrapper">
          <ButtonInCircle
            class="accessibility-page__footer-button
                    accessibility-page__footer-button--left"
            iconName="cross"
            on:click={() => handleGoToPage("/")}
            text="Accessibility<br>& Privacy"
            isWithBounceAnimation={true}
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="accessibility-page__footer-button-wrapper">
          <ButtonInCircle
            class="accessibility-page__footer-button
                    accessibility-page__footer-button--right
                    accessibility-page__footer-button--translucent"
            iconName="gear"
            on:click={() => handleGoToPage("/settings")}
            text="Settings"
            prominent={true}
            isThickBorder={true}
          />
        </div>
      {/if}
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayout>
</div>

<style lang="scss">
  // Position bullets -----------------------------------------------------------
  .position-bullets {
    width: 20rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &__all-bullets {
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: nowrap;
      list-style: none;
      position: relative;
    }

    &__bullet {
      width: 1.7rem;
      min-width: 1.7rem;
      height: 1.7rem;
      position: relative;

      &::before {
        content: "";
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 10rem;
        position: absolute;
        inset: calc(50% - 0.3rem) auto auto calc(50% - 0.3rem);
        background: rgba(255, 255, 255, 0.3);
      }

      &--active-indicator {
        position: absolute;
        inset: 0 auto auto 0;
        transition: transform 0.2s cubic-bezier(0.645, 0, 0.445, 1.7);

        &::before {
          width: 1rem;
          height: 1rem;
          inset: calc(50% - 0.5rem) auto auto calc(50% - 0.5rem);
          background: white;
        }
      }
    }
  }

  // Arrow btn ------------------------------------------------------------------
  .arrow-btn {
    width: 5rem;
    height: 5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 0;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 0.25rem rgba(255, 255, 255, 0.3) solid;
      border-radius: 10rem;
      position: absolute;
      inset: 0 auto auto 0;
      z-index: -1;
      transform: scale(1);
      background: rgba(0, 0, 0, 0.3);
      transition: transform 0.1s ease;
    }

    &:active::before {
      transform: scale(1.25);
    }

    &--left {
      padding-right: 0.4rem;

      &--portrait-mode {
        width: 9rem;
        height: 9rem;
        left: calc(50% - 63vw + 4rem) !important;
      }
    }
    &--right {
      padding-left: 0.4rem;

      &--portrait-mode {
        width: 9rem;
        height: 9rem;
        right: calc(50% - 63vw + 4rem) !important;
      }
    }

    :global(.arrow-btn__icon-itself) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  // Frames list ----------------------------------------------------------------
  .frames-list {
    width: calc(100vw - 8rem);
    min-width: calc(100vw - 8rem);
    height: calc(100vh - 10rem);
    min-height: calc(100vh - 10rem);
    display: flex;

    &__arrow-btn {
      position: absolute !important;
      inset: calc(50% - 2.5rem) auto auto auto;
      z-index: 999 !important;

      &--left {
        left: calc(50% - 50vw + 4rem);
      }
      &--right {
        right: calc(50% - 50vw + 4rem);
      }
    }

    &__position-bullets {
      position: absolute;
      inset: auto auto -2.5rem calc(50% - 10rem);
      pointer-events: none;
    }

    &__in-wrap1 {
      width: calc(100% + 5rem);
      min-width: calc(100% + 5rem);
      max-width: calc(100% + 5rem);
      height: calc(100% + 5rem);
      min-height: calc(100% + 5rem);
      box-sizing: border-box;
      display: flex;
      position: relative;
      inset: -2.5rem auto auto -2.5rem;
      overflow: hidden;
      mask-image: linear-gradient(
        to left,
        transparent 0%,
        black 50px,
        black calc(100% - 50px),
        transparent 100%
      );
    }
    &__in-wrap2 {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      transition: margin 0.2s ease, transform 0.2s ease;
    }

    &__frame-wrap {
      width: 100%;
      min-width: 100%;
      height: 100%;
      max-height: 100%;
      padding: 2.5rem;
      box-sizing: border-box;
      display: flex;
    }

    :global(.frames-list__frame) {
      width: 100%;
      height: 100%;
    }
  }

  // Accessibility page ---------------------------------------------------------
  .accessibility-page {
    &--with-bg-image {
      background: 50% 50% / cover
        url(../../../../assets/images/pause_app_bg.jpg) no-repeat;
    }

    &__basic-layout-container {
    }

    // header ---------------------------
    &__close-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.accessibility-page__close-button) {
    }

    // content --------------------------

    &__content-in-wrap {
    }

    &__frames-list {
      position: absolute;
      inset: calc(50% - (50vh - 5rem)) auto auto calc(50% - (50vw - 4rem));
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

    :global(.accessibility-page__footer-button) {
    }

    :global(.accessibility-page__footer-button--left::before) {
      width: calc(100% + 1.5rem);
      min-width: calc(100% + 1.5rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
    :global(.accessibility-page__footer-button--right::before) {
      width: calc(100% + 2rem);
      min-width: calc(100% + 2rem);
      left: -1rem;
      transform: translate(0, -50%);
    }

    :global(.accessibility-page__footer-button--translucent) {
      opacity: 0.33;
    }
  }
</style>
