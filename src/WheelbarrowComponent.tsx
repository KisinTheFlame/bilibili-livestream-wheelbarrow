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
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeVisibility = () => {
        this.setState({visual: !this.state.visual});
    }

    render() {
        return (
            <span>
                <EntryButton
                    textArea={this.props.textArea}
                    sendButton={this.props.sendButton}
                    changeVisibility={this.changeVisibility}/>
                <ControlPanel
                    textArea={this.props.textArea}
                    sendButton={this.props.sendButton}
                    display={this.state.visual ? "flex" : "none"}/>
            </span>
        );
    }
}
