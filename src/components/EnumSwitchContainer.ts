import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { BootstrapStyle, EnumSwitch, SwitchStatus } from "./EnumSwitch";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
}

export interface EnumContainerProps extends WrapperProps {
    name: string;
}

interface EnumContainerState {
    alertMessage?: string;
}

export default class EnumSwitchContainer extends Component<EnumContainerProps, EnumContainerState> {
    private subscriptionHandles: number[] = [];

    constructor(props: EnumContainerProps) {
        super(props);

        this.state = {
            alertMessage: ""
        };
        this.handleValidations = this.handleValidations.bind(this);
    }

    render() {
        return createElement(EnumSwitch, {
            alertMessage: this.state.alertMessage
        });
    }

    componentWillReceiveProps(newProps: EnumContainerProps) {
        //
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
    }

    private resetSubscriptions(mxObject: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.handleValidations,
                guid: mxObject.getGuid(),
                val: true
            }));
        }
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
