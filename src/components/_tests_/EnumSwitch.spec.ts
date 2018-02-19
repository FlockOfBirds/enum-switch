import { mount, shallow } from "enzyme";
import { createElement } from "react";
import { Alert } from "../Alert";

import { EnumSwitch, EnumSwitchProps } from "../EnumSwitch";
import { EnumButton } from "../EnumButton";

describe("EnumSwitch", () => {
    const shallowRenderSwitch = (props: EnumSwitchProps) => shallow(createElement(EnumSwitch as any, props));
    const fullRenderSwitch = (props: EnumSwitchProps) => mount(createElement(EnumSwitch as any, props));

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
            createElement("div", { className: "form-validation" },
                createElement("div", { className: "widget-enum-switch form-control" },
                    createElement(EnumButton, {
                        status: defaultProps.status,
                        bootstrapStyle: defaultProps.bootstrapStyle,
                        position: enumswitch.state().position,
                        visibility: enumswitch.state().visibility,
                        width: enumswitch.state().width,
                        height: enumswitch.state().height
                    })
                ),
                createElement(Alert, { message: defaultProps.alertMessage || "", bootstrapStyle: "danger" })
            ));
    });

    it("should not create button if there is no default atrribute", () => {
        const enumSwitchProps: EnumSwitchProps = {
            ...defaultProps,
            enumAttributeValue: ""
        };
        const enumswitch = shallowRenderSwitch(enumSwitchProps);

        expect(enumswitch).toBeElement(
            createElement("div", { className: "form-validation" },
                createElement("div", { className: "widget-enum-switch form-control" }),
                createElement(Alert, { message: defaultProps.alertMessage || "", bootstrapStyle: "danger" })
            ));
    });

    it("should slide enum toggle onClick", () => {
        const enumswitch = fullRenderSwitch(defaultProps);
        const enumSwitchInstance = enumswitch.instance() as any;

        enumSwitchInstance.getActiveSpanNodeRef();
        const enumSlider = spyOn(enumSwitchInstance, "enumToggleSlider").and.callThrough();
        defaultProps.enumAttributeValue = "Salami";
        enumSwitchInstance.componentDidUpdate(defaultProps);

        expect(enumSlider).toHaveBeenCalled();
    });

    xit("should remove events when unmounting", () => {
        const enumswitch = fullRenderSwitch(defaultProps);
        const enumSwitchInstance = enumswitch.instance() as any;

        const enumSlider = spyOn(enumSwitchInstance, "throttleUpdate").and.callThrough();
        enumSwitchInstance.componentWillUnmount();

        expect(enumSlider).toHaveBeenCalled();
    });

    describe("that is enabled", () => {
        it("should have the enabled class", () => {
            const enumswitch = shallowRenderSwitch(defaultProps);
            const enumSwitchWrapper = enumswitch.find(".widget-enum-switch");

            expect(enumSwitchWrapper.hasClass("disabled")).not.toBe(true);
        });
    });

    describe("that is disabled", () => {
        it("should not have the enabled class", () => {
            const enumSwitchProps: EnumSwitchProps = {
                ...defaultProps,
                status: "disabled"
            };
            const enumswitch = shallowRenderSwitch(enumSwitchProps);
            const enumSwitchWrapper = enumswitch.find(".widget-enum-switch");

            expect(enumSwitchWrapper.hasClass("disabled")).toBe(true);
        });
    });

    describe("without context", () => {
        it("should have the noContext class", () => {
            const enumSwitchProps: EnumSwitchProps = {
                ...defaultProps,
                status: "noContext"
            };
            const enumswitch = shallowRenderSwitch(enumSwitchProps);
            const enumSwitchWrapper = enumswitch.find(".widget-enum-switch");

            expect(enumSwitchWrapper).toHaveClass("noContext");
        });

        it("should not slide enum toggle onClick", () => {
            const enumswitch = fullRenderSwitch(defaultProps);
            const enumSwitchInstance = enumswitch.instance() as any;

            const enumSlider = spyOn(enumSwitchInstance, "enumToggleSlider").and.callThrough();
            enumSwitchInstance.componentDidUpdate(defaultProps);

            expect(enumSlider).not.toHaveBeenCalled();
        });
    });
});
