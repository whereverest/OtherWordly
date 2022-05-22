function defineIsDeviceIPad() {
  const screenHeight = window?.innerHeight;
  const screenWidth = window?.innerWidth;
  const viewportAspectRatio = screenWidth > screenHeight ? screenWidth/screenHeight : screenHeight/screenWidth;

  return viewportAspectRatio < 1.75;
}


function defineIsPortraitMode() {
  return window?.innerWidth < window?.innerHeight;
}


function calcFontSize(isDeviceIpad, isPortraitMode) {
  let coefficient = 1.5;

  if (isDeviceIpad) {
    coefficient = .6;
  } else if (isPortraitMode) {
    coefficient = 0.25;
  }

  // let minSize = Math.min(window?.innerHeight,window?.innerWidth)
  let minSize = window?.innerHeight
  return (minSize + minSize * coefficient) / 100;
}



export {
  defineIsDeviceIPad,
  defineIsPortraitMode,
  calcFontSize
}
