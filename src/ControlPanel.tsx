import * as React from "react";
import {ItemListContainer} from "./ItemListContainer";

export function createControlPanel(): JSX.Element {

    function createItem(s: string): JSX.Element {
        // const item: HTMLDivElement = document.createElement("div");
        // item.style.width = "100%";
        // item.innerText = s;
        // return item;
        return (
            <div style={{width: "100%"}}>
                {s}
            </div>
        );
    }

    function createFunctionBar(): JSX.Element {
        return (
            <div className={"function-bar"} style={{width: "100%"}}>
                <div style={{width: "100%"}}>
                    <button className={"add-button"} style={{width: "50%"}}>+</button>
                    <button className={"delete-button"} style={{width: "50%"}}>-</button>
                </div>
                <div>
                    <button style={{width: "33.3%"}}>++</button>
                    <button style={{width: "33.3%"}}>--</button>
                    <button style={{width: "33.3%"}}>Help</button>
                </div>
            </div>
        );
    }

    function createControlButton(): JSX.Element {
        // const controlButton: HTMLButtonElement = document.createElement("button");
        // controlButton.style.width = "100%";
        // controlButton.textContent = "Start";
        // return controlButton;
        return (
            <button className={"control-button"} style={{width: "100%"}}>Start</button>
        );
    }

    return (
        <div className={"control-panel"}
             style={{
                 display: "none",
                 width: "200px",
                 position: "absolute",
                 bottom: "calc(100% + 70px)",
                 left: "50%",
                 transform: "translateX(-50%)",
                 backgroundColor: "#FFFFFF",
             }}
        >
            <ItemListContainer />
            {createFunctionBar()}
            {createControlButton()}
        </div>
    );
}
