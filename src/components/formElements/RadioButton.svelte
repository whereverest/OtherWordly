<div
  class={ `radio-but
          ${mixClass}` }
  on:click
>

  <input class="radio-but__hidden-input" type="radio" bind:group value={value}>

  <div class="but-itself
              radio-but__but-itself">
    <div class="but-itself__trigger"></div>
  </div>

  {#if label}
    <div class="radio-but__label">
      { label }
    </div>
  {/if}

</div>



<script>
let mixClass;
export { mixClass as class };

// Props
export let label = '';
export let group = undefined;
export let value = undefined;

</script>



<style lang="scss">

// But itself -----------------------------------------------------------------
.but-itself {
  width: 4.2rem;
  height: 4.2rem;
  padding: .3rem;
  box-sizing: border-box;
  border: .3rem #fff solid;
  border-radius: 10.0rem;
  display: flex;

  &__trigger {
    width: 3.0rem;
    height: 3.0rem;
    border-radius: 10.0rem;
    transform: scale(.5);
    opacity: 0;
    background: #fcff9c;
    box-shadow: 0 0 .7rem rgba(0,0,0,.9);
    transition: transform .05s ease-in;
  }
}


// Radio but ------------------------------------------------------------------
.radio-but {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;

  &__hidden-input {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 2;
    opacity: 0;
  }

    &__hidden-input:checked + .but-itself .but-itself__trigger {
      transform: scale(1);
      opacity: 1;
    }

  &__but-itself {
    margin-bottom: .5rem;
  }

  &__label {
    width: 5.0rem;
    display: flex;
    justify-content: center;
    line-height: 1.7rem;
    text-align: center;
  }
}

</style>