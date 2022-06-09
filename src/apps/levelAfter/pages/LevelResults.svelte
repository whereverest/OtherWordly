<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  import { push } from "svelte-spa-router";
  import { generateNbspString } from "@helpers/miscellaneous.js";

  // Stores
  import { isPortraitMode } from "@stores/miscellaneous.js";
  import { currentLevel, currentChapter } from "@stores/stats.js";
  import { chaptersList } from "@stores-m/chapters.js";

  // Components
  import ArcText from "@components/ArcText.svelte";
  import BasicPageLayout from "@components/BasicPageLayout.svelte";
  import ButtonInCircle from "@components/ButtonInCircle.svelte";
  import Icon from "svelte-icon";
  import SpeechChatbox from "@components/SpeechChatbox.svelte";
  import UserStatsSnippet from "@components/UserStatsSnippet";

  // Icons
  import chatBubbleIcon from "@icons/chat-bubble.svg";
  import chatBubbleVerticalIcon from "@icons/chat-bubble-vertical.svg";
  import medalHexagonWavyIcon from "@icons/medal-hexagon-wavy.svg";
  import starHollowIcon from "@icons/star-hollow.svg";
  import starOutlinedFilledIcon from "@icons/star-outlined-filled.svg";

  // Images
  import char03_jaleen from "@images/characters/char03_jaleen.png";

  // Show elements on page load -------------------------------------------------
  let isPageLoaded = false;
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => (isPageLoaded = true), 20);
  });

  // Initial transition steps ---------------------------------------------------
  let is200msPassed = false,
    is400msPassed = false,
    is600msPassed = false,
    is800msPassed = false,
    is1000msPassed = false,
    is1200msPassed = false,
    is1400msPassed = false,
    is1600msPassed = false,
    is1800msPassed = false,
    is2000msPassed = false,
    is2200msPassed = false,
    is2400msPassed = false,
    is2600msPassed = false,
    is2800msPassed = false,
    is3000msPassed = false,
    is3200msPassed = false;

  onMount(() => {
    setTimeout(() => (is200msPassed = true), 200);
    setTimeout(() => (is400msPassed = true), 400);
    setTimeout(() => (is600msPassed = true), 600);
    setTimeout(() => (is800msPassed = true), 800);
    setTimeout(() => (is1000msPassed = true), 1000);
    setTimeout(() => (is1200msPassed = true), 1200);
    setTimeout(() => (is1400msPassed = true), 1400);
    setTimeout(() => (is1600msPassed = true), 1600);
    setTimeout(() => (is1800msPassed = true), 1800);
    setTimeout(() => (is2000msPassed = true), 2000);
    setTimeout(() => (is2200msPassed = true), 2200);
    setTimeout(() => (is2400msPassed = true), 2400);
    setTimeout(() => (is2600msPassed = true), 2600);
    setTimeout(() => (is2800msPassed = true), 2800);
    setTimeout(() => (is3000msPassed = true), 3000);
    setTimeout(() => (is3200msPassed = true), 3200);
  });
</script>

<div
  class={`level-results-page
              ${_IS_DEV_ENV && "level-results-page--with-bg-image"}`}
