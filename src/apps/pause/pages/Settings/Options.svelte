<div class={ `options-container
              ${mixClass}` }>

    <!-- Switches row -->
    <ul class="switches-row
                options-container__switches-row">
      <li class={`switches-row__switch-container ${$isPortraitMode && 'switches-row__switch-container--portrait-mode'}`}>
        <div class="switches-row__title">Music</div>
        <Switch
          class="switches-row__switch"
          bind:isChecked={ $isMusic }
          on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
        />
      </li>
      <li class={`switches-row__switch-container ${$isPortraitMode && 'switches-row__switch-container--portrait-mode'}`}>
        <div class="switches-row__title--long">Sound FX</div>
        <Switch
          class="switches-row__switch"
          bind:isChecked={ $isSoundFx }
          on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
        />
      </li>
      <li class={`switches-row__switch-container ${$isPortraitMode && 'switches-row__switch-container--portrait-mode'}`}>
        <div class="switches-row__title">Haptic</div>
        <Switch
          class="switches-row__switch"
          bind:isChecked={ $isHaptics }
          on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
        />
      </li>
    </ul><!-- / Switches row -->


    <div class="options-container__divider-horizontal
                options-container__divider-horizontal--big-bot-margin"></div>


    <div class="options-container__difficulty-level-list">
      {#each levelsList as level,index (level.complexity)}
        <DifficultyLevelSnippet
          class={ `separate-section__difficulty-level-snippet
                    ${index !== selectedLevelIndex && 'separate-section__difficulty-level-snippet--half-transparent'}` }
          levelName={ level.name }
          levelComplexity={ level.complexity }
          levelDescription={ level.description }
          isActive={ level.id === $difficultyLevel }
          isWithDivider={ !(index === levelsList.length - 1
                                          || index === selectedLevelIndex
                                          || index === selectedLevelIndex - 1 ) }
          on:click={ () => {
            difficultyLevel.update(() => level.id);
            dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'});
          }}
          on:deactivate={ handleChallengeDeactivation }
          isSimplified={ true }
        />
      {/each}
    </div>

</div>



<script>
let mixClass;
export { mixClass as class };


// Stores
import {
  difficultyLevel,
  isMusic,
  isSoundFx,
  isHaptics
} from '@stores/options.js';

// Components
import DifficultyLevelSnippet from "@components/DifficultyLevelSnippet";
import Switch from '@components/formElements/Switch.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';
import { isPortraitMode } from '@stores/miscellaneous.js';


// Icons
import flingNoTraceIcon from '@icons/features/flingNoTrace.integrated.svg';



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

$: { if ($isMusic !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgIsMusicChange','value': $isMusic}); }}

$: { if ($isSoundFx !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgIsSoundFxChange','value': $isSoundFx}); }}

$: { if ($isHaptics !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgIsHapticsChange','value': $isHaptics}); }}

$: { if ($difficultyLevel !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgDifficultyLevelChange','value': $difficultyLevel}); }}



// Levels list ----------------------------------------------------------------
const levelsList = [
  { id: 'X', complexity: 'Easy', name: 'Pioneer', description: ['Kid-','friendly'] },
  { id: 'Y', complexity: 'Adaptive', name: 'Wayfinder', description: ['Adapts to your ','vocab level'] },
  { id: 'Z', complexity: 'Hard', name: 'Voyager', description: ['A motley ','challenge'] }
];
$: selectedLevelIndex = levelsList.findIndex(item => item.id === $difficultyLevel);

function handleChallengeDeactivation() {
  setTimeout(() => $difficultyLevel.update(() => ''));
}

</script>



<style lang="scss">

// Switches row ---------------------------------------------------------------
.switches-row {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  &__switch-container {
    margin-right: 2.5rem;
    display: flex;
    align-items: center;

    &--portrait-mode {
      flex-direction: column-reverse;
    }

    &:last-child {
      margin-right: 0;
    }
  }

    &__title {
      margin-right: 1.0rem;
      text-transform: uppercase;
      min-width: 96px;

      &--long {
        margin-right: 1.0rem;
        min-width: 96px;
      }
    }

    &__switch {}
}


// Options container ----------------------------------------------------------
.options-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :global(.options-container__main-title) {
    margin-bottom: 4.0rem;
  }

  &__divider-horizontal {
    width: calc(100% - 12.0rem);
    height: .15rem;
    margin-bottom: 3.0rem;
    background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));

    &--small-bot-margin {
      margin-bottom: 1.0rem;
    }

    &--big-bot-margin {
      margin-bottom: 6.0rem;
    }
  }

  &__switches-row {
    margin-bottom: 3.0rem;
  }

  &__difficulty-level-list {
    display: flex;
    transform-origin: center center;
    transform: scale(1.3);
  }

    :global(.separate-section__difficulty-level-snippet) {
      opacity: 1;
    }

      :global(.separate-section__difficulty-level-snippet--half-transparent) {
        opacity: .75;
      }
}

</style>