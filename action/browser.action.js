"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
/**
 * The implementation with all doable actions of the TAF Tool.
*/
var BrowserAction = /** @class */ (function () {
    function BrowserAction() {
        this.log = {
            info: function (msg) { },
            error: function (msg) { }
        };
    }
    /**
     * Navigate the current browser tab to the given url.
     * @param url The url to navigate to.
    */
    BrowserAction.prototype.navigate = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, browser.url(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refresh the current page.
     */
    BrowserAction.prototype.refreshPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, browser.refresh()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navigate back on the current browser.
     */
    BrowserAction.prototype.goBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, browser.back()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generic click element method, which also includes a waiting mechanism to make sure the element
     * exists on the page, enabled and clickable.
     * @param locator Element locator as string, could be a css locator.
     * @param scroll Flag to scroll or not to scroll to the element before click, default to false.
     * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
     */
    BrowserAction.prototype.click = function (locator, clickable, scroll, timeout) {
        if (clickable === void 0) { clickable = true; }
        if (scroll === void 0) { scroll = true; }
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, element.waitForExist({ timeout: timeout * 1000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, element.waitForEnabled({ timeout: timeout * 1000 })];
                    case 3:
                        _a.sent();
                        if (!clickable) return [3 /*break*/, 5];
                        return [4 /*yield*/, element.waitForClickable({ timeout: timeout * 1000 })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!scroll) return [3 /*break*/, 7];
                        return [4 /*yield*/, element.scrollIntoView()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, element.click()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Click specific element from a list of elements all identified by the same given locator.
     *
     */
    BrowserAction.prototype.clickElement = function (locator, index, clickable, timeout) {
        if (clickable === void 0) { clickable = true; }
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $$(locator)[index]];
                    case 1:
                        element = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(element === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, browser.pause(250)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, $$(locator)[index]];
                    case 4:
                        element = _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, element.waitForExist({ timeout: timeout * 1000 })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, element.waitForEnabled({ timeout: timeout * 1000 })];
                    case 7:
                        _a.sent();
                        if (!clickable) return [3 /*break*/, 9];
                        return [4 /*yield*/, element.waitForClickable({ timeout: timeout * 1000 })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, element.scrollIntoView()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, element.click()];
                }
            });
        });
    };
    /**
     * Set a value for an element of type <input>.
     * @param locator The locator of the HTML input element.
     * @param value The value to be inputed in the element.
     * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
     */
    BrowserAction.prototype.inputValue = function (locator, value, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var inputElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        inputElement = _a.sent();
                        return [4 /*yield*/, inputElement.waitForExist({ timeout: timeout * 1000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, inputElement.scrollIntoView()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, inputElement.setValue(value)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Appending the given string to the input element identified by the given locator.
     * This is helpful for dynamic input fields which have processing on them,
     * since it can cause the content to not be entered properly.
     * @param locator The locator of the HTML input element.
     * @param value The value to be inputed in the element.
     * @param timeout Timeout to wait for element to be interactable, default being 1 minute.
    */
    BrowserAction.prototype.appendToInput = function (locator, value, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var inputElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        inputElement = _a.sent();
                        return [4 /*yield*/, inputElement.waitForExist({ timeout: timeout * 1000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, inputElement.scrollIntoView()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, inputElement.addValue(value)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Scroll to element identified by the given locator.
     * @param locator The locator of the HTML input element.
     */
    BrowserAction.prototype.scrollToElement = function (locator) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, element.scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Scroll to a specific element from a list of elements identified all identified by the same given locator.
     * @param locator The locator of the HTML input element.
     * @param index The index of the element to scroll to.
     */
    BrowserAction.prototype.scrollToElementByIndex = function (locator, index) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $$(locator)];
                    case 1:
                        elements = _a.sent();
                        return [4 /*yield*/, elements[index].scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pause the current execution a given number of seconds.
     * @param seconds The given number of seconds to pause the current execution.
     */
    BrowserAction.prototype.sleep = function (seconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, browser.pause(seconds * 1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generic method to pause the current execution a given number of seconds.
     * @param seconds The given number of seconds to pause the current execution.
    */
    BrowserAction.prototype.sleepMilis = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, browser.pause(milliseconds)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Make GET request and return the given Object type as response.
     * @param url The url to which the POST request is to be made.
     * @param payload The data to be sent to the server.
     * @param log External log object to log any errors to the caller.
    */
    BrowserAction.prototype.getRequest = function (url, log) {
        if (log === void 0) { log = this.log; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, status_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get(url, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        _a = _b.sent(), data = _a.data, status_1 = _a.status;
                        log.info("GET Response status: " + status_1);
                        if (status_1 === 200) {
                            log.info("GET Response: " + JSON.stringify(data));
                            return [2 /*return*/, data];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        if (axios_1["default"].isAxiosError(error_1)) {
                            log.error("GET Error message: " + error_1.message);
                            log.error("GET Error: " + JSON.stringify(error_1));
                        }
                        else {
                            log.error("GET Unexpected error: " + JSON.stringify(error_1));
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Make POST request and return the given Object type as response.
     * @param url The url to which the POST request is to be made.
     * @param payload The data to be sent to the server.
     * @param log External log object to log any errors to the caller.
    */
    BrowserAction.prototype.postRequest = function (url, payload, log) {
        if (log === void 0) { log = this.log; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, status_2, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post(url, payload, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        _a = _b.sent(), data = _a.data, status_2 = _a.status;
                        log.info("POST Response status: " + status_2);
                        if (status_2 === 200) {
                            log.info("POST Response: " + JSON.stringify(data));
                            return [2 /*return*/, data];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        if (axios_1["default"].isAxiosError(error_2)) {
                            log.error("POST Error message: " + error_2.message);
                            log.error("POST Error: " + JSON.stringify(error_2));
                        }
                        else {
                            log.error("POST Unexpected error: " + JSON.stringify(error_2));
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BrowserAction;
}());
exports.BrowserAction = BrowserAction;
