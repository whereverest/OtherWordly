<div class={ `rope-title 
              ${mixClass}`}>
  <Icon
    class="rope-title__rope-bg"
    data={ ropeTitleDoubleIcon }
  />

  <ArcText
    class="rope-title__word1"
    debugMode={false}
    roundness="3.4"
    fontSize="18"
    topShift="-.8"
  >
    { titleText[0] }
  </ArcText>

  <ArcText
    class="rope-title__word2"
    debugMode={false}
    roundness="3.4"
    fontSize="18"
    topShift="-.8"
  >
    { titleText[1] }
  </ArcText>

</div>



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let titleText = [];

// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';
import Icon from 'svelte-icon';

// Icons ----------------------------------------------------------------------
import ropeTitleDoubleIcon from '@icons/rope_title_double.svg';

</script>



<style lang="scss">


// Rope title -----------------------------------------------------------------
.rope-title {
  width: 20.6rem;
  height: 6.7rem;
  margin-left: 1.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;

  :global(.rope-title__rope-bg) {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
  }

  :global(.rope-title__word1) {
    position: absolute;
    inset: .7rem auto auto 2.7rem;
    text-transform: uppercase;
    font-family: 'MuseoSlabRounded-700',serif;
    transform: scale(1.6) rotate(-6deg);
  }

  :global(.rope-title__word2) {
    position: absolute;
    inset: 3.85rem 4.6rem auto auto;
    text-transform: uppercase;
    font-family: 'MuseoSlabRounded-700',serif;
    transform: scale(1.9) rotate(2deg);
  }
}

</style>