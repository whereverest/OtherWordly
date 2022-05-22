<div class={ `badge-not-final
              ${mixClass}` }>

  <div class="badge-not-final__top-line">
    Your time
  </div>

  <div class="badge-not-final__time-value">
    { time }
  </div>

  <!-- Your best -->
  <div class="your-best
              badge-not-final__your-best">

    <div class="your-best__top-divider-line"></div>

    <div class="your-best__title">
      Your best
    </div>

    <div class="your-best__value">
      { bestTime }
    </div>

  </div><!-- / Your best -->

  <div class="badge-not-final__background-circle">

  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let time = '0.0s';
export let bestTime = '0.0s';

</script>



<style lang="scss">


// Your best ------------------------------------------------------------------
.your-best {
  width: 7.0rem;
  height: 3.0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 1.1rem;
  line-height: 1.4rem;
  text-align: center;
  white-space: nowrap;

  &__top-divider-line {
    width: 5.0rem;
    height: .1rem;
    position: absolute;
    inset: -.65rem auto auto calc(50% - 2.5rem);
    font-size: 0;
    line-height: 0;
    background: rgba(255,255,255,.2);
    mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
  }

  &__title {
    text-transform: uppercase;
    color: rgba(255,255,255,.6);
  }

  &__value {}
}


// Badge not final ------------------------------------------------------------
.badge-not-final {
  width: 12.5rem;
  min-width: 12.5rem;
  height: 12.5rem;
  min-height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;

  &__top-line {
    width: 7.0rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 1.9rem auto auto calc(50% - 3.5rem);
    font-size: 1.1rem;
    font-family: 'Bondrians',serif;
    text-align: center;
    text-transform: uppercase;
  }

  &__time-value {
    width: 8.0rem;
    height: 2.0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: calc(50% - 1.7rem) auto auto calc(50% - 4.0rem);
    transform: rotate(-12deg);
    font-size: 3.3rem;
    font-family: 'RetrofunkScriptPersonalUse',serif;
    text-align: center;
    color: #fcff9c;
  }

  &__your-best {
    position: absolute;
    inset: auto auto 1.0rem calc(50% - 3.5rem);
  }

  &__background-circle {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: .2rem rgba(255,255,255,.2) solid;
    border-radius: 100.0rem;
    position: absolute;
    inset: 0 auto auto 0;
    z-index: -1;
    mask-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
  }
}

</style>