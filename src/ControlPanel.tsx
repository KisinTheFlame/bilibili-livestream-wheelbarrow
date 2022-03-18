import * as React from "react";
import {Button, Textarea} from "@geist-ui/core";

function generateIntervalTime(size: number) {
    return Math.max(6000 / size, 1000) + 100;
}

interface ControlPanelProps {
    display: string,
    sendMessage: (string) => void;
}

interface ControlPanelState {
    isRunning: boolean,
    handler: number | null,
    text: string
}

export class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            handler: null,
            text: "",
        };
    }

    toggle = () => {
        if (!this.state.isRunning) {
            const messages = this.state.text.split("\n").filter((s) => s.length > 0);
            if (messages.length === 0) {
                return;
            }
            let index = 0;
            this.setState({
                handler: window.setInterval(() => {
                    this.props.sendMessage(messages[index]);
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
        const isRunning = this.state.isRunning;
        return (
            <div
                className={"control-panel"}
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
                    onKeyDown={(e) => {
                        if(e.ctrlKey && e.key === "Enter") {
                            this.toggle();
                        }
                    }}
                    height="300px"
                    placeholder="在此输入要发送的弹幕，一句一换行。Ctrl+Enter切换独轮车启停。"
                />
                <Button onClick={this.toggle}>{isRunning ? "Stop" : "Start"}</Button>
            </div>
        );
    }
}
