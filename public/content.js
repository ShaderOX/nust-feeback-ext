chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received a message from", sender, ":", request);
});
