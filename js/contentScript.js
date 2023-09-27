const BEARBEITEN_BUTTON_ID = "edit-issue";
const REVIEWER_INPUT_ID = "customfield_12200-textarea";
const REVIEW_DATUM_INPUT_ID = "customfield_12201";
const REVIEW_ANMERKUNG_TEXT_FIELD_ID = "customfield_12202";
const REVIEWER_USERNAME = "xasgarov";
const AKTUALISIEREN_BUTTON_ID = "edit-issue-submit";
const REVIEW_TAB_TEXT = 'Review';

chrome.runtime.onMessage.addListener((reviewLine, sender, response) => {
    review(reviewLine);
});

function setInputIfExists(inputElementId, value) {
    if (inputElementId) {
        document.getElementById(inputElementId).value = value;
        document.getElementById(inputElementId)
            .dispatchEvent(new Event('input', {bubbles: true}));
    }
}

function findLinkByText(text, resultIndex=0) {
    return Array.from(document.querySelectorAll('a'))
        .filter(el => el.textContent === text)[resultIndex];
}

function findAllLinksByText(text) {
    return Array.from(document.querySelectorAll('a'))
        .filter(el => el.textContent === text);
}

function clickId(id) {
    console.log(`About to click ${id}`)
    document.getElementById(id).click();
}

function getTodaysDateForReview() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth()+1).padStart(2, '0')}.${date.getFullYear()}`
}


/**
 * Some Tickets have "Review Tab" twice and in that case we want to click the second one since that is the one
 * inside the new dialog (index 1)
 *
 * Some tickets only have 1 "Review Tab" and then we want to click that one (index 0)
 */
function clickReviewTab() {
    if (findAllLinksByText(REVIEW_TAB_TEXT).length > 1) {
        clickId(findLinkByText(REVIEW_TAB_TEXT, 1).id);
    } else {
        clickId(findLinkByText(REVIEW_TAB_TEXT, 0).id);
    }
}

function review(reviewLine) {
    clickId(BEARBEITEN_BUTTON_ID);

    new Promise(resolve => setTimeout(resolve, 300))
        .then(() => clickReviewTab())
        .then(async () => await new Promise(resolve => setTimeout(resolve, 300)))
        .then(() => setInputIfExists(REVIEWER_INPUT_ID, REVIEWER_USERNAME))
        .then(() => setInputIfExists(REVIEW_DATUM_INPUT_ID, getTodaysDateForReview()))
        .then(() => setInputIfExists(REVIEW_ANMERKUNG_TEXT_FIELD_ID, reviewLine))
        .then(() => clickId(AKTUALISIEREN_BUTTON_ID))

}