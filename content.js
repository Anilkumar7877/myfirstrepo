console.log('Cool Theme content script running.');

const applyCustomStyles = () => {
  chrome.storage.sync.get(['bgColor', 'fontColor', 'fontFamily'], (data) => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      body {
        background-color: ${data.bgColor || '#2b3e50'} !important;
        color: ${data.fontColor || '#ecf0f1'} !important;
        font-family: ${data.fontFamily || 'Arial, sans-serif'} !important;
      }
      #header, #masthead-container, ytd-masthead, #container, #page-manager, #header {
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
};

// Apply custom styles when the page is loaded
applyCustomStyles();

// Reapply styles when navigating within the site (e.g., AJAX navigation)
const observer = new MutationObserver(applyCustomStyles);
observer.observe(document.body, { childList: true, subtree: true });
