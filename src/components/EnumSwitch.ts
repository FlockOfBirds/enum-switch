import { Component, createElement } from "react";
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
    width?: number;
    height?: number;
    visibility?: "visible" | "hidden";
    color?: string;
}

export type SwitchStatus = "enabled" | "disabled" | "noContext";
export type BootstrapStyle = "default" | "info" | "primary" | "danger" | "success" | "warning";

export class EnumSwitch extends Component<EnumSwitchProps, EnumSwitchState> {
    private buttonNode: HTMLButtonElement;
    private activeSpanNode: HTMLSpanElement;
    private widgetContainerNode: HTMLDivElement;

    constructor(props: EnumSwitchProps) {
        super(props);

        this.state = {
            position: 0,
            width: 0,
            height: 0,
            visibility: "visible"
        };
        this.enumToggleSlider = this.enumToggleSlider.bind(this);
        this.createSpan = this.createSpan.bind(this);
        this.getActiveSpanNodeRef = this.getActiveSpanNodeRef.bind(this);
        this.WidgetContainerNodeRef = this.WidgetContainerNodeRef.bind(this);
        this.getButtonNodeRef = this.getButtonNodeRef.bind(this);
        this.registerEvents = this.registerEvents.bind(this);
        this.removeEvents = this.removeEvents.bind(this);
    }
    render() {
        if (this.props.status === "enabled" || this.props.status === "disabled") {
            return createElement("div", {},
                createElement("div", {
                    className: classNames("widget-enum-switch", "form-control",
                        { disabled: this.props.status !== "enabled" }),
                    ref: this.WidgetContainerNodeRef
                }, this.createSpan()),
                createElement(Alert, { message: this.props.alertMessage || "", bootstrapStyle: "danger" })
            );
        } else {
            return createElement("span", { className: "enum-switch noContext" });
        }
    }

    private createSpan() {
        const btnElement: any[] = [];
        if (this.props.enumAttributeValue) {
            btnElement.push(createElement(EnumButton, {
                status: this.props.status,
                bootstrapStyle: this.props.bootstrapStyle,
                getButtonNode: this.getButtonNodeRef,
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
                    active: this.props.enumAttributeValue === elements.caption,
                    disabled: this.props.status === "disabled"
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

    private getButtonNodeRef(node: HTMLButtonElement) {
        this.buttonNode = node;
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
                    width: activeSpanClient.width,
                    height: activeSpanClient.height
                });
            } else {
                this.setState({ visibility: "hidden" });
            }
        }
    }

    componentDidUpdate(prevProps: EnumSwitchProps, prevState: EnumSwitchState) {
        if (this.props.status !== "noContext") {
            if (prevProps.enumAttributeValue !== this.props.enumAttributeValue ||
                (this.state.height !== this.widgetContainerNode.clientHeight && this.activeSpanNode)) {
                this.enumToggleSlider();
            }
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
