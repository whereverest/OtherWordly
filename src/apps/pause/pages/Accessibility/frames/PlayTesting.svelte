<script>
  let mixClass;
  export { mixClass as class };

  // Components
  import ButtonPill from "@components/formElements/ButtonPill.svelte";
  import ScrollableBlock from "@components/ScrollableBlock.svelte";
  import TwoColorsTitle from "@components/TwoColorsTitle.svelte";

  // Dispatch iOS events --------------------------------------------------------
  import { dispatchIosEvent } from "@helpers/iosEvents.js";
  import { onMount } from "svelte";

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
</script>

<div
  class={`playtesting-container
              ${mixClass}`}
>
  <ScrollableBlock class="playtesting-container__scrollable-block">
    <div class="playtesting-container__in-wrap">
      <TwoColorsTitle
        class="playtesting-container__main-title"
        text="PlayTesting"
        isNoWrap={true}
      />

      <p>Thank you for playtesting.</p>
      <p>
        Change goal progress by tapping the left/right sides of the energy/candy
        gauge.
      </p>
      <br />

      <div class="playtesting-container__divider-horizontal" />

      <div class="playtesting-container__group-of-elements">
        <ButtonPill
          class="playtesting-container__button-pill"
          text="Show Intro"
          on:click={() =>
            dispatchIOSEventWrapper({ tapped: "OWJSMsgShowIntro" })}
        />
        <ButtonPill
          class="playtesting-container__button-pill"
          text="Unlock all Levels"
          on:click={() =>
            dispatchIOSEventWrapper({ tapped: "OWJSMsgUnlockAllLevels" })}
        />
        <ButtonPill
          class="playtesting-container__button-pill"
          text="Set Random Level Progress"
          on:click={() =>
            dispatchIOSEventWrapper({
              tapped: "OWJSMsgSetRandomLevelProgress",
            })}
        />
      </div>

      <div class="playtesting-container__divider-horizontal" />

      <p>
        You can switch the content of all levels (except tutorial level #1) into
        Polish. There are only 5 Polish samples, so you'll see words repeating.
      </p>

      <br />

      <div class="playtesting-container__group-of-elements">
        <ButtonPill
          class="playtesting-container__button-pill"
          text="Polish words (for QubicGames)"
          on:click={() =>
            dispatchIOSEventWrapper({ tapped: "OWJSMsgPolishWords" })}
        />
        <ButtonPill
          class="playtesting-container__button-pill"
          text="Normal English"
          on:click={() =>
            dispatchIOSEventWrapper({ tapped: "OWJSMsgNormalEnglish" })}
        />
      </div>
    </div>
  </ScrollableBlock>
</div>

<style lang="scss">
  // Playtesting container ------------------------------------------------------
  .playtesting-container {
    display: flex;
    position: relative;

    :global(.playtesting-container__scrollable-block) {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: 100%;
      min-height: 100%;
    }

    &__in-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    :global(.playtesting-container__main-title) {
      margin-bottom: 4rem;
    }

    &__divider-horizontal {
      width: calc(100% - 12rem);
      height: 0.15rem;
      margin-bottom: 3rem;
      background-image: linear-gradient(
        to right,
        rgba(222, 222, 222, 0),
        rgba(222, 222, 222, 0.25),
        rgba(222, 222, 222, 0)
      );
    }

    :global(p) {
      margin: 0 0 0.5rem 0;
      line-height: 2.5rem;
    }

    :global(b) {
      font-weight: normal;
      color: #ffffae;
    }

    :global(em) {
      font-weight: normal;
      color: #ffffae;
    }

    &__group-of-elements {
      padding: 0 3rem;
      margin-bottom: 3rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    :global(.playtesting-container__button-pill) {
      margin: 0 1.5rem 2rem 0;
    }

    :global(.playtesting-container__button-pill:last-child) {
      margin: 0;
    }
  }
</style>
