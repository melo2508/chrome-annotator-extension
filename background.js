chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'textSelected') {
      chrome.action.setPopup({ popup: 'popup.html' });
    }

    if (message.action === 'saveAnnotation') {
        // Get existing annotations from local storage
        chrome.storage.local.get({ annotations: [] }, (result) => {
          const annotations = result.annotations;
          // Add the new annotation to the array
          annotations.push(message.annotation);
          // Save the updated annotations back to local storage
          chrome.storage.local.set({ annotations }, () => {
            // Send a response indicating success
            sendResponse({ success: true });
          });
        });
        return true; // Keep the messaging channel open for sendResponse
    }
  });
  