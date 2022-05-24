<footer class={ `global-footer 
                  ${mixClass}` }>

  <div class="global-footer__left-section">
    <slot name="leftSection"></slot>
  </div>

  <div class="global-footer__middle-section">
    <slot name="middleSection"></slot>
  </div>

  <div class="global-footer__right-section">
    <slot name="rightSection"></slot>
  </div>

</footer>



<script>
  let mixClass;
  export { mixClass as class };

</script>



<style lang="scss">


// Global footer --------------------------------------------------------------
.global-footer {
  width: calc(100% - 10.4rem);
  height: 6.0rem;
  display: flex;
  justify-content: space-between;
  align-content: flex-end;
  align-items: flex-end;

  &__left-section,
  &__middle-section,
  &__right-section {
    width: 25%;
    min-width: 25%;
    height: 100%;
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
  }


  &__left-section {
    justify-content: flex-start;
  }
  
  &__middle-section {
    width: 50%;
    min-width: 50%;
    justify-content: center;
  }
  
  &__right-section {
    justify-content: flex-end;
  }
}

</style>