document.getElementById('applyTheme').addEventListener('click', () => {
    const bgColor = document.getElementById('bgColor').value;
    const fontColor = document.getElementById('fontColor').value;
    const fontFamily = document.getElementById('fontFamily').value;
    
    chrome.storage.sync.set({ bgColor, fontColor, fontFamily }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: applyCustomStyles
        });
      });
    });
  });
  
  function applyCustomStyles() {
    chrome.storage.sync.get(['bgColor', 'fontColor', 'fontFamily'], (data) => {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        body {
          background-color: ${data.bgColor || '#2c3e50'} !important;
          color: ${data.fontColor || '#ecf0f1'} !important;
          font-family: ${data.fontFamily || 'Arial, sans-serif'} !important;
        }
        #header, #masthead-container, #ytd-masthead, #ytd-searchbox , ytd-app {
          background-color: ${data.bgColor || '#34495e'} !important;
        }
        #guide-content, #guide-inner-content {
          background-color: ${data.bgColor || '#2c3e50'} !important;
        }
        a, ytd-guide-entry-renderer {
          color: ${data.fontColor || '#ecf0f1'} !important;
        }
        #comments #content-text {
          color: ${data.fontColor || '#3498db'} !important;
        }
      `;
      document.head.appendChild(styleElement);
    });
  }
  