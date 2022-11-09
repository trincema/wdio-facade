import { BrowserViewable } from 'gtaa-interface-ts/view/browser-view.interface';

/**
 * The implementation for all viewable query operations of TAF tool.
*/
export class BrowserView implements BrowserViewable {
    /**
     * Get the URL of a browser tab.
     */
    public async browserUrl(): Promise<string> {
        return await browser.getUrl();
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
     * Check if an element is currently displayed in the browser.
     * @param locator Element locator as string, could be a CSS selector.
    */
    public async elementIsVisible(locator: string): Promise<boolean> {
        const element = await $(locator);
        const elementDisplayed = await element.isDisplayed();
        return elementDisplayed;
    }

}
