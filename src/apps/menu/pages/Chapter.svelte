<script>
  import RoundButton from "../../../components/RoundButton.svelte";

  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  // Props ----------------------------------------------------------------------
  export let params = {};

  // Components -----------------------------------------------------------------
  import BasicPageLayoutLP from "@components/BasicPageLayoutLP.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import ChapterAchievements from "@components/ChapterCard/ChapterAchievements.svelte";
  import ChapterCard from "@components/ChapterCard/index.svelte";
  import ProgressBar from "@components/ProgressBar.svelte";

  // Data -----------------------------------------------------------------------
  let isPageLoaded = false;
  let isFlyingCardMoveToTheLeft = false;
  let isAllPageElementsVisible = false;
  let currentChapter = null;
  // Stores ---------------------------------------------------------------------
  import {
    chaptersList,
    chapterTitleCurvature,
    chapterTitleTopShift,
    isChapterTitleHuge,
    selectAMissionTitle,
    selectedChapterId,
    chapterPageState,
  } from "@stores-m/chapters.js";
  import { transitionFrom, transitionTo } from "@stores-m/transitions.js";
  import { previousPage } from "@stores-m/pagesNavigation.js";
  import { dispatchIosEvent } from "@helpers/iosEvents.js";
  import { isPortraitMode } from "@stores/miscellaneous.js";

  // Computed -------------------------------------------------------------------
  $: currentChapter =
    $chaptersList.find((item) => {
      console.log(item.chapterNum, $selectedChapterId);
      return item.chapterNum === $selectedChapterId;
    }) || $chaptersList[0];

  // Lifecycle hooks ------------------------------------------------------------
  onMount(() => {
    dispatchIosEvent({ tapped: "OWJSMsgEnableArea", value: "scroll" });
    dispatchIosEvent({ tapped: "OWJSMsgEnableArea", value: "play" });

    // show the levels selector. Available menu modes: "chapter", "level", "challenge", "options"
    dispatchIosEvent({ tapped: "OWJSMsgSetMenuMode", value: "level" });
    if ($transitionFrom === "Settings") {
      setTimeout(() => {
        isAllPageElementsVisible = true;
        console.log("$transitionFrom is settings");
      }, 100);
    }

    if ($transitionFrom === "AllChapters") {
      setTimeout(() => {
        isFlyingCardMoveToTheLeft = true;
        console.log("$transitionFrom is all chapters");
      }, 300);
    } else isFlyingCardMoveToTheLeft = true;
    setTimeout(() => transitionFrom.update(() => ""), 100);
    transitionTo.update(() => "");
    setTimeout(() => (isPageLoaded = true), 100);
    setTimeout(() => (isAllPageElementsVisible = true), 750);

    setTimeout(() => {
      $chapterTitleCurvature = 0;
      $chapterTitleTopShift = -5;
      isChapterTitleHuge.update(() => true);
      selectedChapterId.update(() => +params.chapterId);
    }, 400);
  });

  // Methods --------------------------------------------------------------------
  function dispatchIOSMessagesAllChapters() {
    // TODO: use generic function for dispatching iOS events
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

  function handleBackToChaptersClick() {
    transitionFrom.update(() => "Chapter");
    setTimeout(() => {
      transitionTo.update(() => "AllChapters");
      $chapterTitleCurvature = 3;
      $chapterTitleTopShift = -3.7;
      isChapterTitleHuge.update(() => false);
    }, 0);
    previousPage.update(() => "Chapter");
    setTimeout(() => push("/"), 400);

    dispatchIOSMessagesAllChapters();
  }

  function handleSettingsButtonClick() {
    dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
    dispatchIosEvent({ tapped: "OWJSMsgTapOptions" });

    // transitionFrom.update(() => 'Chapter');
    // setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    // previousPage.update(() => 'Chapter');
    // setTimeout(() => push('/settings'), 400);
  }
</script>

<!-- Level select & Play button -->
<div class="level-select-n-play-but">
  <div class="level-select-n-play-but__level-select-container">
    <div class="level-select-n-play-but__level-select" />
  </div>
  <div class="level-select-n-play-but__play-but" />
</div>
<!-- / Level select & Play button -->

<div
  class={`chapter-details-page
            ${_IS_DEV_ENV && "chapter-details-page--with-bg-image"}`}
>
  <BasicPageLayoutLP class="chapter-details-page__basic-layout-container">
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
      <div class="chapter-details-page__back-button-wrapper">
        <ButtonInCircle
          class={`chapter-details-page__back-button
                  ${
                    (!isPageLoaded ||
                      $transitionTo === "AllChapters" ||
                      $transitionTo === "Settings") &&
                    "chapter-details-page__back-button--invisible"
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
      <!-- Flying card -->
      <div
        class={`chapter-details-page__flying-card-container
                  ${$transitionFrom === "Settings"}
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__flying-card-container__with-portrait-mode"
                  }
                  ${
                    isFlyingCardMoveToTheLeft &&
                    $transitionTo !== "AllChapters" &&
                    !$isPortraitMode &&
                    "chapter-details-page__flying-card-container--placed-on-left"
                  }
                  ${
                    isFlyingCardMoveToTheLeft &&
                    $transitionTo !== "AllChapters" &&
                    $isPortraitMode &&
                    "chapter-details-page__flying-card-container__with-portrait-mode--placed-on-left"
                  }
                  ${
                    ($transitionFrom === "Settings" ||
                      $transitionTo === "Settings") &&
                    "chapter-details-page__flying-card-container--invisible"
                  }`}
      >
        <ChapterCard
          class={`chapter-details-page__chapter-card`}
          card={currentChapter}
          isClicked={false}
          positionCoeff={0}
          isOnlyFaceNChapterVisible={true}
        />
      </div>
      <!-- / Flying card -->

      <div
        class={`chapter-details-page__content-divider-line
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__content-divider-line__with-portrait-mode"
                  }
                  ${
                    (!isAllPageElementsVisible ||
                      $transitionFrom === "Chapter") &&
                    "chapter-details-page__content-divider-line--invisible"
                  }`}
      />

      <div
        class={`chapter-details-page__chapter-description
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__chapter-description__with-portrait-mode"
                  }
                  ${
                    (!isAllPageElementsVisible ||
                      $transitionFrom === "Chapter") &&
                    "chapter-details-page__chapter-description--invisible"
                  }`}
      >
        {currentChapter.description}
      </div>

      <!-- Level rewards -->
      <div
        class={`level-rewards
                  ${
                    (!isAllPageElementsVisible ||
                      $transitionFrom === "Chapter") &&
                    "level-rewards--invisible"
                  }
                  chapter-details-page__level-rewards
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__level-rewards__with-portrait-mode"
                  }`}
      >
        <div class="level-rewards__title" id="selectALevel-title">
          {$selectAMissionTitle}
        </div>

        <div class="level-rewards__carousel-placeholder" id="selectALevel-zone">
          <div
            class={`level-rewards__five-obs-region
                  ${
                    $isPortraitMode &&
                    "level-rewards__five-obs-region__with-portrait-mode"
                  }
                  `}
          />
        </div>
        {#if $chapterPageState === "full"}
          <ProgressBar
            class="level-rewards__progressbar"
            type={["single", "double", "triple"][
              currentChapter?.progressBarNames?.length - 1
            ]}
            progress={currentChapter?.progress}
            titles={currentChapter?.progressBarNames}
            gradientColors={currentChapter?.progressBarGradient}
          />
        {/if}

        <ChapterAchievements
          class="level-rewards__stats"
          chapterDetails={currentChapter}
          isReducedVersion={false}
          isOnlyIconShowed={$chapterPageState === "minimized"}
        />
      </div>
      <!-- / Level rewards -->

      <div
        class={`chapter-details-page__content-play-container
                  ${
                    (!isAllPageElementsVisible ||
                      $transitionFrom === "Chapter") &&
                    "chapter-details-page__content-play-container--invisible"
                  }
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__content-play-container__with-portrait-mode"
                  }
                                      `}
      >
        <div
          class={`chapter-details-page__content-play-container--upper
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__content-play-container--upper__with-portrait-mode"
                  }
                                      `}
        />
        <RoundButton isThickBorder="true" textInCircle="Play" />
        <div
          class={`chapter-details-page__content-play-container--lower
                  ${
                    $isPortraitMode &&
                    "chapter-details-page__content-play-container--lower__with-portrait-mode"
                  }
                                      `}
        />
      </div>
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div
        class={`chapter-details-page__settings-button-wrapper
                  ${
                    $transitionTo === "Settings" &&
                    "chapter-details-page__settings-button-wrapper--invisible"
                  }`}
      >
        <ButtonInCircle
          class="chapter-details-page__settings-button"
          id="optionsButton"
          iconName="gear"
          isTextOnTop={true}
          on:click={handleSettingsButtonClick}
        />
      </div>
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayoutLP>
</div>

<style lang="scss">
  // Level select & Play button -------------------------------------------------
  .level-select-n-play-but {
    width: 10px;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    top: calc(50vh + 0px);
    left: calc(50vw - 5px);
    z-index: 1;
    font-size: calc((var(--app-height) + var(--app-height) * 1.5) / 100);

    &__level-select-container {
      /* aspect ratio is 30/13 */
      /*width: 27.0em;
    height: 11.7em;*/
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: calc(50% - 10em);
      left: calc(25vw - 20.9em);
      //outline: 1px #f00 solid;
    }

    &__level-select {
      width: 27vw;
      height: 100%;
      //background: rgba(255,0,0,.5);
    }

    &__play-but {
      width: 9em;
      height: 9em;
      position: absolute;
      top: calc(50% - 6.6em);
      left: calc(50vw - 12.3em);
      //background: rgba(0,255,0,.2);
    }
  }

  @media (min-width: 927px) {
    .level-select-n-play-but {
      font-size: calc((var(--app-height) + var(--app-height) * 0.8) / 100);

      &__level-select-container {
        width: 25em;
        height: 9.4em;
        top: calc(50% - 9.5em);
        left: calc(25vw - 14.9em);
      }

      &__level-select {
        //width: 27vw;
        //height: 100%;
      }

      &__play-but {
        width: 7.6em;
        height: 7.6em;
        //inset: calc(50% - 6.6em) auto auto calc(50vw - 12.3em);
        top: calc(50% + 18.6em);
        left: calc(50% - 3.8em);
      }
    }
  }

  // Level rewards --------------------------------------------------------------
  .level-rewards {
    width: 22rem;
    min-width: 22rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 0.5s ease;
    //outline: 1px #f00 solid;

    &--invisible {
      opacity: 0;
    }

    &__title {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      text-align: center;
      font-family: "MuseoSlabRounded-300", serif;
      position: relative;
      right: 0.5rem;
    }

    &__carousel-placeholder {
      width: 100%;
      height: 14rem;
      flex-grow: 1;
    }
    &__five-obs-region {
      background: #59d3a996;
      width: 100%;
      transform: translate(0, 2rem);
      height: 9rem;
      &__with-portrait-mode {
        width: calc(100% + 16vw);
        transform: translate(-8vw, 2rem);
      }
    }
    :global(.level-rewards__progressbar) {
      margin-bottom: 1.1rem;
      transform: scale(1.5);
      position: relative;
      right: 0.5rem;
    }

    :global(.level-rewards__stats) {
      transform: scale(1.35);
    }
  }

  @media (min-width: 927px) {
    .level-rewards {
    }
  }

  // Chapter details page -------------------------------------------------------
  .chapter-details-page {
    z-index: 0;
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/menu_bg.jpg)
        no-repeat;
    }

    &__basic-layout-container {
    }

    // header ---------------------------
    &__back-button-wrapper {
      transform-origin: top center;
      transform: scale(1.5);
    }

    :global(.chapter-details-page__back-button) {
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.chapter-details-page__back-button--invisible) {
      opacity: 0;
    }

    // content --------------------------
    &__flying-card-container {
      width: 30rem;
      min-width: 30rem;
      height: 22rem;
      min-height: 22rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      position: absolute;
      inset: -15.2rem auto auto auto;
      overflow: hidden;
      transform: translate(0, 0) translateZ(0);
      opacity: 1;
      transition: transform 0.5s ease, opacity 0.5s ease;
      //outline: 1px #0f0 solid;
      &__with-portrait-mode {
        left: auto;
        &--placed-on-left {
          transform: translate(0, -15.8rem) translateZ(0);
        }
      }
      &--placed-on-left {
        transform: translate(-25.5vw, 10vh) translateZ(0);
      }

      &--invisible {
        opacity: 0;
      }
    }

    :global(.chapter-details-page__chapter-card) {
    }

    &__content-divider-line {
      width: 0.1rem;
      min-width: 2px;
      height: 70vh;
      position: absolute;
      inset: calc(50% - 34vh) calc(50% + 3.1rem) auto auto;
      opacity: 0.15;
      background: rgb(255, 255, 255);
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 35%,
        rgba(255, 255, 255, 1) 65%,
        rgba(255, 255, 255, 0) 100%
      );
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
      &__with-portrait-mode {
        top: auto;
        -webkit-transform: none !important;
        height: 0.1rem;
        width: 60vw;
        transform: none !important;
        inset: -8rem calc(50% - 30vw) auto auto;
      }
    }

    &__chapter-description {
      width: 30rem;
      min-width: 30rem;
      height: 7rem;
      min-height: 7rem;
      padding: 0 3rem;
      box-sizing: border-box;
      position: absolute;
      inset: 2.14rem auto auto calc(50% - 12rem);
      transform: translate(-29.5vw, 12vh) translateZ(0);
      opacity: 1;
      transition: opacity 0.5s ease;
      //outline: 1px #f00 solid;

      &--invisible {
        opacity: 0;
      }
      &__with-portrait-mode {
        left: auto;
        top: -13rem;
        transform: none !important;
      }
    }

    &__level-rewards {
      //width: 22.0rem;
      //min-width: 22.0rem;
      position: absolute;
      inset: calc(50% - 12rem) auto auto calc(25vw - 18.5rem);
      //outline: 1px #f00 solid;
      &__with-portrait-mode {
        top: auto;
        -webkit-transform: none !important;
        transform: none !important;
        inset: -6rem auto auto auto;
      }
    }

    &__content-play-container {
      position: absolute;
      right: calc(-50vw + 4.5rem);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      &--invisible {
        opacity: 0;
      }
      &__with-portrait-mode {
        top: 19rem;
        flex-direction: row;
        right: auto;
      }
      &--upper {
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        opacity: 0.25;
        width: 0.2rem;
        height: calc(var(--app-height) / 2 - 12rem);
        position: relative;
        &::before {
          content: "";
          width: 10rem;
          height: 10rem;
          position: absolute;
          inset: calc(150% + 1rem) auto auto 50%;
          z-index: 1;
          transform: translate(-50%, -50%) rotateZ(180deg);
          touch-action: none;
          border: 0.1rem rgba(255, 255, 255, 0.9) solid;
          border-radius: 40rem;
          mask-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 20%
          );
        }
        &__with-portrait-mode {
          height: 0.2rem;
          width: calc(50vw - 12rem);
          &::before {
            inset: -5rem auto auto calc(50vw - 12rem);
            transform: rotateZ(90deg);
          }
        }
      }
      &--lower {
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1) 100%,
          rgba(255, 255, 255, 0) 0%
        );
        opacity: 0.25;
        width: 0.2rem;
        height: calc(var(--app-height) / 2 - 12rem);
        position: relative;
        &::before {
          content: "";
          width: 10rem;
          height: 10rem;
          position: absolute;
          inset: calc(-100% - 2rem) auto auto 50%;
          z-index: 1;
          transform: translate(-50%, 0%) rotateZ(0deg);
          touch-action: none;
          border: 0.1rem rgba(255, 255, 255, 0.9) solid;
          border-radius: 40rem;
          mask-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 20%
          );
        }
        &__with-portrait-mode {
          height: 0.2rem;
          width: calc(50vw - 12rem);
          &::before {
            inset: -5rem auto auto 0;
            transform: translate(-100%, 0%) rotateZ(-90deg);
          }
        }
      }
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

    :global(.chapter-details-page__settings-button) {
    }
  }

  @media (min-width: 927px) {
    .chapter-details-page {
      // content ------------------------
      &__flying-card-container {
        //inset: -15.14rem auto auto calc(50% - 15.0rem);

        &--placed-on-left {
          transform: translate(-21.5vw, 0) translateZ(0);
        }
      }

      &__content-divider-line {
        height: 44vh;
        inset: calc(50% - 22vh) calc(50% - 0.5rem) auto auto;
        //opacity: 0;
      }

      &__chapter-description {
        inset: 2.14rem auto auto calc(50% - 12rem);
        transform: translate(-25.5vw, 2vh) translateZ(0);
      }

      &__level-rewards {
        //inset: calc(50% - 14.0rem) auto auto calc(25vw - 18.5rem);
        inset: calc(50% - 12.5rem) auto auto calc(25vw - 12.5rem);
      }
    }
  }
</style>
