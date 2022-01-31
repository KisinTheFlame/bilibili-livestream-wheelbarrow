(function () {
    "use strict";

    let isRunning: boolean = false;
    let handler: number | null = null;

    function createControlPanel(): HTMLDivElement {

        function createItem(s: string): HTMLDivElement {
            const item: HTMLDivElement = document.createElement("div");
            item.style.width = "100%";
            item.innerText = s;
            return item;
        }

        function createItemListContainer(): HTMLDivElement {
            const itemListContainer: HTMLDivElement = document.createElement("div");
            itemListContainer.style.width = "100%";
            itemListContainer.style.maxHeight = "600px";
            return itemListContainer;
        }

        function createFunctionBar(): HTMLDivElement {
            const functionBar: HTMLDivElement = document.createElement("div");
            functionBar.style.width = "100%";

            const line1: HTMLDivElement = document.createElement("div");
            line1.style.width = "100%";
            const addButton: HTMLButtonElement = document.createElement("button");
            addButton.style.width = "50%";
            addButton.textContent = "+"
            const deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.style.width = "50%";
            deleteButton.textContent = "-";
            line1.appendChild(addButton);
            line1.appendChild(deleteButton);

            const line2: HTMLDivElement = document.createElement("div");
            line2.style.width = "100%";
            const fileAddButton: HTMLButtonElement = document.createElement("button");
            fileAddButton.style.width = "33.3%";
            fileAddButton.textContent = "++";
            const allDeleteButton: HTMLButtonElement = document.createElement("button");
            allDeleteButton.style.width = "33.3%";
            allDeleteButton.textContent = "--";
            const helpButton: HTMLButtonElement = document.createElement("button");
            helpButton.style.width = "33.3%";
            helpButton.textContent = "help";
            line2.appendChild(fileAddButton);
            line2.appendChild(allDeleteButton);
            line2.appendChild(helpButton);

            functionBar.appendChild(line1);
            functionBar.appendChild(line2);
            return functionBar;
        }

        function createControlButton(): HTMLButtonElement {
            const controlButton: HTMLButtonElement = document.createElement("button");
            controlButton.style.width = "100%";
            controlButton.textContent = "Start";
            return controlButton;
        }

        const controlPanel: HTMLDivElement = document.createElement("div");
        // controlPanel.style.display = "none";
        controlPanel.style.width = "200px";
        controlPanel.style.position = "absolute";
        controlPanel.style.bottom = "100%";
        controlPanel.style.left = "50%";
        controlPanel.style.transform = "translateX(-50%)";
        controlPanel.appendChild(createItemListContainer());
        controlPanel.appendChild(createFunctionBar());
        controlPanel.appendChild(createControlButton());
        return controlPanel;
    }

    function createWheelbarrowButton(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ) {
        const button: HTMLButtonElement = document.createElement("button");
        button.textContent = "独轮车";
        button.onclick = () => {
            handleClick(textArea, sendButton)
        };
        return button;
    }

    function createWheelbarrowComponent(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ): HTMLSpanElement {
        const container: HTMLSpanElement = document.createElement("span");
        container.classList.add("icon-item", "icon-font");
        container.appendChild(createWheelbarrowButton(textArea, sendButton));
        container.appendChild(createControlPanel());
        return container;
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

    function handleClick(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ): void {
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
            toolbar.appendChild(createWheelbarrowComponent(textArea, sendButton));
        }
    }, 500);
})();
