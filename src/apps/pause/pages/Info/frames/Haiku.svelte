<div class={ `haiku-container
              ${mixClass}` }>

  <ScrollableBlock class="haiku-container__scrollable-block">
    <div class="haiku-container__in-wrap">

      <TwoColorsTitle
        class="haiku-container__main-title"
        text="Haiku"
        isNoWrap={ true }
      />

      <div class="haiku-container__greeting">
        As you pause OtherWordly, a haiku materializes out of the cosmic dust. OtherWordly’s collection of 40 space-themed haiku were crafted by poets from every species who were invited to write about the serenity of deep space, the fury of meteors, the icy chill of a comet, or any intergalactic topic of their choosing.
      </div>
      <br>

      <div class="haiku-container__divider-horizontal"></div>

      <div class="haiku-container__tertiary-title">
        These are the poets
      </div>

      {#each haiku.haikuList as haiku (haiku)}
        <div
          class="haiku-container__separate-haiku"
          contenteditable="true"
          bind:innerHTML={ haiku }
        >
        </div>
      {/each}
      <br>
      <br>

      <p>IDEA invited submissions to a haiku contest in April 2019. There were 970 submissions from 198 poets.</p>
      <br>
      <br>

      <div class="haiku-container__divider-horizontal"></div>

      <div class="haiku-container__tertiary-title">
        About the 3 poetry winners
      </div>
      <br>

      {#each haiku.poetryWinners as poet (poet.name)}
        <div class="haiku-container__secondary-title">
          { poet.name }
        </div>
        <p
          contenteditable="true"
          bind:innerHTML={ poet.description }
        >
        </p>
        <br><br>
      {/each}

      <div class="haiku-container__divider-horizontal"></div>

      <p>
        The winning selections were scored by a three-judge panel.
      </p>
      <br>
      <br>

      <div class="haiku-container__tertiary-title">
        About the judges
      </div>
      <br>

      {#each haiku.judges as judge (judge.name)}
        <div class="haiku-container__secondary-title">
          { judge.name }
        </div>
        <p
          contenteditable="true"
          bind:innerHTML={ judge.description }
        >
        </p>
        <br><br>
      {/each}

      <div class="haiku-container__divider-horizontal"></div>

      <p>This cosmic collection of haiku was made possible with the help of the Haiku Society of America, The Haiku Foundation, the New Zealand Poetry Society, Duotrope, Winning Writers, and My Haiku Pond.</p>


    </div>
  </ScrollableBlock>

</div>



<script>
let mixClass;
export { mixClass as class };

import haiku from './haiku.json';

// Components
import ScrollableBlock from '@components/ScrollableBlock.svelte';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

</script>



<style lang="scss">


// Haiku container ------------------------------------------------------------
.haiku-container {
  display: flex;
  position: relative;

  :global(.haiku-container__scrollable-block) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 100%;
  }

    &__in-wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

      :global(.haiku-container__main-title) {
        margin-bottom: 3.0rem;
      }

      &__greeting {
        font-size: 1.7rem;
        line-height: 2.5rem;
      }

      &__secondary-title {
        font: 2.0rem/2.0rem 'Fractura Bol',sans-serif;
        color: #fcff9c;
        margin-bottom: 1.0rem;
      }

      &__tertiary-title {
        margin-bottom: 2.0rem;
        text-transform: uppercase;
      }

      &__divider-horizontal {
        width: calc(100% - 12.0rem);
        height: .15rem;
        margin-bottom: 3.0rem;
        background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
      }


      :global(p) {
        margin: 0 0 .5rem 0;
        font-size: 1.3rem;
        line-height: 2.0rem;
      }

        :global(b) {
          font-weight: normal;
          color: #ffffae;
        }

        :global(em) {
          font-weight: normal;
          color: #ffffae;
        }

      &__separate-haiku {
        margin-bottom: 2.0rem;

        :global(p) {
          margin-bottom: .1rem;
          font-size: 1.5rem;
          line-height: 1.8rem;
        }

        :global(em),
        :global(i) {
          font-size: 1.3rem;
          line-height: 1.6rem;
        }
      }
}

</style>