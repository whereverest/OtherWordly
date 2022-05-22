<div class={ `card-achievements 
              ${mixClass}` }>
  
  <div class="{ `name 
                  ${!isReducedVersion && 'name--visible'} 
                  card-achievements__name` }">
    <div class="name__line1">
      { chapterDetails?.challengeNameWords?.[0] }
    </div>

    {#if chapterDetails?.challengeNameWords?.length === 2}
      <div class="name__line2">
        { chapterDetails?.challengeNameWords?.[1] }
      </div>
    {/if}
    
  </div>
  
  <div class="card-achievements__main-icon-wrapper">
    <!--<Icon data={card?.mainIcon} />-->
    <img
      class="card-achievements__main-icon"
      alt={ chapterDetails?.name }
      src={ mainCardIcons[chapterDetails?.mainIcon] }
    />

  </div>


  {#if !isOnlyIconShowed}
  <!-- Card stats -->
  <div class="card-stats 
                card-achievements__card-stats">
    <div class="card-stats__separate-line 
                card-stats__separate-line--first-line">
      <div class="card-stats__icon-container 
                  card-stats__icon-container--slightly-bigger">
        <Icon data={starIcon} />
      </div>
      <div class="card-stats__value">
        { chapterDetails.stars.numerator }/{ chapterDetails.stars.denominator }
      </div>
      <div class="{ `card-stats__name 
                      ${!isReducedVersion && 'card-stats__name--visible'}` }">
        Stars
      </div>
    </div>
    <div class="card-stats__separate-line 
                card-stats__separate-line--second-line">
      <div class="card-stats__icon-container">
        <Icon data={giftBoxIcon} />
      </div>
      <div class="card-stats__value">
        { chapterDetails.gifts.numerator }/{ chapterDetails.gifts.denominator }
      </div>
      <div class="{ `card-stats__name 
                      ${!isReducedVersion && 'card-stats__name--visible'}` }">
        Gifts
      </div>
    </div>
  </div><!-- / Card stats -->
  {/if}


</div>



<script>
let mixClass;
export { mixClass as class };


// Props ----------------------------------------------------------------------
export let chapterDetails = {};
export let isReducedVersion = false;
export let isOnlyIconShowed = false;


// Components -----------------------------------------------------------------
import Icon from 'svelte-icon';


// Icons ----------------------------------------------------------------------
  // singles
import starIcon from '@icons/star.svg';
import giftBoxIcon from '@icons/gift_box.svg';

import mainCardIcons from '@assets/imports/mainCardIcons.js';
  

import { onMount } from 'svelte';

onMount(() => {
})
</script>



<style lang="scss">

  
// Card stats -----------------------------------------------------------------
.card-stats {
  &__separate-line {
    margin-bottom: .2rem;
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon-container {
    width: .8rem;
    height: .7rem;
    margin-right: .4rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    top: -.1rem;

    &--slightly-bigger {
      width: .8rem;
      height: .8rem;
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  &__value {
    margin-right: .3rem;
  }

  &__name {
    max-width: 0;
    color: rgba(255,255,255,.5);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transition: max-width .4s ease, opacity .4s ease;

    &--visible {
      max-width: 8.0rem;
      opacity: 1;
    }
  }
}


// Name -----------------------------------------------------------------------
.name {
  max-width: 0;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: max-width .4s ease, opacity .4s ease;

  &--visible {
    max-width: 12.0rem;
    opacity: 1;
  }

  &__line1 {
    margin-bottom: .1rem;
    color: #fff;
  }

  &__line2 {
    color: rgba(255,255,255,.5);
  }
}

  
// Card achievements ----------------------------------------------------------
.card-achievements {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-family: 'MuseoSlabRounded-300',serif;
  font-size: .8rem;
  line-height: .8rem;
  text-transform: uppercase;

  &__name {
    margin-right: .4rem;
  }

  &__main-icon-wrapper {
    width: 2.3rem;
    height: 2.3rem;
    margin-right: .6rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    top: -.1rem;
  }

  &__main-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__stats {
    padding-top: .1rem;
  }
}

</style>