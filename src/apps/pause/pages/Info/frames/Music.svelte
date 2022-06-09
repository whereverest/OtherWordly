<script>
  let mixClass;
  export { mixClass as class };

  // Components
  import Icon from "svelte-icon";
  import OuterLinkIcon from "@icons/outer-link-icon.svg";
  import TwoColorsTitle from "@components/TwoColorsTitle.svelte";
  import { isPortraitMode } from "@stores/miscellaneous.js";

  // Icons
  // singles
  import tromboneIcon from "@icons/trombone.svg";
</script>

<div
  class={`music-info-container
              ${mixClass} ${
    $isPortraitMode && "music-info-container--portrait-mode"
  }`}
>
  <div class="music-info-container__icon-side">
    <Icon class="music-info-container__trombone-icon" data={tromboneIcon} />
  </div>

  <div
    class={`music-info-container__divider-vertical ${
      $isPortraitMode && "music-info-container__divider-vertical--portrait-mode"
    }`}
  />

  <div class="music-info-container__text-side">
    <TwoColorsTitle
      class="music-info-container__main-title"
      text="Music"
      isNoWrap={true}
    />

    <div class="music-info-container__text-container">
      <p>
        Travel on galactic soundwaves wherever your journey takes you. <b
          >Stream</b
        >
        or <b>purchase</b> OtherWordly’s original cosmic soundtrack (1.5 hours
        with all the music from the game, plus B-sides), on <b>Spotify</b>,
        <b>Apple Music</b>, or wherever you get your tunes.
      </p>
      <p>
        <a
          class="url"
          href="http://otherwordly-app.s3.amazonaws.com/ui/html/en/pause.html#"
          >https://musicurl.com/linktoalbum</a
        >&nbsp;<Icon
          class="music-info-container__outer-link-icon"
          data={OuterLinkIcon}
        />
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  // Music info container -------------------------------------------------------
  .music-info-container {
    display: flex;
    justify-content: center;
    align-items: center;

    &--portrait-mode {
      flex-direction: column;
    }

    &__icon-side {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :global(.music-info-container__trombone-icon) {
      width: 15rem;
      height: 15rem;
      fill: #fbff87;
    }

    &__divider-vertical {
      width: 0.15rem;
      min-width: 0.15rem;
      height: 100%;
      margin-right: 3rem;
      background-image: linear-gradient(
        to bottom,
        rgba(222, 222, 222, 0),
        rgba(222, 222, 222, 0.25),
        rgba(222, 222, 222, 0)
      );
      //outline: 3px #f00 solid;

      &--portrait-mode {
        width: 100%;
        height: 0.15rem;
        margin: 5rem;
        background-image: linear-gradient(
          to left,
          rgba(222, 222, 222, 0),
          rgba(222, 222, 222, 0.25),
          rgba(222, 222, 222, 0)
        );
      }
    }

    &__text-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    :global(.music-info-container__main-title) {
      margin-bottom: 3rem;
    }

    &__text-container {
      margin-bottom: 2rem;
      line-height: 2.3rem;

      p {
        margin: 0 0 1.5rem 0;
      }

      b,
      a {
        font-weight: normal;
        color: #ffffae;
      }

      :global(.music-info-container__outer-link-icon) {
        width: 1.4rem;
        height: 1.4rem;
        display: inline-block;
        position: relative;
        top: 0.3rem;
        fill: #fbff87;
      }
    }
  }
</style>
