chrome.browserAction.setIcon({path: "szymon.png"});

function updateIcon(tab) {
    if (tab) {
        chrome.tabs.executeScript(tab.id, {file: 'stryc.js'}, function () {
            chrome.tabs.sendMessage(tab.id, {scriptOptions: {imageUrl: localStorage.getItem('url')}});
        });
    }
}

chrome.browserAction.onClicked.addListener(updateIcon);


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