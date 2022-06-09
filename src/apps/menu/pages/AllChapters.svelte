<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { onMount, onDestroy } from "svelte";
  import { push } from "svelte-spa-router";
  import { dispatchIosEvent } from "@helpers/iosEvents.js";
  import { isPortraitMode } from "@stores/miscellaneous.js";

  // TODO: remove unused imports
  // Components -----------------------------------------------------------------
  import BasicPageLayoutLP from "@components/BasicPageLayoutLP.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import CardsCarousel from "@components/CardsCarousel.svelte";
  import ChallengeBadgesList from "@components/ChallengeBadgesList.svelte";
  import ChallengeDetailsHexagon from "@components/ChallengeDetailsHexagon/index.svelte";
  import ChapterCard from "@components/ChapterCard/index.svelte";
  import GlobalHeader from "@components/GlobalHeader.svelte";
  import GlobalFooter from "@components/GlobalFooter.svelte";
  import Icon from "svelte-icon";
  import WeekChallengeSnippet from "@components/WeekChallengeSnippet.svelte";

  // Icons ----------------------------------------------------------------------
  // singles
  import handGestureIcon from "@icons/mainCardIcons/hand_gesture.svg";
  import magicIcon from "@icons/mainCardIcons/magic.svg";
  import blastIcon from "@icons/mainCardIcons/blast.svg";
  import seaStarIcon from "@icons/mainCardIcons/sea_star.svg";
  import starsRowIcon from "@icons/stars_row.svg";

  // TODO: remove unused code
  // Data -----------------------------------------------------------------------
  const cardMainIcons = { handGestureIcon, magicIcon, blastIcon, seaStarIcon };

  let isPageLoaded = false;

  // let isCarouselScrollingBlocked = true;
  let isCardsCarouselInvisible = false;
  let isCardFacesVisible = false;

  // Computed -------------------------------------------------------------------
  $: currentChapter =
    $chaptersList.find((item) => +item.chapterNum === +$selectedChapterId) ||
    $chaptersList?.[0];

  // Stores ---------------------------------------------------------------------
  import {
    chaptersList,
    selectedChapterId,
    chapterTitleCurvature,
    chapterTitleTopShift,
    isChapterTitleHuge,
  } from "@stores-m/chapters.js";
  import { transitionFrom, transitionTo } from "@stores-m/transitions.js";
  import { previousPage } from "@stores-m/pagesNavigation.js";
  import { starsEarned } from "@stores/userInfo.js";

  // Lifecycle hooks ------------------------------------------------------------
  onMount(() => {
    // show the levels selector. Available menu modes: "chapter", "level", "challenge", "options"
    dispatchIosEvent({ tapped: "OWJSMsgSetMenuMode", value: "chapter" });

    if ($transitionFrom === "WeekChallenge") {
      isCardsCarouselInvisible = true;
      setTimeout(() => (isCardsCarouselInvisible = false), 600);
    }

    setTimeout(() => (isPageLoaded = true), 300);
    // setTimeout(() => isCarouselScrollingBlocked = false, 600);

    setTimeout(() => transitionFrom.update(() => ""), 300);
    transitionTo.update(() => "");

    isCardFacesVisible = $transitionFrom === "Chapter";
    setTimeout(() => (isCardFacesVisible = false), 700);
  });

  onDestroy(() => {
    transitionFrom.update(() => "AllChapters");
  });

  // Methods --------------------------------------------------------------------
  function handleSettingsButtonClick() {
    dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
    dispatchIosEvent({ tapped: "OWJSMsgTapOptions" });

    // transitionFrom.update(() => 'AllChapters');
    // setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    // previousPage.update(() => 'AllChapters');
    // setTimeout(() => push('/settings'), 400);
  }

  function handleCardClick(cardId) {
    setTimeout(() => transitionFrom.update(() => "AllChapters"), 50);

    const isCardLocked = $chaptersList.find(
      (item) => item.chapterNum === cardId
    )?.isLocked;
    const isCardUnlockable = $chaptersList.find(
      (item) => item.chapterNum === cardId
    )?.isUnlockable;

    if (!isCardLocked) {
      setTimeout(() => (isCardFacesVisible = true), 350);
    }

    if (isCardLocked && isCardUnlockable) {
      const currentCardIndex = $chaptersList.findIndex(
        (item) => item.chapterNum === cardId
      );
      const newChaptersList = JSON.parse(JSON.stringify($chaptersList));

      if (newChaptersList[currentCardIndex]) {
        newChaptersList[currentCardIndex].isLocked = false;
      }

      chaptersList.update(() => newChaptersList);
      return;
    }

    if ($chaptersList.find((item) => item.chapterNum === cardId)?.isLocked) {
      return;
    }

    setTimeout(() => transitionTo.update(() => "Chapter"), 250);

    setTimeout(() => {
      $chapterTitleCurvature = 0;
      $chapterTitleTopShift = -5;
      isChapterTitleHuge.update(() => true);
    }, 850);
    selectedChapterId.update(() => +cardId);
    previousPage.update(() => "AllChapters");
    setTimeout(() => push("/chapters/" + cardId), 500);

    setTimeout(() => (isCardFacesVisible = true), 300);
  }

  function dispatchIOSMessagesWeeklyChallenge() {
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

  import { isHexagonRotating } from "@stores-m/weeklyChallenges.js";
  function handleWeeklyChallengeClick() {
    isHexagonRotating.update(() => true);
    setTimeout(() => transitionTo.update(() => "WeekChallenge"), 250);
    previousPage.update(() => "AllChapters");
    setTimeout(() => push("/weekly-challenge"), 1200);
    dispatchIOSMessagesWeeklyChallenge();
  }
</script>

<div
  class={`all-chapters-page
  ${_IS_DEV_ENV && "all-chapters-page--with-bg-image"}`}
>
  <BasicPageLayoutLP class="all-chapters-page__basic-layout-container">
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

    <!-- Weekly challenge container -->
    <div
      class={`weekly-challenge-container
      all-chapters-page__weekly-challenge-container
      ${
        ($transitionTo === "WeekChallenge" ||
          $transitionFrom === "WeekChallenge") &&
        "all-chapters-page__weekly-challenge-container--inside-viewport"
      }`}
    >
      <BasicPageLayoutLP
        class="weekly-challenge-container__basic-layout-container"
      >
        <!-- slot: header left -->
        <svelte:fragment slot="header-left">
          <div class="weekly-challenge-container__back-button-wrapper">
            <ButtonInCircle
              class="weekly-challenge-container__back-button"
              iconName="arrowLeft"
              backwardsGradient={true}
              isTextOnTop={true}
              text="Chapters"
              on:click={() => {
                dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
              }}
            />
          </div>
        </svelte:fragment><!-- / slot: header left -->

        <!-- slot: content -->
        <svelte:fragment slot="content">
          <ChallengeBadgesList
            class="weekly-challenge-container__challenge-badges-list"
          />

          <ChallengeDetailsHexagon
            class="weekly-challenge-container__challenge-details-hexagon"
            isWithAnimation={false}
          />
        </svelte:fragment><!-- slot: content -->
      </BasicPageLayoutLP>
    </div>
    <!-- / Weekly challenge container -->

    <!-- slot: header left -->
    <svelte:fragment slot="header-left">
      <div class="all-chapters-page__page-header-left">
        <!-- Stars counter -->
        {#if $starsEarned >= 4}
          <div
            class={`stars-counter
          all-chapters-page__stars-counter
          ${
            ($transitionTo === "WeekChallenge" ||
              $transitionTo === "Settings" ||
              $transitionTo === "Chapter") &&
            "all-chapters-page__stars-counter--invisible"
          }
          ${!isPageLoaded && "all-chapters-page__stars-counter--invisible"}`}
          >
            <div class="stars-counter__icon">
              <Icon data={starsRowIcon} />
            </div>

            <div class="stars-counter__right-side">
              <div class="stars-counter__title">Total Stars</div>
              <div class="stars-counter__number">
                {$starsEarned}
              </div>
            </div>
          </div>
          <!-- / Stars counter -->
        {/if}
      </div>
    </svelte:fragment><!-- / slot: header left -->

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <!-- Flying card -->
      <div
        class={`all-chapters-page__flying-card-container
      ${
        isCardFacesVisible &&
        "all-chapters-page__flying-card-container--visible"
      }`}
      >
        <ChapterCard
          class="all-chapters-page__chapter-card"
          card={currentChapter}
          isClicked={false}
          positionCoeff={0}
          isOnlyFaceNChapterVisible={true}
        />
      </div>
      <!-- / Flying card -->

      <CardsCarousel
        class={`all-chapters-page__cards-carousel
      ${
        (!isPageLoaded ||
          $transitionTo === "WeekChallenge" ||
          $transitionTo === "Chapter" ||
          $transitionTo === "Settings" ||
          isCardsCarouselInvisible) &&
        "all-chapters-page__cards-carousel--invisible"
      }
      ${
        $transitionFrom === "WeekChallenge" &&
        "all-chapters-page__cards-carousel--delayed-transition"
      }`}
        on:cardClick={(event) => handleCardClick(event.detail.activeCardId)}
      />
      <!--      isScrollingBlocked={ isCarouselScrollingBlocked }-->
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer center -->
    <svelte:fragment slot="footer-center">
      <WeekChallengeSnippet
        class={`all-chapters-page__week-challenge-snippet
      ${$isPortraitMode && "portrait-bottom"}
      ${
        ($transitionFrom === "WeekChallenge" ||
          $transitionTo === "WeekChallenge") &&
        "all-chapters-page__week-challenge-snippet--on-the-page-top"
      }
      ${
        ($transitionFrom === "WeekChallenge" ||
          ($transitionFrom === "Chapter" && !isPageLoaded) ||
          ($transitionFrom === "Settings" && !isPageLoaded) ||
          $transitionTo === "Chapter" ||
          $transitionTo === "Settings" ||
          $transitionTo === "WeekChallenge") &&
        "all-chapters-page__week-challenge-snippet--invisible"
      }`}
        on:click={handleWeeklyChallengeClick}
        slot="middleSection"
      />
    </svelte:fragment><!-- / slot: footer center -->

    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div class="all-chapters-page__page-footer-right">
        <div
          class={`all-chapters-page__settings-button-wrapper
          ${
            ($transitionTo === "Settings" || $transitionFrom === "Settings") &&
            "all-chapters-page__settings-button-wrapper--invisible"
          }`}
        >
          <ButtonInCircle
            class="all-chapters-page__settings-button"
            id="optionsButton"
            iconName="gear"
            isMiniFontMode={!$isPortraitMode}
            isTextOnTop={true}
            on:click={handleSettingsButtonClick}
          />
        </div>
      </div>
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayoutLP>
</div>

<style lang="scss">
  // Stars counter --------------------------------------------------------------
  .stars-counter {
    width: 9rem;
    min-width: 9rem;
    height: 3rem;
    display: flex;
    align-content: center;
    align-items: center;

    &__icon {
      width: 2.9rem;
      height: 2.9rem;
      margin-right: 0.3rem;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;

      :global(svg) {
        width: 100%;
        height: 100%;
        fill: #fff;
      }
    }

    &__right-side {
    }

    &__title {
      margin-bottom: 0.2rem;
      font-size: 0.7rem;
      line-height: 0.7rem;
      // text-transform: uppercase;
    }

    &__number {
      font-size: 1.7rem;
      text-align: left;
    }
  }

  // Weekly challenge container -------------------------------------------------
  .weekly-challenge-container {
    // header ---------------------------
    &__back-button-wrapper {
      transform-origin: top center;
      transform: scale(1.5);
    }

    :global(.weekly-challenge-container__back-button) {
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    // content --------------------------
    :global(.weekly-challenge-container__challenge-badges-list) {
      //width: 19.4rem;
      //height: 33.6rem;
      position: absolute;
      inset: calc(50% - 13.2rem) calc(50% + 4.35vw) auto auto;
      transform: translate(-9.7rem, 0);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.weekly-challenge-container__challenge-details-hexagon) {
      //width: 32.5rem;
      //height: 33.3rem;
      position: absolute;
      inset: calc(50% - 17.9rem) auto auto calc(50% + 12.5vw);
      transform: translate(-16.75rem, 0);
      opacity: 1;
      transition: opacity 0.5s ease;
    }
  }

  // All chapters page ----------------------------------------------------------
  .all-chapters-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/menu_bg.jpg)
        no-repeat;
    }

    &__basic-layout-container {
    }

    &__weekly-challenge-container {
      position: absolute;
      inset: 0 auto auto 0;
      pointer-events: none;
      transform: translateY(100%);
      opacity: 0;
      transition: transform 0.85s ease, opacity 0.85s ease;

      &--inside-viewport {
        transform: translateY(0);
        opacity: 1;
        transition: transform 0.95s ease, opacity 0.95s ease;
        //background: red;
      }
    }

    // header ---------------------------
    &__stars-counter {
      opacity: 1;
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
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
      opacity: 0;
      transform: translate(0, 0) translateZ(0);
      /*transition: opacity .3s ease;
transition-delay: .3s;*/
      pointer-events: none;

      &--visible {
        opacity: 1;
      }
    }

    :global(.chapter-details-page__chapter-card) {
    }

    :global(.all-chapters-page__cards-carousel) {
      margin: -24rem auto 0;
      display: inline-flex;
      opacity: 1;
      transition: opacity 0.5s ease;
      transform: translateZ(0);
    }

    :global(.all-chapters-page__cards-carousel--invisible) {
      opacity: 0;
    }

    :global(.all-chapters-page__cards-carousel--delayed-transition) {
      transition-delay: 1s;
      outline: 1px #f00 solid;
    }
    // footer ---------------------------
    :global(.portrait-bottom) {
      bottom: calc(15vh);
      flex-direction: column;
      padding-top: 20px;
    }
    :global(.all-chapters-page__week-challenge-snippet) {
      transform: scale(1);
      transform-origin: bottom center;
      opacity: 1;
      transition: transform 0.9s ease, opacity 0.5s ease;
    }

    :global(.all-chapters-page__week-challenge-snippet--invisible) {
      opacity: 0;
      transition: transform 0.9s ease, opacity 0.5s ease;
    }

    :global(.all-chapters-page__week-challenge-snippet--on-the-page-top) {
      transform: translateY(-90vh);
      transition: transform 0.9s ease, opacity 0.5s ease;
    }

    &__settings-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
    }

    :global(.all-chapters-page__settings-button) {
    }
  }
  @media (min-width: 927px) {
    :global(.weekly-challenge-container__challenge-badges-list) {
      top: calc(50% - 25rem) !important;
      right: calc(50% + 3vw) !important;
    }
  }
</style>
