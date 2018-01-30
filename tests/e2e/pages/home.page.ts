class HomePage {
    public get enabledButton() { return browser.element(".mx-name-dataView1 .widget-enum-switch .btn"); }
    public get radioButton() { return browser.element(".mx-name-radioButtons1 label.radio-inline"); }
    public get enabledSpan() { return browser.element(".mx-name-dataView1 .widget-enum-switch .span-default"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
