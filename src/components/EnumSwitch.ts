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

export interface EnumSwitchState {
    position?: number;
    width?: string;
    height?: string;
    visibility?: string;
}

export type SwitchStatus = "enabled" | "disabled" | "noContext";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumSwitch extends Component<EnumSwitchProps, EnumSwitchState> {
    private ButtonNode: HTMLButtonElement;
    private activeSpanNode: HTMLSpanElement;
    private widgetContainerNode: HTMLDivElement;

    constructor(props: EnumSwitchProps) {
        super(props);

        this.state = {
            position: 0,
            width: "",
            height: "",
            visibility: ""
        };
        this.enumToggleSlider = this.enumToggleSlider.bind(this);
        this.createSpan = this.createSpan.bind(this);
        this.getActiveSpanNodeRef = this.getActiveSpanNodeRef.bind(this);
        this.WidgetContainerNodeRef = this.WidgetContainerNodeRef.bind(this);
        this.registerEvents = this.registerEvents.bind(this);
        this.removeEvents = this.removeEvents.bind(this);
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
                position: this.state.position,
                visibility: this.state.visibility,
                width: this.state.width,
                height: this.state.height
            }));
            this.registerEvents();
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

    private getActiveSpanNodeRef(node: HTMLSpanElement) {
        this.activeSpanNode = node;
    }

    private WidgetContainerNodeRef(node: HTMLDivElement) {
        this.widgetContainerNode = node;
    }

    private enumToggleSlider() {
        const widgetContainer = this.widgetContainerNode;
        const activeSpan = this.activeSpanNode;

        if (widgetContainer) {
            if (activeSpan) {
                const activeSpanClient = activeSpan.getBoundingClientRect();
                this.setState({
                    visibility: "visible",
                    position: activeSpanClient.left - widgetContainer.getBoundingClientRect().left,
                    width: activeSpanClient.width + "px",
                    height: activeSpanClient.height + "px"
                });
            } else {
                this.setState({ visibility: "hidden" });
            }
        }
    }

    componentDidUpdate(prevProps: EnumSwitchProps, prevState: EnumSwitchState) {
        if (prevProps.enumAttributeValue !== this.props.enumAttributeValue) {
            this.enumToggleSlider();
        }
    }

    componentWillUnmount() {
        this.removeEvents();
    }

    private registerEvents() {
        window.addEventListener("resize", this.enumToggleSlider);
    }

    private removeEvents() {
        window.removeEventListener("resize", this.enumToggleSlider);
    }
}
