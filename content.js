let selectedText = '';
document.addEventListener('mouseup', () => {
  selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: 'textSelected', text: selectedText });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'highlightText') {
    const span = document.createElement('span');
    span.style.backgroundColor = message.color;
    span.textContent = selectedText;
    document.execCommand('insertHTML', false, span.outerHTML);
    sendResponse({ success: true });
  }
});

// Retrieve and display stored notes
chrome.storage.local.get({ notes: [] }, (result) => {
    const notes = result.notes;
    const notesContainer = document.createElement('div');
    notesContainer.id = 'notesContainer';
    document.body.appendChild(notesContainer);
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = note;
      notesContainer.appendChild(noteElement);
    });
  });
  
  // Listen for the message to add a new note
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addNote') {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(message.note);
      localStorage.setItem('notes', JSON.stringify(notes));
      alert('Note added: ' + message.note);
    }
  });
  