import { Component, createElement } from "react";
import * as classNames from "classnames";

import { EnumSwitch, EnumSwitchProps } from "./components/EnumSwitch";
import EnumSwitchContainer, { EnumContainerProps } from "./components/EnumSwitchContainer";

export class Preview extends Component<EnumContainerProps, {}> {
    render() {
        return createElement(EnumSwitch, Preview.transformProps(this.props));
    }

    private static transformProps(props: EnumContainerProps): EnumSwitchProps {
        return {
            enumList: [ { key: "Salami", caption: "Salami" }, { key: "chicken", caption: "chicken" },
            { key: "Peperoni", caption: "Peperoni" } ],
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
