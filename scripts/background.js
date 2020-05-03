browser.runtime.onInstalled.addListener(function() {
  browser.browserAction.onClicked.addListener(async function(currentTab) {
    const url = browser.runtime.getURL("index.html");
    const tabs = await browser.tabs.query({ url });
    if (tabs.length === 0) {
      browser.tabs.create({ url });
      return;
    }

    const targetTab = tabs[0];
    const currentWindow = await browser.windows.getCurrent();
    if (currentWindow.id !== targetTab.windowId) {
      await browser.windows.update(targetTab.windowId, { focused: true });
    }

    await browser.tabs.update(targetTab.id, { active: true });
  });
});