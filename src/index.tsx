import * as React from "react";
import {render} from "react-dom";
import {WheelbarrowComponent} from "./WheelbarrowComponent";

(function () {
    "use strict";

    function Wheelbarrow(
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement
    ): Node {
        const container: HTMLSpanElement = document.createElement("span");
        container.classList.add("icon-item", "icon-font");
        render(
            <WheelbarrowComponent sendButton={sendButton} textArea={textArea}/>,
            container
        );
        return container;
    }

    function getElements(): [HTMLTextAreaElement | null, HTMLButtonElement | null, HTMLDivElement | null] {
        const panel: HTMLElement | null = document.getElementById("chat-control-panel-vm");
        if (panel === null) return [null, null, null];
        const textArea: HTMLTextAreaElement | null = panel.getElementsByTagName("textarea")[0];
        const sendButton: HTMLButtonElement | null = document.querySelector(".bl-button");
        const toolbar: HTMLDivElement | null = document.querySelector(".icon-left-part");
        return [textArea, sendButton, toolbar];
    }

    let textArea: HTMLTextAreaElement | null = null;
    let sendButton: HTMLButtonElement | null = null;
    let toolbar: HTMLDivElement | null = null;
    const getElementsHandler: number = window.setInterval(() => {
        [textArea, sendButton, toolbar] = getElements();
        if (
            textArea !== null &&
            sendButton !== null &&
            toolbar !== null
        ) {
            window.clearInterval(getElementsHandler);
            toolbar.appendChild(Wheelbarrow(textArea, sendButton));
        }
    }, 500);
})();
