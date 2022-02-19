import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const RATING: any = {
  Excellent: 0,
  "Very Good": 1,
  Good: 2,
  Average: 3,
  Poor: 4,

  Randomize: -1,
};

function App() {
  const [showPage, setShowPage] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ratingSelectRef = useRef<HTMLSelectElement>(null);

  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rating: string = ratingSelectRef.current!.value;
    let comments: string = textareaRef.current!.value.trim();

    if (comments === "") {
      if (rating === "Randomize") comments = "Good";
      else comments = rating;
    }

    chrome.tabs.sendMessage(
      currentTab!.id as number,
      {
        rating: RATING[rating],
        comments,
      },
      response => {
        // alert("Response" + response);
      }
    );
  };

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        setCurrentTab(tabs[0]);

        if (
          currentTab!.url &&
          currentTab!.url.includes("qalam.nust.edu.pk/survey")
        ) {
          setShowPage(true);
        }
      });
  }, [currentTab]);

  return (
    <div className="container bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-900 p-3">
      <h1 className="text-center my-3 text-xl font-semibold">
        Qalam Feedback Form Automation Tool
      </h1>

      {!showPage ? (
        <div className="flex flex-col">
          <span className="my-1 font-mono font-bold text-center -tracking-wider text-red-400 text-lg">
            Unavailable
          </span>

          <span className="text-center text-medium font-semibold">
            This page is only available at{" "}
            <a
              href="http://https://qalam.nust.edu.pk/survey"
              className="text-gray-400"
            >
              https://qalam.nust.edu.pk/survey/
            </a>
          </span>
        </div>
      ) : (
        <div className="content">
          <div className="border-gray-700 border"></div>

          <form className="flex flex-col my-10" onSubmit={handleFormSubmission}>
            {/* RATING SELECTOR */}
            <div className="rating-section">
              <label
                htmlFor="rating"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                General Rating
              </label>
              <select
                ref={ratingSelectRef}
                id="rating"
                className="outline-none block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Randomize" selected>
                  Randomize
                </option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <br className="my-3" />

            {/* COMMENTS SECTION */}
            <div className="comments-section">
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Comments
              </label>
              <textarea
                ref={textareaRef}
                id="message"
                rows={4}
                className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>

            <br className="my-3" />

            <button
              type="submit"
              className="self-end bg-blue-500 p-1.5 rounded-lg text-gray-50 px-3 text-sm hover:bg-blue-600"
            >
              Fill form
            </button>
          </form>

          <footer className="text-center text-sm text-gray-900 dark:text-gray-400">
            Made with ❤️ by CS-10B
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
