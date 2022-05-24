<div class={ `accessibility-container
              ${mixClass}` }>


  <ScrollableBlock class="accessibility-container__scrollable-block">

    <div class="accessibility-container__in-wrap">

    <!-- Access form -->
    <div class="access-form
                accessibility-container">

      <TwoColorsTitle
        class="access-form__main-title
                access-form__main-title--bigger-bottom-margin"
        text="Accessibility"
        isNoWrap={ true }
      />

      <div class="access-form__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                    access-form__section">

        <div class="separate-section__col-left">
          <div class="separate-section__title">
            Reveal letters
          </div>
        </div>

        <div class="separate-section__col-right">

          <div class="separate-section__form-elements-container">
            <RadioButton
              class="separate-section__radio-but"
              label="Reveal most"
              value="M"
              bind:group={ $revealLettersLevel }
              on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
            />
            <RadioButton
              class="separate-section__radio-but"
              label="Normal"
              value="N"
              bind:group={ $revealLettersLevel }
              on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
            />
            <RadioButton
              class="separate-section__radio-but"
              label="Hide more"
              value="O"
              bind:group={ $revealLettersLevel }
              on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
            />
          </div>

          Adjust how many letters are missing. Reveal most is easier. Hide more is a punishing challenge.
        </div>

      </div><!-- / Separate section -->

      <div class="access-form__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                    access-form__section">

        <div class="separate-section__col-left">
          <div class="separate-section__title">
            Reduce motion
          </div>
          <Switch
            class="separate-section__switch"
            bind:isChecked={ $isReduceMotion }
            on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
          />
        </div>

        <div class="separate-section__col-right">
          Slow down swirling words, moving obstacles, and messages. Reduce flashing visuals. When active, during play, press the hare or empty sun to speed up.
        </div>

      </div><!-- / Separate section -->

      <div class="access-form__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                    access-form__section">

        <div class="separate-section__col-left">
          <div class="separate-section__title">
            Alternative font
          </div>
          <Switch
            class="separate-section__switch"
            bind:isChecked={ $isBottomHeavyFont }
            on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
          />
        </div>

        <div class="separate-section__col-right">
          Change to a chunky, bottom-heavy font. Some players, especially dyslexic players, find it more readable.
        </div>

      </div><!-- / Separate section -->

      <div class="access-form__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                    access-form__section">

        <div class="separate-section__col-left">
          <div class="separate-section__title">
            Finger touches
          </div>
          <Switch
            class="separate-section__switch"
            bind:isChecked={ $isFingerTouches }
            on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
          />
        </div>

        <div class="separate-section__col-right">
          For streaming and making screen recordings. Show finger touch positions with a little circle.
        </div>

      </div><!-- / Separate section -->

    </div>

    </div><!-- / Access form -->

  </ScrollableBlock>

</div>



<script>
let mixClass;
export { mixClass as class };

// Components
import ButtonPill from '@components/formElements/ButtonPill.svelte';
import RadioButton from '@components/formElements/RadioButton.svelte';
import ScrollableBlock from '@components/ScrollableBlock.svelte';
import Switch from '@components/formElements/Switch.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

// Stores
import {
  revealLettersLevel,
  isBottomHeavyFont,
  isReduceMotion,
  isFingerTouches
} from '@stores/options.js';


// Dispatch iOS events --------------------------------------------------------
import { dispatchIosEvent } from '@helpers/iosEvents.js';
import { onMount } from 'svelte';

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

$: { if ($revealLettersLevel !== undefined) {
  dispatchIOSEventWrapper({'tapped':'OWJSMsgTilesModeChange','value': $revealLettersLevel}); }}

$: { if ($isReduceMotion !== undefined) {
  dispatchIOSEventWrapper({'tapped':'OWJSMsgIsReduceMotionChange','value': $isReduceMotion}); }}

$: { if ($isBottomHeavyFont !== undefined) {
  dispatchIOSEventWrapper({'tapped':'OWJSMsgIsBottomHeavyFontChange','value': $isBottomHeavyFont}); }}

$: { if ($isFingerTouches !== undefined) {
  dispatchIOSEventWrapper({'tapped':'OWJSMsgIsFingerTouchesChange','value': $isFingerTouches}); }}


</script>



<style lang="scss">


// Separate section -----------------------------------------------------------
.separate-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  &__col-left {
    width: 21%;
    min-width: 21%;
    padding-top: .5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__col-right {
    width: calc(79% - 3.0rem);
    font-size: 1.6rem;
    line-height: 2.4rem;
    text-align: left;
  }

  &__title {
    margin-bottom: 1.0rem;
    font-size: 1.6rem;
    line-height: 2.0rem;
    //color: #ffffae;
    color: #fff;
    text-transform: uppercase;
    text-align: right;
  }

  &__form-elements-container {
    display: flex;
    margin-bottom: 3.0rem;
  }

  :global(.separate-section__radio-but) {
    margin-right: 2.5rem;
  }
}


// Access form ----------------------------------------------------------------
.access-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.7rem;
  line-height: 2.8rem;

  :global(.access-form__main-title) {
    margin-bottom: 1.5rem;
  }

  :global(.access-form__main-title--bigger-bottom-margin) {
    margin-bottom: 3.5rem;
  }

  &__divider-horizontal {
    width: calc(100% - 12.0rem);
    height: .15rem;
    margin-bottom: 3.0rem;
    background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
  }

  &__section {
    width: 100%;
    margin-bottom: 2.7rem;
  }
}


// Accessibility container ------------------------------------------------------------
.accessibility-container {
  display: flex;
  position: relative;

  :global(.accessibility-container__scrollable-block) {
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

}

</style>