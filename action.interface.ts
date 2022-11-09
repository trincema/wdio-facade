import axios from 'axios';

class Action {
    static Browser = class {
        /**
         * Navigate the current browser tab to the given url.
         * @param url The url to navigate to.
        */
        public async navigate(url: string) {
            await browser.url(url);
        }

        /**
         * Generic method to refresh the current page of the browser.
        */
        public async refreshPage() {
            return browser.refresh();
        }

        /**
         * Generic method to navigate back on the current browser.
        */
        public async goBack() {
            await browser.back();
        }

        static Element = class {
            /**
             * Generic click element method, which also includes a waiting mechanism to make sure the element
             * exists on the page, enabled and clickable.
             * @param locator Element locator as string, could be a css locator.
             * @param scroll Flag to scroll or not to scroll to the element before click, default to false.
             * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
            */
            public async click(locator: string, clickable: boolean = true, scroll: boolean = false, timeout: number = 60) {
                const element = await $(locator);
                await element.waitForExist({ timeout: timeout * 1000 });
                await element.waitForEnabled({ timeout: timeout * 1000 });
                if (clickable) {
                    await element.waitForClickable({ timeout: timeout * 1000 });
                }
                if (scroll) {
                    await element.scrollIntoView();
                }
                return element.click();
            }

            /**
             * Generic method to click on a certain element from a list of elements having the same locator.
             * Could be useful when no custom and unique locator can be provided.
             * @param locator Element locator as string, could be a css locator.
             * @param index The element index to click on, default to 1st element.
             * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
            */
            public async clickElement(locator: string, index: number = 0, clickable: boolean = true, timeout: number = 60) {
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
             * Generic method to set a value for an element of type <input>.
             * @param locator The locator of the HTML input element.
             * @param value The value to be inputed in the element.
             * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
            */
            public async inputValue(locator: string, value: string, timeout: number = 60) {
                const inputElement = await $(locator);
                await inputElement.waitForExist({ timeout: timeout * 1000 });
                await inputElement.scrollIntoView();
                return inputElement.setValue(value);
            }

            /**
             * Scrolling to element.
            */
            public async scrollToElement(locator: string) {
                const element = await $(locator);
                await element.scrollIntoView();
            }

            /**
             * 
            */
            public async scrollToElementByIndex(locator: string, index: number) {
                const elements = await $$(locator);
                await elements[index].scrollIntoView();
            }

            /**
             * Generic method to pause the current execution a given number of seconds.
             * @param seconds The given number of seconds to pause the current execution.
            */
            public async sleep(seconds: number) {
                return browser.pause(seconds * 1000);
            }

        }

        static API = interface {
            /**
             * Make GET request and return the given Object type as response.
            */
             public async getRequest<Type>(url: string, log: any): Promise<Type> {
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
                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        log.error(`GET Error message: ${error.message}`);
                        log.error(`GET Error: ${JSON.stringify(error)}`);
                        return null;
                    } else {
                        log.error(`GET Unexpected error: ${JSON.stringify(error)}`);
                        return null;
                    }
                }
            }

            /**
             * Make POST request and return the given Object type as response.
            */
            postRequest<Type>(url: string, payload: Object, log: any): Promise<Type>;
        }
    }

    static Device = class {

    }



    static MobileDevice = class {

    }
}

export default new Action.Browser();
export { Action };

