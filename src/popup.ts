export class Popup {
    private settings: any;
    private runtime: any;

    constructor(runtime: any) {
        this.runtime = runtime;
    }

    public Initialize() {
        $('#msgToBck').click(this.msgToBckClicked);
    }

    private msgToBckClicked() {
        this.SendMessageToBackgroundJs({
            type: 'DummyMessageFromPopup',
            someData: 'abra ka dabra'
        }, undefined);
    }

    private SendMessageToBackgroundJs(message, callback) {
        this.runtime.sendMessage(message, callback);
    }
}

//bad workaround...
exports = {
    
};

let $ = $;
let popup: Popup = new Popup(chrome.runtime);
popup.Initialize();