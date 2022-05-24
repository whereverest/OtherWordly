<!-- TODO: move file to "components" folder withing same directory -->
<div class={ `manual-snippet
              ${mixClass}` }>

  <div class="manual-snippet__title-n-icon">

    <div class="manual-snippet__title">
      {#each title.split(' ') as word (word)}
        <span>{ word }</span>
      {/each}
    </div>

    <div
      class="manual-snippet__icon"
      style="background-image: url('{ inlineIcon }');"
    ></div>

  </div>

  <div class="manual-snippet__description">
    <p>{ text }</p>
  </div>

</div>



<script>
let mixClass;
export { mixClass as class };


// Props ----------------------------------------------------------------------
export let title = '';
export let inlineIcon = '';
export let text = '';

</script>



<style lang="scss">


// Manual snippet -------------------------------------------------------------
.manual-snippet {

  &__title-n-icon {
    display: flex;
    align-items: center;
  }

  &__title {
    margin-right: 1.8rem;
    display: flex;
    flex-direction: column;
    font: 2.0rem/2.0rem 'Fractura Bol',sans-serif;
    color: #fcff9c;
  }

  &__icon {
    width: 8.5rem;
    height: 8.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: 50% 50%/110% no-repeat;
  }

  &__description {}
}

</style>