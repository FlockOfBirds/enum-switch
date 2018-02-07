import { Component, createElement } from "react";
import * as classNames from "classnames";

export interface EnumButtonProps {
    status: SwitchStatus;
    bootstrapStyle: BootstrapStyle;
    visibility?: "visible" | "hidden";
    position?: number;
    width?: number;
    height?: number;
}

export type SwitchStatus = "enabled" | "disabled" | "noContext";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumButton extends Component<EnumButtonProps> {
    render() {
        return createElement("button", {
            className: classNames("btn", `btn-${this.props.bootstrapStyle}`, "span-responsive",
                { disabled: this.props.status !== "enabled" }),
            style: {
                visibility: this.props.visibility,
                transform: `translate3d(${this.props.position}px, 0px, 0px)`,
                width: `${this.props.width}px`,
                height: `${this.props.height}px`
            }
        });
    }
}
