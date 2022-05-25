<div class={ `circle-progress-bar
              ${mixClass}` }>

  <div class="circle-progress-bar__half-side">
    <div
      class="circle-progress-bar__rotating-bar
              circle-progress-bar__rotating-bar--left"
      style="transform: rotate({leftBarRotation}deg);"
    >
    </div>
  </div>

  <div class="circle-progress-bar__half-side">
    <div
      class="circle-progress-bar__rotating-bar
              circle-progress-bar__rotating-bar--right"
      style="transform: rotate({rightBarRotation}deg);"
    >
    </div>
  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let progress = 0;

// Calculate rotation ---------------------------------------------------------
$: leftBarRotation = progress <= 50 ? 0 : (progress - 50) * 3.6;
$: rightBarRotation = progress >= 50 ? 180 : progress * 3.6;

</script>



<style lang="scss">


// Circle progress bar --------------------------------------------------------
.circle-progress-bar {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;

  &__half-side {
    width: calc(50% + 2px);
    min-width: calc(50% + 2px);
    height: calc(100% + 2px);
    position: relative;
    overflow: hidden;

    &:last-child {
      left: -1px;
    }
  }

  &__rotating-bar {
    width: 200%;
    height: 200%;
    position: absolute;
    background: white;

    &--left {
      inset: -50% auto auto 100%;
      transform-origin: left center;
    }
    &--right {
      inset: -50% 100% auto auto;
      transform-origin: right center;
    }
  }
}

</style>