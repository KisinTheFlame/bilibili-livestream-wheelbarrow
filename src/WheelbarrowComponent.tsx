import * as React from "react";
import {EntryButton} from "./EntryButton";
import {ControlPanel} from "./ControlPanel";

interface WheelbarrowComponentProps {
    textArea: HTMLTextAreaElement,
    sendButton: HTMLButtonElement,
}

interface WheelbarrowComponentState {
    visual: boolean
}

export class WheelbarrowComponent extends React.Component<WheelbarrowComponentProps, WheelbarrowComponentState> {
    constructor(props) {
        super(props);
        this.state = {visual: false};
    }

    changeVisibility = () => {
        this.setState({visual: !this.state.visual});
    };

    send = (s: string) => {
        this.props.textArea.value = s;
        this.props.textArea.dispatchEvent(new InputEvent("input"));
        setTimeout(() => {
            this.props.sendButton.click();
        }, 50);
    }


    render() {
        return (
            <span>
                <EntryButton
                    changeVisibility={this.changeVisibility}
                />
                <ControlPanel
                    display={this.state.visual ? "flex" : "none"}
                    send={this.send}
                />
            </span>
        );
    }
}
