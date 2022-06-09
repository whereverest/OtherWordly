<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { onMount, onDestroy } from "svelte";
  import { dispatchIosEvent } from "@helpers/iosEvents.js";

  // Components -----------------------------------------------------------------
  import BasicPageLayoutLP from "@components/BasicPageLayoutLP.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import ChallengeBadgesList from "@components/ChallengeBadgesList.svelte";
  import ChallengeDetailsHexagon from "@components/ChallengeDetailsHexagon/index.svelte";

  // Data -----------------------------------------------------------------------
  let isMounted = false;
  let isPageLoaded = false;
  let isBlurredWordsVisible = false;

  // Stores ---------------------------------------------------------------------
  import { transitionFrom, transitionTo } from "@stores-m/transitions.js";
  import { previousPage } from "@stores-m/pagesNavigation.js";

  // Lifecycle hooks ------------------------------------------------------------
  onMount(() => {
    // show the levels selector. Available menu modes: "chapter", "level", "challenge", "options"
    dispatchIosEvent({ tapped: "OWJSMsgSetMenuMode", value: "challenge" });

    isMounted = true;
    setTimeout(() => (isPageLoaded = true), 0);

    setTimeout(() => transitionFrom.update(() => ""), 300);
    transitionTo.update(() => "");

    setTimeout(() => (isBlurredWordsVisible = true), 50);
  });

  onDestroy(() => {
    isMounted = false;
    transitionFrom.update(() => "WeekChallenge");
  });

  // Methods --------------------------------------------------------------------
  // TODO: use generic function for dispatching iOS events
  function dispatchIOSMessagesAllChapters() {
    if (window.webkit != null) {
      // play sound and haptic for button:
      window.webkit.messageHandlers.menu.postMessage({
        tapped: "OWJSMsgPlayClickSound",
      });

      // Stop passing swipes on the game:
      window.webkit.messageHandlers.menu.postMessage({
        tapped: "OWJSMsgDisableArea",
        value: "scroll",
      });
      window.webkit.messageHandlers.menu.postMessage({
        tapped: "OWJSMsgDisableArea",
        value: "play",
      });
    }
  }

  function handleSettingsButtonClick() {
    dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
    dispatchIosEvent({ tapped: "OWJSMsgTapOptions" });

    // transitionFrom.update(() => 'WeekChallenge');
    // setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    // previousPage.update(() => 'WeekChallenge');
    // setTimeout(() => push('/settings'), 400);
  }

  function handleBackToChaptersClick() {
    isBlurredWordsVisible = false;

    setTimeout(() => transitionFrom.update(() => "WeekChallenge"), 0);
    setTimeout(() => transitionTo.update(() => "AllChapters"), 0);
    previousPage.update(() => "WeekChallenge");
    setTimeout(() => push("/"), 0);

    dispatchIOSMessagesAllChapters();
  }

  // Hexagon rotating -----------------------------------------------------------
  import { isHexagonRotating } from "@stores-m/weeklyChallenges.js";

  onMount(() => {
    isHexagonRotating.update(() => true);
  });

  onDestroy(() => {
    setTimeout(() => {
      isHexagonRotating.update(() => false);
    }, 1500);
  });
</script>

<div
  class={`weekly-challenge-page
              ${_IS_DEV_ENV && "weekly-challenge-page--with-bg-image"}`}
>
  <BasicPageLayoutLP class="weekly-challenge-page__basic-layout-container">
    <div
      class="test-button"
      on:click={() => {
        window.webkit?.messageHandlers?.menu?.postMessage({
          tapped: "OWJSMsgOpenDebugOptions",
        });
      }}
      style="
        width: 150px;
        height: 150px;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 100000000;
        /*background: rgba(255,0,0,.4);*/
      "
    />

    <!-- slot: header left -->
    <svelte:fragment slot="header-left">
      <div class="weekly-challenge-page__back-button-wrapper">
        <ButtonInCircle
          class={`weekly-challenge-page__back-button
                    ${
                      ($transitionTo === "AllChapters" ||
                        $transitionTo === "Settings" ||
                        $transitionFrom === "Settings") &&
                      "weekly-challenge-page__back-button--invisible"
                    }`}
          iconName="arrowLeft"
          backwardsGradient={true}
          isTextOnTop={true}
          text="Chapters"
          on:click={() => {
            handleBackToChaptersClick();
            dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
          }}
        />
      </div>
    </svelte:fragment><!-- / slot: header left -->

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <ChallengeBadgesList
        class={`weekly-challenge-page__challenge-badges-list
                  ${
                    ($transitionTo === "Settings" ||
                      $transitionFrom === "Settings") &&
                    "weekly-challenge-page__challenge-badges-list--invisible"
                  }`}
      />

      <ChallengeDetailsHexagon
        class={`weekly-challenge-page__challenge-details-hexagon
                  ${
                    ($transitionTo === "Settings" ||
                      $transitionFrom === "Settings") &&
                    "weekly-challenge-page__challenge-details-hexagon--invisible"
                  }`}
        isWithAnimation={true}
      />
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div
        class={`weekly-challenge-page__settings-button-wrapper
                    ${
                      ($transitionTo === "Settings" ||
                        $transitionFrom === "Settings") &&
                      "weekly-challenge-page__settings-button-wrapper--invisible"
                    }`}
      >
        <ButtonInCircle
          class="weekly-challenge-page__settings-button"
          id="optionsButton"
          slot="rightSection"
          iconName="gear"
          isTextOnTop={true}
          on:click={handleSettingsButtonClick}
        />
      </div>
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayoutLP>
</div>

<style lang="scss">
  // Weekly challenge page ------------------------------------------------------
  .weekly-challenge-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/menu_bg.jpg)
        no-repeat;
    }

    // header ---------------------------
    &__back-button-wrapper {
      transform-origin: top center;
      transform: scale(1.5);
    }

    :global(.weekly-challenge-page__back-button) {
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.weekly-challenge-page__back-button--invisible) {
      opacity: 0;
    }

    // content --------------------------

    :global(.weekly-challenge-page__challenge-badges-list) {
      //width: 19.4rem;
      //height: 33.6rem;
      position: absolute;
      inset: calc(50% - 13.2rem) calc(50% + 4.35vw) auto auto;
      transform: translate(-9.7rem, 0);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.weekly-challenge-page__challenge-badges-list--invisible) {
      opacity: 0;
    }

    :global(.weekly-challenge-page__challenge-details-hexagon) {
      //width: 32.5rem;
      //height: 33.3rem;
      position: absolute;
      inset: calc(50% - 17.9rem) auto auto calc(50% + 12.5vw);
      transform: translate(-16.75rem, 0);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.weekly-challenge-page__challenge-details-hexagon--invisible) {
      opacity: 0;
    }

    // footer ---------------------------

    &__settings-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
    }

    :global(.weekly-challenge-page__settings-button) {
    }
  }

  @media (min-width: 927px) {
    :global(.weekly-challenge-page__challenge-badges-list) {
      top: calc(50% - 25rem) !important;
      right: calc(50% + 3vw) !important;
    }
  }
</style>
