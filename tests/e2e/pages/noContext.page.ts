class NoContextPage {
    public get noContextSwitch() { return browser.element(".mx-name-layoutGrid1 .noContext"); }

    public open(): void {
        browser.url("/p/noContext/");
    }
}

const noContextpage = new NoContextPage();

export default noContextpage;
