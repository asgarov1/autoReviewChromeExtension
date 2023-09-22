const BEARBEITEN_BUTTON_ID = "edit-issue";
const REVIEWER_INPUT_ID = "customfield_12200-textarea";
const REVIEW_DATUM_INPUT_ID = "customfield_12201";
const REVIEW_ANMERKUNG_TEXT_FIELD_ID = "customfield_12202";
const REVIEWER_USERNAME = "xasgarov";
const AKTUALISIEREN_BUTTON_ID = "edit-issue-submit";

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

function clickId(id) {
    console.log(`About to click ${id}`)
    document.getElementById(id).click();
}

function getTodaysDateForReview() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth()+1).padStart(2, '0')}.${date.getFullYear()}`
}

function review(reviewLine) {
    clickId(BEARBEITEN_BUTTON_ID);

    new Promise(resolve => setTimeout(resolve, 300))
        .then(() => clickId(findLinkByText('Review', 1).id)) // Our Jira page has "Review" twice, second result is on the popup dialog, hence index 1
        .then(async () => await new Promise(resolve => setTimeout(resolve, 300)))
        .then(() => setInputIfExists(REVIEWER_INPUT_ID, REVIEWER_USERNAME))
        .then(() => setInputIfExists(REVIEW_DATUM_INPUT_ID, getTodaysDateForReview()))
        .then(() => setInputIfExists(REVIEW_ANMERKUNG_TEXT_FIELD_ID, reviewLine))
        .then(() => clickId(AKTUALISIEREN_BUTTON_ID))

}