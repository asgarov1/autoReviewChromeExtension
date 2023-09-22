const JIRA_URL = "jira.services.ama.at";
const TIMEOUT_TO_NOT_BOMBARD_THE_PAGE_200_MS = 200;

function getCurrentUrlWithoutParameters(tab) {
    let currentUrl = tab.url;
    if (currentUrl.includes("?")) {
        currentUrl = currentUrl.split("?")[0]
    }
    return currentUrl;
}

function triggerReview(reviewLine) {
    getCurrentTab().then(currentTab => {
            if (currentTab) {
                const currentUrl = getCurrentUrlWithoutParameters(currentTab);
                if (currentUrl.includes(JIRA_URL)) {
                    console.log(`${currentUrl} matches JIRA Url!`)
                    chrome.tabs.sendMessage(currentTab.id, {
                        match: {
                            "reviewLine": reviewLine
                        },
                    });
                }
            }
        }
    )
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
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