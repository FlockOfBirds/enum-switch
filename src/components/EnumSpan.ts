import { Component, createElement } from "react";
import * as classNames from "classnames";

import { SwitchStatus } from "./EnumButton";

export interface EnumSpanProps {
   enumAttributeValue?: string;
   status?: SwitchStatus;
   onClickAction: (caption?: string) => void;
   getActiveSpanNode?: (ref: HTMLSpanElement) => void;
   caption?: string;
}

export class EnumSpan extends Component<EnumSpanProps> {
    render() {
        return createElement("span", {
            className: classNames("span-default", "span-responsive", {
                active: this.props.enumAttributeValue === this.props.caption,
                disabled: this.props.status === "disabled"
            }),
            onClick: this.props.onClickAction,
            ref: this.props.enumAttributeValue === this.props.caption ? this.props.getActiveSpanNode : ""
        }, this.props.caption);
    }
}
