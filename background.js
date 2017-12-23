chrome.browserAction.setIcon({path: "icon.png"});

chrome.webNavigation.onHistoryStateUpdated.addListener(e => {
        chrome.tabs.sendMessage(e.tabId, {action: "watching"});
    }
    ,
    {
        url: [
            {hostSuffix: "netflix.com", pathPrefix: "/watch/"}
        ]
    }
);