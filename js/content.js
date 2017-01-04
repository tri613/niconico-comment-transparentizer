(function() {
	const wrap = document.querySelector('.VideoContainer .CommentRenderer');
	let opacity = 1;
	restoreOptions();

	function setCommentOpacity(opacity) {
		wrap.style.opacity = opacity;
	}

	function restoreOptions() {
		chrome.storage.sync.get({
		    defaultOpacity: 0.5,
		}, function(items) {
		    opacity = items.defaultOpacity;
			setCommentOpacity(opacity);
		});
	}

	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	  	if ((msg.from === 'popup') && (msg.action === 'changeOpacity')) {
			setCommentOpacity(msg.opacity);
			opacity = msg.opacity;
	  	} else if ((msg.from === 'popup') && (msg.action === 'getCurrentOpacity')) {
	  		sendResponse({opacity: opacity});
		}
	});
})();

