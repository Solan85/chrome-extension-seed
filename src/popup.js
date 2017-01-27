var settings = {
}

this.SendMessageToBackgroundJs({
    type: 'DummyMessageFromPopup',
    someData: 'abra ka dabra'
}, undefined);


// COMMUNICATION TO background.JS
function SendMessageToBackgroundJs(message, callback) {
    chrome.runtime.sendMessage(message, callback);
}
