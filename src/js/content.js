(function () {
  const wrap = document.querySelector('.VideoContainer .CommentRenderer');
  restoreOptions();

  function restoreOptions() {
    chrome.storage.sync.get(
      {
        defaultOpacity: 0.5,
      },
      function (items) {
        setCommentOpacity(items.defaultOpacity);
      }
    );
  }

  function setCommentOpacity(opacity) {
    wrap.style.opacity = opacity;
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.from === 'popup' && msg.action === 'changeOpacity') {
      setCommentOpacity(msg.opacity);
    }
  });
})();
