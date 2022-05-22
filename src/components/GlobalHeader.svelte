<header class={ `global-header 
                  ${mixClass}` }>

  <div class="global-header__left-section">
    <slot name="leftSection"></slot>
  </div>
  
  <div class="global-header__middle-section">
    <slot name="middleSection"></slot>
  </div>

  <div class="global-header__right-section">
    <slot name="rightSection"></slot>
  </div>

</header>



<script>
let mixClass;
export { mixClass as class };
  
</script>



<style lang="scss">


// Global header --------------------------------------------------------------
.global-header {
  width: calc(100% - 10.0rem);
  height: 5.0rem;
  min-height: 5.0rem;
  max-height: 5.0rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(3, 33.3%);
  grid-template-areas: 'leftSection middleSection rightSection';

  &__left-section {
    padding-top: 1.3rem;
    grid-area: leftSection;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }
  
  &__middle-section {
    grid-area: middleSection;
    display: flex;
    justify-self: center;
    align-content: center;
    align-items: center;
  }

  &__right-section {
    padding-top: 1.3rem;
    grid-area: rightSection;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
  }
}

</style>