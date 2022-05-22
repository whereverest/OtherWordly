<div class={ `badge-final
              ${mixClass}` }>

  <div class="badge-final__top-line">
    Your
  </div>

  <div class="badge-final__time-value">
    { time }
  </div>

  <div class="badge-final__bottom-line">
    best time
  </div>

  <img
    class="badge-final__badge-itself"
    src={ badgeEmptyFinalImage }
    alt="badge"
  />

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let time = '0.0s';

// Images ---------------------------------------------------------------------
import badgeEmptyFinalImage from '@images/badge_empty_final.integrated.png';

</script>



<style lang="scss">


// Badge final ----------------------------------------------------------------
.badge-final {
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
  color: #000;
  font-weight: 900;

  &__top-line {
    width: 4.0rem;
    height: 1.2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    inset: 2.7rem 6.5rem auto auto;
    font-size: 1.1rem;
    font-family: 'Bondrians',serif;
    text-align: right;
    text-transform: uppercase;
  }

  &__time-value {
    width: 8.0rem;
    height: 2.0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: calc(50% - 1.0rem) auto auto calc(50% - 4.0rem);
    transform: rotate(-12deg);
    font-size: 2.8rem;
    font-family: 'RetrofunkScriptPersonalUse',serif;
    text-align: center;
  }

  &__bottom-line {
    width: 7.0rem;
    height: 1.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    inset: auto auto 2.5rem 4.9rem;
    font-size: 1.1rem;
    font-family: 'Bondrians',serif;
    text-align: left;
    white-space: nowrap;
    text-transform: uppercase;
  }

  &__badge-itself {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
    z-index: -1;
  }
}

</style>