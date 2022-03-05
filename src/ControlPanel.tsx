import * as React from "react";
import {Button, Textarea} from "@geist-ui/core";

function generateIntervalTime(size: number) {
    if (size < 4) return 5000;
    if (size < 8) return 1600;
    return 1000;
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

interface ControlPanelProps {
    textArea: HTMLTextAreaElement,
    sendButton: HTMLButtonElement,
    display: string
}

interface ControlPanelState {
    isRunning: boolean,
    handler: number | null,
    text: string
}

export class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
    constructor(props) {
        super(props);
        this.setState({
            isRunning: false,
            handler: null,
            text: "",
        });
    }

    handleClick() {
        if (!this.state.isRunning) {
            const messages = this.state.text.split("\n").filter((s) => s.length > 0);
            if (messages.length === 0) {
                return;
            }
            if (messages.some((s) => s.length > 20)) {
                return;
            }
            let index = 0;
            this.setState({
                handler: window.setInterval(() => {
                    send(this.props.textArea, this.props.sendButton, messages[index]);
                    console.log("Sent: " + messages[index]);
                    index++;
                    if (index === messages.length) {
                        index = 0;
                    }
                }, generateIntervalTime(messages.length))
            });
            this.setState({isRunning: true});
        } else {
            window.clearInterval(this.state.handler);
            this.setState({handler: null});
            this.setState({isRunning: false});
        }
    }

    render() {
        return (
            <div className={"control-panel"}
                 style={{
                     display: this.props.display,
                     flexDirection: "column",
                     width: "300px",
                     position: "absolute",
                     bottom: "calc(100% + 70px)",
                     left: "50%",
                     transform: "translateX(-50%)",
                     backgroundColor: "#FFFFFF",
                 }}
            >
                <Textarea
                    onChange={(e) => {
                        this.setState({text: e.target.value});
                    }}
                    height="300px"
                />
                <Button onClick={() => this.handleClick()}>Start/Stop</Button>
            </div>
        );
    }
}
