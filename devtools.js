function createPanelIfReactLoaded() {
  chrome.devtools.inspectedWindow.eval(`jQuery.fn.jquery`, function(pageHasReact, err) {
    if (!pageHasReact || panelCreated) {
      return;
    }

    clearInterval(loadCheckInterval);
  });
}

chrome.devtools.network.onNavigated.addListener(function() {
  createPanelIfReactLoaded();
});

// Check to see if React has loaded once per second in case React is added
// after page load
var loadCheckInterval = setInterval(function() {
  createPanelIfReactLoaded();
}, 1000);

createPanelIfReactLoaded();
