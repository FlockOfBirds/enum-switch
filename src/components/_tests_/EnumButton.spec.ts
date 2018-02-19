import { shallow } from "enzyme";
import { createElement } from "react";

import { EnumButton, EnumButtonProps } from "../EnumButton";

describe("EnumButton", () => {
    const renderEnumButton = (props: EnumButtonProps) => shallow(createElement(EnumButton, props));
    const defaultProps: EnumButtonProps = {
        status: "enabled",
        bootstrapStyle: "default",
        visibility: "visible",
        position: 1,
        width: 86.03125,
        height: 41
    };

    it("renders structure correctly", () => {
        const enumButton = renderEnumButton(defaultProps);

        expect(enumButton).toBeElement(
            createElement("button", {
                className: "btn btn-default span-responsive",
                style: {
                    visibility: "visible", transform: `translate3d(${defaultProps.position}px, 0px, 0px)`,
                    width: `${defaultProps.width}px`, height: `${defaultProps.height}px`
                }
            })
        );
    });

    it("should not have the class disabled when enabled", () => {
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton).not.toHaveClass("disabled");
    });

    it("should have the class disabled when not enabled", () => {
        const enumButtonProps: EnumButtonProps = {
            ...defaultProps,
            status: "disabled"
        };
        const enumSwitchButton = renderEnumButton(enumButtonProps);

        expect(enumSwitchButton).toHaveClass("disabled");
    });

    it("with the Bootstrap style default should have the class btn-default", () => {
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-default")).toBe(true);
    });

    it("with the Bootstrap style primary should have the class btn-primary", () => {
        defaultProps.bootstrapStyle = "primary";
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-primary")).toBe(true);
    });

    it("with the Bootstrap style info should have the class btn-info", () => {
        defaultProps.bootstrapStyle = "info";
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-info")).toBe(true);
    });

    it("with the Bootstrap style success should have the class btn-success", () => {
        defaultProps.bootstrapStyle = "success";
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-success")).toBe(true);
    });

    it("with the Bootstrap style warning should have the class btn-warning", () => {
        defaultProps.bootstrapStyle = "warning";
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should have the class btn-danger", () => {
        defaultProps.bootstrapStyle = "danger";
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton.hasClass("btn-danger")).toBe(true);
    });

    it("should be visible when configured to be visible", () => {
        const enumSwitchButton = renderEnumButton(defaultProps);

        expect(enumSwitchButton).toMatchStructure(
            createElement("button", {
                style: {
                    visibility: "visible",
                    transform: `translate3d(${defaultProps.position}px, 0px, 0px)`,
                    width: `${defaultProps.width}px`,
                    height: `${defaultProps.height}px`
                }
            })
        );
    });

    it("should be hidden when configured to be hidden", () => {
        const enumSwitchButton = renderEnumButton(defaultProps);
        enumSwitchButton.setProps({ visibility: "hidden" });

        expect(enumSwitchButton).toMatchStructure(
            createElement("button", {
                style: {
                    visibility: "hidden",
                    transform: `translate3d(${defaultProps.position}px, 0px, 0px)`,
                    width: `${defaultProps.width}px`,
                    height: `${defaultProps.height}px`
                }
            })
        );
    });
});
