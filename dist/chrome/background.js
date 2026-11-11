"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module) {
      (function(global, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
        "use strict";
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    }
  });

  // src/core/protector.ts
  var DEFAULT_TOKEN_FORMAT = "double-brace";
  var NUMBER_CORE = "(?:\\d{1,3}(?:[ \\u00A0\\u202F.,'’]\\d{3})+(?:[.,]\\d{1,4})?|\\d+(?:[.,]\\d{1,4})?)";
  var CURRENCY_CORE = "(?:F[ \\u00A0\\u202F]?CFA|FCFA|XAF|XOF|CFA|EUR|USD|€|\\$)";
  var PROTECTION_PATTERNS = [
    // 0. Jetons déjà protégés ({{1}} ou <x id="1"/>)
    {
      priority: 0,
      regex: /\{\{\d+\}\}|<x\s+id="\d+"\s*\/>/g
    },
    // 1. URL et adresses e-mail
    {
      priority: 1,
      regex: /https?:\/\/[^\s<>"{}|\\^`\[\]]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      trimTrailingPunct: true
    },
    // 2. Identifiants de type IBAN / numéro de compte / référence (ex. "CM21 1000 2000 3000", "REF-2026-00042", "TX9F3A")
    {
      priority: 2,
      regex: new RegExp(
        [
          "\\b[A-Z]{2}\\d{2}(?:[ \\u00A0\\u202F-]?[A-Z0-9]{4}){2,7}(?:[ \\u00A0\\u202F-]?[A-Z0-9]{1,4})?\\b",
          "\\b(?:REF|TX|TRX|ID|ACC|CPT|OP)[-_:/][A-Z0-9]{2,}(?:[-_][A-Z0-9]+)*\\b",
          "\\b(?=[A-Z0-9-]*[A-Z])(?=[A-Z0-9-]*\\d)(?!\\d{1,2}[hH]\\d{2}\\b)[A-Z0-9]{3,}(?:-[A-Z0-9]+)+\\b",
          "\\b(?=[A-Z0-9]*[A-Z])(?=[A-Z0-9]*\\d)(?!\\d{1,2}[hH]\\d{2}\\b)[A-Z0-9]{5,}\\b"
        ].join("|"),
        "g"
      )
    },
    // 3. Montants avec devise (devise avant ou après le nombre, séparateurs d'espaces y compris U+00A0 et U+202F)
    // Placé juste avant les téléphones pour éviter que "600 000 FCFA" ne soit capturé comme préfixe téléphonique.
    {
      priority: 3,
      regex: new RegExp(
        [
          `(?:[+\\-−][ \\u00A0\\u202F]?)?${NUMBER_CORE}[ \\u00A0\\u202F]*${CURRENCY_CORE}(?![a-zA-Z])`,
          `(?:[+\\-−][ \\u00A0\\u202F]?)?${CURRENCY_CORE}[ \\u00A0\\u202F]*${NUMBER_CORE}\\b`
        ].join("|"),
        "g"
      )
    },
    // 4. Numéros de téléphone (ex. "+237 6 77 12 34 56", "677123456", "6 77 12 34 56")
    {
      priority: 4,
      regex: new RegExp(
        [
          "(?:\\+\\d{1,3}|\\b00\\d{1,3})(?:[ \\u00A0\\u202F.-]?\\d{1,4}){2,6}\\b",
          "\\b[26]\\d{2}(?:[ \\u00A0\\u202F.-]\\d{2}){3}\\b",
          "\\b[26][ \\u00A0\\u202F.-]\\d{2}(?:[ \\u00A0\\u202F.-]\\d{2}){3}\\b",
          "\\b0\\d(?:[ \\u00A0\\u202F.-]\\d{2}){4}\\b",
          "\\b\\d{9,15}\\b"
        ].join("|"),
        "g"
      )
    },
    // 5. Dates et heures (ex. 12/03/2026, 2026-03-12, 14:30, 22h00, 10:00 PM)
    {
      priority: 5,
      regex: /\b(?:\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}|\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}|\d{1,2}(?::\d{2}(?::\d{2})?(?:[ \u00A0\u202F]?[APap][Mm])?|[hH]\d{2}))\b/g
    },
    // 6. Pourcentages (ex. 1,5 %, 1.5%)
    {
      priority: 6,
      regex: new RegExp(`(?:[+\\-−][ \\u00A0\\u202F]?)?${NUMBER_CORE}[ \\u00A0\\u202F]*%`, "g")
    },
    // 7. Tout autre groupe de chiffres (nombre générique avec séparateurs)
    {
      priority: 7,
      regex: new RegExp(`(?:[+\\-−])?${NUMBER_CORE}`, "g")
    }
  ];
  function formatToken(index1Based, format = DEFAULT_TOKEN_FORMAT) {
    if (format === "xml-tag") {
      return `<x id="${index1Based}"/>`;
    }
    return `{{${index1Based}}}`;
  }
  function overlaps(a, b) {
    return a.start < b.end && b.start < a.end;
  }
  function protect(text, format = DEFAULT_TOKEN_FORMAT) {
    if (!text) {
      return { text: "", tokens: [] };
    }
    const acceptedSpans = [];
    for (const pattern of PROTECTION_PATTERNS) {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        let value = match[0];
        const start = match.index;
        if (pattern.trimTrailingPunct) {
          const trimmed = value.replace(/[.,;:!?)\]]+$/, "");
          if (trimmed.length > 0) {
            value = trimmed;
          }
        }
        const end = start + value.length;
        const candidate = {
          start,
          end,
          value,
          priority: pattern.priority,
          existingToken: pattern.priority === 0
        };
        const hasConflict = acceptedSpans.some((existing) => overlaps(existing, candidate));
        if (!hasConflict) {
          acceptedSpans.push(candidate);
        }
      }
    }
    acceptedSpans.sort((a, b) => a.start - b.start);
    const tokens = [];
    let cursor = 0;
    let resultText = "";
    for (const span of acceptedSpans) {
      resultText += text.slice(cursor, span.start);
      if (span.existingToken) {
        resultText += span.value;
      } else {
        tokens.push(span.value);
        resultText += formatToken(tokens.length, format);
      }
      cursor = span.end;
    }
    resultText += text.slice(cursor);
    return {
      text: resultText,
      tokens
    };
  }

  // src/shared/polyfill-env.ts
  function ensureExtensionEnv() {
    const g = globalThis;
    if (g.chrome?.runtime?.id) {
      return;
    }
    const memoryStore = {};
    const storageListeners = /* @__PURE__ */ new Set();
    const messageListeners = /* @__PURE__ */ new Set();
    const mockBrowser = {
      runtime: {
        id: "linguafin-test-env",
        async sendMessage(message) {
          for (const listener of messageListeners) {
            const resp = await listener(message, {});
            if (resp !== void 0) {
              return resp;
            }
          }
          return void 0;
        },
        onMessage: {
          addListener(cb) {
            messageListeners.add(cb);
          },
          removeListener(cb) {
            messageListeners.delete(cb);
          }
        }
      },
      storage: {
        local: {
          async get(keys) {
            if (keys === null || keys === void 0) {
              return { ...memoryStore };
            }
            if (typeof keys === "string") {
              return keys in memoryStore ? { [keys]: memoryStore[keys] } : {};
            }
            if (Array.isArray(keys)) {
              const out2 = {};
              for (const k of keys) {
                if (k in memoryStore) {
                  out2[k] = memoryStore[k];
                }
              }
              return out2;
            }
            const out = {};
            for (const [k, defVal] of Object.entries(keys)) {
              out[k] = k in memoryStore ? memoryStore[k] : defVal;
            }
            return out;
          },
          async set(items) {
            const changes = {};
            for (const [k, v] of Object.entries(items)) {
              changes[k] = { oldValue: memoryStore[k], newValue: v };
              memoryStore[k] = v;
            }
            for (const listener of storageListeners) {
              listener(changes, "local");
            }
          },
          async clear() {
            for (const k of Object.keys(memoryStore)) {
              delete memoryStore[k];
            }
          }
        },
        onChanged: {
          addListener(cb) {
            storageListeners.add(cb);
          },
          removeListener(cb) {
            storageListeners.delete(cb);
          }
        }
      },
      tabs: {
        async query() {
          return [{ id: 1, url: "http://localhost:5173/account.html" }];
        },
        async sendMessage(_tabId, message) {
          for (const listener of messageListeners) {
            const resp = await listener(message, {});
            if (resp !== void 0) {
              return resp;
            }
          }
          return void 0;
        }
      },
      i18n: {
        getUILanguage() {
          return "fr";
        }
      }
    };
    g.chrome = mockBrowser;
    g.browser = mockBrowser;
  }
  ensureExtensionEnv();

  // src/shared/ext.ts
  var import_webextension_polyfill = __toESM(require_browser_polyfill(), 1);
  function isExtensionContextValid() {
    try {
      const g = globalThis;
      const id = g.chrome?.runtime?.id ?? g.browser?.runtime?.id;
      return typeof id === "string" && id.length > 0;
    } catch {
      return false;
    }
  }

  // src/core/providers/google-translate-provider.ts
  var GOOGLE_CLIENTS5_ENDPOINT = "https://clients5.google.com/translate_a/t";
  var GOOGLE_GTX_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
  var REQUEST_TIMEOUT_MS = 6e3;
  function normalizeProtectedTokens(translated) {
    return translated.replace(/\{\s*\{\s*(\d+)\s*\}\s*\}/g, "{{$1}}").replace(/<\s*x\s+id\s*=\s*["'](\d+)["']\s*\/\s*>/gi, '<x id="$1"/>');
  }
  function extractGoogleTranslateResponse(data) {
    if (typeof data === "string") {
      return data.trim();
    }
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }
    if (typeof data[0] === "string") {
      return data.filter((c) => typeof c === "string").join("");
    }
    if (Array.isArray(data[0])) {
      const sub = data[0];
      if (typeof sub[0] === "string") {
        return sub[0];
      }
      if (Array.isArray(sub[0]) && typeof sub[0][0] === "string") {
        const chunks = [];
        for (const seg of data[0]) {
          if (Array.isArray(seg) && typeof seg[0] === "string") {
            chunks.push(seg[0]);
          }
        }
        return chunks.length > 0 ? chunks.join("") : null;
      }
    }
    return null;
  }
  async function fetchGoogleTranslateDirect(protectedText, src, tgt) {
    if (!protectedText || !protectedText.trim()) {
      return null;
    }
    const sl = src && src !== "unknown" ? src : "auto";
    const clients5Url = `${GOOGLE_CLIENTS5_ENDPOINT}?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tgt)}&q=${encodeURIComponent(protectedText)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(clients5Url, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*"
        },
        signal: controller.signal
      });
      if (response.ok) {
        const data = await response.json();
        const extracted = extractGoogleTranslateResponse(data);
        if (extracted && extracted.length > 0) {
          return normalizeProtectedTokens(extracted);
        }
      }
    } catch {
    } finally {
      clearTimeout(timer);
    }
    const gtxController = new AbortController();
    const gtxTimer = setTimeout(() => gtxController.abort(), REQUEST_TIMEOUT_MS);
    try {
      const gtxUrl = `${GOOGLE_GTX_ENDPOINT}?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tgt)}&dt=t&q=${encodeURIComponent(protectedText)}`;
      const response = await fetch(gtxUrl, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*"
        },
        signal: gtxController.signal
      });
      if (response.ok) {
        const data = await response.json();
        const extracted = extractGoogleTranslateResponse(data);
        if (extracted && extracted.length > 0) {
          return normalizeProtectedTokens(extracted);
        }
      }
      return null;
    } catch {
      return null;
    } finally {
      clearTimeout(gtxTimer);
    }
  }

  // src/core/providers/model-server-provider.ts
  var MODEL_SERVER_TIMEOUT_MS = 8e3;
  async function fetchModelServerDirect(protectedText, src, tgt, serverUrl, apiKey) {
    const endpoint = serverUrl.trim();
    if (!endpoint || !/^https?:\/\//i.test(endpoint)) {
      return null;
    }
    const placeholders = protectedText.match(/\{\{\d+\}\}/g) ?? [];
    const bodyPayload = {
      text: protectedText,
      source_lang: src && src !== "unknown" ? src : "auto",
      target_lang: tgt,
      domain: "finance",
      placeholders,
      q: protectedText,
      source: src && src !== "unknown" ? src : "auto",
      target: tgt
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    if (apiKey && apiKey.trim().length > 0) {
      headers.Authorization = `Bearer ${apiKey.trim()}`;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), MODEL_SERVER_TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyPayload),
        signal: controller.signal
      });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      const rawTranslated = data.translated_text ?? data.translatedText ?? data.translation ?? data.output ?? data.result;
      if (typeof rawTranslated !== "string" || rawTranslated.trim().length === 0) {
        return null;
      }
      return normalizeProtectedTokens(rawTranslated);
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  // src/shared/messages.ts
  function isExtensionMessage(msg) {
    if (!msg || typeof msg !== "object") {
      return false;
    }
    const t = msg.type;
    return t === "GET_STATUS" || t === "TOGGLE_VIEW" || t === "RETRANSLATE" || t === "REMOTE_TRANSLATE" || t === "GOOGLE_TRANSLATE" || t === "MODEL_SERVER_TRANSLATE";
  }

  // src/shared/settings.ts
  var STORAGE_KEY = "linguafin_settings";
  var CURRENT_SETTINGS_VERSION = 2;
  var DEFAULT_SETTINGS = {
    enabledHosts: ["*"],
    mode: "auto",
    targetLang: "en",
    showBadge: true,
    remoteEnabled: false,
    remoteUrl: "",
    modelServerEnabled: false,
    modelServerUrl: "",
    modelServerApiKey: "",
    debug: false,
    v: CURRENT_SETTINGS_VERSION
  };
  async function getSettings() {
    if (!isExtensionContextValid()) {
      return { ...DEFAULT_SETTINGS, enabledHosts: [...DEFAULT_SETTINGS.enabledHosts] };
    }
    try {
      const raw = await import_webextension_polyfill.default.storage.local.get(STORAGE_KEY);
      const stored = raw?.[STORAGE_KEY];
      if (!stored || typeof stored !== "object") {
        return { ...DEFAULT_SETTINGS, enabledHosts: [...DEFAULT_SETTINGS.enabledHosts] };
      }
      let enabledHosts = Array.isArray(stored.enabledHosts) ? stored.enabledHosts.filter((h) => typeof h === "string") : [...DEFAULT_SETTINGS.enabledHosts];
      if (stored.v !== CURRENT_SETTINGS_VERSION && !enabledHosts.includes("*")) {
        enabledHosts = ["*", ...enabledHosts];
      }
      return {
        enabledHosts,
        mode: stored.mode === "manual" ? "manual" : "auto",
        targetLang: typeof stored.targetLang === "string" && stored.targetLang ? stored.targetLang : "en",
        showBadge: typeof stored.showBadge === "boolean" ? stored.showBadge : true,
        remoteEnabled: typeof stored.remoteEnabled === "boolean" ? stored.remoteEnabled : false,
        remoteUrl: typeof stored.remoteUrl === "string" ? stored.remoteUrl.trim() : "",
        modelServerEnabled: typeof stored.modelServerEnabled === "boolean" ? stored.modelServerEnabled : false,
        modelServerUrl: typeof stored.modelServerUrl === "string" ? stored.modelServerUrl.trim() : "",
        modelServerApiKey: typeof stored.modelServerApiKey === "string" ? stored.modelServerApiKey.trim() : "",
        debug: typeof stored.debug === "boolean" ? stored.debug : false,
        v: CURRENT_SETTINGS_VERSION
      };
    } catch {
      return { ...DEFAULT_SETTINGS, enabledHosts: [...DEFAULT_SETTINGS.enabledHosts] };
    }
  }

  // src/background/index.ts
  var FETCH_TIMEOUT_MS = 4e3;
  async function handleGoogleTranslateRequest(msg) {
    const { protectedText, src, tgt } = msg.payload;
    const safetyCheck = protect(protectedText);
    if (safetyCheck.tokens.length > 0) {
      return { ok: false, error: "unprotected-sensitive-data-blocked" };
    }
    const translatedText = await fetchGoogleTranslateDirect(protectedText, src, tgt);
    if (!translatedText) {
      return { ok: false, error: "google-translate-failed" };
    }
    return {
      ok: true,
      translatedText
    };
  }
  async function handleModelServerTranslateRequest(msg) {
    const settings = await getSettings();
    const { protectedText, src, tgt } = msg.payload;
    const serverUrl = (msg.payload.serverUrl || settings.modelServerUrl || "").trim();
    const apiKey = (msg.payload.apiKey || settings.modelServerApiKey || "").trim();
    if (!serverUrl || !/^https?:\/\//i.test(serverUrl)) {
      return { ok: false, error: "invalid-model-server-endpoint" };
    }
    const safetyCheck = protect(protectedText);
    if (safetyCheck.tokens.length > 0) {
      return { ok: false, error: "unprotected-sensitive-data-blocked" };
    }
    const translatedText = await fetchModelServerDirect(
      protectedText,
      src,
      tgt,
      serverUrl,
      apiKey || void 0
    );
    if (!translatedText) {
      return { ok: false, error: "model-server-failed" };
    }
    return {
      ok: true,
      translatedText
    };
  }
  async function handleRemoteTranslateRequest(msg) {
    const settings = await getSettings();
    if (!settings.remoteEnabled) {
      return { ok: false, error: "remote-disabled" };
    }
    const endpoint = (msg.payload.remoteUrl || settings.remoteUrl).trim();
    if (!endpoint || !/^https?:\/\//i.test(endpoint)) {
      return { ok: false, error: "invalid-endpoint" };
    }
    const { protectedText, src, tgt } = msg.payload;
    const safetyCheck = protect(protectedText);
    if (safetyCheck.tokens.length > 0) {
      return { ok: false, error: "unprotected-sensitive-data-blocked" };
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: protectedText,
          source: src,
          target: tgt,
          format: "text"
        }),
        signal: controller.signal
      });
      if (!response.ok) {
        return { ok: false, error: `http-${response.status}` };
      }
      const data = await response.json();
      if (typeof data?.translatedText !== "string") {
        return { ok: false, error: "invalid-response-payload" };
      }
      return {
        ok: true,
        translatedText: data.translatedText
      };
    } catch {
      return { ok: false, error: "network-or-timeout-error" };
    } finally {
      clearTimeout(timer);
    }
  }
  function registerBackgroundListeners() {
    import_webextension_polyfill.default.runtime.onMessage.addListener((msg) => {
      if (!isExtensionMessage(msg)) {
        return void 0;
      }
      if (msg.type === "GOOGLE_TRANSLATE") {
        return handleGoogleTranslateRequest(msg);
      }
      if (msg.type === "MODEL_SERVER_TRANSLATE") {
        return handleModelServerTranslateRequest(msg);
      }
      if (msg.type === "REMOTE_TRANSLATE") {
        return handleRemoteTranslateRequest(msg);
      }
      return void 0;
    });
    try {
      import_webextension_polyfill.default.runtime.onInstalled?.addListener(() => {
        void reinjectContentScriptsInOpenTabs();
      });
    } catch {
    }
  }
  async function reinjectContentScriptsInOpenTabs() {
    try {
      const tabs = await import_webextension_polyfill.default.tabs.query({ url: ["http://*/*", "https://*/*"] });
      for (const tab of tabs) {
        if (typeof tab.id === "number") {
          try {
            await import_webextension_polyfill.default.scripting?.executeScript?.({
              target: { tabId: tab.id },
              files: ["content/index.js"]
            });
          } catch {
          }
        }
      }
    } catch {
    }
  }
  var isTestEnv = typeof process !== "undefined" && Boolean(process.env?.VITEST);
  if (!isTestEnv) {
    registerBackgroundListeners();
  }
})();
//# sourceMappingURL=background.js.map
