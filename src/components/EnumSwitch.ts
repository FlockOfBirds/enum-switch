import { Component, createElement } from "react";
import { findDOMNode } from "react-dom";
import { Alert, AlertProps } from "./Alert";
import { EnumButton } from "./EnumButton";
import * as classNames from "classnames";

export interface EnumSwitchProps {
    alertMessage?: string;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumSwitch extends Component<EnumSwitchProps> {
    private ButtonNode: HTMLButtonElement;
    private activeSpanNode: HTMLSpanElement;
    private widgetContainerNode: HTMLDivElement;

    constructor(props: EnumSwitchProps) {
        super(props);
    }
    render() {
        // tslint:disable-next-line:no-object-literal-type-assertion
        return createElement(Alert, { message: this.props.alertMessage } as AlertProps);
    }

}
