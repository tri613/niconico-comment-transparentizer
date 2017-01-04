(function() {
	const opacityInput = document.querySelector('[name="default-opacity"]');
	const currentOpacityHolder =  document.querySelector("#current-opacity");
	const form = document.querySelector('#options');
    const status = document.getElementById('status');

	function saveOptions(e) {
		e.preventDefault();
		const opacity = opacityInput.value / 100;
		chrome.storage.sync.set({
		    defaultOpacity: opacity,
		}, function() {
		    status.textContent = 'Options saved.';
		    setTimeout(function() {
		      status.textContent = '';
		    }, 750);
		});
	}

	function restoreOptions() {
		chrome.storage.sync.get({
		    defaultOpacity: 0.5,
		}, function(items) {
		    opacityInput.value = items.defaultOpacity*100;
		    currentOpacityHolder.textContent = items.defaultOpacity;
		});
	}

	function showCurrentValue(e) {
		const opacity = opacityInput.value / 100;
	    currentOpacityHolder.textContent = opacity;
	}

	form.addEventListener('submit', saveOptions);
	opacityInput.addEventListener('mousemove', showCurrentValue);
	opacityInput.addEventListener('change', showCurrentValue);
	restoreOptions();
})();