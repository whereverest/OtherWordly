<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  // Components
  import BasicPageLayoutLP from "@components/BasicPageLayoutLP.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import Icon from "svelte-icon";

  // Stores
  // import { basicFontSize } from '@stores/miscellaneous.js';
  import { transitionFrom, transitionTo } from "@stores-fp/transitions.js";
  import { cubicInOut } from "svelte/easing";
  import fadeScale from "./fadeScale";

  // Images
  import randomAvatar from "@images/characters/char15_astra.png";

  // Icons
  import chatBubbleIconVertical from "@icons/chat-bubble-vertical.svg";
  import chatBubbleIconLeft from "@icons/chat-bubble.svg";
  import { isPortraitMode } from "@stores/miscellaneous.js";

  onMount(() => {
    transitionFrom.update(() => "");
    transitionTo.update(() => "");
  });

  // Show elements on page opening ----------------------------------------------
  let isAllPageElementsVisible = false;
  let visibleAbove = false;
  let visibleBelow = false;
  onMount(() => {
    setTimeout(() => (isAllPageElementsVisible = true), 300);
    setTimeout(() => {
      visibleAbove = true;
    }, 100);
    setTimeout(() => {
      visibleBelow = true;
    }, 600);
  });

  function fadeInEffectTextAbove(node) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`
      );
    }

    const text = node.textContent;
    const duration = text.length / (5 * 0.01);

    return {
      duration,
      tick: (t) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);

        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = document.getElementById(
          "fade-text-div-above"
        ).style.font;
        var width = context.measureText(node.textContent).width;
        var formattedWidth = Math.ceil(width);
        var fullWidth = document.getElementById(
          "greeting-text__title"
        ).offsetWidth;
        document.getElementById("fade-text-div-above").style.marginLeft =
          (fullWidth - formattedWidth) / 5 + "px";
        // console.log("formattedWidth", fullWidth - formattedWidth);
      },
    };
  }

  function fadeInEffectTextBelow(node) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`
      );
    }

    const text = node.textContent;
    const duration = text.length / (5 * 0.01);

    return {
      duration,
      tick: (t) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);

        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = document.getElementById(
          "fade-text-div-below"
        ).style.font;
        var width = context.measureText(node.textContent).width;
        var formattedWidth = Math.ceil(width);
        var fullWidth = document.getElementById(
          "greeting-text__title"
        ).offsetWidth;
        document.getElementById("fade-text-div-below").style.marginLeft =
          (fullWidth - formattedWidth) / 3 + "px";
        console.log("formattedWidth", fullWidth - formattedWidth);
      },
    };
  }

  // Go to Challenges page ------------------------------------------------------
  function goToChallengesPage() {
    document.getElementById("transition-scale-button").classList.add("transition-scale-button");

    setTimeout(() => document.getElementById("transition-scale-button").style.transform = 'scale(1.05, 1.05)', 150);
    setTimeout(() => document.getElementById("transition-scale-button").style.transform = 'scale(1.1, 1.1)', 175);
    setTimeout(() => document.getElementById("transition-scale-button").style.transform = 'scale(1.15, 1.15)', 190);
    setTimeout(() => document.getElementById("transition-scale-button").style.transform = 'scale(1.2, 1.2)', 200);
    
    setTimeout(() => transitionFrom.update(() => "Welcome"), 300);
    setTimeout(() => transitionTo.update(() => "Challenges"), 300);
    setTimeout(() => push("/challenges"), 600);
  }
</script>

<div
  on:click={goToChallengesPage}
  class={`welcome-page
              ${_IS_DEV_ENV && "welcome-page--with-bg-image"}`}
