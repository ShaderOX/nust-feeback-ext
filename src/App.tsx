import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Unavailable from "./components/Unavailable";

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

  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();

  const handleFormSubmission = (rating: string, comments: string) => {
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
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        setCurrentTab(tabs[0]);
        if (
          currentTab!.url &&
          currentTab!.url.includes("qalam.nust.edu.pk/survey")
        ) {
          setShowPage(true);
        }
      });
    }
  }, [currentTab]);

  return (
    <div className="container bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-900 p-3">
      <Header title="Qalam Feedback Form Automation Tool" />

      {!showPage ? (
        <Unavailable />
      ) : (
        <div className="content">
          <div className="border-gray-700 border"></div>

          <Form formSubmit={handleFormSubmission} />

          <Footer text="Made with ❤️ by CS-10B" />
        </div>
      )}
    </div>
  );
}

export default App;
