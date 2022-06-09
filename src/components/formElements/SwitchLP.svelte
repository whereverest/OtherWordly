<script>
  let mixClass;
  export { mixClass as class };

  export let isChecked;
  export let isMiniFontMode = false;
</script>

<div
  class={`switch-elem
          ${isMiniFontMode && "switch-elem--portrait-mode"}
          ${mixClass}`}
  on:click
>
  <input
    class="switch-elem__hidden-checkbox"
    type="checkbox"
    bind:checked={isChecked}
  />

  <div class="switch-elem__trigger-container">
    <div class="switch-elem__trigger" />
  </div>
</div>

<style lang="scss">
  // Switch elem ----------------------------------------------------------------
  .switch-elem {
    width: 5.6rem;
    height: 4.2rem;
    padding: 0.3rem;
    box-sizing: border-box;
    border: 0.3rem #fff solid;
    border-radius: 10rem;
    position: relative;
    z-index: 0;
    display: flex;

    &--portrait-mode {
      margin-bottom: 2rem;
    }

    &__hidden-checkbox {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0 auto auto 0;
      z-index: 2;
      opacity: 0;
    }

    &__trigger-container {
      width: 3rem;
      height: 3rem;
      border-radius: 10rem;
      display: flex;
      justify-content: flex-end;
      background: #fcff9c;
      transition: width 0.05s ease-in;
    }

    &__hidden-checkbox:checked + &__trigger-container {
      width: 100%;
    }

    &__trigger {
      width: 3rem;
      height: 3rem;
      border-radius: 10rem;
      background: #fff;
      box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.9);
    }
  }
</style>
