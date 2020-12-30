(function () {
  const opacityInput = document.querySelector('[name="default-opacity"]');
  const currentOpacityHolder = document.querySelector('#current-opacity');
  const body = document.querySelector('body');
  const form = document.querySelector('#options');
  const status = document.getElementById('status');

  function saveOptions(e) {
    e.preventDefault();
    const opacity = opacityInput.value / 100;
    chrome.storage.sync.set(
      {
        defaultOpacity: opacity,
      },
      function () {
        status.textContent = 'Options saved.';
        setTimeout(function () {
          status.textContent = '';
        }, 750);
      }
    );
  }

  function restoreOptions() {
    chrome.storage.sync.get(
      {
        defaultOpacity: 0.5,
      },
      function (items) {
        opacityInput.value = items.defaultOpacity * 100;
        displayOpacityValue(items.defaultOpacity);
      }
    );
  }

  function opacityChangeHandler(e) {
    const opacity = opacityInput.value / 100;
    displayOpacityValue(opacity);
  }

  function displayOpacityValue(opacity) {
    currentOpacityHolder.textContent = opacity;
    body.style.backgroundColor = `rgba(86, 175, 145,${opacity})`;
  }

  form.addEventListener('submit', saveOptions);
  opacityInput.addEventListener('mousemove', opacityChangeHandler);
  opacityInput.addEventListener('change', opacityChangeHandler);
  restoreOptions();
})();
