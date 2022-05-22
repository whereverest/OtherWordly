<span class={ `arc-text 
                ${debugMode && 'arc-text--outlined'}
                ${mixClass}` }>
  <span 
    class="arc-text__inner-wrap"
    style="top: { topShift }rem;">
    <svg viewBox="{viewPortStart} 200 120" style="min-width:100%;" >
    
        <path
          d="M0,100
              A20,{roundness} 0 1,{ isDownwardsRoundness ? 0 : 1} 200,100"
          style="stroke: {debugMode ? '#f00' : 'transparent'}; 
                  stroke-width: 3; 
                  fill: none;"
          id={randomId}
        />
      
      <text font-size={fontSize + 'px'}>
        <textPath
          href={'#' + randomId}
          style="fill: {color};"
          startOffset="50%"
          text-anchor="middle"
        >
          <slot></slot>
        </textPath>
      </text>
      
    </svg>
  </span>
</span>



<script>
let mixClass;
export { mixClass as class };


// Props ----------------------------------------------------------------------
export let topShift = 10;
export let roundness = 16;
export let fontSize = 17;
export let debugMode = false;
export let color = '#000';
export let viewPortStart = '0 0';
export let isDownwardsRoundness = false;

// Data -----------------------------------------------------------------------
let randomId = 'randomId_' + Math.random()
  
</script>



<style lang="scss">

// Arc text -------------------------------------------------------------------
.arc-text {
  width: 7.2rem;
  min-width: 7.2rem;
  height: 2.3rem;
  min-height: 2.3rem;
  //aspect-ratio: 10 / 3;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  
  &--outlined {
    outline: .1rem #f00 solid;
  }
  
  &__inner-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
  }
}

</style>