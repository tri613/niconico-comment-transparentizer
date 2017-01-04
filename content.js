(function() {
	const wrap = document.querySelector('.VideoContainer .CommentRenderer');
	wrap.style.opacity = 0.5;

	chrome.runtime.onMessage.addListener((msg, sender, response) => {
	  	if ((msg.from === 'popup') && (msg.action === 'changeOpacity')) {
			wrap.style.opacity = msg.opacity;
	  	}
	});
})();

