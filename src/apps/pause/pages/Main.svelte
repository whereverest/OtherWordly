<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { isPortraitMode } from "@stores/miscellaneous.js";

  // Components
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import Icon from "svelte-icon";
  import UserStatsSnippet from "@components/UserStatsSnippet";

  // Stores
  // import { basicFontSize } from '@stores/miscellaneous.js';
  import { transitionFrom, transitionTo } from "@stores-fp/transitions.js";
  import { isInGameMode } from "@stores/miscellaneous.js";
  import { currentLevel, currentChapter } from "@stores/stats.js";
  import { chaptersList } from "@stores-m/chapters.js";

  // Images
  import randomAvatar from "@images/characters/char15_astra.png";

  // Icons
  import chatBubbleIcon from "@icons/chat-bubble.svg";

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

  // Go to Challenges page ------------------------------------------------------
  function goToChallengesPage() {
    setTimeout(() => transitionFrom.update(() => "Welcome"), 300);
    setTimeout(() => transitionTo.update(() => "Challenges"), 300);
    setTimeout(() => push("/challenges"), 600);
  }

  // Get random haiku -----------------------------------------------------------
  import { changeRandomHaiku } from "@stores-ps/haiku.js";
  import { randomHaiku } from "@stores-ps/haiku.js";
  import lodashCloneDeep from "lodash-es/cloneDeep.js";

  import { fly, fade } from "svelte/transition";

  let localRandomHaiku = [];
  onMount(() => {
    localRandomHaiku = [...$randomHaiku];

    setInterval(() => {
      localRandomHaiku = [];
      setTimeout(() => {
        changeRandomHaiku();
        localRandomHaiku = [...$randomHaiku];
      }, 1000);
      // setLocalRandomHaiku(randomHaiku);
    }, 12000);
  });

  function setLocalRandomHaiku(newHaiku) {
    localRandomHaiku = [];

    setTimeout(() => {
      localRandomHaiku = lodashCloneDeep(newHaiku);
    }, 700);
  }

  // $: {
  //   setLocalRandomHaiku($randomHaiku);
  // }

  // Handle go to page ----------------------------------------------------------
  import { dispatchIosEvent } from "@helpers/iosEvents.js";
  function handleGoToPage(pageToGoTo) {
    dispatchIosEvent({ tapped: "OWJSMsgPlayClickSound" });
    push(pageToGoTo);
  }
</script>

<div
  class={`empty-settings-page
              ${_IS_DEV_ENV && "empty-settings-page--with-bg-image"}`}
>
  <BasicPageLayout class="empty-settings-page__basic-layout-container">
    <!-- slot: header left -->
    <svelte:fragment slot="header-left">
      {#if !$isInGameMode}
        <UserStatsSnippet
          class="empty-settings-page__user-stats-panel"
          currentChapter={$currentChapter}
          currentLevel={$currentLevel}
          chaptersList={$chaptersList}
        />
      {/if}
    </svelte:fragment><!-- slot: header left -->

    <!-- slot: header right -->
    <svelte:fragment slot="header-right">
      {#if !$isInGameMode}
        <div class="empty-settings-page__close-button-wrapper">
          <ButtonInCircle
            class="empty-settings-page__close-button"
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
      <!-- Big haiku -->
      <ul
        class={`big-haiku
                empty-settings-page__big-haiku
              `}
      >
        <li
          class={`big-haiku__line
                  ${$isPortraitMode && "big-haiku__line--portrait-mode"}
                  big-haiku__line--first
                `}
        >
          {#if localRandomHaiku[0]}
            <div
              in:fly|fade={{ x: -80, delay: 200 }}
              out:fly|fade={{ x: 200, delay: 200, duration: 300 }}
            >
              {localRandomHaiku[0]}
            </div>
          {/if}
        </li>
        <li
          class={`big-haiku__line
                  ${$isPortraitMode && "big-haiku__line--portrait-mode"}
                  big-haiku__line--second`}
        >
          {#if localRandomHaiku[1]}
            <div
              in:fly|fade={{ x: -80, delay: 600 }}
              out:fly|fade={{ x: 200, delay: 500, duration: 300 }}
            >
              {localRandomHaiku[1]}
            </div>
          {/if}
        </li>
        <li
          class={`big-haiku__line
                  ${$isPortraitMode && "big-haiku__line--portrait-mode"}
                  big-haiku__line--third`}
        >
          {#if localRandomHaiku[2]}
            <div
              in:fly|fade={{ x: -80, delay: 1000 }}
              out:fly|fade={{ x: 200, delay: 800, duration: 300 }}
            >
              {localRandomHaiku[2]}
            </div>
          {/if}
        </li>
      </ul>
      <!-- / Big haiku -->
    </svelte:fragment><!-- slot: content -->

    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      {#if !$isInGameMode}
        <div class="empty-settings-page__footer-button-wrapper">
          <ButtonInCircle
            class="empty-settings-page__footer-button
                    empty-settings-page__footer-button--left"
            iconName="howto"
            on:click={() => handleGoToPage("/how-to")}
            text="Help"
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="empty-settings-page__footer-button-wrapper">
          <ButtonInCircle
            class="empty-settings-page__footer-button
                    empty-settings-page__footer-button--right"
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
        <div class="empty-settings-page__footer-button-wrapper">
          <ButtonInCircle
            class="empty-settings-page__footer-button
                    empty-settings-page__footer-button--left"
            iconName="access"
            on:click={() => handleGoToPage("/accessibility")}
            text="Accessibility<br>& Privacy"
            prominent={true}
            isThickBorder={true}
          />
        </div>
        <div class="empty-settings-page__footer-button-wrapper">
          <ButtonInCircle
            class="empty-settings-page__footer-button
                    empty-settings-page__footer-button--right"
            iconName="gear"
            on:click={() => handleGoToPage("/settings")}
            text="Settings"
            prominent={true}
            isThickBorder={true}
          />
        </div>
      {/if}
    </svelte:fragment><!-- slot: footer right -->
  </BasicPageLayout>
</div>

<style lang="scss">
  // Big haiku ------------------------------------------------------------------
  .big-haiku {
    min-width: 65rem;
    min-height: 25rem;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    list-style: none;

    &__line {
      margin-bottom: 0.5rem;
      font-size: 4rem;
      line-height: 4.4rem;
      font-style: italic;
      color: #fcff9c;
      white-space: nowrap;
      text-align: left;
      padding: 1rem;

      &--portrait-mode {
        padding-left: 19rem;
        font-size: 2rem;
      }

      &--first {
      }
      &--second {
      }
      &--third {
      }
    }
  }

  // Empty settings page --------------------------------------------------------
  .empty-settings-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/pause_app_bg.jpg)
        no-repeat;
    }

    &__basic-layout-container {
    }

    // header ---------------------------
    &__user-stats-panel {
    }

    &__close-button-wrapper {
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    :global(.empty-settings-page__close-button) {
    }

    // content --------------------------
    &__big-haiku {
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

    :global(.empty-settings-page__footer-button) {
    }

    :global(.empty-settings-page__footer-button--left::before) {
      width: calc(100% + 1.5rem);
      min-width: calc(100% + 1.5rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
    :global(.empty-settings-page__footer-button--right::before) {
      width: calc(100% + 2rem);
      min-width: calc(100% + 2rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
  }
</style>
