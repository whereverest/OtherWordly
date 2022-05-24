<div class={ `time-n-average
              ${mixClass}`}>

  <div class="time-n-average__section">
    <div class="time-n-average__title">
      Time Left
    </div>
    <div class="time-n-average__description">
      <Icon
        class="time-n-average__clock-icon"
        data={ timerIcon }
      />
      { time }
    </div>
  </div>

  <div class="time-n-average__section">
    <div class="time-n-average__title">
      Global Average
    </div>
    <div class="time-n-average__description">
      { globalAverage }
    </div>
  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let time = '';
export let globalAverage = '';

// Components -----------------------------------------------------------------
import Icon from 'svelte-icon';

// Icons ----------------------------------------------------------------------
import timerIcon from '@icons/timer.svg';

</script>



<style lang="scss">


// Time & Average -----------------------------------------------------------
.time-n-average {
  font-size: 1.0rem;
  line-height: 1.0rem;

  &__section {
    margin-bottom: 1.3rem;
    white-space: nowrap;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    margin-bottom: .3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: rgba(255,255,255,.6);
    text-transform: uppercase;
  }

  &__description {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
  }

  :global(.time-n-average__clock-icon) {
    width: 1.1rem;
    height: 1.1rem;
    margin: -.1rem .4rem 0 0;
  }

  &__big-number {
    margin: -.1rem .7rem 0 .4rem;
    font-size: 1.9rem;
    line-height: 1.9rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

</style>