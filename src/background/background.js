var tab_ip = [];

chrome.webRequest.onResponseStarted.addListener(
    data => {
        console.log(data);
        tab_ip[data.tabId] = data.ip;
    },
    {
        urls: ["http://*/*", "https://*/*"],
        types: ["main_frame"]
    }
);


chrome.webRequest.onHeadersReceived.addListener(
    info => {
        let headers = info.responseHeaders.filter(header => {
                let name = header.name.toLowerCase();
                return name !== 'x-frame-options' && name !== 'frame-options';
            }
        );
        return {responseHeaders: headers};
    },
    {
        urls: [
            '*://*.ipalyzer.com/*',
        ],
        types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
);

function getTabIp(tabId) {
    return tab_ip[tabId] || null;
}
