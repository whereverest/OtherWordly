<div 
  class={ `challenge-details-hexagon 
          ${mixClass}` }
  on:click={ changeScreen }
>

  <div class="challenge-details-hexagon__in-wrap">

    <RopeTitle
      class="challenge-details-hexagon__rope-title"
      titleText={ ['Weekly', 'Challenge'] }
    />

    <div class="challenge-details-hexagon__challenge-name-container">
      <ArcText
        class="challenge-details-hexagon__challenge-name"
        debugMode={false}
        roundness="10.4"
        fontSize="17.5"
        topShift="0"
        color="#fefea5"
      >
        { { unplayed: $hexagonState0Title,
            played: $hexagonState1Title,
            lose: $hexagonState2Title,
            win: $hexagonState3Title
          }[$challengeMode]
        }
      </ArcText>
    </div>


    {#if !$challengeMode || $challengeMode === 'unplayed'}
        <div class="challenge-details-hexagon__content
                      challenge-details-hexagon__content--with-flex-wrap">

          <TimeNAverage
            class="challenge-details-hexagon__timer-n-average"
            time={ '1D 4H' }
            globalAverage={ '102.4s' }
          />

          <div class="challenge-details-hexagon__words-pills-list-wrap">
            <WordsPillsList
              class="challenge-details-hexagon__words-pills-list"
              isWordPillsWobbles={ isWithAnimation }
            />
          </div>

          <!-- Time left to earn -->
          <div class="time-left-to-earn
                        challenge-details-hexagon__time-left-to-earn">
              <span class="time-left-to-earn__section">
                Your best time: <span class="time-left-to-earn__big-number">{ $usersBestTime }</span>&nbsp;
              </span>
            <span class="time-left-to-earn__section">
                seconds
              </span>
          </div><!-- / Time left to earn -->

        </div>


      {:else if $challengeMode === 'played'}
        <div class="challenge-details-hexagon__content
                    challenge-details-hexagon__content--with-flex-wrap">

          <TimeNAverage
            class="challenge-details-hexagon__timer-n-average"
            time={ '1D 4H' }
            globalAverage={ '102.4s' }
          />

          <div class="challenge-details-hexagon__words-pills-list-wrap">
            <WordsPillsList
              class="challenge-details-hexagon__words-pills-list"
              isWordPillsWobbles={ isWithAnimation }
            />
          </div>

          <!-- Time left to earn -->
          <div class="time-left-to-earn
                      challenge-details-hexagon__time-left-to-earn">
            <span class="time-left-to-earn__section">
              Beat <span class="time-left-to-earn__big-number">{ $timeToEarnABadge }</span> seconds&nbsp;
            </span>
            <span class="time-left-to-earn__section">
              to earn a badge.
            </span>
          </div><!-- / Time left to earn -->

        </div>


      {:else if $challengeMode === 'lose'}
        <div class="challenge-details-hexagon__content
                    challenge-details-hexagon__content--left-negative-margin">

          <TimeNAverage
            class="challenge-details-hexagon__timer-n-average"
            time={ '1D 4H' }
            globalAverage={ '102.4s' }
          />

          <BadgeFinal
            class="challenge-details-hexagon__badge
                    challenge-details-hexagon__badge--with-flip-animation"
            time="195.8s"
          />

          <!-- Global rank -->
          <div class="global-rank
                      challenge-details-hexagon__global-rank">
            <div class="global-rank__title">Global rank</div>
            <div class="global-rank__second-line">
              top
              <span class="global-rank__big-number">
                9
              </span>
              <span class="global-rank__super-script">
                %
              </span>
            </div>
          </div><!-- / Global rank -->

        </div>


      {:else if $challengeMode === 'win'}
        <div class="challenge-details-hexagon__content
                    challenge-details-hexagon__content--right-negative-margin">

          <TimeNAverage
            class="challenge-details-hexagon__timer-n-average"
            time={ '1D 4H' }
            globalAverage={ '102.4s' }
          />

          <BadgeNotFinal
            class="challenge-details-hexagon__badge
                    challenge-details-hexagon__badge--small-side-margins"
            time="128.7s"
            bestTime="101.8s"
          />

          <!-- Time left to earn -->
          <div class="time-left-to-earn
                      time-left-to-earn--two-lines
                      challenge-details-hexagon__time-left-to-earn">
            <span class="time-left-to-earn__section">
              Beat <span class="time-left-to-earn__big-number">{ $timeToEarnABadge }</span> seconds
            </span>
            <span class="time-left-to-earn__section">
              to earn a badge.
            </span>
          </div><!-- / Time left to earn -->

        </div>
    {/if}


    <div class="challenge-details-hexagon__play-button-container">
      <ButtonInCircle
        class="challenge-details-hexagon__play-button"
        backwardsGradient={true}
        prominent={true}
        textInCircle={ ['Coming','Soon'] }
      />
  <!--    textInCircle={ $challengeMode === 'unplayed' ? 'Play' : ['Play', 'Again'] }-->
    </div>


    <!-- Hexagon bg layer -->
    <div class="hexagon-bg-layer
                  challenge-details-hexagon__hexagon-bg-layer">
      <Icon
        class="hexagon-bg-layer__hexagon"
        data={ circleWavyEdgeIcon }
        style={ `transform: rotate(${$hexagonRotationAngle}deg) translateZ(0);`}
      />
    </div><!-- / Hexagon bg layer -->

  </div>

</div>



<script>
let mixClass;
export { mixClass as class };
import { nextIndex as arrayNextIndex } from '@utils/array.js';
import { onDestroy } from 'svelte';

// Props ----------------------------------------------------------------------
export let isWithAnimation = false;

// Stores ---------------------------------------------------------------------
import {
  challengeMode,
  hexagonState0Title,
  hexagonState1Title,
  hexagonState2Title,
  hexagonState3Title,
  timeToEarnABadge,
  usersBestTime
} from '@stores-m/weeklyChallenges.js';

// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';
import BadgeFinal from './BadgeFinal.svelte';
import BadgeNotFinal from './BadgeNotFinal.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import Icon from 'svelte-icon';
import RopeTitle from './RopeTitle.svelte';
import TimeNAverage from './TimeNAverage.svelte';
import WordsPillsList from './WordsPillsList.svelte';

// Icons ----------------------------------------------------------------------
import circleWavyEdgeIcon from '@icons/circle_wavy_edge.svg';



// Screen changing ------------------------------------------------------------
function changeScreen() {
  const allStates = ['unplayed', 'played', 'lose', 'win'];
  const currentStateIndex = allStates.findIndex(item => item === $challengeMode);

  challengeMode.update(() => allStates[arrayNextIndex(allStates.length, currentStateIndex)] );
}


// Hexagon rotation -----------------------------------------------------------
import { onMount } from 'svelte';
import { isHexagonRotating, hexagonRotationAngle } from '@stores-m/weeklyChallenges.js';

onMount(() => {
  if ($hexagonRotationAngle === 45) hexagonRotationAngle.set(-45);
  if ($hexagonRotationAngle === -45) hexagonRotationAngle.set(45);
});

$: {
  if ($hexagonRotationAngle === 45 && $isHexagonRotating) hexagonRotationAngle.set(-45);
  if ($hexagonRotationAngle === -45 && $isHexagonRotating) hexagonRotationAngle.set(45);
}


</script>



<style lang="scss">


// Hexagon bg layer -----------------------------------------------------------
.hexagon-bg-layer {
  width: 47.5rem;
  height: 47.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  mask-image: linear-gradient(170deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%);

  :global(.hexagon-bg-layer__hexagon) {
    width: 95%;
    height: 95%;
    fill: rgba(0,0,50,.3) !important;
    stroke: rgba(255,255,255,.7);
    transform: rotate(0) translateZ(0);
  }
}


// Time left to earn ----------------------------------------------------------
.time-left-to-earn {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: rgba(255,255,255,.8);
  text-align: center;

  &--two-lines {
    flex-direction: column;
    align-items: flex-start;
  }

  &__section {
    white-space: nowrap;
  }

    &__big-number {
      margin: 0 .05rem;
      position: relative;
      bottom: -.2rem;
      font-size: 1.8rem;
      color: #fcff9c;
    }
}


// Global rank ----------------------------------------------------------------
.global-rank {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 1.0rem;
  line-height: 1.7rem;
  text-transform: uppercase;

  &__title {
    color: rgba(255,255,255,.65);
    white-space: nowrap;
  }

  &__second-line {
    display: flex;
    align-items: center;
  }

    &__big-number {
      margin-left: .3rem;
      font-size: 2.0rem;
      color: #fcff9c;
    }

    &__super-script {
      margin-top: -.7rem;
    }
}


// Challenge details hexagon --------------------------------------------------
.challenge-details-hexagon {
  width: 32.5rem;
  height: 33.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;

  &__in-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 0;
  }

  :global(.challenge-details-hexagon__rope-title) {
    margin: -1.0rem -.1rem 1.0rem 0;
  }

  &__challenge-name-container {
    width: 100%;
    height: 5.8rem;
    padding-top: 2.1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  :global(.challenge-details-hexagon__challenge-name) {
    width: 38.0rem;
    min-width: 38.0rem;
    height: 6.5rem;
    max-height: 6.5rem;
    font-family: 'ZingScriptRustR-Base',serif;
    font-feature-settings: 'swsh';
    letter-spacing: -.2px;
  }

  &__content {
    height: 14.0rem;
    padding-top: .8rem;
    margin-bottom: .5rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    &--left-negative-margin {
      margin-left: -1.8rem;
    }

    &--right-negative-margin {
      margin-right: -2.8rem;
    }

    &--with-flex-wrap {
      flex-wrap: wrap;
    }
  }
  
    :global(.challenge-details-hexagon__timer-n-average) {
      margin: 0 0 1.5rem 0;
    }

    &__words-pills-list-wrap {
      margin: 0 0 1.5rem 3.3rem;
      position: relative;

      &::before {
        content: '';
        width: .1rem;
        height: 10.0rem;
        position: absolute;
        inset: 50% auto auto -1.7rem;
        transform: translateY(-50%);
        background: rgb(255,255,255);
        background: linear-gradient(0deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,1) 40%,
          rgba(255,255,255,1) 60%,
          rgba(255,255,255,0) 100%
        );
        opacity: .2;
      }
    }

      :global(.challenge-details-hexagon__words-pills-list) {}
  
    :global(.challenge-details-hexagon__badge) {
      margin: 0 0 1.5rem 2.7rem;
    }

      :global(.challenge-details-hexagon__badge--small-side-margins) {
        margin-right: .6rem;
        margin-left: .8rem;
      }

      :global(.challenge-details-hexagon__badge--with-flip-animation) {
        backface-visibility: visible !important;
        animation: flip 2s ease 1;
      }

      @keyframes flip {
        0% { transform: perspective(40.0rem) rotateY(0);
              animation-timing-function: ease-out; }
        40% { transform: perspective(40.0rem) translateZ(15.0rem) rotateY(170deg);
              animation-timing-function: ease-out; }
        50% { transform: perspective(40.0rem) translateZ(15.0rem) rotateY(190deg) scale(1);
              animation-timing-function: ease-in; }
        80% { transform: perspective(40.0rem) rotateY(360deg) scale(1);
              animation-timing-function: ease-in; }
        100% { transform: perspective(40.0rem) scale(1);
                animation-timing-function: ease-in; }
      }
  
    &__global-rank {
      margin: 0 0 1.5rem 2.5rem;
    }

  &__time-left-to-earn {
    width: 100%;
    margin-bottom: 1.0rem;
  }

  &__play-button-container {
    transform: scale(2.0);
    transform-origin: top center;
  }
    :global(.challenge-details-hexagon__play-button) {
    }

  :global(.single-nav-button__text-in-circle) {
    font-family: 'MuseoSlabRounded-300',serif;
    font-size: .8rem;
    text-transform: uppercase;
  }

  &__hexagon-bg-layer {
    position: absolute;
    inset: calc(50% - 24.0rem) auto auto calc(50% - 24.0rem);
    z-index: -1;
  }
}

@media (min-width: 927px) {
  // Challenge details hexagon ------------------------------------------------
  .challenge-details-hexagon {

    &__in-wrap {
      transform: scale(.9) !important;
    }
  }
}

</style>