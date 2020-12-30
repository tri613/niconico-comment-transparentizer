(function () {
  document.addEventListener('DOMContentLoaded', (e) => {
    const input = document.querySelector('[name="opacity"]');
    const currentOpacity = document.querySelector('#current-opacity');

    function askCurrentOpacity() {
      const callback = function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            from: 'popup',
            action: 'getCurrentOpacity',
          },
          (response) => {
            setInputValue(response.opacity);
            showCurrentOpacity(response.opacity);
          }
        );
      };
      getActiveTab(callback);
    }

    function setInputValue(opacity) {
      input.value = opacity * 100;
    }

    function showCurrentOpacity(opacity) {
      currentOpacity.innerText = opacity;
    }

    function changeOpacity(e) {
      const opacity = this.value / 100;
      showCurrentOpacity(opacity);
      sendToActiveTab(opacity);
    }

    function sendToActiveTab(opacity) {
      const callback = function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: 'popup',
          action: 'changeOpacity',
          opacity: opacity,
        });
      };
      getActiveTab(callback);
    }

    function getActiveTab(callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
        callback(tabs)
      );
    }

    input.addEventListener('change', changeOpacity);
    input.addEventListener('mousemove', changeOpacity);
    askCurrentOpacity();
  });
})();
