export class Background {
    private _settings: any;

    private _runtime: any;
    private _tabs: any;
    private _storage: any;

    constructor(runtime: any, tabs: any, storage: any) {
        this._settings = {
            on: true,
            allowSomething: true,
            SomeOtherSetting: 1.1
        };

        this._runtime = runtime;
        this._tabs = tabs;
        this._storage = storage;
    };

    Initialize() {
        this._getSetting();
        this._RegisterEvents();
        this._RegisterMessageListeners();
    }

    private _RegisterEvents() {
        this._runtime.onInstalled.addListener(function (details) {
            switch (details.reason) {
                case 'install':
                    break;
                case 'update':
                    break;
            }
        });
    }

    private _SendMessageToContentScript(messageDetails) {
        this._tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; ++i) {
                this.tabs.sendMessage(tabs[i].id, messageDetails);
            }
        });
    }

    private _SendMessageToTabContentScript(tabId, messageDetails) {
        this._tabs.sendMessage(tabId, messageDetails, function (response) { });
    }

    private _RegisterMessageListeners() {
        this._runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
            switch (request.type) {
                case 'DummyMessageFromPopup':
                    alert('Background.js: >>> message recieved from Popup.js')
                    console.log(request.someData);
                    this._SendMessageToContentScript({
                        type: 'DummyMessage',
                        someData: request.someData
                    })
                    break;
            }
        });
    }

    private _storeSetting() {
        this._storage.sync.set({ settingKey: this._settings }, null);
    }

    private _getSetting() {
        this._storage.get('settingKey', function (items) {
            this._settings = items.settingKey ? items.settingKey : this.settings;
        });
    }
}

let bg: Background = new Background(chrome.runtime, chrome.tabs, chrome.storage);
bg.Initialize()