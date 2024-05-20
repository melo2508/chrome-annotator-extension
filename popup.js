document.getElementById('highlight').addEventListener('click', () => {
    const color = '#FFFF00'; // Default highlight color
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'highlightText', color });
    });
    // Load annotations
    chrome.storage.local.get('annotations', (result) => {
        const annotationsList = document.getElementById('annotationsList');

    // Ensure result.annotations is an array
    const annotations = result.annotations || [];
        annotations.forEach(annotation => {
            const div = document.createElement('div');
        div.textContent = annotation.text;
        annotationsList.appendChild(div);
    });
  });
  
  });
  
  document.getElementById('addNote').addEventListener('click', () => {
    const note = prompt('Enter your note:');
    if (note) {
      // Save note logic-> Save note to Chrome storage
      chrome.storage.local.get({ notes: [] }, (result) => {
        const notes = result.notes;
        notes.push(note);
        chrome.storage.local.set({ notes: notes }, () => {
          console.log('Note saved');
        });
      });
    }
  });
  