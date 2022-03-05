import * as React from "react";
import {render} from "react-dom";
import {ControlPanel} from "./ControlPanel";
import {Button} from "@geist-ui/core";

(function () {
    "use strict";

    interface WheelbarrowButtonProps {
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement,
        changeVisibility: () => void
    }

    interface WheelbarrowButtonState {

    }

    class WheelbarrowButton extends React.Component<WheelbarrowButtonProps, WheelbarrowButtonState> {
        render() {
            return (
                <Button onClick={() => this.props.changeVisibility()} auto scale={0.5}>
                    独轮车
                </Button>
            );
        }
    }

    interface WheelbarrowComponentProps {
        textArea: HTMLTextAreaElement,
        sendButton: HTMLButtonElement,
    }

    interface WheelbarrowComponentState {
        visual: boolean
    }

    class WheelbarrowComponent extends React.Component<WheelbarrowComponentProps, WheelbarrowComponentState> {
        constructor(props) {
            super(props);
            this.state = {visual: false};
            this.changeVisibility = this.changeVisibility.bind(this);
        }

        changeVisibility() {
            this.setState({visual: !this.state.visual});
        }

        render() {
            const visual = this.state.visual;
            return (
                <span>
                    <WheelbarrowButton textArea={textArea} sendButton={sendButton}
                                       changeVisibility={this.changeVisibility}/>
                    <ControlPanel textArea={textArea} sendButton={sendButton} display={visual ? "flex" : "none"}/>
                </span>
            );
        }
    }

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
            toolbar.appendChild(Wheelbarrow(textArea, sendButton));
        }
    }, 500);
})();
