<script>
  import { isPortraitMode, isDeviceIpad } from "@stores/miscellaneous.js";
</script>

<div id="body" style="overflow: hidden">
  <div id="content-win" class="content-common" style="visibility: visible">
    <div class="content-common-interior">
      <div class="row">
        <div class="col-33 fullheight"></div>
        <div class="col-33 fullheight">
          <div class="v-center">
            <div
              id="SidekickPlaceholder-normal"
              class="sidekick-placeholder-normal h-center"
            ></div>
          </div>
        </div>
        <div class="col-33 fullheight h-alignleft-content"></div>
      </div>
    </div>
  </div>

  <div id="content-lose" class="content-common" style="visibility: visible">
    <div class="content-common-interior">
      <div class="row">
        <div class="col-33 fullheight"></div>
        <div class="col-33 fullheight">
          <div class="v-center">
            <div
              id="SidekickPlaceholder-normal-lose"
              class="sidekick-placeholder-normal-lose h-center"
            ></div>
          </div>
        </div>
        <div class="col-33 fullheight"></div>
      </div>
    </div>
  </div>

  <div
    id="content-readytoplay"
    class="content-common"
    style="visibility: visible"
  >
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'content-readytoplay-above-center'}`}>
        <div class={`col-33 fullheight ${$isPortraitMode && 'content-readytoplay-height-controller'}`}>
          <div
            id="SidekickPlaceholder-readytoplay"
            class="sidekick-placeholder-readytoplay hv-center"
            style="
              border-color: rgb(255, 100, 100);
              --darkreader-inline-border-top: #950000;
              --darkreader-inline-border-right: #950000;
              --darkreader-inline-border-bottom: #950000;
              --darkreader-inline-border-left: #950000;
            "
            data-darkreader-inline-border-top=""
            data-darkreader-inline-border-right=""
            data-darkreader-inline-border-bottom=""
            data-darkreader-inline-border-left=""
          />
        </div>
        <div class="col-66 fullheight" />
      </div>
    </div>
  </div>

  <div
    id="content-readytoplay-dialogue"
    class="content-common"
    style="visibility: visible"
  >
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'readytoplay-height-controller'}`}>
        <div class={`col-25 fullheight ${$isPortraitMode && 'readytoplay-above-center'}`}>
          <div
            id="SidekickPlaceholder-readytoplay-dialogue"
            class="sidekick-placeholder-readytoplay-dialogue hv-center"
            style="
              border-color: rgb(255, 100, 100);
              --darkreader-inline-border-top: #950000;
              --darkreader-inline-border-right: #950000;
              --darkreader-inline-border-bottom: #950000;
              --darkreader-inline-border-left: #950000;
            "
            data-darkreader-inline-border-top=""
            data-darkreader-inline-border-right=""
            data-darkreader-inline-border-bottom=""
            data-darkreader-inline-border-left=""
          />
        </div>
        <div class={`col-50 fullheight ${$isPortraitMode && 'readytoplay-above-center'}`} />
        <div class={`col-25 fullheight ${$isPortraitMode && 'readytoplay-below-center'}`}>
          <div
            id="SidekickPlaceholder-readytoplay-dialogue-B"
            class="sidekick-placeholder-readytoplay-dialogue hv-center"
            style="
              border-color: rgb(255, 100, 100);
              --darkreader-inline-border-top: #950000;
              --darkreader-inline-border-right: #950000;
              --darkreader-inline-border-bottom: #950000;
              --darkreader-inline-border-left: #950000;
            "
            data-darkreader-inline-border-top=""
            data-darkreader-inline-border-right=""
            data-darkreader-inline-border-bottom=""
            data-darkreader-inline-border-left=""
          />
        </div>
      </div>
    </div>
  </div>

  <div id="content-tutorial" class="content-common" style="visibility: visible">
    <div class="content-common-interior">
      <div class="row">
        <div class="col-33 fullheight" />
        <div class="col-33 fullheight">
          <div
            id="SidekickPlaceholder-tutorial"
            class="sidekick-placeholder-tutorial hv-center"
          />
        </div>
        <div class="col-33 fullheight" />
      </div>
    </div>
  </div>

  <div id="content-bonus" class="content-common" style="visibility: visible">
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'bonus-height-controller'}`}>
        <div class={`col-25 fullheight ${$isPortraitMode && 'bonus-above-center'}`}>
          <div
            id="SidekickPlaceholder-bonus"
            class="sidekick-placeholder-bonus hv-center"
          />
        </div>
        <div class={`col-25 fullheight ${$isPortraitMode && 'bonus-above-center'}`} />
        <div class={`col-25 fullheight ${$isPortraitMode && 'bonus-below-center'}`}>
          <div
            id="SidekickPlaceholder-bonus-B"
            class="sidekick-placeholder-bonus hv-center"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    id="content-bonus-lose"
    class="content-common"
    style="visibility: visible"
  >
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'bonus-lose-height-controller'}`}>
        <div class={`col-25 fullheight ${$isPortraitMode && 'bonus-lose-above-center'}`}>
          <div
            id="SidekickPlaceholder-bonus-lose"
            class="sidekick-placeholder-bonus-lose hv-center"
          />
        </div>
        <div class={`col-50 fullheight ${$isPortraitMode && 'bonus-lose-above-center'}`} />
        <div class={`col-25 fullheight ${$isPortraitMode && 'bonus-lose-below-center'}`}>
          <div
            id="SidekickPlaceholder-bonus-lose-B"
            class="sidekick-placeholder-bonus-lose hv-center"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    id="content-chapterend"
    class="content-common"
    style="visibility: visible"
  >
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'side-kick-above-center'}`}>
        <div class={`col-50 fullheight ${$isPortraitMode && 'side-kick-height-controller'}`} />
        <div class={`col-50 fullheight ${$isPortraitMode && 'side-kick-height-controller'}`}>
          <div
            id="SidekickPlaceholder-bonus-B-transformed"
            class="sidekick-placeholder-bonus-b-transformed hv-center"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    id="content-firstplay"
    class="content-common"
    style="visibility: visible"
  >
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'content-firstplay-above-center'}`}>
        <div class={`col-33 fullheight ${$isPortraitMode && 'content-firstplay-height-controller'}`}>
          <div class="v-center">
            <div
              id="SidekickPlaceholder-firstPlay"
              class="sidekick-placeholder-firstplay h-center"
            />
          </div>
        </div>
        <div class="col-50 fullheight" />
        <div class="col-16 fullheight" />
      </div>
    </div>
  </div>

  <div id="content-premium" class="content-common" style="visibility: visible">
    <div class="content-common-interior">
      <div class={`row ${$isPortraitMode && 'common-iterator-above-center'}`}>
        <div class={`col-25 fullheight ${$isPortraitMode && 'common-iterator-height-controller'}`}>
          <div class="v-center">
            <div
              id="SidekickPlaceholder-premium"
              class="sidekick-placeholder-premium h-center"
            />
          </div>
        </div>
        <div class="col-75 fullheight" />
      </div>
    </div>
  </div>

  <!-- Chapter details page elements -->
  <div class="chapter-details-page-elements">
    <div
      class={`chapter-details-page-elements__level-select-carousel-container 
      ${
        $isPortraitMode &&
        "chapter-details-page-elements__level-select-carousel-container--portrait-mode"
      }`}
    >
      <div
        class={`chapter-details-page-elements__level-select-carousel 
        ${
          $isPortraitMode &&
          "chapter-details-page-elements__level-select-carousel--portrait-mode"
        }`}
        id="MenuLevelsScrollPlaceholder"
      />
    </div>

    <div
      class={`chapter-details-page-elements__play-button 
      ${
        $isPortraitMode &&
        "chapter-details-page-elements__play-button--portrait-mode"
      }`}
      id="MenuLevelsPlayPlaceholder"
    />
  </div>
  <!-- / Chapter details page elements -->

  <!-- -------------------------------------------------------------------------- -->
  <!-- Chapter details page elements -->
  <style lang="scss">
    .content-readytoplay-above-center {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .content-readytoplay-height-controller {
      height: auto;
    }
    .bonus-height-controller {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .bonus-below-center {
      margin-top: -50%;
    }
    .bonus-above-center {
      height: auto;
    }
    .bonus-lose-height-controller {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .bonus-lose-below-center {
      margin-top: -50%;
    }
    .bonus-lose-above-center {
      height: auto;
    }
    .readytoplay-height-controller {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .readytoplay-below-center {
      margin-top: -50%;
    }
    .readytoplay-above-center {
      height: auto;
    }
    .side-kick-above-center {
      margin: 0;
      margin-top: 60%;
      display: block;
    }
    .side-kick-height-controller {
      height: auto;
    }
    .content-firstplay-height-controller {
      height: auto;
    }
    .content-firstplay-above-center {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .common-iterator-height-controller {
      height: auto;
    }
    .common-iterator-above-center {
      margin: 0;
      margin-top: 40%;
      display: block;
    }
    .chapter-details-page-elements {
      width: 10px;
      height: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      position: absolute;
      top: calc(50vh + 0px);
      left: calc(50vw - 5px);
      z-index: 1;
      font-size: calc((100vh + 100vh * 1.5) / 100);
    }

    .chapter-details-page-elements__level-select-carousel-container {
      /* aspect ratio is 30/13 */
      // width: 27em;
      height: 11.7em;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: calc(50% - 10em);
      left: calc(25vw - 20.9em);

      &--portrait-mode {
        left: auto;
        top: calc(50% - 3rem);
        height: 8rem;
      }
    }

    .chapter-details-page-elements__level-select-carousel {
      width: 27vw;
      height: 100%;
      background: rgba(255, 0, 0, 0.5);

      &--portrait-mode {
        width: 20rem;
      }
    }

    .chapter-details-page-elements__play-button {
      width: 9em;
      height: 9em;
      position: absolute;
      top: calc(50% - 6.6em);
      left: calc(50vw - 12.3em);
      background: rgba(0, 255, 0, 0.2);

      &--portrait-mode {
        top: calc(80% + 11rem);
        left: auto;
      }
    }

    @media (min-width: 927px) {
      .chapter-details-page-elements {
        font-size: calc((100vh + 100vh * 0.8) / 100);
      }

      .chapter-details-page-elements__level-select-carousel-container {
        // width: 25em;
        height: 9.4em;
        // top: calc(50% - 9.5em);
        // left: calc(25vw - 14.9em);
      }

      .chapter-details-page-elements__play-button {
        width: 7.6em;
        height: 7.6em;
        top: calc(50% - 3.8em);
        // left: calc(50% - 3.8em);
      }
    }
  </style>
</div>
