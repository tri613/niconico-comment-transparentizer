(function () {
  let debounceSaveTimer;

  document.addEventListener('DOMContentLoaded', (e) => {
    const input = document.querySelector('[name="opacity"]');
    const currentOpacity = document.querySelector('#current-opacity');

    input.addEventListener('input', changeOpacity);
    restoreOptions();

    function changeOpacity(e) {
      const opacity = e.target.value / 100;
      showCurrentOpacity(opacity);
      sendToTabs(opacity);
      saveOptions(opacity);
    }

    function restoreOptions() {
      chrome.storage.sync.get(
        {
          defaultOpacity: 0.5,
        },
        function ({ defaultOpacity }) {
          setInputValue(defaultOpacity);
          showCurrentOpacity(defaultOpacity);
        }
      );
    }

    function saveOptions(opacity) {
      if (debounceSaveTimer) {
        clearTimeout(debounceSaveTimer);
      }

      debounceSaveTimer = setTimeout(() => {
        chrome.storage.sync.set({
          defaultOpacity: opacity,
        });
      }, 800);
    }

    function setInputValue(opacity) {
      input.value = opacity * 100;
    }

    function showCurrentOpacity(opacity) {
      currentOpacity.innerText = opacity;
    }

    function sendToTabs(opacity) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {
            from: 'popup',
            action: 'changeOpacity',
            opacity: opacity,
          });
        });
      });
    }
  });
})();
