function defineIsDeviceIPad() {
  const screenHeight = window?.innerHeight;
  const screenWidth = window?.innerWidth;
  const viewportAspectRatio = screenWidth > screenHeight ? screenWidth/screenHeight : screenHeight/screenWidth;

  return viewportAspectRatio < 1.75;
}


function defineIsPortraitMode() {
  return window?.innerWidth < window?.innerHeight;
}

function calcFontSize(isDeviceIpad, isPortraitMode, isMenu = false) {
  let coefficient = 1.5;
  
  if (isMenu) {
    if (isPortraitMode) {
      coefficient = .45;
    } else if (isDeviceIpad) {
      coefficient = 1.5;
    } else {
      coefficient = 1.8;
    }
  } else {
    if (isPortraitMode) {
      coefficient = .25;
    } else if (isDeviceIpad) {
      coefficient = 1.5;
    }
  }

  console.log('isDeviceIpad-', isDeviceIpad, ' isPortraitMode-', isPortraitMode, ' coefficient-', coefficient);

  return (window?.innerHeight + window?.innerHeight * coefficient) / 100;
}



export {
  defineIsDeviceIPad,
  defineIsPortraitMode,
  calcFontSize
}