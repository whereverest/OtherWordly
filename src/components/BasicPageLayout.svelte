<script>
  const _IS_DEV_ENV = IS_DEV_ENV,
    _IS_PROD_ENV = IS_PROD_ENV;

  let mixClass;
  export { mixClass as class };

  // Stores
  import { isDeviceIpad, isPortraitMode } from "@stores/miscellaneous.js";
  import profileImg from "@images/characters/char14_jozi.png";
</script>

<div
  class={`basic-page-layout
  ${mixClass}`}
>
  <slot />

  <!-- Header -->
  <div
    class={`basic-page-layout__header
    basic-page-layout__header--left
    ${$isPortraitMode && "basic-page-layout__header--smaller-left-indent"}`}
  >
    <slot name="header-left" />
  </div>

  <div
    class="basic-page-layout__header
  basic-page-layout__header--center"
  >
    <slot name="header-center" />
  </div>

  <div
    class={`basic-page-layout__header
    basic-page-layout__header--right
    ${$isPortraitMode && "basic-page-layout__header--smaller-right-indent"}`}
  >
    <slot name="header-right">
      <div class="all-chapters-page__page-header-right">
        <div class={`all-chapters-page__profile-button-wrapper`}>
          <div
            class="single-nav-button all-chapters-page__profile-button"
            id="profileButton"
          >
            <div class="single-nav-button__icon-container svelte-1nw2pdl">
              <img
                src={profileImg}
                class="all-chapters-page__profile-button__img"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
  <!-- / Header -->

  <!-- Content -->
  <div class="basic-page-layout__content">
    <slot name="content" />
  </div>
  <!-- / Content -->

  <!-- Footer -->
  <div
    class={`basic-page-layout__footer
    ${$isPortraitMode && "basic-page-layout__footer--smaller-left-indent"}
    basic-page-layout__footer--left`}
  >
    <slot name="footer-left" />
  </div>

  <div
    class="basic-page-layout__footer
  basic-page-layout__footer--center"
  >
    <slot name="footer-center" />
  </div>

  <div
    class={`basic-page-layout__footer
    ${$isPortraitMode && "basic-page-layout__footer--smaller-right-indent"}
    basic-page-layout__footer--right`}
  >
    <slot name="footer-right" />
  </div>
  <!-- / Footer -->
</div>

<style lang="scss">
  //Basic page layout ---------------------------------------------------------
  .basic-page-layout {
    width: 100vw;
    height: var(--app-height);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    text-align: center;

    &__header {
      width: 1rem;
      height: 1rem;
      display: flex;
      position: absolute;
      top: 1.3rem;
      z-index: 999;

      &--left {
        left: 6rem;
        justify-content: flex-start;
      }

      &--center {
        left: calc(50vw - 0.5rem);
        justify-content: center;
      }

      &--right {
        left: 18rem;
        justify-content: flex-end;
        .all-chapters-page__profile-button {
          background: #fde6c7;
          border-radius: 50%;
          width: 3.8rem;
          height: 3.8rem;
          .all-chapters-page__profile-button__img {
            width: 100%;
            height: 100%;
            transform: rotate(20deg);
          }
        }
      }

      &--smaller-left-indent {
        left: 2rem;
      }

      &--smaller-right-indent {
        right: 2rem;
        left: auto !important;
      }
    }

    &__content {
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      position: absolute;
      inset: calc(var(--app-height) / 2 - 0.5rem) auto auto calc(50vw - 0.5rem);
      z-index: 1;
    }

    &__footer {
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      position: absolute;
      bottom: 1.2rem;
      z-index: 999;

      &--left {
        left: 6rem;
        justify-content: flex-start;
      }

      &--center {
        left: calc(50vw - 0.5rem);
        justify-content: center;
      }

      &--right {
        right: 6rem;
        justify-content: flex-end;
      }

      &--smaller-left-indent {
        left: 2rem;
      }

      &--smaller-right-indent {
        right: 2rem;
      }
    }
  }
</style>
