import { shallow } from "enzyme";
import { createElement } from "react";

import { EnumSpan, EnumSpanProps } from "../EnumSpan";

describe("EnumSpan", () => {
    const renderEnumSpan = (props: EnumSpanProps) => shallow(createElement(EnumSpan, props));

    const defaultProps: EnumSpanProps = {
        enumAttributeValue: "Chicken",
        status: "enabled",
        onClickAction: jasmine.createSpy("onClick"),
        caption: "Salami"
    };

    it("renders the structure correctly", () => {
        const enumSpan = renderEnumSpan(defaultProps);

        expect(enumSpan).toBeElement(
            createElement("span", {
                className: "span-default span-responsive",
                onClick: defaultProps.onClickAction
            }, defaultProps.caption)
        );
    });

    it("should not have the class active when inactive", () => {
        const enumSpan = renderEnumSpan(defaultProps);

        expect(enumSpan.hasClass("active")).toBe(false);
    });

    it("should have the class active when active", () => {
        defaultProps.caption = "Chicken";
        const enumSpan = renderEnumSpan(defaultProps);

        expect(enumSpan).toHaveClass("active");
    });

    describe("that it is enabled", () => {
        it("should not have the class disabled", () => {
            const enumSpan = renderEnumSpan(defaultProps);

            expect(enumSpan.hasClass("disabled")).toBe(false);
        });

        it("should respond to click events", () => {
            const enumSpan = renderEnumSpan(defaultProps);

            enumSpan.simulate("click");

            expect(defaultProps.onClickAction).toHaveBeenCalled();
        });
    });

    describe("that it is disabled", () => {
        it("should have the class disabled", () => {
            defaultProps.status = "disabled";
            const enumSpan = renderEnumSpan(defaultProps);

            expect(enumSpan).toHaveClass("disabled");
        });
    });
});
