import { Component, createElement } from "react";

import { EnumSwitch } from "./EnumSwitch";
import { BootstrapStyle, SwitchStatus } from "./EnumButton";
import { ValidateConfigs } from "../utils/ValidateConfigs";

interface WrapperProps {
    class: string;
    mxObject: mendix.lib.MxObject;
    readOnly?: boolean;
}

export interface EnumContainerProps extends WrapperProps {
    name: string;
    editable: "default" | "never";
    collection: { exclude: string }[];
    bootstrapStyle: BootstrapStyle;
    onChangeMicroflow: string;
    page: string;
}

interface EnumContainerState {
    alertMessage?: string;
    enumAttributeValue: string;
    enumList: { key: string, caption: string }[];
}

export default class EnumSwitchContainer extends Component<EnumContainerProps, EnumContainerState> {
    private subscriptionHandles: number[] = [];

    constructor(props: EnumContainerProps) {
        super(props);

        this.state = {
            alertMessage: "",
            enumAttributeValue: "",
            enumList: []
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.getEnumValues = this.getEnumValues.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
    }

    render() {
        return createElement(EnumSwitch as any, {
            alertMessage: this.state.alertMessage,
            enumList: this.state.enumList,
            enumAttributeValue: this.state.enumAttributeValue,
            onClickAction: this.handleToggle,
            bootstrapStyle: this.props.bootstrapStyle,
            status: this.getSwitchStatus(!this.isReadOnly())
        });
    }

    componentWillReceiveProps(newProps: EnumContainerProps) {
        if (newProps.mxObject) {
            this.resetSubscriptions(newProps.mxObject);
            const configsAlert = ValidateConfigs.validateProps(newProps);
            this.setState({
                enumAttributeValue: this.getAttributeValue(this.props.name, newProps.mxObject),
                enumList: this.getEnumValues(newProps.mxObject),
                alertMessage: configsAlert
            });
        }
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
    }

    private getEnumValues(mxObject: mendix.lib.MxObject): { key: string, caption: string }[] {
        let enumValues = mxObject.getEnumMap(this.props.name);

        if (this.props.editable !== "never") {
            this.props.collection.forEach(buttons => {
                const filteredList = enumValues.filter(item => item.caption.indexOf(buttons.exclude));
                enumValues = filteredList;
            });
        }

        return enumValues;
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): string {
        return mxObject ? mxObject.get(attribute) as string : "";
    }

    private isReadOnly(): boolean {
        const { name, editable, mxObject, readOnly } = this.props;

        return !(editable === "default" && mxObject) || (readOnly || mxObject.isReadonlyAttr(name));
    }

    private getSwitchStatus(enabled: boolean): SwitchStatus {
        if (this.props.mxObject) {
            return enabled ? "enabled" : "disabled";
        }

        return "noContext";
    }

    private handleToggle(caption: string) {
        const { mxObject, name, onChangeMicroflow } = this.props;

        if (mxObject) {
            if (caption !== this.state.enumAttributeValue) {
                mxObject.set(name, caption);
                this.executeAction(onChangeMicroflow, mxObject.getGuid());
            } else {
                mxObject.set(name, "");
            }
        }
    }

    private resetSubscriptions(mxObject: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.updateState,
                guid: mxObject.getGuid()
            }));
            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.name,
                callback: this.updateState,
                guid: mxObject.getGuid()
            }));
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.handleValidations,
                guid: mxObject.getGuid(),
                val: true
            }));
        }
    }

    private updateState() {
        this.setState({
            enumAttributeValue: this.getAttributeValue(this.props.name, this.props.mxObject),
            enumList: this.state.enumList
        });
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.props.name);
        validations[0].removeAttribute(this.props.name);

        if (validationMessage) {
            this.setState({ alertMessage: validationMessage });
        }
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname && guid) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    window.mx.ui.error(`Error while executing microflow ${actionname}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }
}
