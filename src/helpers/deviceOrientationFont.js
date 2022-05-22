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
    coefficient = .8;
  } else if (isPortraitMode) {
    coefficient = .25;
  }

  return (window?.innerHeight + window?.innerHeight * coefficient) / 100;
}



export {
  defineIsDeviceIPad,
  defineIsPortraitMode,
  calcFontSize
}