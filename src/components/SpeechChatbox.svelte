{#if isVertical}
  <div class={ `chatbox
                chatbox--centered-content
                chatbox--small
                ${mixClass}` }>

    <div
      class="chatbox__text
              chatbox__text--centered-text"
      contenteditable="true"
      bind:innerHTML={ content }
    >
    </div>

    <Icon
      class="chatbox__chat-bubble-bg
              chatbox__chat-bubble-bg--centered"
      data={ chatBubbleVerticalIcon }
    />

  </div>

  {:else}
  <div class={ `chatbox
                ${mixClass}` }>

    <div
      class="chatbox__text"
      contenteditable="true"
      bind:innerHTML={ content }
    >
    </div>

    <Icon
      class="chatbox__chat-bubble-bg"
      data={ chatBubbleIcon }
    />

  </div>
{/if}



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

let mixClass;
export { mixClass as class };


// Props ----------------------------------------------------------------------
export let isVertical = false;
export let content = '';

// Components
import Icon from 'svelte-icon';

// Icons
import chatBubbleIcon from '@icons/chat-bubble.svg';
import chatBubbleVerticalIcon from '@icons/chat-bubble-vertical.svg';


</script>



<style lang="scss">




// Chatbox --------------------------------------------------------------------
.chatbox {
  padding: 0 0 2.7rem 0;
  position: relative;

  &--small {
    transform: scale(.9);
  }

  &--centered-content {
    padding-left: 0;
  }

  &__text {
    font-size: 2.0rem;
    line-height: 2.6rem;
    text-align: left;
    pointer-events: none;
    user-select: none;

    &--centered-text {
      line-height: 2.2rem;
      text-align: center;
    }
  }

  :global(.chatbox__chat-bubble-bg) {
    width: 17.0rem;
    height: 9.5rem;
    position: absolute;
    inset: auto auto 0 -5.0rem;
    fill: transparent;
    stroke: rgba(255,255,255,.2);
    stroke-width: .5rem;
    mask-image: linear-gradient(24deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 43%);
  }

  :global(.chatbox__chat-bubble-bg--centered) {
    width: 19.0rem;
    height: 9.5rem;
    inset: auto auto -1.5rem calc(50% - 9.5rem);
    mask-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 37%);
  }
}
</style>