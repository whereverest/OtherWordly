<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  // Components
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
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
  import chatBubbleIcon from "@icons/chat-bubble.svg";
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
  <BasicPageLayout class="welcome-page__basic-layout-container">
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

          <div class="greeting-snippet__text-n-button">
            <!-- Greeting text -->
            <div
              class="greeting-text
                        greeting-snippet__text"
            >
              <Icon
                class={`greeting-text__chat-bubble-bg ${
                  $isPortraitMode && "chat-bubble-portrait-mode"
                }`}
                data={chatBubbleIcon}
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
                class="tap-to-continue-but
                        character-speech__tap-to-continue-but"
                transition:fadeScale={{
                  delay: 0,
                  duration: 500,
                  easing: cubicInOut,
                  baseScale: 0.5,
                }}
              >
                Tap to Continue
              </div>
              <!-- / Tap to continue but -->
            </div>
          </div>
        </div>
        <!-- / Greeting snippet -->
      </div>
    </svelte:fragment><!-- / slot: content -->
  </BasicPageLayout>
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
      position: absolute;
      inset: auto auto -2.2rem -5.5rem;
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

  // Greeting snippet -----------------------------------------------------------
  .greeting-snippet {
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    &__portrait-mode {
      display: block;
      right: 0 !important;
    }

    &__avatar-container {
      width: 13rem;
      height: 13rem;
      margin: 4rem 8.6rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &__portrait-mode {
        margin: auto;
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
      margin-left: 3rem;

      &__portrait-mode {
        margin: auto;
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
