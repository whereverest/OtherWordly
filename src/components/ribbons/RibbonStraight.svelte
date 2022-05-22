<div class={ `name-ribbon
              ${mixClass}` }>
  <div class="name-ribbon__name">
    { text }
  </div>

  <svg class="name-ribbon__ribbon" width="816" height="223" viewBox="0 0 816 223">
    <path style="fill-rule: evenodd; fill: { ribbonColors[2] };" d="M815.609,42.281H588v180H815.609l-89.131-90.317Zm-815.624,0H227.594v180H-0.015l89.131-90.317Z"/>
    <path style="fill-rule: evenodd; fill: { ribbonColors[1] };" d="M707.594,0L588.014,42.287v180L707.594,180V0ZM108,0L227.58,42.287v180L108,180V0Z"/>
    <rect style="fill-rule: evenodd; fill: { ribbonColors[0] };"  x="108" width="600" height="180"/>
  </svg>

</div>



<script>
const _IS_DEV_ENV = IS_DEV_ENV,
      _IS_PROD_ENV = IS_PROD_ENV;

let mixClass;
export { mixClass as class };

// Props
export let text = '';
export let ribbonColors = [];

</script>



<style lang="scss">


// Name ribbon ----------------------------------------------------------------
.name-ribbon {
  width: 15.0rem;
  height: 4.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;

  &__name {
    padding-bottom: .8rem;
    color: #000;
    font-family: 'MuseoSlabRounded-700',sans-serif;
    text-transform: uppercase;
    text-align: center;
  }

  &__ribbon {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0 auto auto 0;
    z-index: -1;
  }
}
</style>