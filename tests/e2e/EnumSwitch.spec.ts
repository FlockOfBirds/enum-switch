import HomePage from "./pages/home.page";

const enumAttributeValue = "Chicken";

describe("EnumSwitch", () => {
    it("should slide to the default value when rendered", () => {
        HomePage.open();
        HomePage.enabledSwitch.waitForVisible();
        HomePage.disabledSwitch.waitForVisible();

        const defaultValue = HomePage.enabledSwitch.getHTML();
        expect(defaultValue).toContain(enumAttributeValue);
    });
});
