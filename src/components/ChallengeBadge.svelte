<li class={ `badge-snippet
              ${isMirrored && 'badge-snippet--mirrored'}
              ${mixClass}` }>
  
  <ArcText
    class={ `badge-snippet__date-string 
              ${isMirrored && 'badge-snippet__date-string--mirrored'}` }
    debugMode={false}
    roundness="24.0"
    fontSize="20"
    topShift="0"
    color="rgba(255,255,255,.75)"
    viewPortStart="0 -50"
  >
    { data.date }
  </ArcText>
  
  
  {#if data.topPercentage }
    <!-- Top percentage -->
    <div class={ `top-percentage 
                  ${isMirrored && 'top-percentage--mirrored'}
                  badge-snippet__top-percentage
                  ${isMirrored && 'badge-snippet__top-percentage--mirrored'}` }>
      
      <div class="top-percentage__in-wrap">
        
        <div class="top-percentage__title">
          Top
        </div>
        
        <div class="top-percentage__value-n-units">
          <div class="top-percentage__value">
            { data.topPercentage }
          </div>
          <div class="top-percentage__units">
            %
          </div>
        </div>
        
      </div>
      
    </div><!-- / Top percentage -->
  {/if}

  <div class={ `badge-snippet__badge-itself-wrapper1
                ${isBouncing && 'badge-snippet__badge-itself-wrapper1--bouncing'}` }>

  <div class={ `badge-snippet__badge-itself-wrapper2
              ${isBouncing && 'badge-snippet__badge-itself-wrapper2--flipping'}` }>

    <div class="badge-snippet__time-elapsed-value">
      { data.elapsed }
    </div>

    <img
      class="badge-snippet__badge-itself"
      src={ weeklyChallengeBadges[data.imageFileName] }
      alt={ data.topic }
    />
  </div>
  </div>

</li><!-- / Badge snippet -->



<script>
let mixClass;
export { mixClass as class };

// Props ----------------------------------------------------------------------
export let data = {};
export let isMirrored = false;
export let isBouncing = false;

// Components -----------------------------------------------------------------
import ArcText from '@components/ArcText.svelte';

import weeklyChallengeBadges from '@assets/imports/weeklyChallengeBadges.js';

</script>



<style lang="scss">

// Top percentage -------------------------------------------------------------
.top-percentage {
  width: 4.5rem;
  height: 3.3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: #000;
  background: 50% 50%/100% 100% url(../assets/images/top_percentage_stripe_bg.integrated.png);
  
  &--mirrored {
    justify-content: flex-start;
    background-image: url(../assets/images/top_percentage_stripe_bg_reversed.integrated.png);
  }
  
  &__in-wrap {
    width: 3.4rem;
    height: 2.95rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: 600;
  }
  
    &__title {
      font-size: .7rem;
      line-height: .7rem;
      text-transform: uppercase;
    }
  
    &__value-n-units {
      display: flex;
      align-items: flex-start;
    }
  
      &__value {
        font-size: 1.4rem;
        line-height: 1.4rem;
      }
  
      &__units {
        padding-top: .1rem;
        font-size: .9rem;
        line-height: .9rem;
      }
}


// Badge snippet --------------------------------------------------------------
.badge-snippet {
  width: 9.8rem;
  min-width: 9.8rem;
  height: 8.9rem;
  min-height: 8.9rem;
  padding-bottom: .8rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  &--mirrored {
    justify-content: flex-start;
  }
  
  :global(.badge-snippet__date-string) {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: -1.5rem auto auto -.2rem;
    transform: rotate(-45deg);
    text-transform: uppercase;
  }

    :global(.badge-snippet__date-string--mirrored) {
      inset: -1.5rem -.2rem auto auto;
      transform: rotate(45deg);
    }
  
  &__top-percentage {
    position: absolute;
    inset: auto auto -.1rem 0;
    
    &--mirrored {
      inset: auto .1rem -.1rem auto;
    }
  }
  
  &__badge-itself-wrapper1 {
    width: 6.5rem;
    min-width: 6.5rem;
    height: 6.5rem;
    min-height: 6.5rem;
    position: relative;

    &--bouncing {
      animation-name: badgeBouncing;
      animation-iteration-count: infinite;
      animation-duration: 2s;
      transition: transform .2s ease-in, opacity .4s ease;
      opacity: 1;
    }

    @keyframes badgeBouncing {
      0%    { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 0; }
      15%   { transform: translateY(-3.5rem) ;
              animation-timing-function: ease-in;   opacity: 1; }
      25%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      35%   { transform: translateY(-2.5rem) ;
              animation-timing-function: ease-in;   opacity: 1; }
      45%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      53%   { transform: translateY(-1.9rem) ;
              animation-timing-function: ease-in;   opacity: 1; }
      60%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      66%   { transform: translateY(-1.4rem) ;
              animation-timing-function: ease-in;   opacity: 1; }
      71%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      75%   { transform: translateY(-.8rem) ;
              animation-timing-function: ease-in;   opacity: 1; }
      78%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      80%   { transform: translateY(-4) ;
              animation-timing-function: ease-in;   opacity: 1; }
      81%   { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
      100%  { transform: translateY(0) ;
              animation-timing-function: ease-out;  opacity: 1; }
    }
  }

  &__badge-itself-wrapper2 {
    width: 6.5rem;
    min-width: 6.5rem;
    height: 6.5rem;
    min-height: 6.5rem;
    position: relative;

    &--flipping {
      animation-name: badgeFlipping;
      animation-iteration-count: infinite;
      animation-duration: 2s;
      transition: transform .2s ease-in-out;
      opacity: 1;
    }

    @keyframes badgeFlipping {
      0%      {   transform: rotateY(-90deg * 1); }
      5%     {   transform: rotateY(-90deg * 1); }
      10%     {   transform: rotateY(-90deg * 1); }
      15%     {   transform: rotateY(-90deg * 1); }
      30%     {   transform: rotateY(-90deg * 2); }
      40%     {   transform: rotateY(-90deg * 3); }
      50%     {   transform: rotateY(-90deg * 4); }
      60%     {   transform: rotateY(-90deg * 5); }
      70%     {   transform: rotateY(-90deg * 6); }
      80%     {   transform: rotateY(-90deg * 7); }
      90%     {   transform: rotateY(-90deg * 8); }
      100%    {   transform: rotateY(-90deg * 8); }
    }
  }

    &__time-elapsed-value {
      width: 5.0rem;
      height: 3.0rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      inset: 1.95rem .8rem auto auto;
      z-index: 2;
      transform: rotate(-16deg);
      font-size: 2.1rem;
      line-height: 2.1rem;
      font-family: 'RetrofunkScriptPersonalUse', serif;
      letter-spacing: -1px;
      color: #000;
      text-align: center;
    }

    &__badge-itself {
      width: 6.5rem;
      min-width: 6.5rem;
      height: 6.5rem;
      min-height: 6.5rem;
    }
}

</style>