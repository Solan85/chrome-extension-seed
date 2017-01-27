export class Content {
    private settings: any;
    private runtime: any;
    constructor(runtime: any) {
        this.runtime = runtime;
    }

    private SendToBackgroundJs(anything) {
        this.runtime.sendMessage(anything, function (response) { });
    }

    public Initialize() {
        this.RegisterMessageListener();
    }

    private RegisterMessageListener() {
        this.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                switch (request.type) {
                    case "DummyMessage":
                        console.log('ContentJS: Dummy message received from content script');
                        console.log(request.someData);
                        break;
                }
            });
    }
}

let content: Content = new Content(chrome.runtime);
content.Initialize();