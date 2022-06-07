<div class={ `credits-container
              ${mixClass}` }>

  <ScrollableBlock class="credits-container__scrollable-block">
    <div class="credits-container__in-wrap">

      <TwoColorsTitle
        class="credits-container__main-title"
        text="Credits"
        isNoWrap={ true }
      />

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Producer</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Michael Douma</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Programming</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Greg Ligierko</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Design</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Ovidiu Ankuta</div>

        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Music and Sound Effects</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Morusque</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Character Design</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Oscar Saravia</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Narrative</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Davis G. See</div>

        </div>

      </div><!-- / Columns container -->

      <div class="credits-container__divider-horizontal"></div>

      <TwoColorsTitle
        class="credits-container__main-title"
        text="Vocabulary"
        isNoWrap={ true }
      />

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Programmer</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Sean Liu</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Lexicographer</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Orin Hargraves</div>

        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Lexographic Data</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Linguabase</div>

          <div class="credits-container__tertiary-title
                      credits-container__tertiary-title--small-bottom-margin">Editor</div>
          <div class="credits-container__secondary-title
                      credits-container__secondary-title--big-bottom-margin">Sally Smith</div>

        </div>

      </div><!-- / Columns container -->

      <br>

      <div class="credits-container__tertiary-title
                  credits-container__tertiary-title--big-bottom-margin">Contributors</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">
        {#if !$isPortraitMode}
        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Andrew Hursh</div>
          <div class="credits-container__quaternary-title">Brenda Darlene Hunter</div>
          <div class="credits-container__quaternary-title">Brinda Sousley</div>
          <div class="credits-container__quaternary-title">Catherine Carnovale</div>
          <div class="credits-container__quaternary-title">Chitra Sundararajan</div>
          <div class="credits-container__quaternary-title">David Hughes</div>
          <div class="credits-container__quaternary-title">Emily Moline</div>
          <div class="credits-container__quaternary-title">Hannah Williams</div>
          <div class="credits-container__quaternary-title">James Grama</div>
        </div>
        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Jamie Friel</div>
          <div class="credits-container__quaternary-title">Jason Sankovic</div>
          <div class="credits-container__quaternary-title">Jerry Carr-Brion</div>
          <div class="credits-container__quaternary-title">Johan Josefsson</div>
          <div class="credits-container__quaternary-title">Joshua Boisvert</div>
          <div class="credits-container__quaternary-title">Ljubomir Stevanovic</div>
          <div class="credits-container__quaternary-title">Louisa Jordan</div>
          <div class="credits-container__quaternary-title">Mario Christiner</div>
          <div class="credits-container__quaternary-title">Melody Ann Ross</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Meredith Green</div>
          <div class="credits-container__quaternary-title">Miodrag Petrusevski</div>
          <div class="credits-container__quaternary-title">Nick Williams</div>
          <div class="credits-container__quaternary-title">Nicole Gordiyenko</div>
          <div class="credits-container__quaternary-title">Olga L. Rachello</div>
          <div class="credits-container__quaternary-title">Raluca Crisan</div>
          <div class="credits-container__quaternary-title">Ronaldo Borja</div>
          <div class="credits-container__quaternary-title">Sahana Pal</div>
          <div class="credits-container__quaternary-title">Thouria Bensaoula</div>
        </div>
        {:else}
        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Thouria Bensaoula</div>
          <div class="credits-container__quaternary-title">Brinda Sousley</div>
          <div class="credits-container__quaternary-title">Ronaldo Borja</div>
          <div class="credits-container__quaternary-title">Jerry Carr-Brion</div>
          <div class="credits-container__quaternary-title">Catherine Carnovale</div>
          <div class="credits-container__quaternary-title">Mario Christiner</div>
          <div class="credits-container__quaternary-title">Raluca Crisan</div>
          <div class="credits-container__quaternary-title">Jamie Friel</div>
          <div class="credits-container__quaternary-title">Nicole Gordiyenko</div>
          <div class="credits-container__quaternary-title">James Grama</div>
          <div class="credits-container__quaternary-title">Meredith Green</div>
          <div class="credits-container__quaternary-title">David Hughes</div>
          <div class="credits-container__quaternary-title">Brenda Darlene Hunter</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Andrew Hursh</div>
          <div class="credits-container__quaternary-title">Louisa Jordan</div>
          <div class="credits-container__quaternary-title">Johan Josefsson</div>
          <div class="credits-container__quaternary-title">Emily Moline</div>
          <div class="credits-container__quaternary-title">Sahana Pal</div>
          <div class="credits-container__quaternary-title">Miodrag Petrusevski</div>
          <div class="credits-container__quaternary-title">Olga L. Rachello</div>
          <div class="credits-container__quaternary-title">Melody Ann Ross</div>
          <div class="credits-container__quaternary-title">Jason Sankovic</div>
          <div class="credits-container__quaternary-title">Chitra Sundararajan</div>
          <div class="credits-container__quaternary-title">Ljubomir Stevanovic</div>
          <div class="credits-container__quaternary-title">Nick Williams</div>
        </div>
        {/if}

      </div><!-- / Columns container -->

      <div class="credits-container__divider-horizontal"></div>

      <TwoColorsTitle
        class="credits-container__main-title"
        text="Level Design"
        isNoWrap={ true }
      />

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__quaternary-title">Morgan Smith</div>
          <div class="credits-container__quaternary-title">Sasha Dali</div>

        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__quaternary-title">Michelle Mantel</div>
          <div class="credits-container__quaternary-title">Zijie “Jason” Ye</div>

        </div>

      </div><!-- / Columns container -->
      <br>

      <div class="credits-container__divider-horizontal"></div>

      <TwoColorsTitle
        class="credits-container__main-title"
        text="Game Testing"
        isNoWrap={ true }
      />

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        {#if !$isPortraitMode}
        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Djordje Mancic</div>
          <div class="credits-container__quaternary-title">Nathan Worrall</div>
          <div class="credits-container__quaternary-title">Luke Li</div>
          <div class="credits-container__quaternary-title">Brandon Hee</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Eno Gjika</div>
          <div class="credits-container__quaternary-title">Peter Duan</div>
          <div class="credits-container__quaternary-title">Tom Shi</div>
          <div class="credits-container__quaternary-title">Holly Stewart</div>
          <div class="credits-container__quaternary-title">Michelle Li</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Andre Johnson</div>
          <div class="credits-container__quaternary-title">Elias Fisher</div>
          <div class="credits-container__quaternary-title">Kale Lines</div>
          <div class="credits-container__quaternary-title">Peter Li</div>
        </div>
        {:else}
        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Djordje Mancic</div>
          <div class="credits-container__quaternary-title">Nathan Worrall</div>
          <div class="credits-container__quaternary-title">Luke Li</div>
          <div class="credits-container__quaternary-title">Brandon Hee</div>
          <div class="credits-container__quaternary-title">Eno Gjika</div>
          <div class="credits-container__quaternary-title">Peter Duan</div>
          <div class="credits-container__quaternary-title">Tom Shi</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Holly Stewart</div>
          <div class="credits-container__quaternary-title">Michelle Li</div>
          <div class="credits-container__quaternary-title">Andre Johnson</div>
          <div class="credits-container__quaternary-title">Elias Fisher</div>
          <div class="credits-container__quaternary-title">Kale Lines</div>
          <div class="credits-container__quaternary-title">Peter Li</div>
        </div>
        {/if}
      </div><!-- / Columns container -->

      <div class="credits-container__divider-horizontal"></div>

      {#if $isPortraitMode}
        <TwoColorsTitle
          class="credits-container__main-title"
          text="Additional Thanks"
          fontSize={3}
          isNoWrap={ true }
        />
      {:else}
        <TwoColorsTitle
          class="credits-container__main-title"
          text="Additional Thanks"
          isNoWrap={ true }
        />
      {/if}

      <div class="credits-container__tertiary-title">Narrative</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        {#if !$isPortraitMode}
        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Chris Davies</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Kyle Hubbard</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Kevin Meades</div>
        </div>
        {:else}
        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Chris Davies</div>
          <div class="credits-container__quaternary-title">Kyle Hubbard</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Kevin Meades</div>
        </div>
        {/if}

      </div><!-- / Columns container -->

      <br>

      <div class="credits-container__tertiary-title">Color palettes</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div></div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--33-percent-width">
          <div class="credits-container__quaternary-title">Miguel Albadan</div>
        </div>

        <div></div>

      </div><!-- / Columns container -->

      <br>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__tertiary-title">Educational strategy</div>
          <div class="credits-container__quaternary-title">Whitney Spiehler</div>
          <div class="credits-container__quaternary-title">Joan Blanusa</div>
          <div class="credits-container__quaternary-title">Steph Alkhatib</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__tertiary-title">Storyboarding intro</div>
          <div class="credits-container__quaternary-title">Zdravko Jandric</div>
        </div>

      </div><!-- / Columns container -->

      <br>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div></div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div
            class="credits-container__tertiary-title"
            style="white-space: nowrap"
          >
            Children’s language corpus
          </div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Jessica L. Montag,</div>
          <div
            class="credits-container__tertiary-title"
            style="white-space: nowrap; text-transform: none;"
          >University of Illinois, Urbana-Champaign</div>
        </div>

        <div></div>

      </div><!-- / Columns container -->

      <br>

      <div class="credits-container__tertiary-title">Intern facilitators</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Andrew Maclean,</div>
          <div class="credits-container__tertiary-title" style="text-transform: none">HighTechU at University of Victoria</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Aleya Adams,</div>
          <div class="credits-container__tertiary-title" style="text-transform: none">HighTechU at University of Victoria</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Lindsay Panis,</div>
          <div class="credits-container__tertiary-title" style="text-transform: none">Experiential Network (XN) at Northeastern University</div>
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Jennifer Reyes,</div>
          <div class="credits-container__tertiary-title" style="text-transform: none">Experiential Network (XN) at Northeastern University</div>
        </div>

      </div><!-- / Columns container -->

      
      <br>

      <div class="credits-container__tertiary-title">Supercomputer processing</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Robert Sinkovits,</div>
          <div class="credits-container__tertiary-title" style="text-transform: none">San Diego Supercomputer Center</div>

        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">XSEDE Supercomputer grant IRI140002</div>
        </div>

      </div><!-- / Columns container -->

      <br>

      <div class="credits-container__tertiary-title">Misc programming</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Kostya Safonov</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Frontend)</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Liko Sonexarth</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Frontend)</div>
          
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Evgeny Nikitenko</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Backend)</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Iyad Kandalaft</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Lucene)</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Mykhailo Kolotushkin</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Backend)</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Vladimir Vodolazkiy</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Text processing)</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Zainab Almutawa</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">(Intern, Statistics)</div>

        </div>

      </div><!-- / Columns container -->

      <br>

      <div class="credits-container__tertiary-title">Great ideas & feedback</div>

      <!-- Columns container -->
      <div class="columns-container
                  credits-container__columns-container">

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Andy Dent,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">Touchgram</div>

          <div class="credits-container__quaternary-title">Nicole Epps</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">James Lockrey,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">Chaos Theory Games</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Lauren Schwartz,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">MAGFest</div>
        </div>

        <div class="columns-container__separate-column
                    columns-container__separate-column--50-percent-width">
          <div class="credits-container__quaternary-title">Eno Gjika</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Jay Kidd,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">Wraith Games</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Jose Luis Vazquez-Poletti,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">Universidad Complutense de Madrid</div>

          <div class="credits-container__quaternary-title
                      credits-container__quaternary-title--small-bottom-margin">Ted Regulski,</div>
          <div class="credits-container__tertiary-title"
               style="text-transform: none">Nintendo</div>
        </div>

      </div><!-- / Columns container -->

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
import { isPortraitMode } from '@stores/miscellaneous.js';

