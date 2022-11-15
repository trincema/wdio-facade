import { BrowserViewable } from 'gtaa-interface-ts/view/browser-view.interface';

/**
 * The implementation for all viewable query operations of TAF tool.
*/
export class BrowserView implements BrowserViewable {
    /**
     * Get the URL of a browser tab.
     */
    public async browserUrl(): Promise<string> {
        const url = await browser.getUrl();
        return url;
    }

    /**
     * Get the current browser name.
    */
     public async browserName(): Promise<string> {
        const browserName = await browser.capabilities.browserName;
        return browserName;
    }

    /**
     * Wait for element on the screen and fetch and return its text.
     * @param locator Element locator as string, could be a CSS locator.
    */
    public async elementText(locator: string, scroll: boolean, timeout: number): Promise<string> {
        const element = await $(locator);
        await element.waitForExist({ timeout: timeout * 1000 });
        const elementText = await element.getText();
        return elementText;
    }

    /**
     * Getting the attribute value of an element.
     * @param locator Element locator as string, could be a CSS locator.
     * @param attributeName The name of the attribute.
    */
     public async getAttribute(locator: string, attributeName: string): Promise<string> {
        const element = await $(locator);
        const attribute = await element.getAttribute(attributeName);
        return attribute;
    }

    /**
     * Check if an element is currently displayed in the browser.
     * @param locator Element locator as string, could be a css locator.
    */
     public async elementIsVisible(locator: string): Promise<boolean> {
        const element = await $(locator);
        const status: boolean = await element.isDisplayed();
        return status;
    }

    /**
     * Get the invisible element status.
     * @param locator Element locator as string, could be a css locator.
    */
    public async elementIsInvisible(locator: string): Promise<boolean> {
        const element = await $(locator);
        const status = await element.isDisplayed();
        return !status;
    }

    /**
     * Get the enabled element status.
     * @param locator Element locator as string, could be a css locator.
    */
    public async elementIsEnabled(locator: string): Promise<boolean> {
        const element = await $(locator);
        const status = await element.isEnabled();
        return status;
    }

    /**
     * Get the clickable element status.
     * @param locator Element locator as string, could be a css locator.
    */
    public async elementIsClickable(locator: string): Promise<boolean> {
        const element = await $(locator);
        const status = await element.isClickable();
        return status;
    }

    /**
     * Get the clickable element status by index.
     * @param locator Element locator as string, could be a css locator.
    */
    public async elementIsClickableByIndex(locator: string, index: number): Promise<boolean> {
        const element = await $$(locator)[index];
        const status = await element.isClickable();
        return status;
    }

}
