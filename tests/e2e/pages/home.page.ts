class HomePage {
    public get radioButton() { return browser.element(".mx-name-radioButtons1 label.radio-inline"); }
    public get enabledSpan() { return browser.element(".mx-name-dataView1 .widget-enum-switch .span-default"); }
    public get disabledContext() {
        return browser.element(".mx-name-layoutGrid2 .widget-enum-switch .span-default.disabled");
    }
    public get validateMicroflow() {
        return browser.element(".mx-name-layoutGrid5 .widget-enum-switch .span-default");
    }
    public get showErrorMessage() { return browser.element(".mx-name-layoutGrid5 .alert-danger"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
