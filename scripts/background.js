chrome.runtime.onInstalled.addListener(function() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    const url = chrome.runtime.getURL("index.html");
    chrome.tabs.query({ url }, function(tabs) {
      if (tabs.length == 0) {
        chrome.tabs.create({ url });
        return;
      }

      const tab = tabs[0];
      chrome.windows.getCurrent({}, function(current) {
        if (current.id == tab.windowId) {
          chrome.tabs.update(tab.id, { active: true });
          return;
        }

        chrome.windows.update(tab.windowId, { focused: true }, function(window) {
          chrome.tabs.update(tab.id, { active: true });
        });
      });
    });
  });
});