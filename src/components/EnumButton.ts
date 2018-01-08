import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface EnumButtonProps {
    status: SwitchStatus;
    bootstrapStyle: BootstrapStyle;
    getButtonNode?: (ref: HTMLButtonElement | null) => void;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumButton extends Component<EnumButtonProps> {
    render() {
        return createElement("button", {
            className: classNames("btn", `btn-${this.props.bootstrapStyle}`, "span-responsive",
                // tslint:disable-next-line:object-literal-key-quotes
                { "disabled": this.props.status !== "enabled" }),
            ref: this.props.getButtonNode
        });
    }
}
