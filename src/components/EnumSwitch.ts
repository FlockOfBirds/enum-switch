import { Component, ReactElement, createElement } from "react";
import * as classNames from "classnames";

import { Alert } from "./Alert";
import { BootstrapStyle, EnumButton, SwitchStatus } from "./EnumButton";
import { EnumSpan } from "./EnumSpan";

import "../ui/EnumSwitch.scss";

export interface EnumSwitchProps {
    alertMessage?: string;
    enumList: { key: string, caption: string }[];
    enumAttributeValue: string;
    onClickAction: (caption?: string) => void;
    status: SwitchStatus;
    bootstrapStyle: BootstrapStyle;
}

export interface EnumSwitchState {
    position?: number;
    width?: number;
    height?: number;
    visibility?: "visible" | "hidden";
}

export class EnumSwitch extends Component<EnumSwitchProps, EnumSwitchState> {
    private activeSpanNode: HTMLSpanElement = document.createElement("span");
    private widgetContainerNode: HTMLDivElement = document.createElement("div");
    private eventHandle = 0;

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
        this.getContainerNodeRef = this.getContainerNodeRef.bind(this);
        this.throttleUpdate = this.throttleUpdate.bind(this);
    }

    render() {
        return createElement("div", { className: "form-validation" },
            createElement("div", {
                className: classNames("widget-enum-switch", "form-control",
                    {
                        disabled: this.props.status === "disabled",
                        noContext: this.props.status === "noContext"
                    }),
                ref: this.getContainerNodeRef
            }, this.createSpan()),
            createElement(Alert, { message: this.props.alertMessage || "", bootstrapStyle: "danger" })
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.throttleUpdate);
    }

    componentDidUpdate(prevProps: EnumSwitchProps) {
        if (this.props.status !== "noContext") {
            if (prevProps.enumAttributeValue !== this.props.enumAttributeValue ||
                (this.state.height !== this.widgetContainerNode.clientHeight && this.activeSpanNode)) {
                this.enumToggleSlider();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.throttleUpdate);
    }

    private throttleUpdate() {
        if (this.eventHandle) {
            window.clearTimeout(this.eventHandle);
        }
        this.eventHandle = window.setTimeout(() => {
            this.enumToggleSlider();
            this.eventHandle = 0;
        }, 50);
    }

    private createSpan(): ReactElement<{}>[] {
        const btnElement: ReactElement<any>[] = [];

        if (this.props.enumAttributeValue) {
            btnElement.push(createElement(EnumButton, {
                key: "enumButton",
                status: this.props.status,
                bootstrapStyle: this.props.bootstrapStyle,
                position: this.state.position,
                visibility: this.state.visibility,
                width: this.state.width,
                height: this.state.height
            }));
        }
        this.props.enumList.forEach((elements, index) => {
            btnElement.push(createElement(EnumSpan, {
                key: index,
                enumAttributeValue: this.props.enumAttributeValue,
                status: this.props.status,
                onClickAction: () => this.props.onClickAction(elements.caption),
                getActiveSpanNode: this.getActiveSpanNodeRef,
                caption: elements.caption
            }));
        });

        return btnElement;
    }

    private getActiveSpanNodeRef(node: HTMLSpanElement) {
        this.activeSpanNode = node;
    }

    private getContainerNodeRef(node: HTMLDivElement) {
        this.widgetContainerNode = node;
    }

    private enumToggleSlider() {
        const widgetContainer = this.widgetContainerNode;
        const activeSpan = this.activeSpanNode;

        if (widgetContainer && activeSpan) {
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
