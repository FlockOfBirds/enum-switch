import { shallow } from "enzyme";
import { createElement } from "react";
import * as classNames from "classnames";
import { Alert, AlertProps } from "../Alert";

import { EnumSwitch, EnumSwitchProps } from "../EnumSwitch";

describe("EnumSwitch", () => {

    it("renders the structure correctly", () => {
        //
    });

    describe("that is enabled", () => {
        it("should not have the disabled class", () => {
            //
        });

        it("should respond to click events", () => {
            //
        });
    });

    describe("that is disabled", () => {
        it("should have the disabled class", () => {
            //
        });

        it("should not handle click events", () => {
            //
        });
    });

    it("should slide enum-toggle on click", () => {
        //
    });

    describe("without context", () => {
        it("should have the noContext class", () => {
            //
        });

        it("should not handle a click event", () => {
            //
        });
    });
});
