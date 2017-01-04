(function() {
	document.addEventListener('DOMContentLoaded', (e) => {
		const input = document.querySelector('[name="opacity"]');
		const currentOpacity = document.querySelector('#current-opacity');

		function changeOpacity(e) {
			const opacity = this.value / 100;
			currentOpacity.innerText = opacity;
			sendToActiveTab(opacity);
		}

		function sendToActiveTab(opacity) {
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			    chrome.tabs.sendMessage(tabs[0].id, {
			    	from: "popup",
			    	action: "changeOpacity",
			    	opacity: opacity
			    });
			});
		}

		input.addEventListener('change', changeOpacity);
		input.addEventListener('mousemove', changeOpacity);
	});
})();