</script>



<style lang="scss">


// Credits container ----------------------------------------------------------
.credits-container {
  display: flex;
  position: relative;

  :global(.credits-container__scrollable-block) {
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

      :global(.credits-container__main-title) {
        margin-bottom: 4.5rem;
      }

      &__secondary-title {
        font: 2.0rem/2.0rem 'Fractura Bol',sans-serif;
        color: #fcff9c;
        margin-bottom: 1.0rem;

        &--big-bottom-margin {
          margin-bottom: 2.5rem;
        }
      }

      &__tertiary-title {
        margin-bottom: 2.0rem;
        text-transform: uppercase;

        &--small-bottom-margin {
          margin-bottom: .35rem;
        }

        &--big-bottom-margin {
          margin-bottom: 3.0rem;
        }
      }

      &__quaternary-title {
        margin-bottom: 2.0rem;
        font-size: 2.0rem;
        line-height: 2.5rem;
        color: #fcff9c;

        &--small-bottom-margin {
          margin-bottom: .1rem;
        }
      }

      &__columns-container {
        margin-bottom: 1.0rem;
      }
      .columns-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        &__separate-column {
          display: flex;
          flex-direction: column;
          align-items: center;

          &--50-percent-width {
            width: calc(50% - 1.0rem);
          }
          &--33-percent-width {
            width: calc(33% - 1.0rem);
          }
        }
      }

      &__divider-horizontal {
        width: calc(100% - 12.0rem);
        height: .15rem;
        margin-bottom: 5.0rem;
        background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
      }
}

</style>
