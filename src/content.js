var settings = {};

// Communication Interface ---------------------
function SendToBackgroundJs(anything) {
    chrome.runtime.sendMessage(anything, function (response) { });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case "DummyMessage":
                console.log('ContentJS: Dummy message received ');
                console.log(request.someData);
                break;
        });
// ---------------------------------------
