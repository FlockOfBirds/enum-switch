import { shallow } from "enzyme";
import { createElement } from "react";
import * as classNames from "classnames";

import { EnumButton, EnumButtonProps } from "../EnumButton";

describe("EnumButton", () => {
    const createEnumButton = (props: EnumButtonProps) => shallow(createElement(EnumButton, props));

    it("renders structure correctly", () => {
        //
    });

    it("should not have the class disabled when enabled", () => {
        //
    });

    it("should have the class disabled when not enabled", () => {
        //
    });

    it("render the class of a specified bootstrap style", () => {
        //
    });

    it("should be visible when configured to be visible", () => {
        //
    });

    it("should be hidden when configured to be hidden", () => {
        //
    });

    it("renders with the specified position", () => {
        //
    });

    it("renders with the with the specified width", () => {
        //
    });

    it("renders with the specified height", () => {
        //
    });
});