>
  <BasicPageLayout class={`level-results-page__basic-layout-container`}>
    <!-- slot: header left -->
    <svelte:fragment slot="header-left">
      <UserStatsSnippet
        class={`level-results-page__user-stats-snippet
                  ${
                    !isPageLoaded &&
                    "level-results-page__user-stats-snippet--invisible"
                  }`}
        currentChapter={$currentChapter}
        currentLevel={$currentLevel}
        chaptersList={$chaptersList}
      />
    </svelte:fragment><!-- / slot: header left -->

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div class="level-results-page__page-content">
        <!-- Level results -->
        <div
          class={`level-results
                      ${$isPortraitMode && "level-results--vertical"}
                      level-results-page__level-results
                      ${
                        $isPortraitMode &&
                        "level-results-page__level-results--vertical"
                      }`}
        >
          <div
            class={`level-results__left-panel
                        ${$isPortraitMode && "level-results__left-panel--wide"}
                        ${
                          $isPortraitMode &&
                          "level-results__left-panel--vertical"
                        }
                        ${
                          $isPortraitMode && "level-results__left-panel--last"
                        }`}
          >
            <!-- Stars & Goals -->
            <ul
              class={`stars-n-goals
                          stars-n-goals--small
                          level-results__stars-n-goals
                          level-results__stars-n-goals--small
                          ${
                            !isPageLoaded &&
                            "level-results__stars-n-goals--invisible"
                          }`}
            >
              <li class="stars-n-goals__goal-item">
                <Icon
                  class={`stars-n-goals__star-icon
                            ${
                              !is1800msPassed &&
                              "stars-n-goals__star-icon--transition-from-props"
                            }`}
                  data={starOutlinedFilledIcon}
                />
                <div
                  class={`stars-n-goals__text-container
                              ${
                                !is1200msPassed &&
                                "stars-n-goals__text-container--transition-from-props"
                              }`}
                >
                  Matched two words starting with "<em>S</em>"
                </div>
              </li>
              <li class="stars-n-goals__goal-item">
                <Icon
                  class={`stars-n-goals__star-icon
                            ${
                              !is2000msPassed &&
                              "stars-n-goals__star-icon--transition-from-props"
                            }
                            stars-n-goals__star-icon--translucent`}
                  data={starHollowIcon}
                />
                <div
                  class={`stars-n-goals__text-container
                              ${
                                !is1400msPassed &&
                                "stars-n-goals__text-container--transition-from-props"
                              }`}
                >
                  <em>Perfect Play</em> - No misses
                </div>
              </li>
              <li class="stars-n-goals__goal-item">
                <Icon
                  class={`stars-n-goals__star-icon
                            ${
                              !is2200msPassed &&
                              "stars-n-goals__star-icon--transition-from-props"
                            }`}
                  data={starOutlinedFilledIcon}
                />
                <div
                  class={`stars-n-goals__text-container
                              ${
                                !is1600msPassed &&
                                "stars-n-goals__text-container--transition-from-props"
                              }`}
                >
                  Make a <em>combo</em> - two matches in one throw
                </div>
              </li>
            </ul>
            <!-- / Stars & Goals -->

            {#if $isPortraitMode}
              <div
                class={`level-results__play-button-container
                            ${
                              !is800msPassed &&
                              "level-results__play-button-container--transition-from-props"
                            }
                            level-results__play-button-container--bottom-margin-only`}
              >
                <ButtonInCircle
                  class="level-results__play-button"
                  backwardsGradient={true}
                  prominent={true}
                  textInCircle={["Next", "Mission"]}
                />
                <!--    textInCircle={ $challengeMode === 'unplayed' ? 'Play' : ['Play', 'Again'] }-->
              </div>
            {/if}
          </div>

          <div
            class={`level-results__center-panel
                        ${
                          $isPortraitMode &&
                          "level-results__center-panel--with-bottom-margin"
                        }
                        ${
                          !isPageLoaded &&
                          "level-results__center-panel--invisible"
                        }`}
          >
            <!-- Rope title -->
            <div
              class={`rope-title
                          level-results__rope-title
                          ${
                            $isPortraitMode &&
                            "level-results__rope-title--small"
                          }
                          ${
                            !is400msPassed &&
                            "level-results__rope-title--transition-from-props"
                          }`}
            >
              <div class="rope-title__big-rope">
                <ArcText
                  class="rope-title__big-arc-text"
                  debugMode={false}
                  roundness="8"
                  fontSize="24"
                  topShift="-.36"
                >
                  Fantastic!
                </ArcText>

                <svg
                  class="rope-title__big-rope-bg"
                  width="512"
                  height="158"
                  viewBox="0 0 512 158"
                >
                  <path
                    style="fill-rule: evenodd; fill: {'#' + 'eeb59e'}"
                    d="M471.105,119.179L484.05,158a429.067,429.067,0,0,0-80.964-30.794l19.932-55.218c31.911,8.541,61.176,19.473,86.974,32.351ZM40.984,119.17L1.989,104.385C27.859,91.552,57.2,80.658,89.2,72.147l19.988,55.027A431.817,431.817,0,0,0,28,157.859Z"
                  />
                  <path
                    style="fill-rule: evenodd; fill: {'#' + 'ce8c79'}"
                    d="M460.33,127.01H403.717l29.541-82.025h59.178ZM19.564,45.134H78.7l29.513,81.746H51.644Z"
                  />
                  <path
                    style="fill-rule: evenodd; fill: #fff"
                    d="M256,0A640.276,640.276,0,0,1,492.451,45.29l-32.075,81.684C395.52,101.167,326.944,87.316,256,87.316S116.48,101.167,51.624,126.974L19.549,45.29A640.28,640.28,0,0,1,256,0Z"
                  />
                </svg>
              </div>

              <div class="rope-title__small-rope">
                <ArcText
                  class="rope-title__small-arc-text"
                  debugMode={false}
                  roundness="8"
                  fontSize="10"
                  topShift="-.39"
                >
                  You did it!
                </ArcText>

                <svg
                  class="rope-title__small-rope-bg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="161"
                  viewBox="0 0 512 161"
                >
                  <path
                    style="fill-rule: evenodd; fill: {'#' + 'eeb59e'}"
                    d="M389.085,151.422c-28.769-4.152-62.571-6.549-98.754-6.549-57.644,0-109.274,6.073-144.071,15.658l-4.45-48.345c34.761-10.316,88.368-16.93,148.521-16.93,37.246,0,71.98,2.537,101.289,6.917Z"
                  />
                  <path
                    style="fill-rule: evenodd; fill: {'#' + 'ce8c79'}"
                    d="M391.773,99.2l-2.7,52.449c-45.655-20.121-132.685-33.717-232.559-33.717-49.165,0-95.219,3.3-134.757,9.041l9.27-24.2Z"
                  />
                  <path
                    style="fill-rule: evenodd; fill: {'#' + 'eeb59e'}"
                    d="M511.928,24.571L490.076,127.755c-145.231-26.946-322.918-26.948-468.153,0L0.071,24.567C156.23-8.123,355.773-8.121,511.928,24.571Z"
                  />
                </svg>
              </div>
            </div>
            <!-- / Rope title -->

            {#if $isPortraitMode}
              <SpeechChatbox
                class={`level-results__chatbox
                          ${
                            !is800msPassed &&
                            "level-results__chatbox--transition-from-props"
                          }
                          level-results__chatbox--centered`}
                isVertical={true}
                content={"Our future is looking <em>brighter</em> now."}
              />
            {/if}

            <div
              class={`level-results__char-avatar-container
                          ${
                            $isPortraitMode &&
                            "level-results__char-avatar-container--negative-bottom-margin"
                          }
                          ${
                            !isPageLoaded &&
                            "level-results__char-avatar-container--invisible"
                          }`}
            >
              <img
                class="level-results__char-avatar"
                src={char03_jaleen}
                alt="avatar"
              />
            </div>

            <!-- Curved table stats -->
            <div
              class={`curved-table-stats
                          level-results__curved-table-stats
                          ${
                            !isPageLoaded &&
                            "level-results__curved-table-stats--invisible"
                          }`}
            >
              <div
                class={`improved-results-badge
                            curved-table-stats__improved-results-badge
                            ${
                              !is3200msPassed &&
                              "curved-table-stats__improved-results-badge--transition-from-props"
                            }
                            ${
                              $isPortraitMode &&
                              "curved-table-stats__improved-results-badge--small"
                            }`}
              >
                <div class="improved-results-badge__text-line">Improved</div>
                <div
                  class="improved-results-badge__text-line
                            improved-results-badge__text-line--big"
                >
                  Result!
                </div>

                <Icon
                  class="improved-results-badge__medal-bg"
                  data={medalHexagonWavyIcon}
                />
              </div>

              <div class="curved-table-stats__dividers-container" />

              <div
                class="matches-n-throws
                          curved-table-stats__matches-n-throws"
              >
                <ArcText
                  class="matches-n-throws__overlay"
                  debugMode={false}
                  roundness="8.5"
                  isDownwardsRoundness={true}
                  fontSize="16"
                  topShift="-3.2"
                  color="#fbfea3"
                  viewPortStart="0 30"
                >
                  21 {generateNbspString(16)} 23 {generateNbspString(10)}
                </ArcText>
                <ArcText
                  class="matches-n-throws__overlay"
                  debugMode={false}
                  roundness="8.5"
                  isDownwardsRoundness={true}
                  fontSize="13"
                  topShift="-3.39"
                  color="#fff"
                  viewPortStart="0 30"
                >
                  {generateNbspString(4)} matches in {generateNbspString(5)} throws
                </ArcText>
              </div>

              <div class="curved-table-stats__rate-n-previous">
                <div
                  class="current-rate
                            curved-table-stats__current-rate"
                >
                  <div class="current-rate__title">Match<br />Rate</div>
                  <div class="current-rate__value">91</div>
                  <div class="current-rate__percentage-sign">%</div>
                </div>

                <div
                  class="previous-best
                            curved-table-stats__previous-best"
                >
                  <div class="previous-best__title">Previous best</div>
                  <div class="previous-best__value-n-percentage">
                    <div class="previous-best__value">35</div>
                    <div class="previous-best__percentage">%</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- / Curved table stats -->
          </div>

          {#if !$isPortraitMode}
            <div
              class={`level-results__right-panel
                        ${
                          !isPageLoaded &&
                          "level-results__right-panel--invisible"
                        }`}
            >
              <SpeechChatbox
                class={`${
                  !is800msPassed &&
                  "level-results__chatbox--transition-from-props"
                }
                        level-results__chatbox`}
                content={"Our future is looking <em>brighter</em> now."}
              />

              <div
                class={`level-results__play-button-container
                        ${
                          !is1000msPassed &&
                          "level-results__play-button-container--transition-from-props"
                        }`}
              >
                <ButtonInCircle
                  class="level-results__play-button"
                  backwardsGradient={true}
                  prominent={true}
                  textInCircle={["Next", "Mission"]}
                />
                <!--    textInCircle={ $challengeMode === 'unplayed' ? 'Play' : ['Play', 'Again'] }-->
              </div>
            </div>
          {/if}
        </div>
        <!-- / Level results -->
      </div>
    </svelte:fragment><!-- / slot: content -->

    <!-- slot: footer left -->
    <svelte:fragment slot="footer-left">
      <div
        class={`level-results-page__footer-button-wrapper
                    ${
                      $isPortraitMode &&
                      "level-results-page__footer-button-wrapper--small-right-margin"
                    }`}
      >
        <ButtonInCircle
          class="level-results-page__footer-button
                level-results-page__footer-button--left"
          iconName="recap"
          on:click={() => {
            isPageLoaded = false;
            setTimeout(() => push("/recap"), 200);
          }}
          text="Recap"
        />
      </div>
      <div class="level-results-page__footer-button-wrapper">
        <ButtonInCircle
          class="level-results-page__footer-button
                level-results-page__footer-button--right"
          iconName="info"
          on:click={() => {
            isPageLoaded = false;
            setTimeout(() => push("/stats"), 200);
          }}
          text="Stats"
        />
      </div>
    </svelte:fragment><!-- / slot: footer left -->

    <!-- slot: footer right -->
    <svelte:fragment slot="footer-right">
      <div
        class={`level-results-page__footer-button-wrapper
                    ${
                      $isPortraitMode &&
                      "level-results-page__footer-button-wrapper--small-right-margin"
                    }`}
      >
        <ButtonInCircle
          class="level-results-page__footer-button
                level-results-page__footer-button--left"
          iconName="arrowRefresh"
          on:click={() => {}}
          text="Replay mission"
        />
      </div>
      <div class="level-results-page__footer-button-wrapper">
        <ButtonInCircle
          class="level-results-page__footer-button
                level-results-page__footer-button--right"
          iconName="menu"
          on:click={() => {}}
          text="Menu"
        />
      </div>
    </svelte:fragment><!-- / slot: footer right -->
  </BasicPageLayout>
</div>

<style lang="scss">
  @import "src/assets/styles/basicPageLayout.scss";

  // Stars & goals --------------------------------------------------------------
  .stars-n-goals {
    padding: 0;
    margin: 0;
    list-style: none;

    &--small {
      transform: scale(0.9);
    }

    &__goal-item {
      margin-bottom: 1.1rem;
      display: flex;
      font-size: 1.4rem;
      line-height: 1.7rem;
      text-transform: uppercase;
      text-align: left;

      em {
        font-style: normal;
        font-family: "MuseoSlabRounded-500", sans-serif;
        color: #fbfea3;
      }
    }

    :global(.stars-n-goals__star-icon) {
      width: 3.8rem;
      min-width: 3.8rem;
      height: 3.8rem;
      margin: -0.2rem 1.2rem 0 0;
      transform: rotate(0deg) scale(1) translateZ(0);
      transition: transform 0.6s ease, opacity 0.6s ease;
      opacity: 1;
      fill: #fbfea3;
    }

    :global(.stars-n-goals__star-icon--translucent) {
      fill: #fff;
      opacity: 0.4;
    }

    :global(.stars-n-goals__star-icon--transition-from-props) {
      transform: rotate(300deg) scale(4) translateZ(0);
      opacity: 0;
    }

    &__text-container {
      transform: translateY(0);
      opacity: 1;
      transition: transform 0.4s ease, opacity 0.8s ease;

      &--transition-from-props {
        transform: translateY(-1.5rem);
        opacity: 0;
      }
    }
  }

  // Rope title -----------------------------------------------------------------
  .rope-title {
    width: 8.8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    font-family: "MuseoSlabRounded-700", serif;
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: #000;
    text-transform: uppercase;
    text-align: center;

    &__big-rope {
      width: 8.8rem;
      height: 2.8rem;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
      position: absolute;
      inset: 1.1rem auto auto 0;
      z-index: 0;
      transform: scale(1.5);
      opacity: 1;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    :global(.rope-title__big-arc-text) {
      width: 8rem;
      height: 2.4rem;
      max-height: 2.4rem;
      position: absolute;
      inset: 1px auto auto calc(50% - 4rem);
      font-family: "MuseoSlabRounded-700", serif;
      text-transform: none;
    }

    &__big-rope-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: -0.2rem auto auto 0;
      z-index: -1;
      transform: translateY(2%);
    }

    &__small-rope {
      width: 3.8rem;
      height: 1.8rem;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
      position: absolute;
      inset: 2.35rem auto auto calc(50% - 1.9rem);
      z-index: 0;
      transform: scale(1.5);
      opacity: 1;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    :global(.rope-title__small-arc-text) {
      width: 8rem;
      height: 2.4rem;
      max-height: 2.4rem;
      position: absolute;
      inset: -0.13rem auto auto calc(50% - 4rem);
      font-family: "MuseoSlabRounded-500", serif;
    }

    &__small-rope-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: -0.1rem auto auto 0;
      z-index: -1;
      transform: translateY(-3%);
    }
  }

  // Matches & Throws -----------------------------------------------------------
  .matches-n-throws {
    width: 20rem;
    height: 5rem;
    position: relative;

    :global(.matches-n-throws__overlay) {
      width: 20rem;
      height: 5rem;
      position: absolute;
      inset: calc(50% - 2.5rem) auto auto calc(50% - 10rem);
      transform: scale(1.4);
      transform-origin: bottom center;
    }
  }

  // Current rate ---------------------------------------------------------------
  .current-rate {
    display: flex;
    align-items: center;

    &__title {
      margin-right: 0.6rem;
      font-size: 0.9rem;
      line-height: 1rem;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      text-align: right;
    }
    &__value {
      font-size: 2.2rem;
      font-family: "MuseoSlabRounded-500", serif;
      color: #fbfea3;
    }
    &__percentage-sign {
      margin-top: 0.1rem;
      align-self: flex-start;
      line-height: 1.3rem;
      font-family: "MuseoSlabRounded-500", serif;
      color: #fbfea3;
    }
  }

  // Previous best --------------------------------------------------------------
  .previous-best {
    &__title {
      margin-bottom: 0.2rem;
      font-size: 0.9rem;
      line-height: 1rem;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
    }

    &__value-n-percentage {
      display: flex;
      align-items: flex-start;
    }
    &__value {
      font-size: 1.4rem;
      line-height: 0.9rem;
      font-family: "MuseoSlabRounded-500", serif;
      color: #fbfea3;
    }
    &__percentage {
      margin-top: -0.3rem;
      font-size: 1.1rem;
      line-height: 1.1rem;
      font-family: "MuseoSlabRounded-500", serif;
      color: #fbfea3;
    }
  }

  // Improved results badge -----------------------------------------------------
  .improved-results-badge {
    width: 8rem;
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 0;

    &__text-line {
      font: 1.3rem/1.4rem "ZingScriptRustB-Base", serif;
      font-feature-settings: "swsh";
      color: rgb(40, 40, 40);

      &--big {
        font-size: 1.8rem;
      }
    }

    :global(.improved-results-badge__medal-bg) {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0 auto auto 0;
      z-index: -1;
      fill: #fbfea3;
    }
  }

  // Curved table stats ---------------------------------------------------------
  .curved-table-stats {
    width: 24rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &__dividers-container {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0 auto auto 0;
      opacity: 0.15;

      &::before {
        content: "";
        width: 40rem;
        height: 20rem;
        border: 2px rgba(255, 255, 255, 1) solid;
        border-radius: 50%;
        position: absolute;
        inset: auto auto 4.2rem calc(50% - 20rem);
        mask-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 95%,
          rgba(0, 0, 0, 1) 100%
        );
      }

      &::after {
        content: "";
        width: 1px;
        height: 4.3rem;
        border-left: 2px rgba(255, 255, 255, 1) solid;
        position: absolute;
        inset: auto auto 0 50%;
        mask-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 1) 30%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    &__improved-results-badge {
      position: absolute;
      inset: 3rem auto auto -7rem;
      transform: rotate(-23deg) scale(1) translateZ(0);
      transition: transform 0.25s linear, opacity 0.6s ease;
      opacity: 1;

      &--small {
        inset: 2rem auto auto -6rem;
        transform: rotate(-23deg) scale(0.8) translateZ(0);
      }

      &--transition-from-props {
        transform: rotate(150deg) scale(3) translateZ(0);
        opacity: 0;
      }
    }

    &__matches-n-throws {
      margin-bottom: 2rem;
    }

    &__rate-n-previous {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__current-rate {
      margin-right: 3.5rem;
    }

    &__previous-best {
    }
  }

  // Level results --------------------------------------------------------------
  .level-results {
    width: calc(100vw - 12rem);
    min-width: calc(100vw - 12rem);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--vertical {
      width: calc(100vw - 5rem);
      min-width: calc(100vw - 5rem);
      height: calc(100vh - 16rem);
      min-height: calc(100vh - 16rem);
      flex-direction: column;
      justify-content: flex-start;
    }

    &__left-panel {
      width: 34%;
      padding-top: 1.5rem;

      &--wide {
        width: 100%;
        padding-top: 0;
      }

      &--last {
        order: 2;
      }

      &--vertical {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    &__stars-n-goals {
      opacity: 1;
      transition: opacity 0.5s ease;

      &--small {
        margin-bottom: 0;
      }

      &--invisible {
        opacity: 0;
      }
    }

    &__center-panel {
      width: 32%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: opacity 0.5s ease;

      &--with-bottom-margin {
        margin-bottom: 3rem;
      }

      &--invisible {
        opacity: 0;
      }
    }

    &__rope-title {
      margin-bottom: 7.5rem;
      transform: scale(1.9);
      opacity: 1;
      transition: transform 0.6s ease, opacity 0.6s ease;

      &--small {
        margin-bottom: 6.5rem;
        transform: scale(1.75);
      }

      &--transition-from-props {
        transform: scale(3);
        opacity: 0;
      }
    }

    &__char-avatar-container {
      width: 17rem;
      height: 17rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: opacity 0.5s ease;

      &--negative-bottom-margin {
        margin-bottom: -2.5rem;
      }

      &--invisible {
        opacity: 0;
      }
    }

    &__char-avatar {
      width: 20rem;
      height: 20rem;
    }

    &__curved-table-stats {
      opacity: 1;
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
    }

    &__right-panel {
      width: 34%;
      padding: 1.5rem 0 8.5rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.5s ease;

      &--invisible {
        opacity: 0;
      }
    }

    :global(.level-results__chatbox) {
      width: 20rem;
      margin-left: 4.5rem;
      transform: translateY(0);
      opacity: 1;
      transition: transform 0.4s ease, opacity 0.8s ease;
    }

    :global(.level-results__chatbox em) {
      font-style: normal;
      font-size: 2.6rem;
      font-family: "ZingScriptRustR-Base", serif;
      color: #fbfea3;
    }

    :global(.level-results__chatbox--centered) {
      width: 25rem;
      margin: 0 0 0.5rem 0;
    }

    :global(.level-results__chatbox--transition-from-props) {
      transform: translateY(-1.5rem);
      opacity: 0;
    }

    &__play-button-container {
      margin: 0 0 0 6rem;
      transform: translateY(0) scale(2.7);
      transform-origin: top center;
      opacity: 1;
      transition: transform 0.4s ease, opacity 0.8s ease;

      &--bottom-margin-only {
        margin: 0 0 1rem 0;
      }

      &--transition-from-props {
        transform: translateY(-1.5rem) scale(2.7);
        opacity: 0;
      }
    }

    :global(.level-results__play-button) {
      animation-duration: 2s;
      animation-name: scale-bounce;
      animation-iteration-count: infinite;
      transform-origin: center center;

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
  }

  // Level results page ---------------------------------------------------------
  .level-results-page {
    &--with-bg-image {
      background: 50% 50% / cover url(../../../assets/images/pause_app_bg.jpg)
        no-repeat;
    }

    :global(.level-results-page__user-stats-snippet) {
      opacity: 1;
      transition: opacity 0.5s ease;
    }
    :global(.level-results-page__user-stats-snippet--invisible) {
      opacity: 0;
    }

    :global(.level-results-page__basic-layout-container) {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
    :global(.level-results-page__basic-layout-container--invisible) {
      opacity: 0;
    }

    &__basic-layout-container {
    }

    &__level-results {
      &--vertical {
        margin-top: -5.5rem;
      }
    }

    &__footer-button-wrapper {
      margin-right: 4rem;
      transform: scale(1.2);
      opacity: 1;
      transition: opacity 0.5s ease;

      &:last-child {
        margin-right: 0;
      }

      &--invisible {
        opacity: 0;
      }

      &--small-right-margin {
        margin-right: 2.5rem;
      }
    }

    :global(.level-results-page__footer-button) {
    }

    :global(.level-results-page__footer-button--left::before) {
      width: calc(100% + 1.5rem);
      min-width: calc(100% + 1.5rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
    :global(.level-results-page__footer-button--right::before) {
      width: calc(100% + 2rem);
      min-width: calc(100% + 2rem);
      left: -1rem;
      transform: translate(0, -50%);
    }
  }
</style>
