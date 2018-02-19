import { Component, createElement } from "react";

import { EnumSwitch, EnumSwitchProps, EnumSwitchState } from "./components/EnumSwitch";
import { EnumContainerProps } from "./components/EnumSwitchContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<EnumContainerProps, EnumSwitchState> {
    render() {
        return createElement(EnumSwitch as any, preview.transformProps(this.props));
    }

    private static transformProps(props: EnumContainerProps): EnumSwitchProps {
        return {
            enumList: [
                { key: "Salami", caption: "Salami" },
                { key: "Chicken", caption: "Chicken" },
                { key: "Peperoni", caption: "Peperoni" }
            ],
            enumAttributeValue: "chicken",
            onClickAction: () => { return; },
            status: props.editable === "default" ? "enabled" : "disabled",
            bootstrapStyle: props.bootstrapStyle
        };
    }
}

export function getPreviewCss() {
    return require("./ui/EnumSwitch.scss");
}
