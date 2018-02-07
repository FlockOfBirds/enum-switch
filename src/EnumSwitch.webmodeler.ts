import { Component, createElement } from "react";

import { EnumSwitch, EnumSwitchProps } from "./components/EnumSwitch";
import { EnumContainerProps } from "./components/EnumSwitchContainer";

// tslint:disable-next-line class-name
export class preview extends Component<EnumContainerProps> {
    render() {
        return createElement(EnumSwitch as any, preview.transformProps(this.props));
    }

    private static transformProps(props: EnumContainerProps): EnumSwitchProps {
        return {
            enumList: [
                { key: "Salami", caption: "Salami" },
                { key: "chicken", caption: "chicken" },
                { key: "Peperoni", caption: "Peperoni" }
            ],
            enumAttributeValue: "chicken",
            onClickAction: () => { return; },
            status: props.editable === "default" ? "enabled" : "disabled",
            bootstrapStyle: props.bootstrapStyle
        };
    }
}

export function getpreviewCss() {
    return require("./ui/EnumSwitch.scss");
}
