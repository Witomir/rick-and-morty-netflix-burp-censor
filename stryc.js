chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.scriptOptions && request.scriptOptions.imageUrl){
		}
        alert("clicked");
});