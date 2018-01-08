import { Component, createElement } from "react";
import { findDOMNode } from "react-dom";
import { Alert, AlertProps } from "./Alert";
import { EnumButton } from "./EnumButton";
import * as classNames from "classnames";
import "../ui/EnumSwitch.scss";

export interface EnumSwitchProps {
    alertMessage?: string;
    enumList: { key: string, caption: string }[];
    enumAttributeValue: string;
    onClickAction: (caption: string) => void;
    status: SwitchStatus;
    bootstrapStyle: BootstrapStyle;
}

export type SwitchStatus = "enabled" | "disabled" | "no-context";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumSwitch extends Component<EnumSwitchProps> {
    private ButtonNode: HTMLButtonElement;
    private activeSpanNode: HTMLSpanElement;
    private widgetContainerNode: HTMLDivElement;

    constructor(props: EnumSwitchProps) {
        super(props);

        this.enumToggleSlider = this.enumToggleSlider.bind(this);
        this.createSpan = this.createSpan.bind(this);
        this.getButtonNodeRef = this.getButtonNodeRef.bind(this);
        this.getActiveSpanNodeRef = this.getActiveSpanNodeRef.bind(this);
        this.WidgetContainerNodeRef = this.WidgetContainerNodeRef.bind(this);
    }
    render() {
        // tslint:disable-next-line:no-object-literal-type-assertion
        const msgAlert = createElement(Alert, { message: this.props.alertMessage } as AlertProps);

        if (this.props.status === "enabled" || this.props.status === "disabled")
            return createElement("div", {}, createElement("div", {
                className: classNames("widget-enum-switch", "form-control",
                    // tslint:disable-next-line:object-literal-key-quotes
                    { "disabled": this.props.status !== "enabled" }),
                ref: this.WidgetContainerNodeRef
            }, this.createSpan()), msgAlert);
        else
            return createElement("span", { className: "enum-switch noContext" });
    }

    private createSpan() {
        const btnElement: any[] = [];
        if (this.props.enumAttributeValue) {
            btnElement.push(createElement(EnumButton, {
                status: this.props.status,
                bootstrapStyle: this.props.bootstrapStyle,
                getButtonNode: this.getButtonNodeRef
            }));
        }
        this.props.enumList.forEach(elements => {
            const spanElements = createElement("span", {
                className: classNames("span-default", "span-responsive", {
                    // tslint:disable-next-line:object-literal-key-quotes
                    "active": this.props.enumAttributeValue === elements.caption,
                    // tslint:disable-next-line:object-literal-key-quotes
                    "disabled": this.props.status === "disabled"
                }),
                onClick: () => this.props.onClickAction(elements.caption),
                ref: this.props.enumAttributeValue === elements.caption ? this.getActiveSpanNodeRef : ""
            }, elements.caption);
            btnElement.push(spanElements);
        });

        return btnElement;
    }

    private getButtonNodeRef(node: HTMLButtonElement) {
            this.ButtonNode = node;
    }

    private getActiveSpanNodeRef(node: HTMLSpanElement) {
            this.activeSpanNode = node;
    }

    private WidgetContainerNodeRef(node: HTMLDivElement) {
        this.widgetContainerNode = node;
    }

    private enumToggleSlider() {
        const widgetContainer = this.widgetContainerNode;
        const activeSpan = this.activeSpanNode;
        const enumToggle = this.ButtonNode;

        if (enumToggle && widgetContainer) {
            if (activeSpan) {
                const activeSpanClient = activeSpan.getBoundingClientRect();
                const spanPosition = (activeSpanClient.left - widgetContainer.getBoundingClientRect().left);
                enumToggle.style.visibility = "visible";
                enumToggle.style.transform = `translate3d(${spanPosition}px,0px, 0px)`;
                enumToggle.style.width = activeSpanClient.width + "px";
                enumToggle.style.height = activeSpanClient.height + "px";
            } else {
                enumToggle.style.visibility = "hidden";
            }
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.enumToggleSlider);
    }

    componentDidUpdate() {
        if (this.props.status !== "no-context") {
            this.enumToggleSlider();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.enumToggleSlider);
    }
}
