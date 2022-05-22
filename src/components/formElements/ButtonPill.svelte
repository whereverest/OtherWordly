<div
  class={ `button-pill
            ${mixClass}` }
  on:click={ () => dispatch('click') }
>
  { text }
</div>



<script>
let mixClass;
export { mixClass as class };

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

// Props
export let text = '';

</script>



<style lang="scss">


// Button pill ----------------------------------------------------------------
.button-pill {
  height: 3.5rem;
  padding: 0 2.0rem;
  border: .2rem #fff solid;
  border-radius: 10.0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  white-space: nowrap;
  background: rgba(0,0,0,.2);

  &:active {
    opacity: .6;
  }
}

</style>