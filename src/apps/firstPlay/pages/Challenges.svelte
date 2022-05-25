<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { dispatchIosEvent } from "@helpers/iosEvents.js";

  // Components
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import CircleProgressBar from "@components/CircleProgressBar.svelte";
  import DifficultyLevelSnippetLP from "@components/DifficultyLevelSnippetLP";
  import { onMount } from "svelte";
  import TwoColorsTitleLP from "@components/TwoColorsTitleLP";

  // Stores
  import { transitionFrom, transitionTo } from "@stores-fp/transitions.js";
  import { difficultyLevel } from "@stores/options.js";
  import { isPortraitMode, isDeviceIpad } from "@stores/miscellaneous.js";

  // Show elements on page opening ----------------------------------------------
  let isAllPageElementsVisible = false;
  onMount(() => {
    setTimeout(() => (isAllPageElementsVisible = true), 10);
  });

  // Levels list & selection ----------------------------------------------------
  const levelsList = [
    {
      id: "X",
      complexity: "Easy",
      name: "Pioneer",
      description: ["Kid-", "friendly"],
    },
    {
      id: "Y",
      complexity: "Adaptive",
      name: "Wayfinder",
      description: ["Adapts to your", "vocab level"],
    },
    {
      id: "Z",
      complexity: "Challenge",
      name: "Voyager",
      description: ["Varied words", "+ missing letters"],
    },
  ];

  $: selectedLevelIndex = levelsList.findIndex(
    (item) => item.id === $difficultyLevel
  );

  // Dispatch iOS events --------------------------------------------------------
  // without block it will dispatch iOS events on page load
  let isIOSMessagesBlocked = true;

  onMount(() => {
    setTimeout(() => {
      isIOSMessagesBlocked = false;
    }, 300);
  });

  function dispatchIOSEventWrapper(iOSvent) {
    if (!isIOSMessagesBlocked) {
      dispatchIosEvent(iOSvent);
    }
  }

  $: {
    if ($difficultyLevel !== undefined) {
      dispatchIOSEventWrapper({
        tapped: "OWJSMsgDifficultyLevelChange",
        value: $difficultyLevel,
      });
    }
  }
</script>

<div
  class={`challenges-page
  ${_IS_DEV_ENV && "challenges-page--with-bg-image"}`}
>
  <BasicPageLayout class="challenges-page__basic-layout-container">
    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div
        class={`challenges-page__page-content
        ${
          $isPortraitMode &&
          'challenges-page__page-content__bottom-down'
        }
        ${
          !isAllPageElementsVisible &&
          "challenges-page__page-content--invisible"
        }
        ${
          $transitionFrom === "Welcome" &&
          !isAllPageElementsVisible &&
          "challenges-page__page-content--moved-to-right"
        }`}
      >
        <!-- Main title -->
        <div
          class={`main-title
        challenges-page__main-title 
        ${
          $isPortraitMode && !$isDeviceIpad &&
          'challenges-page__main-title--portrait-mode'
        } 
        ${
          $isPortraitMode && $isDeviceIpad &&
          'challenges-page__main-title--ipad-portrait-mode'
        }
        `}
        >
          <TwoColorsTitleLP
            class={`main-title__first-line`}
            isMiniMode={$isPortraitMode}
            text="Choose Your Challenge"
            isNoWrap={true}
          />

          <div
            class={`main-title__second-line${
              $isPortraitMode && "__portrait-mode"
            }`}
          >
            What kinds of <b>words</b> do you want to play with?
          </div>
        </div>
        <!-- / Main title -->

        <ul
          class={`challenges-page__challenges-menu ${
            $isPortraitMode && "challenges-menu-portrait-mode"
          }`}
        >
          {#each levelsList as level, index (level.complexity)}
            <DifficultyLevelSnippetLP
              class={`challenges-page__option-snippet`}
              isMiniFontMode={$isPortraitMode}
              levelName={level.name}
              levelComplexity={level.complexity}
              levelDescription={level.description}
              isActive={level.id === $difficultyLevel}
              isWithDivider={!(
                index === levelsList.length - 1 ||
                index === selectedLevelIndex ||
                index === selectedLevelIndex - 1
              )}
              on:click={() => {
                difficultyLevel.update(() => level.id);
                dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
              }}
              on:deactivate={() =>
                setTimeout(() => difficultyLevel.update(() => ""), 100)}
            />
          {/each}
        </ul>
      </div>
    </svelte:fragment><!-- / slot: content -->
  </BasicPageLayout>
</div>

<style lang="scss">
  // Main title -----------------------------------------------------------------
  .main-title {
    :global(.main-title__first-line) {
      margin-bottom: 1.9rem;
    }

    &__second-line {
      white-space: nowrap;
      font: 2.06rem/2.5rem "ZingScriptRustR-Base", serif;

      &__portrait-mode {
        font: 1.36rem/2.5rem "ZingScriptRustR-Base", serif;
      }
    }
  }

  .challenges-menu-portrait-mode {
    flex-direction: column;
  }

  // Challenges page ------------------------------------------------------------
  .challenges-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/menu_bg2.jpg)
        no-repeat;
    }

    &__basic-layout-container {
    }

    &__page-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: margin 0.5s ease-out, opacity 0.4s ease;

      &__bottom-down {
        margin-top: 12vh;
      }

      &--invisible {
        opacity: 0;
      }

      &--moved-to-right {
        position: relative;
        margin-left: 25rem;
      }
    }

    &__main-title {
      margin: -4.5rem 0 3.5rem 0;

      &--portrait-mode {
      }

      &--ipad-portrait-mode {
        margin: 0.5rem 0 2.5rem 0;
      }
    }

    &__challenges-menu {
      padding: 0;
      margin: 0;
      display: flex;
      list-style: none;
    }
  }
</style>
