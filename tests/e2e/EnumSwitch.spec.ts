import HomePage from "./pages/home.page";

const buttonStyle = "rgba(255,255,255,1)";
const radioValue = "Salami";
const buttonWidth = "74.0469px";

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

    it("updates enum-toggle when clicked", () => {
        HomePage.open();
        HomePage.enabledSpan.waitForVisible();
        HomePage.enabledSpan.click();

        HomePage.enabledButton.waitForVisible();
        const getWidth = HomePage.enabledButton.getCssProperty("width");
        expect(getWidth.value).toBe(buttonWidth);
    });

});
