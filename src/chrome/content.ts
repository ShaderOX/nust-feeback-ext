type Request = {
  rating: number;
  comments: string;
};

chrome.runtime.onMessage.addListener(
  (request: Request, sender, sendResponse) => {
    const { rating, comments } = request;
    fillFeedbackForm(rating, comments);
  }
);
console.log("Content.js running");

function fillFeedbackForm(rating: number, comments: string) {
  const rowCount = document.querySelectorAll("table tbody tr").length;
  for (let i = 1; i <= rowCount; i++) {
    const radioButtons = document.querySelectorAll(
      `table tbody tr:nth-child(${i}) input[type="radio"]`
    ) as NodeListOf<HTMLInputElement>;

    let radioButtonIdx = rating;
    if (rating < 0) radioButtonIdx = randomizeRating();

    radioButtons[radioButtonIdx].click();
  }

  const commentInput = document.querySelector(
    "textarea"
  ) as HTMLTextAreaElement;
  commentInput.value = comments;
}

function randomizeRating(): number {
  return Math.floor(Math.random() * 5);
}

export {};
