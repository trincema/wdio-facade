import axios from 'axios';

import { BrowserActions } from 'gtaa-interface-ts/action/browser-actions.interface';

/**
 * The implementation with all doable actions of the TAF Tool.
*/
class BrowserAction implements BrowserActions {
    private log = {
        info: (msg: string) => {},
        error: (msg: string) => {}
    };

    /**
     * Navigate the current browser tab to the given url.
     * @param url The url to navigate to.
    */
    public async navigate(url: string): Promise<void> {
        await browser.url(url);
    }

    /**
     * Refresh the current page.
     */
    public async refreshPage(): Promise<void> {
        await browser.refresh();
    }
 
    /**
     * Navigate back on the current browser.
     */
    public async goBack(): Promise<void> {
        await browser.back();
    }
 
    /**
     * Generic click element method, which also includes a waiting mechanism to make sure the element
     * exists on the page, enabled and clickable.
     * @param locator Element locator as string, could be a css locator.
     * @param scroll Flag to scroll or not to scroll to the element before click, default to false.
     * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
     */
    public async click(locator: string, clickable: boolean, scroll: boolean, timeout: number): Promise<void> {
        const element = await $(locator);
        await element.waitForExist({ timeout: timeout * 1000 });
        await element.waitForEnabled({ timeout: timeout * 1000 });
        if (clickable) {
            await element.waitForClickable({ timeout: timeout * 1000 });
        }
        if (scroll) {
            await element.scrollIntoView();
        }
        await element.click();
    }
 
    /**
     * Click specific element from a list of elements all identified by the same given locator.
     * 
     */
    public async clickElement(locator: string, index: number, clickable: boolean, timeout: number): Promise<void> {
        const element = await $$(locator)[index];
        await element.waitForExist({ timeout: timeout * 1000 });
        await element.waitForEnabled({ timeout: timeout * 1000 });
        if (clickable) {
            await element.waitForClickable({ timeout: timeout * 1000 });
        }
        await element.scrollIntoView();
        return element.click();
    }
 
    /**
     * Set a value for an element of type <input>.
     * @param locator The locator of the HTML input element.
     * @param value The value to be inputed in the element.
     * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
     */
    public async inputValue(locator: string, value: string, timeout: number): Promise<void> {
        const inputElement = await $(locator);
        await inputElement.waitForExist({ timeout: timeout * 1000 });
        await inputElement.scrollIntoView();
        await inputElement.setValue(value);
    }
 
    /**
     * Scroll to element identified by the given locator.
     * @param locator The locator of the HTML input element.
     */
    public async scrollToElement(locator: string): Promise<void> {
        const element = await $(locator);
        await element.scrollIntoView();
    }
 
    /**
     * Scroll to a specific element from a list of elements identified all identified by the same given locator.
     * @param locator The locator of the HTML input element.
     * @param index The index of the element to scroll to.
     */
    public async scrollToElementByIndex(locator: string, index: number): Promise<void> {
        const elements = await $$(locator);
        await elements[index].scrollIntoView();
    }
 
    /**
     * Pause the current execution a given number of seconds.
     * @param seconds The given number of seconds to pause the current execution.
     */
    public async sleep(seconds: number): Promise<void> {
        await browser.pause(seconds * 1000);
    }

    /**
     * Make GET request and return the given Object type as response.
    */
    public async getRequest<Type>(url: string, log: any = this.log): Promise<any> {
        try {
            const { data, status } = await axios.get<Type>(
                url,
                {
                    headers: {
                      Accept: 'application/json',
                    },
                });
            log.info(`GET Response status: ${status}`);
            if (status === 200) {
                log.info(`GET Response: ${JSON.stringify(data)}`);
                return data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                log.error(`GET Error message: ${error.message}`);
                log.error(`GET Error: ${JSON.stringify(error)}`);
            } else {
                log.error(`GET Unexpected error: ${JSON.stringify(error)}`);
            }
        }
    }

    /**
     * Make POST request and return the given Object type as response.
    */
    public async postRequest<Type>(url: string, payload: Object, log: any = this.log): Promise<any> {
        try {
            const { data, status } = await axios.post<Type>(
                url,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
            log.info(`POST Response status: ${status}`);
            if (status === 200) {
                log.info(`POST Response: ${JSON.stringify(data)}`);
                return data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                log.error(`POST Error message: ${error.message}`);
                log.error(`POST Error: ${JSON.stringify(error)}`);
            } else {
                log.error(`POST Unexpected error: ${JSON.stringify(error)}`);
            }
        }
    }
}