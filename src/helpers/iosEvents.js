// TODO: move this file into helpers folder
function dispatchIosEvent(eventDescription) {
  console.log(eventDescription);

  if (window.webkit != null) {
    window.webkit.messageHandlers.menu.postMessage(eventDescription);
  }
  //window.webkit.messageHandlers.menu.postMessage(msg);
}


export {
  dispatchIosEvent
}