>
  <BasicPageLayoutLP class="welcome-page__basic-layout-container">
    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div
        class={`welcome-page__page-content
                    ${
                      ($transitionTo === "Challenges" ||
                        !isAllPageElementsVisible) &&
                      "welcome-page__page-content--invisible"
                    }
                    ${
                      $transitionTo === "Challenges" &&
                      "welcome-page__page-content--moved-to-left"
                    }`}
      >
        <!-- Greeting snippet -->
        <div
          class={`greeting-snippet
                    welcome-page__greeting-snippet 
                    ${$isPortraitMode && "greeting-snippet__portrait-mode"}`}
        >
          <div
            class={`greeting-snippet__avatar-container ${
              $isPortraitMode &&
              "greeting-snippet__avatar-container__portrait-mode"
            }`}
          >
            <img
              class="greeting-snippet__avatar"
              src={randomAvatar}
              alt="avatar"
            />
          </div>

          <div class={`greeting-snippet__text-n-button ${$isPortraitMode && 'greeting-snippet__text-n-button--portrait-mode'}`}>
            <!-- Greeting text -->
            <div
              class="greeting-text
                        greeting-snippet__text"
            >
              <Icon
                class={`greeting-text__chat-bubble-bg ${
                  $isPortraitMode && "chat-bubble-portrait-mode"
                }`}
                data={$isPortraitMode ? chatBubbleIconVertical : chatBubbleIconLeft}
              />

              <div class="greeting-text__title" id="greeting-text__title">
                <em>Welcome</em>&nbsp; to Alphazoid Prime!
              </div>
              <div
                class={`greeting-text__paragraph${
                  $isPortraitMode && "__portrait-mode"
                }`}
              >
                <div class="fade-text-div-above-invisible">
                  <p>Join us on a journey by</p>
                </div>
                <div class="fade-text-div-below-invisible">
                  <p>matching words</p>
                </div>
                {#if visibleAbove}
                  <div
                    id="fade-text-div-above"
                    class="fade-text-div-above"
                    transition:fade={{ duration: 500 }}
                  >
                    <p transition:fadeInEffectTextAbove>
                      Join us on a journey by
                    </p>
                  </div>
                {/if}
                {#if visibleBelow}
                  <div
                    id="fade-text-div-below"
                    class="fade-text-div-below"
                    transition:fade={{ duration: 500 }}
                  >
                    <p transition:fadeInEffectTextBelow>matching words</p>
                  </div>
                {/if}
              </div>
            </div>
            <!-- / Greeting text -->

            <div
              class={`greeting-snippet__button-container ${
                $isPortraitMode &&
                "greeting-snippet__button-container__portrait-mode"
              }`}
            >
              <div
                id="transition-scale-button"
                class={`tap-to-continue-but
                        character-speech__tap-to-continue-but
                        ${$isPortraitMode && 'tap-to-continue-but--portrait-mode'}
                        `}
                transition:fadeScale={{
                  delay: 0,
                  duration: 500,
                  easing: cubicInOut,
                  baseScale: 0.5,
                }}
              >
                <div class="tap-to-continue-transparent-background"></div>
                <span class="tap-span">
                  Tap
                </span>
                <span class="to-continue-span">
                  to Continue 
                </span>
              </div>
              <!-- / Tap to continue but -->
            </div>
          </div>
        </div>
        <!-- / Greeting snippet -->
      </div>
    </svelte:fragment><!-- / slot: content -->
  </BasicPageLayoutLP>
</div>

<style lang="scss">
  // Greeting text --------------------------------------------------------------
  .fade-text-div-above-invisible {
    opacity: 0;
    margin-bottom: -2rem;
  }
  .fade-text-div-below-invisible {
    margin-bottom: -2rem;
    opacity: 0;
  }
  .fade-text-div-above {
    position: absolute;
    margin-top: -8rem;
  }
  .fade-text-div-below {
    margin-top: -5rem;
    position: absolute;
  }
  .transition-scale-button {
    animation-duration: 1s;
      animation-name: scale-bounce;
      animation-iteration-count: infinite;

      @keyframes scale-bounce {
        from {
          transform: scale(1);
        }
        7% {
          transform: scale(1.1);
        }
        25% {
          transform: scale(0.95);
        }
        50% {
          transform: scale(1);
        }
        to {
          transform: scale(1);
        }
      }
  }
  .greeting-text {
    position: relative;
    text-align: center;
    font-size: 2.05rem;
    line-height: 2.7rem;

    :global(.greeting-text__chat-bubble-bg) {
      width: 17rem;
      height: 9.5rem;
      left: 0.4rem !important;
      position: absolute;
      inset: auto auto -1.2rem -5.5rem;
      fill: transparent;
      stroke: rgba(255, 255, 255, 0.2);
      stroke-width: 0.5rem;
      mask-image: linear-gradient(
        24deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 43%
      );
    }

    :global(.chat-bubble-portrait-mode) {
      left: -2rem;
      mask-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 43%
      );
      top: 15rem !important;
      position: relative;
    }

    &__title {
      margin-bottom: 1rem;
      text-align: left;
      white-space: nowrap;

      em {
        font-size: 2.9rem;
        font-family: "ZingScriptRustR-Base", serif;
        font-style: normal;
        font-feature-settings: "swsh";
        color: #fbfea6;
      }
    }

    &__paragraph {
      text-align: left;

      animation-duration: 4s;
      animation-name: scale-bounce;
      animation-iteration-count: infinite;

      @keyframes scale-bounce {
        from {
          transform: scale(1);
        }
        7% {
          transform: scale(1.1);
        }
        25% {
          transform: scale(0.95);
        }
        50% {
          transform: scale(1);
        }
        to {
          transform: scale(1);
        }
      }

      &__portrait-mode {
        text-align: center;
      }
    }
  }

  .tap-to-continue-transparent-background {
    background-image: url(../../../assets/images/WhiteLineWithGlowBelow.png);
    background-size: cover;
    position: absolute;
    left: 0;
    width: 100%;
    height: 30px;
    opacity: .2;
    margin-top: -1.5rem;
  }

  .tap-to-continue-but {
    padding: 1rem 8rem 1rem 8rem;
    margin-left: -8rem;
    position: relative !important;

    &--portrait-mode {
      margin-left: 0;
    }
  }

  .tap-span {
    font-family: 'MuseoSlabRounded-500' !important;
    opacity: 1;
  }

  .to-continue-span {
    font-family: 'MuseoSlabRounded-100' !important;
  }

  // Greeting snippet -----------------------------------------------------------
  .greeting-snippet {
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    &__portrait-mode {
      display: flex;
      flex-direction: column-reverse;
      right: 0 !important;
    }

    &__avatar-container {
      width: 13rem;
      height: 13rem;
      margin: 4rem 6.6rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &__portrait-mode {
        margin: auto;
        margin-top: -20rem;
      }
    }

    &__avatar {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__text-n-button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      &--portrait-mode {
        width: auto !important;
        margin-top: -10rem;
      }
    }

    &__text {
      margin-bottom: 4rem;
    }

    &__button-container {
      width: auto;
      height: 8.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      animation-duration: 4s;
      animation-name: scale-bounce;
      animation-iteration-count: infinite;
      transform-origin: center center;
      margin-left: 7rem;

      &__portrait-mode {
        margin: auto;
        margin-top: 12rem;
      }

      @keyframes scale-bounce {
        from {
          transform: scale(1);
        }
        7% {
          transform: scale(1.1);
        }
        25% {
          transform: scale(0.95);
        }
        50% {
          transform: scale(1);
        }
        to {
          transform: scale(1);
        }
      }
    }

    :global(.greeting-snippet__button) {
      transform: scale(2.3);
      transform-origin: center center;
    }
  }

  // Welcome page ---------------------------------------------------------------
  .welcome-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/menu_bg2.jpg)
        no-repeat;
    }

    &__page-content {
      opacity: 1;
      transition: margin 0.6s ease, opacity 0.4s ease;

      &--invisible {
        opacity: 0;
      }

      &--moved-to-left {
        margin-left: -25rem;
      }
    }

    &__greeting-snippet {
      position: relative;
      inset: auto 3.9rem auto auto;
    }
  }
</style>
