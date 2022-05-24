<div class={ `welcome-page
              ${_IS_DEV_ENV && 'welcome-page--with-bg-image'}` }>


  <BasicPageLayout class="welcome-page__basic-layout-container">

    <!-- slot: content -->
    <svelte:fragment slot="content">
      <div class={ `welcome-page__page-content
                    ${($transitionTo === 'Challenges' || !isAllPageElementsVisible)
                                            && 'welcome-page__page-content--invisible'}
                    ${$transitionTo === 'Challenges' && 'welcome-page__page-content--moved-to-left'}` }>

        <!-- Greeting snippet -->
        <div class="greeting-snippet
                    welcome-page__greeting-snippet">

          <div class="greeting-snippet__avatar-container">
            <img
              class="greeting-snippet__avatar"
              src={ randomAvatar }
              alt="avatar"
            />
          </div>

          <div class="greeting-snippet__text-n-button">

            <!-- Greeting text -->
            <div class="greeting-text
                        greeting-snippet__text">

              <Icon
                class="greeting-text__chat-bubble-bg"
                data={ chatBubbleIcon }
              />

              <div class="greeting-text__title">
                <em>Welcome</em>&nbsp; to Alphazoid Prime!
              </div>

              <div class="greeting-text__paragraph">
                Join us on a journey by<br>
                matching words.
              </div>

            </div><!-- / Greeting text -->

            <div class="greeting-snippet__button-container">
              <ButtonInCircle
                class="greeting-snippet__button"
                backwardsGradient={true}
                prominent={true}
                textInCircle={ ['LET\'S','GO'] }
                on:click={ goToChallengesPage }
                isWithBounceAnimation={ true }
              />
            </div>

          </div>

        </div><!-- / Greeting snippet -->

      </div>
    </svelte:fragment><!-- / slot: content -->

  </BasicPageLayout>

</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

import { push } from 'svelte-spa-router';
import { onMount } from 'svelte';

// Components
import BasicPageLayout from '@components/BasicPageLayout.svelte';
import ButtonInCircle from '@components/ButtonInCircle.svelte';
import Icon from 'svelte-icon';

// Stores
// import { basicFontSize } from '@stores/miscellaneous.js';
import { transitionFrom, transitionTo } from '@stores-fp/transitions.js';

// Images
import randomAvatar from '@images/characters/char15_astra.png';

// Icons
import chatBubbleIcon from '@icons/chat-bubble.svg';



onMount(() => {
  transitionFrom.update(() => '');
  transitionTo.update(() => '');
});


// Show elements on page opening ----------------------------------------------
let isAllPageElementsVisible = false;
onMount(() => {
  setTimeout(() => isAllPageElementsVisible = true, 300);
});

// Go to Challenges page ------------------------------------------------------
function goToChallengesPage() {

  setTimeout(() => transitionFrom.update(() => 'Welcome'), 300)
  setTimeout(() => transitionTo.update(() => 'Challenges'), 300)
  setTimeout(() => push('/challenges'), 600);
}

</script>



<style lang="scss">


// Greeting text --------------------------------------------------------------
.greeting-text {
  position: relative;
  font-size: 2.05rem;
  line-height: 2.7rem;

  :global(.greeting-text__chat-bubble-bg) {
    width: 17.0rem;
    height: 9.5rem;
    position: absolute;
    inset: auto auto -2.2rem -5.5rem;
    fill: transparent;
    stroke: rgba(255,255,255,.2);
    stroke-width: .5rem;
    mask-image: linear-gradient(24deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 43%);
  }

  &__title {
    margin-bottom: 1.0rem;
    text-align: left;
    white-space: nowrap;

    em {
      font-size: 2.9rem;
      font-family: 'ZingScriptRustR-Base',serif;
      font-style: normal;
      font-feature-settings: 'swsh';
      color: #FBFEA6;
    }
  }

  &__paragraph {
    text-align: left;
  }
}


// Greeting snippet -----------------------------------------------------------
.greeting-snippet {
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  &__avatar-container {
    width: 13.0rem;
    height: 13.0rem;
    margin: 4.0rem 8.6rem 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    &__avatar {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

  &__text-n-button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

    &__text {
      margin-bottom: 4.0rem;
    }

    &__button-container {
      width: 8.5rem;
      height: 8.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      animation-duration: 2s;
      animation-name: scale-bounce;
      animation-iteration-count: infinite;
      transform-origin: center center;

      @keyframes scale-bounce {
        from {transform: scale(1);}
        7% {transform: scale(1.1);}
        25% {transform: scale(.95);}
        50% {transform: scale(1);}
        to {transform: scale(1);}
      }
    }

      :global(.greeting-snippet__button) {
        transform: scale(2.3);
        transform-origin: center center;
      }
}


// Welcome page ---------------------------------------------------------------
.welcome-page {

  &--with-bg-image {
    background: 50% 50%/cover url(../../../assets/images/menu_bg2.jpg) no-repeat;
  }

  &__page-content {
    opacity: 1;
    transition: margin .6s ease, opacity .4s ease;

    &--invisible {
      opacity: 0;
    }

    &--moved-to-left {
      margin-left: -25.0rem;
    }
  }

    &__greeting-snippet {
      position: relative;
      inset: auto 3.9rem auto auto;
    }
}

</style>