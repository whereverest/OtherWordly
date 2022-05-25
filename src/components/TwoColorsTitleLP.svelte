<div
  class={ `two-colors-title
            lp-two-color-title-text ${isMiniMode && 'lp-two-color-title-text--mini-mode-font'}
            ${isNoWrap && 'two-colors-title--nowrap'}
            ${mixClass}` }
>

  <div class={ `two-colors-title__overlay
                two-colors-title__overlay--white
                ${isLeftAlign && 'two-colors-title__overlay--left-aligned'}` }>
    { text }
  </div>

  <div class={ `two-colors-title__overlay
                ${isLeftAlign && 'two-colors-title__overlay--left-aligned'}` }>
    { text }
  </div>


</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let text = '';
export let isNoWrap = false;
export let isLeftAlign = false;
export let fontSize = 3.6;
export let isMiniMode = false;


</script>



<style lang="scss">


// Two colors title -----------------------------------------------------------
.lp-two-color-title-text {
  font-size: 3.6rem;
  line-height: 3.6rem;

  &--mini-mode-font {
    font-size: 2.6rem;
    line-height: 2.6rem;
  }
}
.two-colors-title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'Fractura Dur',sans-serif;
  color: rgba(0,0,0,0);
  font-feature-settings: unset!important;

  &--left-align {
    justify-content: flex-start;
  }

  &--nowrap {
    white-space: nowrap;
  }

    &__overlay {
      width: 100%;
      min-width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      inset: 0 auto auto 0;
      z-index: 1;
      color: #ffffae;
      text-align: center;
      font-feature-settings: unset!important;

      &--white {
        z-index: 2;
        font-family: 'Fractura Dui',sans-serif;
        color: #fff;
        font-feature-settings: unset!important;
      }

      &--left-aligned {
        justify-content: flex-start;
      }
    }
}
</style>