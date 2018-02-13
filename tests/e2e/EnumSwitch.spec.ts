import HomePage from "./pages/home.page";
import NoContextPage from "./pages/noContext.page";

const buttonStyle = "rgba(255,255,255,1)";
const radioValue = "Salami";
const switchWidth = "200px";
const pointerEvents = "none";
const danger = "rgb(130, 50, 47, 1)";

describe("EnumSwitch", () => {

    it("is updated by an attribute", () => {
        HomePage.open();
        HomePage.radioButton.waitForVisible();
        HomePage.radioButton.click();

        HomePage.enabledSpan.waitForVisible();
        const content = HomePage.enabledSpan.getCssProperty("color");
        expect(content.value).toBe(buttonStyle);
    });

    it("updates attribute when clicked", () => {
        HomePage.open();
        HomePage.enabledSpan.waitForVisible();
        HomePage.enabledSpan.click();

        HomePage.radioButton.waitForVisible();
        const radio = HomePage.radioButton.getText();
        expect(radio).toContain(radioValue);
    });

    it("has a disabled context", () => {
        HomePage.open();
        HomePage.disabledContext.waitForVisible();

        const disabledSpan = HomePage.disabledContext.getCssProperty("pointer-events");
        expect(disabledSpan.value).toBe(pointerEvents);
    });

    it("validates microflow on click", () => {
        HomePage.open();
        HomePage.validateMicroflow.waitForVisible();
        HomePage.validateMicroflow.click();

        HomePage.showErrorMessage.waitForVisible();
        const showError = HomePage.showErrorMessage.getCssProperty("color");
        expect(showError.value).toBe(danger);
    });

    it("has no context", () => {
        NoContextPage.open();
        NoContextPage.noContextSwitch.waitForVisible();

        const content = NoContextPage.noContextSwitch.getCssProperty("width");
        expect(content.value).toBe(switchWidth);
    });

});
