import { shallow } from "enzyme";
import { ReactChild, createElement } from "react";
import { Alert, AlertProps } from "../Alert";

describe("Alert", () => {
    const renderAlert = (props: AlertProps) => shallow(createElement(Alert, props));
    const alertMessage = "This is an error";

    it("renders structure when an alert message is specified", () => {
        const alert = renderAlert({ bootstrapStyle: "danger", message: alertMessage });

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger" }, alertMessage)
        );
    });

    it("renders no structure when the alert message is not specified", () => {
        const alert = shallow(createElement(Alert));

        expect(alert).toBeElement(null);
    });

    it("renders with the class of the specified bootstrap style", () => {
        const alert = renderAlert({ bootstrapStyle: "danger", message: alertMessage });

        expect(alert).toHaveClass("alert-danger");

        alert.setProps({ bootstrapStyle: "default" });
        expect(alert).toHaveClass("alert-default");

        alert.setProps({ bootstrapStyle: "success" });
        expect(alert).toHaveClass("alert-success");

        alert.setProps({ bootstrapStyle: "primary" });
        expect(alert).toHaveClass("alert-primary");

        alert.setProps({ bootstrapStyle: "info" });
        expect(alert).toHaveClass("alert-info");

        alert.setProps({ bootstrapStyle: "warning" });
        expect(alert).toHaveClass("alert-warning");
    });

    it("renders with the specified class name", () => {
        const message = "This is an error";
        const className = "widget-enum-switch";
        const alert = shallow(createElement(Alert, { bootstrapStyle: "danger", message, className }));

        expect(alert).toBeElement(
            createElement("div", { className: "alert alert-danger widget-enum-switch" }, message)
        );
    });
});
