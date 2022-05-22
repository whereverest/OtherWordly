<div class={ `errors-overlay
              ${mixClass}`}>

  <div class="errors-overlay__title">
    Errors:
  </div>

  <!-- Close button -->
  <div
    class="close-button
            errors-overlay__close-button"
    on:click={() => isErrorsOverlayVisible.update(() => false)}
  >
    <Icon
      class="close-button__icon"
      data={ crossClearIcon }
    />
  </div><!-- / Close button -->


  <ul class="errors-overlay__errors-list">
    {#each errorsList as errorObj,index (errorObj.title)}
      <!-- Single error -->
      <li class="single-error
                  errors-overlay__single-error">
        <div class="error-title
                    single-error__title">
          <span class={ `error-title__line
                          ${!errorObj.isImportant && 'error-title__line--orange'}` }>
            { errorObj.title.split(' ').slice(0,2).join(' ') }
          </span><br>
          <span class={ `error-title__line
                          ${!errorObj.isImportant && 'error-title__line--orange'}` }>
            { errorObj.title.split(' ').slice(2,3).join(' ') }:
          </span>
        </div>
        <div class="single-error__content">
          {#if Array.isArray(errorObj.content)}
            { errorObj.content.join(', ') }

            {:else}
            { errorObj.content }
          {/if}
        </div>
      </li><!-- / Single error -->
    {/each}
  </ul>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props
export let errorsList = [];

// Components
import Icon from 'svelte-icon';

// Stores
import { isErrorsOverlayVisible } from '@stores/errors.js';

// Icons
import crossClearIcon from '@icons/cross_clear.svg';

</script>



<style lang="scss">



// Close button ---------------------------------------------------------------
.close-button {
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    width: calc(100% + 6.0rem);
    height: calc(100% + 6.0rem);
    border-radius: 10.0rem;
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%,-50%);
  }

  :global(.close-button__icon) {
    width: 100%;
    height: 100%;
    fill: rgba(255,255,255,.3);
  }
}


// Single error ---------------------------------------------------------------
.single-error {
  font-size: 2.0rem;
  line-height: 2.0rem;

  &__title {
    margin-bottom: 1.2rem;
  }
  .error-title {
    line-height: 2.3rem;

    &__line {
      padding: .3rem .5rem;
      border-radius: .5rem;
      background: firebrick;

      &:first-child {
        position: relative;
      }

      &--orange {
        background: saddlebrown;
      }
    }
  }

  &__content {}
}


// Errors overlay -------------------------------------------------------------
.errors-overlay {
  width: 20.0rem;
  height: 20.0rem;
  padding: 3.0rem 3.5rem;
  box-sizing: border-box;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: monospace;
  background: rgba(20,20,20,.6);
  backdrop-filter: blur(50px);
  box-shadow: 0 20px 30px -10px rgba(0,0,0,.2);

  &__title {
    margin-bottom: 1.7rem;
    font-weight: bold;
    font-size: 5.0rem;
    line-height: 5.0rem;
    color: firebrick;
  }

  :global(.errors-overlay__close-button) {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
  }

  &__errors-list {
    height: calc(100% - 7.0rem);
    min-height: calc(100% - 7.0rem);
    max-height: calc(100% - 7.0rem);
    padding: .3rem 0;
    margin: 0;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    list-style: none;

    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
      width: 5px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.3);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: rgba(0,0,0,0);
    }
  }

    &__single-error {
      margin-bottom: 3.0rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
}

</style>