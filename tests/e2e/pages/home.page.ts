class HomePage {
    public get enabledSwitch() { return browser.element(".mx-name-dataView1 .widget-enum-switch"); }
    public get disabledSwitch() { return browser.element(".mx-name-dataView2 .widget-enum-switch"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
