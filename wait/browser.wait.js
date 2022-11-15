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
var BrowserWait = /** @class */ (function () {
    function BrowserWait() {
    }
    /**
     * Generic method to wait for an element to exist in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be present in SUT, default being 1 minute.
    */
    BrowserWait.prototype.untilElementExists = function (locator, timeout) {
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
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generic method to wait for an element to be visible in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be visible, default being 1 minute.
    */
    BrowserWait.prototype.untilElementIsVisible = function (locator, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, element.waitForDisplayed({ timeout: timeout * 1000 })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Just wait for element to be visible without asserting it.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be visible, default being 1 minute.
    */
    BrowserWait.prototype.forElementToBeVisible = function (locator, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var count, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeout = timeout * 1000;
                        count = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        element = $(locator);
                        if (element.isDisplayed()) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, browser.pause(500)];
                    case 2:
                        _a.sent();
                        if ((count++ * 500) >= timeout) {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generic method to wait until a given element is no longer visible on the screen.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout The timeout in seconds until the wait fails.
    */
    BrowserWait.prototype.untilElementIsInvisible = function (locator, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var elementInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        elementInstance = _a.sent();
                        return [4 /*yield*/, elementInstance.waitForDisplayed({ timeout: timeout * 1000, reverse: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generic method to wait for an element to be clickable in SUT.
     * @param locator Element locator as string, could be a css locator.
     * @param timeout Timeout to wait for element to be clickable, default being 1 minute.
    */
    BrowserWait.prototype.untilElementIsClickable = function (locator, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $(locator)];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, element.waitForEnabled({ timeout: timeout * 1000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, element.waitForClickable({ timeout: timeout * 1000 })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wait until a certain number of elements appear on screen.
     * @param locator Element locator as string, could be a css locator.
    */
    BrowserWait.prototype.elementCount = function (locator, count, timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var elements, loopCounter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, $$(locator)];
                    case 1:
                        elements = _a.sent();
                        loopCounter = 0;
                        _a.label = 2;
                    case 2:
                        if (!(elements.length < count)) return [3 /*break*/, 5];
                        return [4 /*yield*/, browser.pause(500)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, $$(locator)];
                    case 4:
                        elements = _a.sent();
                        if (loopCounter === timeout) {
                            return [3 /*break*/, 5];
                        }
                        loopCounter++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Wait until browser starts loading and then stop loading.
    */
    BrowserWait.prototype.untilLoaded = function (timeout) {
        if (timeout === void 0) { timeout = 60; }
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                count = timeout * 1000;
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
                return [2 /*return*/];
            });
        });
    };
    return BrowserWait;
}());
exports.BrowserWait = BrowserWait;
