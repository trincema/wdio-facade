import { BrowserWaits } from 'gtaa-interface-ts/wait/browser-waits.interface';

export class BrowserWait implements BrowserWaits {
    /**
     * Generic method to wait for an element to exist in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be present in SUT, default being 1 minute.
    */
     public async untilElementExists(locator: string, timeout: number = 60) {
        const element = await $(locator);
        await element.waitForExist({ timeout: timeout * 1000 });
    }

    /**
     * Generic method to wait for an element to be visible in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be visible, default being 1 minute.
    */
    public async untilElementIsVisible(locator: string, timeout: number = 60) {
        const element = await $(locator);
        await element.waitForDisplayed({ timeout: timeout * 1000 });
    }

    /**
     * Just wait for element to be visible without asserting it.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be visible, default being 1 minute.
    */
    public async forElementToBeVisible(locator: string, timeout: number) {
        timeout = timeout * 1000;
        let count = 0;
        while (true) {
            const element = $(locator);
            if (element.isDisplayed()) {
                return true;
            }
            await browser.pause(500);
            if ((count++ * 500) >= timeout) {
                return false;
            }
        }
    }

    /**
     * Generic method to wait until a given element is no longer visible on the screen.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout The timeout in seconds until the wait fails.
    */
     public async untilElementIsInvisible(locator: string, timeout: number = 60) {
        const elementInstance = await $(locator);
        await elementInstance.waitForDisplayed({ timeout: timeout * 1000, reverse: true});
    }
 
    /**
     * Generic method to wait for an element to be clickable in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be clickable, default being 1 minute.
    */
    public async untilElementIsClickable(locator: string, timeout: number = 60) {
        const element = await $(locator);
        await element.waitForEnabled({ timeout: timeout * 1000 });
        await element.waitForClickable({ timeout: timeout * 1000 });
    }

    /**
     * Wait until a certain number of elements appear on screen.
     * @param locator Element locator as string, could be a css locator.
    */
    public async elementCount(locator: string, count: number, timeout: number = 60): Promise<void> {
        let elements = await $$(locator);
        let loopCounter = 0;
        while (elements.length < count) {
            await browser.pause(500);
            elements = await $$(locator);
            if (loopCounter === timeout) {
                break;
            }
            loopCounter++;
        }
    }

    /**
     * Wait until browser starts loading and then stop loading.
    */
    public async untilLoaded(timeout: number = 60) {
        // Wait for browser to start loading
        let count = timeout * 1000;
        while (!browser.isLoading()) {
            browser.pause(50);
            count -= 50;
            if (count <= 0) {
                break;
            }
        }

        // Wait for browser to stop loading
        count = timeout * 1000;
        while (browser.isLoading()) {
            browser.pause(50);
            count -= 50;
            if (count <= 0) {
                break;
            }
        }
    }

}

export default new BrowserWait();