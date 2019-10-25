// CHROME APIs...
// -----------------
var settings = {
	on: true,
	setting1: 1.04,
	setting2: true
}

getSetting();
RegisterEvents();

function RegisterEvents() {
	chrome.runtime.onInstalled.addListener(function (details) {
		switch (details.reason) {
			case 'install':
				break;
			case 'update':
				break;
		}
	});
}

// COMMUNICATION FRAMEWORK (BETWEEN BACKGROUND PAGE AND CONTENT SCRIPT)
// --------------------------------------------------------------------
function SendMessageToContentScript(messageDetails) {
	chrome.tabs.query({}, function (tabs) {
		for (var i = 0; i < tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, messageDetails);
		}
	});
}

function SendMessageToTabContentScript(tabId, messageDetails) {
	chrome.tabs.sendMessage(tabId, messageDetails, function (response) { });
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		switch (request.type) {
			case 'DummyMessageFromPopup':
				console.log('In background.js, dummy message recieved with data: ' + request.someData);
				break;
		}
	});
// END - SERVER COMMUNICATIONS ----


// USEFUL FUNCTIONS
// ------------------

function storeSetting() {
	chrome.storage.sync.set({ settingKey: settings }, null);
}

function getSetting() {
	chrome.storage.sync.get('settingKey', function (items) {
		settings = items.settingKey ? items.settingKey : settings;
	});
}


chrome.contextMenus.create({
	title: "Add a reminder",
	contexts: ["page"], 
	onclick: searchUrbanDict
});

function addReminder() {
	alert('reminder set');
}

