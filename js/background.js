const TIMEOUT_TO_NOT_BOMBARD_THE_PAGE_200_MS = 200;


function triggerReview(reviewLine) {
    chrome.windows.getCurrent(w => {
        chrome.tabs.query({active: true, windowId: w.id}, tabs => {
            const currentTabId = tabs[0].id;
            if (currentTabId) {
                chrome.tabs.sendMessage(currentTabId, reviewLine);
            }
        });
    });
}

////////////////////////////////
/////////PROGRAM START//////////
////////////////////////////////

// On message `reviewLine` => call review() function
chrome.runtime.onMessage.addListener(message => {
    chrome.storage.local.set(message, () => {
        if (message.reviewLine) {
            console.log(`Got message: ${message.reviewLine}, triggering review()`)
            setTimeout(() => triggerReview(message.reviewLine), TIMEOUT_TO_NOT_BOMBARD_THE_PAGE_200_MS);
        }
    })
})