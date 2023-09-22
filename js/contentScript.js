const BEARBEITEN_BUTTON_ID = "edit-issue";
const REVIEW_TAB_ID = "aui-uid-15";
const REVIEWER_INPUT_ID = "customfield_12200-textarea";
const REVIEW_DATUM_INPUT_ID = "customfield_12201";
const REVIEW_ANMERKUNG_TEXT_FIELD_ID = "customfield_12202";
const NAME_TEXT_FILENAME = "full_name.txt";

chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const {match} = obj;
    review(match);
});

function setInputIfExists(inputElementId, value) {
    if (inputElementId) {
        inputElementId.value = value;
        inputElementId.dispatchEvent(new Event('input', {bubbles: true}));
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function clickId(id) {
    document.getElementById(id).click();
}

function getTodaysDateForReview() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth()+1).padStart(2, '0')}.${date.getFullYear()}`
}


function review(match) {
    clickId(BEARBEITEN_BUTTON_ID);

    delay(500)
        .then(() => clickId(REVIEW_TAB_ID))
        .then(() => delay(300))
        .then(() => fetch(NAME_TEXT_FILENAME))
        .then(fullName => setInputIfExists(REVIEWER_INPUT_ID, fullName.text()))
        .then(() => setInputIfExists(REVIEW_DATUM_INPUT_ID, getTodaysDateForReview()))
        .then(() => setInputIfExists(REVIEW_ANMERKUNG_TEXT_FIELD_ID, match.reviewLine))
}