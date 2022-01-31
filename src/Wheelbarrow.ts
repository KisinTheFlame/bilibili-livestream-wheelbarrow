(function () {
    "use strict";

    let isRunning: boolean = false;
    let handler: number | null = null;

    function createWheelBarrowButton(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ) {
        const button = document.createElement("button");
        button.classList.add("icon-item", "icon-font");
        button.textContent = "独轮车";
        button.onclick = () => {
            handleClick(textArea, sendButton)
        };
        return button;
    }

    function send(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement,
        s: string
    ): void {
        textArea.value = s;
        textArea.dispatchEvent(new InputEvent("input"));
        setTimeout(() => {
            sendButton.click();
        }, 50);
    }

    function getElements(): [
            HTMLTextAreaElement | null,
            HTMLButtonElement | null,
            HTMLDivElement | null
    ] {
        const panel: HTMLElement | null = document.getElementById("chat-control-panel-vm");
        if (panel === null) return [null, null, null];
        const textArea: HTMLTextAreaElement | null = panel.getElementsByTagName("textarea")[0];
        const sendButton: HTMLButtonElement | null = document.querySelector(".bl-button");
        const toolbar: HTMLDivElement | null = document.querySelector(".icon-left-part");
        return [textArea, sendButton, toolbar];
    }

    function handleClick(textArea: HTMLTextAreaElement, sendButton: HTMLButtonElement): void {
        if (!isRunning) {
            const strings: String | null = prompt("输入你要发送的独轮车，各句间用英文逗号分隔。");
            if (strings === null) {
                return;
            }
            const stringArray = strings!.split(",");
            let i = 0;
            handler = setInterval(() => {
                send(textArea, sendButton, stringArray[i]);
                console.log("Sent: " + stringArray[i]);
                i++;
                if (i == stringArray.length) {
                    i = 0;
                }
            }, 2000);
            isRunning = true;
        } else {
            window.clearInterval(handler!);
            isRunning = false;
            alert("已取消");
        }
    }

    let textArea: HTMLTextAreaElement | null = null;
    let sendButton: HTMLButtonElement | null = null;
    let toolbar: HTMLDivElement | null = null;
    let getElementsHandler: number = setInterval(() => {
        [textArea, sendButton, toolbar] = getElements();
        if (
            textArea !== null &&
            sendButton !== null &&
            toolbar !== null
        ) {
            window.clearInterval(getElementsHandler);
            // @ts-ignore
            toolbar.appendChild(createWheelBarrowButton(textArea, sendButton));
        }
    }, 500);
})();
