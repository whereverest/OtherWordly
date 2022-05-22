<div class={ `privacy-n-data
              ${mixClass}` }>

  <!-- Clear data modal -->
  <div class={ `clear-data-modal
                ${!isClearDataModalVisible && 'clear-data-modal--invisible'}
                privacy-n-data__clear-data-modal` }>

    <TwoColorsTitle
      class="clear-data-modal__title"
      text="Clear Your Data"
      isNoWrap={ true }
    />

    <div class="clear-data-modal__description">
      You are about to clear your data. <em>This will erase your entire history and reset OtherWordly.</em> You will lose all of your game progress. <span>It will also reset your iCloud Sync and your game data will be unrecoverable.</span>

      <em>Are you sure you want to clear your data?</em>
    </div>

    <div class="clear-data-modal__buttons-list">

      <ButtonPill
        class="clear-data-modal__button"
        text="Clear My Data"
        on:click={ () => {
          dispatchIOSEventWrapper({'tapped':'OWJSMsgClearMyData'})
          isClearDataModalVisible = false
        } }
      />

      <ButtonPill
        class="clear-data-modal__button"
        text="Cancel"
        on:click={ () => isClearDataModalVisible = false }
      />
    </div>

  </div><!-- / Clear data modal -->

  <ScrollableBlock class={ `privacy-n-data__scrollable-block
                            ${isClearDataModalVisible && 'privacy-n-data__scrollable-block--invisible'}` }>
    <div class="privacy-n-data__in-wrap">

      <TwoColorsTitle
        class="privacy-n-data__main-title"
        text="Privacy"
        isNoWrap={ true }
      />

      <p style="margin-bottom: 3.5rem;">
        Control what data is saved, what’s sent to iCloud, and what’s shared with us.
      </p>

      <div class="privacy-n-data__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                  privacy-n-data__separate-section">
        <div class="separate-section__col-left">
          <div class="separate-section__title">iCloud Sync</div>
          <Switch
            class="separate-section__switch"
            bind:isChecked={ $isICloudSync }
            on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
          />
        </div>
        <div class="separate-section__col-right">

          <p style="margin-bottom: 1.5rem;">
            Sync your game level progress and stars to your other iCloud devices.
          </p>

          {#if $isICloudSync}
            <p>
              <b>
                iCloud Sync is active.
              </b>
              Your level progress is automatically saved to your iCloud account and you can play OtherWordly across multiple devices. Your crystals are device-specific, and aren’t saved to iCloud.
            </p>

            {:else}
            <p>
              <b>
                iCloud Sync is inactive
              </b>
              and your level progress is not saved to the cloud. Turn on iCloud Sync if you want to play OtherWordly on other devices connected to your iCloud account.
            </p>
          {/if}

        </div>
      </div><!-- / Separate section -->

      <div class="privacy-n-data__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                  privacy-n-data__separate-section">
        <div class="separate-section__col-left">
          <div class="separate-section__title">Want a Fresh Start?</div>
          <ButtonPill
            class="separate-section__button-pill
                    separate-section__button-pill--clear-my-data-btn"
            text="Clear My Data"
            on:click={ () => isClearDataModalVisible = true }
          />
        </div>
        <div class="separate-section__col-right">
          <p>
            Your game progress and cumulative stats are stored on your device. These stats are shown on the "Info" panel in "All-Time Stats." The number of stars you earned on each level appears on the main menu. You can clear your history and start over by resetting the game. (Once you clear your data, it can’t be retrieved.)
          </p>
        </div>
      </div><!-- / Separate section -->

      <div class="privacy-n-data__divider-horizontal"></div>

      <!-- Separate section -->
      <div class="separate-section
                  privacy-n-data__separate-section">
        <div class="separate-section__col-left">
          <div class="separate-section__title">Analytics</div>
          <Switch
            class="separate-section__switch"
            bind:isChecked={ $isAnalytics }
            on:click={ () => dispatchIosEvent({'tapped':'OWJSMsgPlayClickSound'}) }
          />
        </div>
        <div class="separate-section__col-right">
          {#if $isAnalytics}
            <p>
              <b>
                Analytics are active.
              </b>
              To improve OtherWordly, we collect basic information about how you play (your stats in levels), your device state, and any crashes you experience. This information is transmitted anonymously.
            </p>
            {:else}
            <p>
              <b>
                Analytics are not active.
              </b>
              We do not receive any data about how you play OtherWordly.
            </p>
          {/if}
        </div>
      </div><!-- / Separate section -->

    </div>
  </ScrollableBlock>

</div>



<script>
let mixClass;
export { mixClass as class };

// Stores
import {
  isICloudSync,
  isAnalytics
} from '@stores/options.js';

// Components
import ButtonPill from '@components/formElements/ButtonPill.svelte';
import ScrollableBlock from '@components/ScrollableBlock.svelte';
import Switch from '@components/formElements/Switch.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

let isClearDataModalVisible = false;


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

$: { if ($isICloudSync !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgIsICloudSyncChange','value': $isICloudSync}); }}
$: { if ($isAnalytics !== undefined) {
    dispatchIOSEventWrapper({'tapped':'OWJSMsgIsAnalyticsChange','value': $isAnalytics}); }}

</script>



<style lang="scss">



// Clear data modal -----------------------------------------------------------
.clear-data-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  opacity: 1;
  transition: opacity .2s ease;

  &--invisible {
    opacity: 0 !important;
    pointer-events: none;
  }

  :global(.clear-data-modal__title) {
    margin-bottom: 3.5rem;
  }

  &__description {
    max-width: 60.0rem;
    margin-bottom: 2.0rem;
    font-size: 1.3rem;
    line-height: 1.9rem;
  }

  &__buttons-list {
    display: flex;
    flex-wrap: wrap;
  }

    :global(.clear-data-modal__button) {
      margin-right: 1.5rem;
    }

      :global(.clear-data-modal__button:last-child) {
        margin-right: 0;
      }
}


// Separate section -----------------------------------------------------------
.separate-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  &__col-left {
    width: 15.0rem;
    min-width: 15.0rem;
    padding-top: .5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__col-right {
    width: calc(100% - 18.0rem);
    font-size: 1.6rem;
    line-height: 2.4rem;
    text-align: left;

    b {
      font-family: 'MuseoSlabRounded-500',sans-serif;
      font-weight: normal;
    }
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

    :global(.separate-section__button-pill) {}

      :global(.separate-section__button-pill--clear-my-data-btn) {
        margin-right: -.5rem;
      }

    :global(.separate-section__switch) {}

    :global(p) {
      margin: 0 0 .5rem 0;
      line-height: 2.5rem;
    }

    :global(b) {
    }
}


// Privacy & Data -------------------------------------------------------------
.privacy-n-data {
  display: flex;
  position: relative;

  &__clear-data-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
    opacity: 1;
    transition: opacity .2s ease;

    &--invisible {
      opacity: 0;
      pointer-events: none;
    }
  }

  :global(.privacy-n-data__scrollable-block) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 100%;
    opacity: 1;
    transition: opacity .2s ease;
  }
    :global(.privacy-n-data__scrollable-block--invisible) {
      opacity: 0;
      pointer-events: none;
    }

  &__in-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

    :global(.privacy-n-data__main-title) {
      margin-bottom: 2.0rem;
    }

    &__divider-horizontal {
      width: calc(100% - 12.0rem);
      height: .15rem;
      margin-bottom: 3.0rem;
      background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
    }

    &__separate-section {
      width: 100%;
      margin-bottom: 2.5rem;
    }

}

</style>