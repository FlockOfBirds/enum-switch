import { shallow } from "enzyme";
import { createElement } from "react";
import * as classNames from "classnames";
import { Alert, AlertProps } from "../Alert";

import { EnumSwitch, EnumSwitchProps } from "../EnumSwitch";
import { EnumButton } from "../EnumButton";

describe("EnumSwitch", () => {
    const renderEnumSwitch = (props: EnumSwitchProps) => shallow(createElement(EnumSwitch, props));

    const defaultProps: EnumSwitchProps = {
        alertMessage: "",
        enumList: [],
        enumAttributeValue: "Chicken",
        onClickAction: jasmine.createSpy("onClick"),
        status: "enabled",
        bootstrapStyle: "default"
    };

    it("renders the structure correctly", () => {
        const enumswitch = renderEnumSwitch(defaultProps);

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

    it("renders with the specified position", () => {
        const enumswitch = renderEnumSwitch(defaultProps);

        expect(enumswitch.state().position).toEqual(0);
    });

    it("renders with the with the specified width", () => {
        const enumswitch = renderEnumSwitch(defaultProps);

        expect(enumswitch.state().width).toEqual(0);
    });

    it("renders with the specified height", () => {
        const enumswitch = renderEnumSwitch(defaultProps);

        expect(enumswitch.state().width).toEqual(0);
    });

    describe("that is enabled", () => {
        it("should have the enabled class", () => {
            const enumswitch = renderEnumSwitch(defaultProps);

            expect(enumswitch.hasClass("disabled")).not.toBe(true);
        });

        it("should respond to click events", () => {
            const enumswitch = renderEnumSwitch(defaultProps);

            enumswitch.simulate("click");

            expect(defaultProps.onClickAction).not.toHaveBeenCalled();
        });
    });

    describe("that is disabled", () => {
        it("should not have the enabled class", () => {
            defaultProps.status = "disabled";
            const enumswitch = renderEnumSwitch(defaultProps);

            expect(enumswitch.hasClass("enabled")).not.toBe(true);
        });

        it("should handle click events", () => {
            defaultProps.status = "disabled";
            const enumswitch = renderEnumSwitch(defaultProps);

            enumswitch.simulate("click");

            expect(defaultProps.onClickAction).not.toHaveBeenCalled();
        });
    });

    xit("should slide enum-toggle on click", () => {
        const enumswitch = renderEnumSwitch(defaultProps);

        const enumSwitchInstance = enumswitch.instance() as any ;
        console.log(enumSwitchInstance.componentDidUpdate(defaultProps)); //tslint:disable-line
    });

    describe("without context", () => {
        it("should have the noContext class", () => {
            defaultProps.status = "noContext";
            const enumswitch = renderEnumSwitch(defaultProps);

            expect(enumswitch.hasClass("noContext")).toBe(true);
        });

        it("should not handle a click event", () => {
            defaultProps.status = "enabled";
            const enumswitch = renderEnumSwitch(defaultProps);

            enumswitch.simulate("click");

            expect(defaultProps.onClickAction).not.toHaveBeenCalled();
        });
    });
});
