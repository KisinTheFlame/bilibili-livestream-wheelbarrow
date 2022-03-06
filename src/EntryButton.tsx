import * as React from "react";
import {Button} from "@geist-ui/core";

interface EntryButtonProps {
    textArea: HTMLTextAreaElement,
    sendButton: HTMLButtonElement,
    changeVisibility: () => void
}

interface EntryButtonState {

}

export class EntryButton extends React.Component<EntryButtonProps, EntryButtonState> {
    render() {
        return (
            <Button onClick={() => this.props.changeVisibility()} auto scale={0.5}>
                独轮车
            </Button>
        );
    }
}
