const DOM_CONTENT_LOADED = 'DOMContentLoaded';
const REVIEWS_DIV_ID = "reviews-div";
const MAX_CHARS_THAT_FIT_IN_COLUMN = 16;
const THREE_DOTS = "...";
const FILENAME = 'reviews.txt';

function formatIfOverNChars(review, maxChars) {
    if (review.length < maxChars) {
        return review;
    }

    let shortenedVersion = review.substring(0, maxChars - THREE_DOTS.length) + THREE_DOTS;
    return review.length > MAX_CHARS_THAT_FIT_IN_COLUMN ?
        shortenedVersion : review
}

function getIdForReviewLine(reviewLine) {
    console.log("===> " + reviewLine)
    return reviewLine.replaceAll(" ", "_");
}

function addReviewElementToDom(reviewLine, parent) {
    parent.innerHTML +=
        `<a class="list-group-item list-group-item-action" id=${(getIdForReviewLine(reviewLine))} href="#" data-toggle="tooltip" data-placement="top" title="${reviewLine}">
            ${(formatIfOverNChars(reviewLine, 35))}
        </a>`
}

function setEventListener(reviewLine) {
    const id = getIdForReviewLine(reviewLine)
    document.getElementById(id).addEventListener('click', () => {
        chrome.runtime.sendMessage({reviewLine: reviewLine})
    })
}

document.addEventListener(DOM_CONTENT_LOADED, function () {
    fetch(FILENAME)
        .then(fetchResult => fetchResult.text())
        .then(reviewsText => reviewsText.split("\n"))
        .then(reviewLines => reviewLines.map(line => line.trim()))

        .then(reviewLines => reviewLines.filter(line => line))
        .then(reviewLines => {
            reviewLines.forEach(review => addReviewElementToDom(review, document.getElementById(REVIEWS_DIV_ID)));
            return reviewLines;
        })
        .then(reviewLines => reviewLines.forEach(reviewLine => setEventListener(reviewLine)))
}, false);
