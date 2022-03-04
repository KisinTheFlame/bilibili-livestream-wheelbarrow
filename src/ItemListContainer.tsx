import * as React from "react";

interface ItemListContainerProps {
}

interface ItemListContainerState {
}

export class ItemListContainer extends React.Component<ItemListContainerProps, ItemListContainerState> {
    render() {
        return (
            <div className={"item-list-container"} style={{width: "100%", maxHeight: "600px"}}>

            </div>
        );
    }
}
