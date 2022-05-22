<div class={ `user-stats-panel
              ${mixClass}` }>

  {#if currentChapter}
    <div class={ `user-stats-panel__section
                  ${isCentered && 'user-stats-panel__section--centered'}` }>
      <div class="user-stats-panel__section-title">Chapter</div>
      { currentChapter }
    </div>
  {/if}

  {#if currentLevel}
    <div class={ `user-stats-panel__section
                  ${isCentered && 'user-stats-panel__section--centered'}` }>
      <div class="user-stats-panel__section-title">Level</div>
      { currentLevel }
    </div>
  {/if}

  {#if currentMission}
    <div class={ `user-stats-panel__section
                  ${isCentered && 'user-stats-panel__section--centered'}` }>
      <div class="user-stats-panel__section-title">Mission</div>
      { currentMission }
    </div>
  {/if}

  {#if +currentChapter !== 1 && chaptersList.length}
    <div class={ `user-stats-panel__section
                  ${isCentered && 'user-stats-panel__section--centered'}` }>
      <div class="user-stats-panel__section-title">Powerup</div>
      { chaptersList?.find(item => item.chapterNum === currentChapter )?.challengeNameWords[0] }
    </div>
  {/if}

</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let currentChapter = 0;
export let currentLevel = 0;
export let currentMission = 0;
export let chaptersList = [];
export let isCentered = false;

</script>



<style lang="scss">



// User stats panel -----------------------------------------------------------
.user-stats-panel {
  height: 4.0rem;
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-family: 'MuseoSlabRounded-500',serif;

  &__section {
    margin-right: 2.0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &--centered {
      align-items: center;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__section-title {
    font-size: 1.2rem;
    font-family: 'MuseoSlabRounded-300',serif;
    color: rgba(255,255,255,.5);
  }
}

</style>