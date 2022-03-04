import * as React from "react";
import {render} from "react-dom";
import {createControlPanel} from "./ControlPanel";

(function () {
    "use strict";

    let isRunning: boolean = false;
    let handler: number | null = null;

    function createWheelbarrowButton(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ): JSX.Element {
        return (
            <button onClick={() => handleClick(textArea, sendButton)}>
                独轮车
            </button>
        );
    }

    function createWheelbarrowComponent(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ): Node {
        const container: HTMLSpanElement = document.createElement("span");
        container.classList.add("icon-item", "icon-font");
        render([createWheelbarrowButton(textArea, sendButton), createControlPanel()], container);
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

        function generateIntervalTime(size: number) {
            if (size < 4) return 5000;
            if (size < 8) return 1600;
            return 1000;
        }

        if (!isRunning) {
            const strings: String | null = prompt("输入你要发送的独轮车，各句间用英文逗号分隔。");
            if (strings === null) {
                return;
            }
            const stringArray = strings!.split(",");
            let i = 0;
            handler = window.setInterval(() => {
                send(textArea, sendButton, stringArray[i]);
                console.log("Sent: " + stringArray[i]);
                i++;
                if (i == stringArray.length) {
                    i = 0;
                }
            }, generateIntervalTime(stringArray.length));
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
    let getElementsHandler: number = window.setInterval(() => {
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
