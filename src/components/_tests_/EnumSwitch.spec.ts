import { mount, shallow } from "enzyme";
import { createElement } from "react";
import * as classNames from "classnames";
import { Alert, AlertProps } from "../Alert";

import { EnumSwitch, EnumSwitchProps } from "../EnumSwitch";
import { EnumButton } from "../EnumButton";

describe("EnumSwitch", () => {
    const shallowRenderSwitch = (props: EnumSwitchProps) => shallow(createElement(EnumSwitch, props));
    const fullRenderSwitch = (props: EnumSwitchProps) => mount(createElement(EnumSwitch, props));

    const defaultProps: EnumSwitchProps = {
        alertMessage: "",
        enumList: [],
        enumAttributeValue: "Chicken",
        onClickAction: jasmine.createSpy("onClick"),
        status: "enabled",
        bootstrapStyle: "default"
    };

    it("renders the structure correctly", () => {
        const enumswitch = shallowRenderSwitch(defaultProps);

        expect(enumswitch).toBeElement(
            createElement("div", { className: "widget-enum-switch form-validation" },
                createElement("div", { className: "widget-enum-switch form-control" },
                    createElement(EnumButton, {
                        status: defaultProps.status,
                        bootstrapStyle: defaultProps.bootstrapStyle,
                        position: enumswitch.state().position,
                        visibility: enumswitch.state().visibility,
                        width: enumswitch.state().width,
                        height: enumswitch.state().height,
                        getButtonNode: jasmine.any(Function)
                    })
                ),
                createElement(Alert, { message: defaultProps.alertMessage || "", bootstrapStyle: "danger" })
            ));
    });

    it("should not create button if there is no default atrribute", () => {
        defaultProps.enumAttributeValue = "";
        const enumswitch = shallowRenderSwitch(defaultProps);

        expect(enumswitch).toBeElement(
            createElement("div", { className: "widget-enum-switch form-validation" },
                createElement("div", { className: "widget-enum-switch form-control" }),
                createElement(Alert, { message: defaultProps.alertMessage || "", bootstrapStyle: "danger" })
            ));
    });

    it("should slide enum toggle onClick", () => {
        const enumswitch = fullRenderSwitch(defaultProps);
        const enumSwitchInstance = enumswitch.instance() as any;
        const enumSlider = spyOn(enumSwitchInstance, "enumToggleSlider").and.callThrough();
        defaultProps.enumAttributeValue = "Salami";
        enumSwitchInstance.componentDidUpdate(defaultProps);

        expect(enumSlider).toHaveBeenCalled();
    });

    it("should remove events when unmounting", () => {
        const enumswitch = fullRenderSwitch(defaultProps);
        const enumSwitchInstance = enumswitch.instance() as any;
        const enumSlider = spyOn(enumSwitchInstance, "enumToggleSlider").and.callThrough();
        enumSwitchInstance.componentWillUnmount();

        enumswitch.unmount();
    });

    describe("that is enabled", () => {
        it("should have the enabled class", () => {
            const enumswitch = shallowRenderSwitch(defaultProps);

            expect(enumswitch.hasClass("disabled")).not.toBe(true);
        });
    });

    describe("that is disabled", () => {
        it("should not have the enabled class", () => {
            defaultProps.status = "disabled";
            const enumswitch = shallowRenderSwitch(defaultProps);

            expect(enumswitch.hasClass("enabled")).not.toBe(true);
        });
    });

    describe("without context", () => {
        it("should have the noContext class", () => {
            defaultProps.status = "noContext";
            const enumswitch = shallowRenderSwitch(defaultProps);

            expect(enumswitch.hasClass("noContext")).toBe(true);
        });

        it("should not slide enum toggle onClick", () => {
            const enumswitch = shallowRenderSwitch(defaultProps);
            const enumSwitchInstance = enumswitch.instance() as any;
            const enumSlider = spyOn(enumSwitchInstance, "enumToggleSlider").and.callThrough();
            enumSwitchInstance.componentDidUpdate(defaultProps);

            expect(enumSlider).not.toHaveBeenCalled();
        });
    });
});
