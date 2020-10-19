console.log('load app.js');

var data = {
    message:{
        type: "get-actions"
    }
};
chrome.runtime.sendMessage(config.extension_id, data, function(response) {
    console.log('sendMessage', response);
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('sender, request', sender, request);
});