var background = chrome.extension.getBackgroundPage();
chrome.tabs.query({active: true, currentWindow: true, windowType: 'normal'}, tabs => {
    if (tabs[0]) {
        let ip = background.getTabIp(tabs[0].id);
        document.getElementById('content-frame').src = "https://www.ipalyzer.com/" + (ip || "");
    }
});
