<div class={ `share-info-container
              ${mixClass}` }>

  <TwoColorsTitle
    class="share-info-container__main-title"
    text="Share"
    isNoWrap={ true }
  />

  <div class="share-info-container__text-container">
    Tell a friend about your success.<br>
    The <b>average speed</b> to complete the last 5 levels is better than <b>68%</b> of other players.<br>
    Your current <b>ratio of stars</b> per level is better than <b>35%</b> of other players.
  </div>

  <div
    class="share-info-container__divider-horizontal"
    style="margin-bottom: 1.5rem;"
  >
  </div>

  <!-- Socials icons -->
  <div class="socials-icons
              share-info-container__socials-icons">
    <div class="socials-icons__title">
      Share to
    </div>
    <Icon
      class="socials-icons__icon"
      data={ facebookIcon }
    />
    <Icon
      class="socials-icons__icon"
      data={ instagramIcon }
    />
    <Icon
      class="socials-icons__icon"
      data={ twitterIcon }
    />
  </div><!-- / Socials icons -->

  <div
    class="share-info-container__divider-horizontal"
    style="margin-bottom: 1.5rem;"
  >
  </div>

  <div class="share-info-container__text-container">
    Also, anytime you are viewing a hint, you can share that example of usage.
  </div>

</div>



<script>
let mixClass;
export { mixClass as class };

import stats from './stats.json';

// Components
import Icon from 'svelte-icon';
import TwoColorsTitle from '@components/TwoColorsTitle.svelte';

// Icons
  // singles
import facebookIcon from '@icons/socials/facebook.svg';
import instagramIcon from '@icons/socials/instagram.svg';
import twitterIcon from '@icons/socials/twitter.svg';

</script>



<style lang="scss">


// Socials icons ---------------------------------------------------------------
.socials-icons {
  display: flex;
  align-items: center;

  &__title {
    margin-right: 2.0rem;
    text-transform: uppercase;
  }

  :global(.socials-icons__icon) {
    width: 4.0rem;
    height: 4.0rem;
    margin-right: 1.5rem;
    fill: #ffffae;
    transition: transform .15s ease;
    transition-delay: .1s;
  }
    :global(.socials-icons__icon:active) {
      transform: scale(1.7);
    }

  }


// Share info container -------------------------------------------------------
.share-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :global(.share-info-container__main-title) {
    margin-top: -1.5rem;
    margin-bottom: 3.0rem;
  }

  &__text-container {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.4rem;

    //p {
    //  margin: 0 0 .5rem 0;
    //}

      b {
        font-weight: normal;
        color: #ffffae;
      }
  }

  &__divider-horizontal {
    width: calc(100% - 12.0rem);
    height: .15rem;
    margin-bottom: 3.0rem;
    background-image: linear-gradient(to right, rgba(222, 222, 222, 0), rgba(222, 222, 222, 0.25), rgba(222, 222, 222, 0));
  }

  &__socials-icons {
    margin-bottom: 1.5rem;
  }
}

</style>