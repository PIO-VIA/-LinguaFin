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

  // src/core/detector.ts
  var FR_STOPWORDS = /* @__PURE__ */ new Set([
    "le",
    "la",
    "les",
    "un",
    "une",
    "des",
    "de",
    "du",
    "au",
    "aux",
    "et",
    "ou",
    "est",
    "sont",
    "été",
    "être",
    "avoir",
    "ai",
    "as",
    "avons",
    "avez",
    "ont",
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "on",
    "mon",
    "ma",
    "mes",
    "ton",
    "ta",
    "tes",
    "son",
    "sa",
    "ses",
    "notre",
    "nos",
    "votre",
    "vos",
    "leur",
    "leurs",
    "ce",
    "cet",
    "cette",
    "ces",
    "celui",
    "celle",
    "ceux",
    "qui",
    "que",
    "quoi",
    "dont",
    "où",
    "quel",
    "quelle",
    "quels",
    "quelles",
    "dans",
    "sur",
    "sous",
    "avec",
    "sans",
    "pour",
    "par",
    "vers",
    "chez",
    "entre",
    "avant",
    "après",
    "depuis",
    "pendant",
    "ne",
    "pas",
    "plus",
    "jamais",
    "rien",
    "aucun",
    "aucune",
    "mais",
    "donc",
    "or",
    "ni",
    "car",
    "comme",
    "si",
    "quand",
    "lorsque",
    "tout",
    "tous",
    "toute",
    "toutes",
    "autre",
    "autres",
    "même",
    "mêmes",
    "ici",
    "là",
    "très",
    "bien",
    "peu",
    "trop",
    "aussi",
    "encore",
    "déjà",
    "toujours",
    "solde",
    "compte",
    "comptes",
    "envoyer",
    "argent",
    "allez",
    "frais",
    "bénéficiaire",
    "beneficiaire",
    "opération",
    "operation",
    "numéro",
    "numero",
    "téléphone",
    "telephone",
    "montant",
    "vérifiez",
    "verifiez",
    "partagez",
    "code",
    "irréversible",
    "irreversible",
    "plafond",
    "journalier",
    "débité",
    "debite",
    "insuffisant",
    "invalide",
    "expirée",
    "expiree",
    "connexion",
    "identifiant",
    "merci",
    "accueil",
    "retour",
    "confirmer",
    "valider",
    "annuler",
    "historique",
    "dernières",
    "dernieres",
    "opérations",
    "operations",
    "virement",
    "virements",
    "retrait",
    "retraits",
    "dépôt",
    "depot",
    "paiement",
    "paiements",
    "facture",
    "soir",
    "prévue",
    "prevue",
    "indisponible",
    "disponible",
    "sera",
    "activités",
    "activite",
    "inhabituelle",
    "détectée",
    "detectee",
    "veuillez",
    "saisir",
    "entrez",
    "choisir",
    "langue",
    "simulation",
    "réelle",
    "reelle",
    "déconnexion",
    "deconnexion",
    "paramètres",
    "parametres",
    "profil",
    "tableau",
    "bord",
    "rechercher",
    "filtrer",
    "trier",
    "télécharger",
    "imprimer",
    "enregistrer",
    "modifier",
    "supprimer",
    "ajouter",
    "créer",
    "continuer",
    "suivant",
    "précédent",
    "bonjour",
    "bienvenue",
    "erreur",
    "succès",
    "attention",
    "avertissement",
    "sécurité",
    "securite",
    "banque",
    "bancaire",
    "carte",
    "cartes",
    "épargne",
    "crédit",
    "prêt",
    "relevé",
    "reçu",
    "aujourd'hui",
    "hier",
    "demain",
    "semaine",
    "mois",
    "année",
    "client",
    "espace",
    "utilisateur",
    "nom",
    "prénom",
    "prenom",
    "adresse",
    "ville",
    "pays",
    "motif",
    "étape",
    "etape",
    "champ",
    "champs",
    "obligatoire",
    "obligatoires",
    "requis",
    "valide",
    "invalide",
    "complet",
    "total",
    "devise",
    "destinataire",
    "expéditeur",
    "expediteur",
    "titulaire",
    "référence",
    "reference",
    "statut"
  ]);
  var EN_STOPWORDS = /* @__PURE__ */ new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "if",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "can",
    "will",
    "just",
    "should",
    "now",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "would",
    "could",
    "ought",
    "shall",
    "may",
    "might",
    "must",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "its",
    "our",
    "their",
    "mine",
    "yours",
    "hers",
    "ours",
    "theirs",
    "this",
    "that",
    "these",
    "those",
    "who",
    "whom",
    "which",
    "what",
    "whose",
    "balance",
    "balances",
    "account",
    "accounts",
    "send",
    "money",
    "fee",
    "fees",
    "recipient",
    "beneficiary",
    "phone",
    "number",
    "amount",
    "amounts",
    "enter",
    "please",
    "never",
    "share",
    "secret",
    "password",
    "warning",
    "cannot",
    "undone",
    "daily",
    "limit",
    "limits",
    "debited",
    "insufficient",
    "invalid",
    "expired",
    "login",
    "sign",
    "thank",
    "thanks",
    "home",
    "back",
    "confirm",
    "submit",
    "cancel",
    "history",
    "recent",
    "transactions",
    "transfer",
    "transfers",
    "withdrawal",
    "withdrawals",
    "deposit",
    "deposits",
    "payment",
    "payments",
    "tonight",
    "scheduled",
    "unavailable",
    "available",
    "unusual",
    "activity",
    "detected",
    "check",
    "verify",
    "dashboard",
    "settings",
    "profile",
    "search",
    "filter",
    "sort",
    "download",
    "print",
    "save",
    "edit",
    "delete",
    "add",
    "create",
    "continue",
    "next",
    "previous",
    "hello",
    "welcome",
    "error",
    "success",
    "security",
    "bank",
    "banking",
    "card",
    "cards",
    "savings",
    "loan",
    "loans",
    "statement",
    "receipt",
    "today",
    "yesterday",
    "tomorrow",
    "week",
    "month",
    "year",
    "customer",
    "user",
    "users",
    "name",
    "first",
    "last",
    "address",
    "city",
    "country",
    "reason",
    "step",
    "field",
    "fields",
    "required",
    "valid",
    "full",
    "currency",
    "sender",
    "holder",
    "status",
    "loading",
    "submitting"
  ]);
  var NEUTRAL_TOKENS = /* @__PURE__ */ new Set([
    "fcfa",
    "cfa",
    "xaf",
    "xof",
    "eur",
    "usd",
    "id",
    "iban",
    "ref",
    "tx",
    "am",
    "pm",
    "ok"
  ]);
  var FR_DIACRITIC_REGEX = /[éèêëàâçùûüîïôœæ]/gi;
  var FR_CONTRACTION_REGEX = /\b(?:l|d|qu|n|s|c|j|m|t)['’‘`][a-zàâäæçéèêëîïôœùûüÿ]/gi;
  var EN_CONTRACTION_REGEX = /\b(?:[a-z]+['’‘`]s|don['’‘`]t|can['’‘`]t|won['’‘`]t|isn['’‘`]t|aren['’‘`]t|you['’‘`]re|we['’‘`]re|it['’‘`]s)\b/gi;
  var DEFAULT_MARGIN_THRESHOLD = 0.15;
  var MIN_WORDS_FOR_SEGMENT = 3;
  function extractWords(text) {
    const withoutPlaceholders = text.replace(/\{\{\d+\}\}/g, " ").replace(/<x\s+id="\d+"\s*\/>/gi, " ").toLowerCase();
    const normalizedPossessive = withoutPlaceholders.replace(/([a-z]{2,})['’‘`]s\b/gi, "$1");
    const rawWords = normalizedPossessive.match(/[a-zàâäæçéèêëîïôœùûüÿ]+/gi) ?? [];
    return rawWords.filter((w) => {
      if (NEUTRAL_TOKENS.has(w)) {
        return false;
      }
      if (w.length === 1 && w !== "a" && w !== "à" && w !== "y" && w !== "i") {
        return false;
      }
      return true;
    });
  }
  function computeLanguageScores(text) {
    const words = extractWords(text);
    const wordCount = words.length;
    if (wordCount === 0) {
      return { words, scoreFr: 0, scoreEn: 0 };
    }
    let frHits = 0;
    let enHits = 0;
    for (const word of words) {
      const cleanWord = word.toLowerCase();
      if (FR_STOPWORDS.has(cleanWord)) {
        frHits += 1;
      }
      if (EN_STOPWORDS.has(cleanWord)) {
        enHits += 1;
      }
    }
    const diacriticMatches = text.match(FR_DIACRITIC_REGEX)?.length ?? 0;
    const frContractions = text.match(FR_CONTRACTION_REGEX)?.length ?? 0;
    const enContractions = text.match(EN_CONTRACTION_REGEX)?.length ?? 0;
    const frBonus = Math.min(0.4, diacriticMatches * 0.1 + frContractions * 0.14);
    const enBonus = Math.min(0.3, enContractions * 0.14);
    return {
      words,
      scoreFr: frHits / wordCount + frBonus,
      scoreEn: enHits / wordCount + enBonus
    };
  }
  var HeuristicDetector = class {
    constructor(threshold = DEFAULT_MARGIN_THRESHOLD) {
      this.threshold = threshold;
    }
    detect(text) {
      if (!text || typeof text !== "string") {
        return { lang: "unknown", confidence: 0 };
      }
      const { words, scoreFr, scoreEn } = computeLanguageScores(text);
      if (words.length < MIN_WORDS_FOR_SEGMENT) {
        return { lang: "unknown", confidence: 0 };
      }
      const maxScore = Math.max(scoreFr, scoreEn);
      const margin = Math.abs(scoreFr - scoreEn);
      if (maxScore === 0 || margin < this.threshold) {
        return {
          lang: "unknown",
          confidence: Number(Math.min(0.4, margin).toFixed(3))
        };
      }
      const bestLang = scoreFr > scoreEn ? "fr" : "en";
      const rawConfidence = Math.min(
        1,
        margin / Math.max(0.4, maxScore) * 0.65 + margin * 0.7
      );
      const confidence = Number(Math.max(0.15, Math.min(1, rawConfidence)).toFixed(3));
      return { lang: bestLang, confidence };
    }
  };
  var activeDetector = new HeuristicDetector();
  function detect(text) {
    return activeDetector.detect(text);
  }
  function detectWithShortWords(text) {
    const std = detect(text);
    if (std.lang !== "unknown") {
      return std;
    }
    const { words, scoreFr, scoreEn } = computeLanguageScores(text);
    if (words.length === 0) {
      return { lang: "unknown", confidence: 0 };
    }
    const margin = Math.abs(scoreFr - scoreEn);
    if (margin < 0.25) {
      return { lang: "unknown", confidence: 0 };
    }
    return {
      lang: scoreFr > scoreEn ? "fr" : "en",
      confidence: Number(Math.min(0.9, margin).toFixed(3))
    };
  }
  function detectPageLanguage(texts, htmlLang) {
    const weights = { fr: 0, en: 0 };
    let totalWeight = 0;
    let sampled = 0;
    for (const raw of texts) {
      if (sampled >= 400) {
        break;
      }
      const { words, scoreFr, scoreEn } = computeLanguageScores(raw);
      if (words.length === 0) {
        continue;
      }
      sampled += 1;
      const margin2 = Math.abs(scoreFr - scoreEn);
      if (margin2 < 0.15) {
        continue;
      }
      const lang = scoreFr > scoreEn ? "fr" : "en";
      const weight = words.length >= 3 ? words.length * 1.5 : words.length * 0.8;
      const confidence2 = Math.min(1, margin2 + 0.3);
      totalWeight += weight;
      weights[lang] = (weights[lang] ?? 0) + weight * confidence2;
    }
    const textWeight = totalWeight;
    if (htmlLang && textWeight < 4) {
      const cleanHtmlLang = htmlLang.trim().toLowerCase().slice(0, 2);
      if (cleanHtmlLang === "fr" || cleanHtmlLang === "en") {
        const hintWeight = textWeight === 0 ? 1.5 : 0.5;
        weights[cleanHtmlLang] = (weights[cleanHtmlLang] ?? 0) + hintWeight;
        totalWeight += hintWeight;
      }
    }
    if (totalWeight === 0) {
      return { lang: "unknown", confidence: 0 };
    }
    const frScore = (weights.fr ?? 0) / totalWeight;
    const enScore = (weights.en ?? 0) / totalWeight;
    const maxScore = Math.max(frScore, enScore);
    const margin = Math.abs(frScore - enScore);
    if (maxScore === 0 || margin < 0.08) {
      return { lang: "unknown", confidence: Number(margin.toFixed(3)) };
    }
    const bestLang = frScore > enScore ? "fr" : "en";
    if (textWeight < 3) {
      return { lang: bestLang, confidence: 0.55 };
    }
    const directionalRatio = Math.abs((weights.fr ?? 0) - (weights.en ?? 0)) / Math.max(0.5, (weights.fr ?? 0) + (weights.en ?? 0));
    const confidence = Number(
      Math.min(1, Math.max(0.65, directionalRatio * 0.8 + Math.min(0.2, maxScore * 0.4))).toFixed(3)
    );
    return { lang: bestLang, confidence };
  }

  // src/core/cache.ts
  var TranslationCache = class _TranslationCache {
    constructor(maxEntries = 2e3) {
      this.maxEntries = Math.max(1, maxEntries);
      this.store = /* @__PURE__ */ new Map();
    }
    /**
     * Construit une clé unique à partir de la langue source, de la langue cible et du texte protégé.
     */
    static makeKey(src, tgt, protectedText) {
      return `${src}::${tgt}::${protectedText}`;
    }
    /**
     * Récupère une entrée du cache et rafraîchit sa position LRU.
     */
    get(src, tgt, protectedText) {
      const key = _TranslationCache.makeKey(src, tgt, protectedText);
      const val = this.store.get(key);
      if (val === void 0) {
        return void 0;
      }
      this.store.delete(key);
      this.store.set(key, val);
      return val;
    }
    /**
     * Enregistre une traduction de texte protégé dans le cache LRU.
     * Refuse par sécurité de mettre en cache si un texte non protégé suspect est détecté par erreur.
     */
    set(src, tgt, protectedText, translatedWithTokens) {
      const key = _TranslationCache.makeKey(src, tgt, protectedText);
      if (this.store.has(key)) {
        this.store.delete(key);
      } else if (this.store.size >= this.maxEntries) {
        const oldestKey = this.store.keys().next().value;
        if (oldestKey !== void 0) {
          this.store.delete(oldestKey);
        }
      }
      this.store.set(key, translatedWithTokens);
    }
    /**
     * Vide intégralement le cache mémoire.
     */
    clear() {
      this.store.clear();
    }
    /**
     * Retourne le nombre actuel d'entrées en cache.
     */
    get size() {
      return this.store.size;
    }
  };

  // src/core/classifier.ts
  var CRITICAL_KEYWORDS = [
    // Français
    "code secret",
    "pin",
    "mot de passe",
    "ne partagez jamais",
    "arnaque",
    "fraude",
    "irréversible",
    "irreversible",
    "frais",
    "plafond",
    "limite",
    "conditions",
    "confirmer",
    "bénéficiaire",
    "beneficiaire",
    "solde",
    "total débité",
    "total debite",
    "activité inhabituelle",
    "activite inhabituelle",
    "vérifiez le bénéficiaire",
    "verifiez le beneficiaire",
    // Anglais
    "secret code",
    "password",
    "never share",
    "scam",
    "fraud",
    "irreversible",
    "cannot be undone",
    "fee",
    "fees",
    "daily limit",
    "limit",
    "terms",
    "conditions",
    "confirm",
    "beneficiary",
    "recipient",
    "balance",
    "total debited",
    "unusual activity",
    "verify the recipient",
    "check the recipient"
  ];
  function normalizeForKeywordSearch(text) {
    return text.toLowerCase().replace(/[\u00A0\u202F]/g, " ").replace(/['’]/g, "'").replace(/\s+/g, " ").trim();
  }
  function isCriticalSegment(originalText, protectedInput, lexiconMarkedCritical = false) {
    if (lexiconMarkedCritical) {
      return true;
    }
    if (protectedInput.tokens.length > 0) {
      return true;
    }
    const normalized = normalizeForKeywordSearch(originalText);
    for (const keyword of CRITICAL_KEYWORDS) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(?:^|[^a-zàâäæçéèêëîïôœùûüÿ])${escaped}(?:$|[^a-zàâäæçéèêëîïôœùûüÿ])`, "i");
      if (regex.test(normalized)) {
        return true;
      }
    }
    return false;
  }

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
  function restore(translated, tokens) {
    if (!translated || tokens.length === 0) {
      return translated;
    }
    return translated.replace(/\{\{(\d+)\}\}|<x\s+id="(\d+)"\s*\/>/g, (fullMatch, braceIdx, xmlIdx) => {
      const rawIndex = braceIdx ?? xmlIdx;
      const index1Based = Number.parseInt(rawIndex, 10);
      if (Number.isNaN(index1Based) || index1Based < 1 || index1Based > tokens.length) {
        return fullMatch;
      }
      return tokens[index1Based - 1];
    });
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
  async function safeRuntimeSendMessage(message) {
    if (!isExtensionContextValid()) {
      return void 0;
    }
    try {
      return await import_webextension_polyfill.default.runtime.sendMessage(message);
    } catch {
      return void 0;
    }
  }

  // src/core/providers/google-translate-provider.ts
  var GOOGLE_CLIENTS5_ENDPOINT = "https://clients5.google.com/translate_a/t";
  var GOOGLE_GTX_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
  var REQUEST_TIMEOUT_MS = 6e3;
  var UNSUPPORTED_BY_GOOGLE = /* @__PURE__ */ new Set(["wes", "ewo", "dua"]);
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
  var GoogleTranslateProvider = class {
    constructor() {
      this.id = "google-translate";
      this.inFlight = /* @__PURE__ */ new Map();
    }
    canTranslate(src, tgt) {
      if (!tgt || src === tgt) {
        return false;
      }
      if (UNSUPPORTED_BY_GOOGLE.has(tgt) || UNSUPPORTED_BY_GOOGLE.has(src)) {
        return false;
      }
      return true;
    }
    async translate(input, src, tgt, _ctx) {
      if (!input.text || !this.canTranslate(src, tgt)) {
        return null;
      }
      const key = `${src}|${tgt}|${input.text}`;
      const existing = this.inFlight.get(key);
      if (existing) {
        return existing;
      }
      const promise = this.executeTranslation(input.text, src, tgt).finally(() => {
        this.inFlight.delete(key);
      });
      this.inFlight.set(key, promise);
      return promise;
    }
    async executeTranslation(protectedText, src, tgt) {
      const msg = {
        type: "GOOGLE_TRANSLATE",
        payload: {
          protectedText,
          src,
          tgt
        }
      };
      const response = await safeRuntimeSendMessage(msg);
      if (response && response.ok && typeof response.translatedText === "string") {
        return normalizeProtectedTokens(response.translatedText);
      }
      return fetchGoogleTranslateDirect(protectedText, src, tgt);
    }
  };

  // src/lexicon/languages.json
  var languages_default = [
    {
      code: "fr",
      name: "Français",
      nativeName: "Français",
      status: "validated",
      validatedBy: "équipe (langue source)",
      script: "Latn",
      direction: "ltr"
    },
    {
      code: "en",
      name: "English",
      nativeName: "English",
      status: "validated",
      validatedBy: "équipe (langue source)",
      script: "Latn",
      direction: "ltr"
    },
    {
      code: "wes",
      name: "Pidgin camerounais",
      nativeName: "Cameroon Pidgin",
      status: "draft",
      validatedBy: "communauté (brouillon)",
      script: "Latn",
      direction: "ltr"
    },
    {
      code: "ewo",
      name: "Ewondo",
      nativeName: "Ewondo",
      status: "draft",
      validatedBy: "communauté (brouillon)",
      script: "Latn",
      direction: "ltr"
    },
    {
      code: "ff",
      name: "Fulfulde",
      nativeName: "Fulfulde",
      status: "draft",
      validatedBy: "communauté (brouillon)",
      script: "Latn",
      direction: "ltr"
    },
    {
      code: "dua",
      name: "Duala",
      nativeName: "Duala",
      status: "draft",
      validatedBy: "communauté (brouillon)",
      script: "Latn",
      direction: "ltr"
    }
  ];

  // src/lexicon/lexicon.json
  var lexicon_default = [
    {
      id: "common.banner.simulation",
      kind: "warning",
      critical: true,
      text: {
        fr: "SIMULATION - aucune opération réelle",
        en: "SIMULATION - no real transaction"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.app.title",
      kind: "label",
      critical: false,
      text: {
        fr: "SafiPay Cameroun - Services financiers numériques",
        en: "SafiPay Cameroon - Digital Financial Services"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.nav.home",
      kind: "label",
      critical: false,
      text: {
        fr: "Connexion",
        en: "Sign in",
        wes: "Enter for account",
        ewo: "Nyingan",
        ff: "Naatugo",
        dua: "Ingéa"
      },
      status: {
        fr: "validated",
        en: "validated",
        wes: "draft",
        ewo: "draft",
        ff: "draft",
        dua: "draft"
      }
    },
    {
      id: "common.nav.account",
      kind: "label",
      critical: false,
      text: {
        fr: "Mon compte",
        en: "My account",
        wes: "Ma account",
        ewo: "Nkobe wom",
        ff: "Kontu am",
        dua: "Mukanjo msu"
      },
      status: {
        fr: "validated",
        en: "validated",
        wes: "draft",
        ewo: "draft",
        ff: "draft",
        dua: "draft"
      }
    },
    {
      id: "common.nav.transfer",
      kind: "label",
      critical: false,
      text: {
        fr: "Envoyer de l'argent",
        en: "Send money"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.nav.logout",
      kind: "label",
      critical: false,
      text: {
        fr: "Déconnexion",
        en: "Sign out"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.nav.back_account",
      kind: "label",
      critical: false,
      text: {
        fr: "Retour au compte",
        en: "Back to account"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.validate",
      kind: "label",
      critical: false,
      text: {
        fr: "Valider",
        en: "Submit"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.continue",
      kind: "label",
      critical: false,
      text: {
        fr: "Continuer",
        en: "Continue"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.confirm",
      kind: "label",
      critical: true,
      text: {
        fr: "Confirmer le transfert",
        en: "Confirm transfer"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.cancel",
      kind: "label",
      critical: false,
      text: {
        fr: "Annuler",
        en: "Cancel"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.modify",
      kind: "label",
      critical: false,
      text: {
        fr: "Modifier l'opération",
        en: "Edit transaction"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.action.new_transfer",
      kind: "label",
      critical: false,
      text: {
        fr: "Nouveau transfert",
        en: "New transfer"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "common.footer.disclaimer",
      kind: "free",
      critical: false,
      text: {
        fr: "Application bancaire fictive pour le SAFINUM Innovate Challenge. Aucune donnée réelle n'est traitée.",
        en: "Fictional banking application for the SAFINUM Innovate Challenge. No real data is processed."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.heading",
      kind: "label",
      critical: false,
      text: {
        fr: "Accéder à votre espace client",
        en: "Access your customer space"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.subtitle",
      kind: "free",
      critical: false,
      text: {
        fr: "Connectez-vous pour consulter votre solde et effectuer vos opérations simulées.",
        en: "Sign in to check your balance and perform simulated transactions."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.phone_label",
      kind: "label",
      critical: false,
      text: {
        fr: "Numéro de téléphone ou identifiant",
        en: "Phone number or user ID"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.phone_placeholder",
      kind: "label",
      critical: false,
      text: {
        fr: "Entrez votre numéro de téléphone",
        en: "Enter your phone number"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.pin_label",
      kind: "label",
      critical: true,
      text: {
        fr: "Code secret (simulation uniquement)",
        en: "Secret PIN code (simulation only)"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.pin_placeholder",
      kind: "label",
      critical: true,
      text: {
        fr: "Entrez un code factice",
        en: "Enter a dummy PIN"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.login.submit",
      kind: "label",
      critical: false,
      text: {
        fr: "Se connecter",
        en: "Sign in now"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "auth.security.never_share_pin",
      kind: "warning",
      critical: true,
      text: {
        fr: "Avertissement de sécurité : ne partagez jamais votre code secret avec qui que ce soit, même avec un agent.",
        en: "Security warning: never share your secret code with anyone, not even with an agent."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.balance.title",
      kind: "label",
      critical: true,
      text: {
        fr: "Solde disponible",
        en: "Available balance"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.balance.sentence",
      kind: "template",
      critical: true,
      text: {
        fr: "Votre solde est de {amount}",
        en: "Your balance is {amount}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.holder.template",
      kind: "template",
      critical: true,
      text: {
        fr: "Titulaire du compte : {holder} ({account_id})",
        en: "Account holder: {holder} ({account_id})"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.history.heading",
      kind: "template",
      critical: false,
      text: {
        fr: "Les {count} dernières opérations",
        en: "Last {count} transactions"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.history.col_date",
      kind: "label",
      critical: false,
      text: {
        fr: "Date",
        en: "Date"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.history.col_description",
      kind: "label",
      critical: false,
      text: {
        fr: "Opération",
        en: "Transaction"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.history.col_reference",
      kind: "label",
      critical: false,
      text: {
        fr: "Référence",
        en: "Reference"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.history.col_amount",
      kind: "label",
      critical: true,
      text: {
        fr: "Montant",
        en: "Amount"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.tx.deposit_agent",
      kind: "template",
      critical: true,
      text: {
        fr: "Dépôt en espèces - Agence {location}",
        en: "Cash deposit - {location} Branch"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.tx.transfer_to",
      kind: "template",
      critical: true,
      text: {
        fr: "Transfert envoyé à {beneficiary}",
        en: "Transfer sent to {beneficiary}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.tx.transfer_from",
      kind: "template",
      critical: true,
      text: {
        fr: "Transfert reçu de {sender}",
        en: "Transfer received from {sender}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.tx.bill_payment",
      kind: "template",
      critical: true,
      text: {
        fr: "Paiement facture d'électricité {provider}",
        en: "Electricity bill payment {provider}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "account.tx.withdrawal_atm",
      kind: "template",
      critical: true,
      text: {
        fr: "Retrait distributeur {location}",
        en: "ATM withdrawal {location}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.heading",
      kind: "label",
      critical: false,
      text: {
        fr: "Préparer un transfert d'argent",
        en: "Prepare a money transfer"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.intro",
      kind: "free",
      critical: false,
      text: {
        fr: "Vous allez envoyer de l'argent vers un compte mobile ou bancaire.",
        en: "You are about to send money to a mobile or bank account."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.recipient_phone_label",
      kind: "label",
      critical: true,
      text: {
        fr: "Numéro de téléphone du bénéficiaire",
        en: "Recipient's phone number"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.recipient_phone_placeholder",
      kind: "label",
      critical: false,
      text: {
        fr: "Entrez le numéro de téléphone du bénéficiaire",
        en: "Enter the recipient's phone number"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.recipient_name_label",
      kind: "label",
      critical: true,
      text: {
        fr: "Nom complet du bénéficiaire",
        en: "Recipient's full name"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.recipient_name_placeholder",
      kind: "label",
      critical: false,
      text: {
        fr: "Entrez le nom du bénéficiaire",
        en: "Enter the recipient's name"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.amount_label",
      kind: "label",
      critical: true,
      text: {
        fr: "Montant à envoyer (FCFA)",
        en: "Amount to send (FCFA)"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.form.amount_placeholder",
      kind: "label",
      critical: false,
      text: {
        fr: "Entrez le montant en FCFA",
        en: "Enter the amount in FCFA"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.fees.box_title",
      kind: "label",
      critical: true,
      text: {
        fr: "Détail des frais et conditions",
        en: "Fee details and conditions"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.fees.calculated_line",
      kind: "template",
      critical: true,
      text: {
        fr: "Frais estimés : {fee} | Total débité : {total}",
        en: "Estimated fee: {fee} | Total debited: {total}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.fees.schedule_rule",
      kind: "template",
      critical: true,
      text: {
        fr: "Barème des frais : {rate} du montant envoyé (minimum {min_fee}).",
        en: "Fee schedule: {rate} of the amount sent (minimum {min_fee})."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.conditions.daily_limit",
      kind: "template",
      critical: true,
      text: {
        fr: "Plafond journalier : {limit}",
        en: "Daily limit: {limit}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.heading",
      kind: "label",
      critical: true,
      text: {
        fr: "Récapitulatif avant confirmation",
        en: "Summary before confirmation"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.summary",
      kind: "template",
      critical: true,
      text: {
        fr: "Vous allez envoyer {amount} à {beneficiary}. Frais : {fee}.",
        en: "You are about to send {amount} to {beneficiary}. Fee: {fee}."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.full_summary",
      kind: "template",
      critical: true,
      text: {
        fr: "Vous allez envoyer {amount} à {beneficiary} ({phone}). Frais : {fee}. Total débité : {total}.",
        en: "You are about to send {amount} to {beneficiary} ({phone}). Fee: {fee}. Total debited: {total}."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.label_beneficiary",
      kind: "template",
      critical: true,
      text: {
        fr: "Bénéficiaire : {beneficiary} ({phone})",
        en: "Beneficiary: {beneficiary} ({phone})"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.label_amount",
      kind: "template",
      critical: true,
      text: {
        fr: "Montant envoyé : {amount}",
        en: "Amount sent: {amount}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.label_fee",
      kind: "template",
      critical: true,
      text: {
        fr: "Frais d'opération : {fee}",
        en: "Transaction fee: {fee}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.label_total",
      kind: "template",
      critical: true,
      text: {
        fr: "Total débité : {total}",
        en: "Total debited: {total}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.warning_irreversible",
      kind: "warning",
      critical: true,
      text: {
        fr: "Attention : cette opération est irréversible.",
        en: "Warning: this operation cannot be undone."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.warning_full",
      kind: "warning",
      critical: true,
      text: {
        fr: "Vérifiez le bénéficiaire. Cette opération est irréversible. Ne partagez jamais votre code secret.",
        en: "Verify the recipient. This operation cannot be undone. Never share your secret code."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "transfer.recap.scam_alert",
      kind: "warning",
      critical: true,
      text: {
        fr: "Vigilance contre les arnaques : aucun agent ne vous demandera de transférer de l'argent pour débloquer votre compte.",
        en: "Beware of scams: no agent will ever ask you to transfer money to unlock your account."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.success.heading",
      kind: "label",
      critical: true,
      text: {
        fr: "Transfert effectué avec succès",
        en: "Transfer completed successfully"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.success.details",
      kind: "template",
      critical: true,
      text: {
        fr: "Vous avez envoyé {amount} à {beneficiary} ({phone}). Frais : {fee}. Référence : {ref}.",
        en: "You have sent {amount} to {beneficiary} ({phone}). Fee: {fee}. Reference: {ref}."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.success.new_balance",
      kind: "template",
      critical: true,
      text: {
        fr: "Nouveau solde disponible : {amount}",
        en: "New available balance: {amount}"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.error.heading",
      kind: "error",
      critical: true,
      text: {
        fr: "L'opération n'a pas pu être effectuée",
        en: "The transaction could not be completed"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.error.insufficient_funds",
      kind: "error",
      critical: true,
      text: {
        fr: "Erreur : solde insuffisant pour couvrir le montant et les frais de l'opération.",
        en: "Error: insufficient balance to cover the transaction amount and fee."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.error.invalid_phone",
      kind: "error",
      critical: true,
      text: {
        fr: "Erreur : le numéro de téléphone du bénéficiaire est invalide.",
        en: "Error: the recipient's phone number is invalid."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.error.limit_exceeded",
      kind: "template",
      critical: true,
      text: {
        fr: "Erreur : le montant dépasse le plafond journalier autorisé de {limit}.",
        en: "Error: the amount exceeds the allowed daily limit of {limit}."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.error.session_expired",
      kind: "error",
      critical: true,
      text: {
        fr: "Votre session a expiré par mesure de sécurité. Veuillez vous reconnecter.",
        en: "Your session has expired for security reasons. Please sign in again."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.warning.unusual_activity",
      kind: "warning",
      critical: true,
      text: {
        fr: "Alerte de sécurité : activité inhabituelle détectée. Vérifiez l'identité du bénéficiaire avant de continuer.",
        en: "Security alert: unusual activity detected. Verify the recipient's identity before proceeding."
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.switcher_title",
      kind: "label",
      critical: false,
      text: {
        fr: "Outils de démonstration : simuler d'autres états",
        en: "Demo tools: simulate other states"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_success",
      kind: "label",
      critical: false,
      text: {
        fr: "Afficher succès",
        en: "Show success"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_insufficient",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler solde insuffisant",
        en: "Simulate insufficient balance"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_invalid_phone",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler numéro invalide",
        en: "Simulate invalid number"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_limit",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler plafond dépassé",
        en: "Simulate limit exceeded"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_expired",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler session expirée",
        en: "Simulate expired session"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "result.sim.btn_unusual",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler alerte de sécurité",
        en: "Simulate security alert"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "demo.unseen.btn_inject_template",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler un message inédit (maintenance)",
        en: "Simulate an unseen message (maintenance)"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "demo.unseen.btn_inject_unknown",
      kind: "label",
      critical: false,
      text: {
        fr: "Simuler un message inédit hors lexique",
        en: "Simulate an out-of-lexicon unseen message"
      },
      status: { fr: "validated", en: "validated" }
    },
    {
      id: "demo.unseen.maintenance_banner",
      kind: "template",
      critical: false,
      text: {
        fr: "Maintenance prévue ce soir de {start_time} à {end_time}. Le service sera indisponible.",
        en: "Scheduled maintenance tonight from {start_time} to {end_time}. The service will be unavailable."
      },
      status: { fr: "validated", en: "validated" }
    }
  ];

  // src/lexicon/loader.ts
  var SLOT_REGEX = /\{([a-zA-Z0-9_]+)\}/g;
  function normalizeLexiconText(text) {
    return text.replace(/[\u00A0\u202F]/g, " ").replace(/['’‘`]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }
  function extractSlots(templateText) {
    const slots = [];
    const regex = new RegExp(SLOT_REGEX.source, "g");
    let match;
    while ((match = regex.exec(templateText)) !== null) {
      slots.push(match[1]);
    }
    return slots;
  }
  function escapeLiteralForTemplateRegex(literal) {
    const normalized = literal.replace(/[\u00A0\u202F]/g, " ").replace(/['’‘`]/g, "'").replace(/\s+/g, " ");
    let pattern = "";
    for (let i = 0; i < normalized.length; i += 1) {
      const ch = normalized[i];
      if (ch === " ") {
        const next = normalized[i + 1];
        if (next === ":" || next === ";" || next === "!" || next === "?") {
          pattern += "[\\s\\u00A0\\u202F]*";
        } else {
          pattern += "[\\s\\u00A0\\u202F]+";
        }
      } else if (ch === "'") {
        pattern += "['’‘`]";
      } else if (/[.*+?^${}()|[\]\\]/.test(ch)) {
        pattern += `\\${ch}`;
      } else {
        pattern += ch;
      }
    }
    return pattern;
  }
  function compileTemplate(entry, srcLang, templateStr) {
    const trimmed = templateStr.trim();
    const slotNames = [];
    let literalLength = 0;
    let regexParts = "^[\\s\\u00A0\\u202F]*";
    let lastIndex = 0;
    const regex = new RegExp(SLOT_REGEX.source, "g");
    let match;
    while ((match = regex.exec(trimmed)) !== null) {
      const literalBefore = trimmed.slice(lastIndex, match.index);
      literalLength += normalizeLexiconText(literalBefore).length;
      regexParts += escapeLiteralForTemplateRegex(literalBefore);
      slotNames.push(match[1]);
      regexParts += "(.+?)";
      lastIndex = match.index + match[0].length;
    }
    const literalAfter = trimmed.slice(lastIndex);
    literalLength += normalizeLexiconText(literalAfter).length;
    regexParts += escapeLiteralForTemplateRegex(literalAfter);
    regexParts += "[\\s\\u00A0\\u202F]*$";
    return {
      entry,
      srcLang,
      regex: new RegExp(regexParts, "i"),
      slotNames,
      literalLength
    };
  }
  function buildCompiledLexicon(entries = lexicon_default, languages = languages_default) {
    const exactMap = /* @__PURE__ */ new Map();
    const templatesByLang = /* @__PURE__ */ new Map();
    for (const entry of entries) {
      for (const [lang, rawText] of Object.entries(entry.text)) {
        if (!rawText) {
          continue;
        }
        const slots = extractSlots(rawText);
        if (slots.length === 0) {
          let langMap = exactMap.get(lang);
          if (!langMap) {
            langMap = /* @__PURE__ */ new Map();
            exactMap.set(lang, langMap);
          }
          const key = normalizeLexiconText(rawText);
          const list = langMap.get(key) ?? [];
          list.push(entry);
          langMap.set(key, list);
        } else {
          let list = templatesByLang.get(lang);
          if (!list) {
            list = [];
            templatesByLang.set(lang, list);
          }
          list.push(compileTemplate(entry, lang, rawText));
        }
      }
    }
    for (const [lang, list] of templatesByLang.entries()) {
      const indexed = list.map((item, idx) => ({ item, idx }));
      indexed.sort((a, b) => {
        if (b.item.literalLength !== a.item.literalLength) {
          return b.item.literalLength - a.item.literalLength;
        }
        return a.idx - b.idx;
      });
      templatesByLang.set(
        lang,
        indexed.map((x) => x.item)
      );
    }
    return {
      entries,
      languages,
      exactMap,
      templatesByLang
    };
  }
  var defaultCompiledLexicon = null;
  function getDefaultLexicon() {
    if (!defaultCompiledLexicon) {
      defaultCompiledLexicon = buildCompiledLexicon();
    }
    return defaultCompiledLexicon;
  }

  // src/core/providers/lexicon-provider.ts
  var LexiconProvider = class {
    constructor(customEntries, customLanguages, onDebugTie) {
      this.id = "lexicon";
      this.compiled = customEntries || customLanguages ? buildCompiledLexicon(customEntries, customLanguages) : getDefaultLexicon();
      this.onDebugTie = onDebugTie;
    }
    /**
     * Vérifie si la paire de langues est prise en charge par le lexique.
     */
    canTranslate(src, tgt) {
      if (src === tgt) {
        return false;
      }
      const hasSrc = this.compiled.exactMap.has(src) || this.compiled.templatesByLang.has(src);
      const hasTgt = this.compiled.entries.some((e) => Boolean(e.text[tgt]));
      return hasSrc && hasTgt;
    }
    /**
     * Recherche une correspondance (exacte puis par gabarit) et retourne les détails de l'entrée trouvée.
     */
    matchWithDetails(inputText, src, tgt) {
      if (!inputText || src === tgt) {
        return null;
      }
      const normalizedInput = normalizeLexiconText(inputText);
      const langExactMap = this.compiled.exactMap.get(src);
      if (langExactMap) {
        const candidates = langExactMap.get(normalizedInput);
        if (candidates && candidates.length > 0) {
          const usable = candidates.filter((e) => this.isEntryUsableForTarget(e, tgt));
          if (usable.length > 0) {
            if (usable.length > 1 && this.onDebugTie) {
              this.onDebugTie(usable[0].id, usable[1].id);
            }
            const chosen = usable[0];
            return {
              output: chosen.text[tgt],
              entry: chosen,
              ambiguousTie: usable.length > 1
            };
          }
        }
      }
      const templates = this.compiled.templatesByLang.get(src);
      if (!templates || templates.length === 0) {
        return null;
      }
      const trimmedInput = inputText.trim();
      const matchingTemplates = [];
      for (const tpl of templates) {
        if (!this.isEntryUsableForTarget(tpl.entry, tgt)) {
          continue;
        }
        const match = tpl.regex.exec(trimmedInput);
        if (!match) {
          continue;
        }
        const slotValues = {};
        let validSlots = true;
        for (let i = 0; i < tpl.slotNames.length; i += 1) {
          const slotName = tpl.slotNames[i];
          const captured = match[i + 1]?.trim() ?? "";
          if (captured.length === 0) {
            validSlots = false;
            break;
          }
          if (slotValues[slotName] !== void 0 && slotValues[slotName] !== captured) {
            validSlots = false;
            break;
          }
          slotValues[slotName] = captured;
        }
        if (!validSlots) {
          continue;
        }
        const targetTemplate = tpl.entry.text[tgt];
        const rendered = targetTemplate.replace(/\{([a-zA-Z0-9_]+)\}/g, (full, slotName) => {
          return slotValues[slotName] !== void 0 ? slotValues[slotName] : full;
        });
        matchingTemplates.push({
          entry: tpl.entry,
          rendered,
          literalLength: tpl.literalLength
        });
      }
      if (matchingTemplates.length === 0) {
        return null;
      }
      const best = matchingTemplates[0];
      const tie = matchingTemplates.length > 1 && matchingTemplates[1].literalLength === best.literalLength;
      if (tie && this.onDebugTie) {
        this.onDebugTie(best.entry.id, matchingTemplates[1].entry.id);
      }
      return {
        output: best.rendered,
        entry: best.entry,
        ambiguousTie: tie
      };
    }
    /**
     * Implémentation de TranslationProvider.translate().
     */
    async translate(input, src, tgt, _ctx) {
      const matched = this.matchWithDetails(input.text, src, tgt);
      return matched ? matched.output : null;
    }
    /**
     * Indique si un texte correspond à une entrée marquée critical: true dans la langue source.
     */
    isLexiconCritical(inputText, src) {
      const normalizedInput = normalizeLexiconText(inputText);
      const exactCandidates = this.compiled.exactMap.get(src)?.get(normalizedInput);
      if (exactCandidates?.some((e) => e.critical)) {
        return true;
      }
      const templates = this.compiled.templatesByLang.get(src) ?? [];
      const trimmed = inputText.trim();
      for (const tpl of templates) {
        if (tpl.entry.critical && tpl.regex.test(trimmed)) {
          return true;
        }
      }
      return false;
    }
    /**
     * Vérifie si un texte court (ex. bouton "Valider", "Connexion") existe exactement dans une langue du lexique.
     */
    hasExactEntryInLang(inputText, lang) {
      const normalized = normalizeLexiconText(inputText);
      const list = this.compiled.exactMap.get(lang)?.get(normalized);
      return Boolean(list && list.length > 0);
    }
    /**
     * Retourne la liste des langues déclarées dans languages.json qui possèdent au moins une entrée dans lexicon.json.
     */
    getAvailableLanguages() {
      return this.compiled.languages.filter(
        (langInfo) => this.compiled.entries.some((entry) => Boolean(entry.text[langInfo.code]))
      );
    }
    isEntryUsableForTarget(entry, tgt) {
      const targetText = entry.text[tgt];
      if (!targetText || targetText.trim().length === 0) {
        return false;
      }
      const langInfo = this.compiled.languages.find((l) => l.code === tgt);
      if (entry.critical && langInfo?.status === "validated") {
        const entryStatus = entry.status?.[tgt];
        if (entryStatus !== "validated") {
          return false;
        }
      }
      return true;
    }
  };

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
  var ModelServerProvider = class {
    constructor(options = {}) {
      this.id = "custom-model-server";
      this.inFlight = /* @__PURE__ */ new Map();
      this.serverUrl = (options.serverUrl ?? "").trim();
      this.apiKey = (options.apiKey ?? "").trim();
      this.enabled = Boolean(options.enabled);
    }
    /**
     * Met à jour dynamiquement la configuration du serveur du modèle préconçu.
     */
    configure(config) {
      if (config.serverUrl !== void 0) {
        this.serverUrl = config.serverUrl.trim();
      }
      if (config.apiKey !== void 0) {
        this.apiKey = config.apiKey.trim();
      }
      if (config.enabled !== void 0) {
        this.enabled = config.enabled;
      }
    }
    isConfiguredAndEnabled() {
      return this.enabled && /^https?:\/\//i.test(this.serverUrl);
    }
    canTranslate(src, tgt) {
      if (!this.isConfiguredAndEnabled()) {
        return false;
      }
      return Boolean(tgt) && src !== tgt;
    }
    async translate(input, src, tgt, ctx) {
      if (!input.text || !this.canTranslate(src, tgt)) {
        return null;
      }
      const key = `${this.serverUrl}|${src}|${tgt}|${input.text}`;
      const existing = this.inFlight.get(key);
      if (existing) {
        return existing;
      }
      const promise = this.executeModelRequest(input.text, src, tgt, ctx.critical).finally(() => {
        this.inFlight.delete(key);
      });
      this.inFlight.set(key, promise);
      return promise;
    }
    async executeModelRequest(protectedText, src, tgt, critical) {
      const msg = {
        type: "MODEL_SERVER_TRANSLATE",
        payload: {
          protectedText,
          src,
          tgt,
          serverUrl: this.serverUrl,
          apiKey: this.apiKey || void 0,
          critical
        }
      };
      const response = await safeRuntimeSendMessage(msg);
      if (response && response.ok && typeof response.translatedText === "string") {
        return normalizeProtectedTokens(response.translatedText);
      }
      return fetchModelServerDirect(protectedText, src, tgt, this.serverUrl, this.apiKey);
    }
  };

  // src/core/verifier.ts
  var TOKEN_EXTRACTOR_REGEX = /\{\{(\d+)\}\}|<x\s+id="(\d+)"\s*\/>/g;
  var HTML_TAG_REGEX = /<\/?[a-zA-Z][^>]*>|[<>]/g;
  var MIN_LENGTH_RATIO = 0.3;
  var MAX_LENGTH_RATIO = 3.5;
  function extractTokenIndices(translatedWithTokens) {
    const indices = [];
    const regex = new RegExp(TOKEN_EXTRACTOR_REGEX.source, "g");
    let match;
    while ((match = regex.exec(translatedWithTokens)) !== null) {
      const raw = match[1] ?? match[2];
      const num = Number.parseInt(raw, 10);
      if (!Number.isNaN(num)) {
        indices.push(num);
      }
    }
    return indices;
  }
  function areMultisetsEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    for (let i = 0; i < sortedA.length; i += 1) {
      if (sortedA[i] !== sortedB[i]) {
        return false;
      }
    }
    return true;
  }
  function verifyTranslation(originalText, protectedInput, translatedWithTokens, restoredOutput) {
    if (!restoredOutput || restoredOutput.trim().length === 0) {
      return { valid: false, reason: "empty-output" };
    }
    const expectedCount = protectedInput.tokens.length;
    const foundIndices = extractTokenIndices(translatedWithTokens);
    if (foundIndices.length !== expectedCount) {
      return { valid: false, reason: "token-mismatch" };
    }
    const seen = /* @__PURE__ */ new Set();
    for (const idx of foundIndices) {
      if (idx < 1 || idx > expectedCount || seen.has(idx)) {
        return { valid: false, reason: "token-mismatch" };
      }
      seen.add(idx);
    }
    const unresolvedInRestored = extractTokenIndices(restoredOutput);
    const originalTokensInSource = extractTokenIndices(originalText);
    if (unresolvedInRestored.length > originalTokensInSource.length) {
      return { valid: false, reason: "unresolved-token" };
    }
    const sourceHtmlMatches = originalText.match(HTML_TAG_REGEX) ?? [];
    const outputHtmlMatches = restoredOutput.match(HTML_TAG_REGEX) ?? [];
    if (outputHtmlMatches.length > sourceHtmlMatches.length) {
      return { valid: false, reason: "unexpected-html" };
    }
    for (const tag of outputHtmlMatches) {
      if (!sourceHtmlMatches.includes(tag)) {
        return { valid: false, reason: "unexpected-html" };
      }
    }
    const reprotected = protect(restoredOutput);
    if (!areMultisetsEqual(protectedInput.tokens, reprotected.tokens)) {
      return { valid: false, reason: "sensitive-value-mismatch" };
    }
    const srcLen = originalText.trim().length;
    const outLen = restoredOutput.trim().length;
    if (srcLen >= 10) {
      const ratio = outLen / srcLen;
      if (ratio < MIN_LENGTH_RATIO || ratio > MAX_LENGTH_RATIO) {
        return { valid: false, reason: "suspicious-length-ratio" };
      }
    } else if (srcLen > 0 && outLen > Math.max(40, srcLen * 8)) {
      return { valid: false, reason: "suspicious-length-ratio" };
    }
    return { valid: true };
  }

  // src/core/engine.ts
  var HAS_LETTERS_REGEX = /[a-zA-ZàâäæçéèêëîïôœùûüÿÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ]/;
  var PAGE_CONFIDENCE_THRESHOLD = 0.6;
  var TranslationEngine = class {
    constructor(options = {}) {
      this.lexiconProvider = options.lexiconProvider ?? new LexiconProvider();
      this.enableLiveTranslation = Boolean(options.enableLiveTranslation);
      this.googleTranslateProvider = options.googleTranslateProvider ?? (this.enableLiveTranslation ? new GoogleTranslateProvider() : void 0);
      this.modelServerProvider = options.modelServerProvider ?? (this.enableLiveTranslation ? new ModelServerProvider() : void 0);
      this.remoteProvider = options.remoteProvider;
      this.cache = new TranslationCache(options.cacheSize ?? 5e3);
      this.onDebugLog = options.onDebugLog;
    }
    /**
     * Configure ou remplace le fournisseur distant optionnel.
     */
    setRemoteProvider(provider) {
      this.remoteProvider = provider;
    }
    /**
     * Retourne le client du serveur de modèle préconçu pour mise à jour dynamique de sa configuration.
     */
    getModelServerProvider() {
      return this.modelServerProvider;
    }
    /**
     * Vide le cache mémoire LRU.
     */
    clearCache() {
      this.cache.clear();
    }
    /**
     * Retourne le fournisseur lexique sous-jacent.
     */
    getLexiconProvider() {
      return this.lexiconProvider;
    }
    /**
     * Traduit un segment unique en appliquant la politique de sécurité financière.
     */
    async translateSegment(text, ctx = {}) {
      if (!text || text.trim().length === 0) {
        return {
          output: text,
          status: "unchanged",
          source: "none",
          critical: false,
          reason: "empty-input"
        };
      }
      const leadingSpace = text.match(/^\s*/)?.[0] ?? "";
      const trailingSpace = text.match(/\s*$/)?.[0] ?? "";
      const trimmedText = text.trim();
      const protectedInput = protect(trimmedText);
      const textWithoutTokens = protectedInput.text.replace(/\{\{\d+\}\}/g, "").replace(/<x\s+id="\d+"\s*\/>/g, "").trim();
      if (!HAS_LETTERS_REGEX.test(textWithoutTokens)) {
        return {
          output: text,
          status: "unchanged",
          source: "none",
          critical: protectedInput.tokens.length > 0,
          reason: "numeric-or-symbol-only"
        };
      }
      const segDetection = detect(trimmedText);
      let srcLang = segDetection.lang;
      if (srcLang === "unknown" && ctx.pageDetection && ctx.pageDetection.lang !== "unknown" && ctx.pageDetection.confidence >= PAGE_CONFIDENCE_THRESHOLD) {
        srcLang = ctx.pageDetection.lang;
      }
      if (this.enableLiveTranslation) {
        if (segDetection.lang === "unknown") {
          const shortDet = detectWithShortWords(trimmedText);
          if (shortDet.lang !== "unknown") {
            srcLang = shortDet.lang;
          } else {
            srcLang = "auto";
          }
        }
      }
      if (srcLang === "unknown") {
        return {
          output: text,
          status: "unchanged",
          source: "none",
          critical: false,
          reason: "unknown-language"
        };
      }
      const targetLang = this.resolveTargetLang(srcLang, ctx);
      if (srcLang === targetLang) {
        return {
          output: text,
          status: "unchanged",
          source: "none",
          critical: false,
          reason: "already-in-target-lang"
        };
      }
      const effectiveLexSrc = srcLang !== "auto" ? srcLang : ctx.pageDetection && ctx.pageDetection.lang !== "unknown" ? ctx.pageDetection.lang : targetLang === "en" ? "fr" : "en";
      const lexiconCrit = effectiveLexSrc !== targetLang && this.lexiconProvider.isLexiconCritical(protectedInput.text, effectiveLexSrc);
      const critical = isCriticalSegment(trimmedText, protectedInput, lexiconCrit);
      let translatedWithTokens = this.cache.get(srcLang, targetLang, protectedInput.text);
      let source = translatedWithTokens !== void 0 ? "lexicon" : "none";
      if (translatedWithTokens === void 0 && effectiveLexSrc !== targetLang) {
        if (this.lexiconProvider.canTranslate(effectiveLexSrc, targetLang)) {
          const lexResult = await this.lexiconProvider.translate(
            protectedInput,
            effectiveLexSrc,
            targetLang,
            { critical }
          );
          if (lexResult !== null) {
            translatedWithTokens = lexResult;
            source = "lexicon";
            this.cache.set(srcLang, targetLang, protectedInput.text, lexResult);
          }
        }
      }
      if (translatedWithTokens === void 0 && this.enableLiveTranslation && this.modelServerProvider && this.modelServerProvider.canTranslate(srcLang, targetLang)) {
        try {
          const modelOut = await this.modelServerProvider.translate(
            protectedInput,
            srcLang,
            targetLang,
            { critical }
          );
          if (modelOut !== null) {
            translatedWithTokens = modelOut;
            source = "remote";
            this.cache.set(srcLang, targetLang, protectedInput.text, modelOut);
          }
        } catch {
          this.logDebug(ctx, { type: "model-server-error", reason: "provider-exception", critical });
        }
      }
      if (translatedWithTokens === void 0 && this.enableLiveTranslation && this.googleTranslateProvider && this.googleTranslateProvider.canTranslate(srcLang, targetLang)) {
        try {
          const googleOut = await this.googleTranslateProvider.translate(
            protectedInput,
            srcLang,
            targetLang,
            { critical }
          );
          if (googleOut !== null) {
            translatedWithTokens = googleOut;
            source = "remote";
            this.cache.set(srcLang, targetLang, protectedInput.text, googleOut);
          }
        } catch {
          this.logDebug(ctx, { type: "google-translate-error", reason: "provider-exception", critical });
        }
      }
      if (translatedWithTokens === void 0) {
        if (critical) {
          this.logDebug(ctx, { type: "fallback", reason: "no-lexicon-match", critical: true });
          return {
            output: text,
            status: "failed-safe",
            source: "none",
            critical: true,
            reason: "no-lexicon-match"
          };
        }
        if (ctx.remoteEnabled && this.remoteProvider && this.remoteProvider.canTranslate(srcLang, targetLang)) {
          try {
            const remoteOut = await this.remoteProvider.translate(
              protectedInput,
              srcLang,
              targetLang,
              { critical: false }
            );
            if (remoteOut !== null) {
              translatedWithTokens = remoteOut;
              source = "remote";
            }
          } catch {
            this.logDebug(ctx, { type: "remote-error", reason: "provider-exception", critical: false });
          }
        }
        if (translatedWithTokens === void 0) {
          return {
            output: text,
            status: "unchanged",
            source: "none",
            critical: false,
            reason: "no-lexicon-match"
          };
        }
      }
      const restoredCore = restore(translatedWithTokens, protectedInput.tokens);
      if (restoredCore.trim() === trimmedText) {
        return {
          output: text,
          status: "unchanged",
          source: "none",
          critical,
          reason: "already-in-target-lang"
        };
      }
      const verification = verifyTranslation(
        trimmedText,
        protectedInput,
        translatedWithTokens,
        restoredCore
      );
      if (!verification.valid) {
        this.logDebug(ctx, {
          type: "verification-failed",
          reason: verification.reason,
          critical
        });
        return {
          output: text,
          status: "failed-safe",
          source,
          critical,
          reason: verification.reason
        };
      }
      return {
        output: `${leadingSpace}${restoredCore}${trailingSpace}`,
        status: "translated",
        source,
        critical
      };
    }
    resolveTargetLang(srcLang, ctx) {
      if (ctx.mode === "manual" && ctx.targetLang) {
        return ctx.targetLang;
      }
      if (ctx.targetLang && ctx.mode !== "auto") {
        return ctx.targetLang;
      }
      const baseLang = ctx.pageDetection && ctx.pageDetection.lang !== "unknown" && ctx.pageDetection.confidence >= PAGE_CONFIDENCE_THRESHOLD ? ctx.pageDetection.lang : srcLang !== "auto" ? srcLang : "fr";
      return baseLang === "fr" ? "en" : "fr";
    }
    logDebug(ctx, event) {
      if (ctx.debug && this.onDebugLog) {
        this.onDebugLog(event);
      }
    }
  };

  // src/core/providers/remote-provider.ts
  var DEFAULT_TIMEOUT_MS = 4e3;
  var MAX_RETRIES = 1;
  var RemoteProvider = class {
    constructor(remoteUrl = "", timeoutMs = DEFAULT_TIMEOUT_MS) {
      this.id = "remote";
      this.remoteUrl = remoteUrl.trim();
      this.timeoutMs = timeoutMs;
    }
    setRemoteUrl(url) {
      this.remoteUrl = url.trim();
    }
    getRemoteUrl() {
      return this.remoteUrl;
    }
    canTranslate(src, tgt) {
      if (!this.remoteUrl || src === tgt) {
        return false;
      }
      return /^https?:\/\//i.test(this.remoteUrl);
    }
    async translate(input, src, tgt, ctx) {
      if (ctx.critical || !this.canTranslate(src, tgt)) {
        return null;
      }
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
        try {
          const result = await this.sendWithTimeout(input.text, src, tgt);
          if (result !== null) {
            return result;
          }
        } catch {
        }
      }
      return null;
    }
    async sendWithTimeout(protectedText, src, tgt) {
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(null), this.timeoutMs);
      });
      const requestPromise = (async () => {
        const response = await safeRuntimeSendMessage({
          type: "REMOTE_TRANSLATE",
          payload: {
            protectedText,
            src,
            tgt,
            remoteUrl: this.remoteUrl
          }
        });
        if (response && response.ok && typeof response.translatedText === "string") {
          return response.translatedText;
        }
        return null;
      })();
      return Promise.race([requestPromise, timeoutPromise]);
    }
  };

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
  async function updateSettings(patch) {
    const current = await getSettings();
    const next = {
      ...current,
      ...patch,
      enabledHosts: patch.enabledHosts ? [...new Set(patch.enabledHosts)] : current.enabledHosts,
      v: CURRENT_SETTINGS_VERSION
    };
    if (isExtensionContextValid()) {
      try {
        await import_webextension_polyfill.default.storage.local.set({ [STORAGE_KEY]: next });
      } catch {
      }
    }
    return next;
  }
  function isHostEnabled(hostname, settings) {
    if (!hostname) {
      return false;
    }
    const normalized = hostname.trim().toLowerCase();
    const list = settings.enabledHosts.map((h) => h.trim().toLowerCase());
    if (list.includes(`!${normalized}`)) {
      return false;
    }
    return list.includes(normalized) || list.includes("*");
  }
  function onSettingsChanged(callback) {
    if (!isExtensionContextValid()) {
      return () => {
      };
    }
    const listener = (changes, areaName) => {
      if (!isExtensionContextValid()) {
        return;
      }
      if (areaName === "local" && STORAGE_KEY in changes) {
        void getSettings().then(callback).catch(() => {
        });
      }
    };
    try {
      import_webextension_polyfill.default.storage.onChanged.addListener(listener);
    } catch {
      return () => {
      };
    }
    return () => {
      if (!isExtensionContextValid()) {
        return;
      }
      try {
        import_webextension_polyfill.default.storage.onChanged.removeListener(listener);
      } catch {
      }
    };
  }

  // src/content/dom-walker.ts
  var BADGE_HOST_ID = "linguafin-badge-host";
  var IGNORED_TAGS = /* @__PURE__ */ new Set([
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEXTAREA",
    "CODE",
    "PRE",
    "SVG",
    "CANVAS",
    "IFRAME",
    "OBJECT",
    "EMBED"
  ]);
  var BUTTON_INPUT_TYPES = /* @__PURE__ */ new Set(["button", "submit", "reset"]);
  var SENSITIVE_AUTOCOMPLETE_PATTERNS = ["cc-", "one-time-code", "password"];
  var STANDARD_ATTRS = [
    "placeholder",
    "title",
    "aria-label",
    "aria-placeholder",
    "data-placeholder",
    "alt",
    "label"
  ];
  function isIgnoredElement(el) {
    let current = el;
    while (current) {
      if (current.id === BADGE_HOST_ID) {
        return true;
      }
      const tag = current.tagName?.toUpperCase() ?? "";
      if (IGNORED_TAGS.has(tag)) {
        return true;
      }
      if (current.namespaceURI === "http://www.w3.org/2000/svg") {
        return true;
      }
      const ceAttr = current.getAttribute("contenteditable");
      if (current.isContentEditable || ceAttr !== null && ceAttr.toLowerCase() !== "false") {
        return true;
      }
      const translateAttr = current.getAttribute("translate");
      if (translateAttr && translateAttr.toLowerCase() === "no") {
        return true;
      }
      if (current.classList && current.classList.contains("notranslate")) {
        return true;
      }
      if (tag === "INPUT" && isSensitiveInput(current)) {
        return true;
      }
      current = current.parentElement;
    }
    return false;
  }
  function isSensitiveInput(input) {
    const typeAttr = (input.getAttribute("type") ?? input.type ?? "text").toLowerCase().trim();
    if (typeAttr === "password" || typeAttr === "hidden") {
      return true;
    }
    const autoComplete = (input.getAttribute("autocomplete") ?? "").toLowerCase();
    if (autoComplete) {
      for (const pattern of SENSITIVE_AUTOCOMPLETE_PATTERNS) {
        if (autoComplete.includes(pattern)) {
          return true;
        }
      }
    }
    return false;
  }
  function collectElementAttributes(el, out) {
    const tag = el.tagName?.toUpperCase() ?? "";
    if (tag === "INPUT") {
      const input = el;
      if (isSensitiveInput(input)) {
        return;
      }
      const typeAttr = (input.getAttribute("type") ?? input.type ?? "text").toLowerCase().trim();
      if (BUTTON_INPUT_TYPES.has(typeAttr)) {
        for (const attr of ["value", "title", "aria-label"]) {
          const val = input.getAttribute(attr);
          if (val && val.trim().length > 0) {
            out.push({ kind: "attr", element: input, attr });
          }
        }
      } else {
        for (const attr of ["placeholder", "title", "aria-label"]) {
          const val = input.getAttribute(attr);
          if (val && val.trim().length > 0) {
            out.push({ kind: "attr", element: input, attr });
          }
        }
      }
      return;
    }
    for (const attr of STANDARD_ATTRS) {
      const val = el.getAttribute(attr);
      if (val && val.trim().length > 0) {
        out.push({ kind: "attr", element: el, attr });
      }
    }
  }
  function collectTranslatableTargets(root) {
    const targets = [];
    const doc = root.ownerDocument ?? root;
    if (!doc || typeof doc.createTreeWalker !== "function") {
      return targets;
    }
    function walkRoot(currentRoot) {
      if (currentRoot.nodeType === Node.TEXT_NODE) {
        const textNode = currentRoot;
        if (textNode.nodeValue && textNode.nodeValue.trim().length > 0 && !isIgnoredElement(textNode.parentElement)) {
          targets.push({ kind: "text", node: textNode });
        }
        return;
      }
      if (currentRoot.nodeType === Node.ELEMENT_NODE) {
        const rootEl = currentRoot;
        if (isIgnoredElement(rootEl)) {
          return;
        }
        if (rootEl.tagName?.toUpperCase() !== "INPUT") {
          collectElementAttributes(rootEl, targets);
        } else {
          collectElementAttributes(rootEl, targets);
          return;
        }
        if (rootEl.shadowRoot) {
          walkRoot(rootEl.shadowRoot);
        }
      }
      const walker = doc.createTreeWalker(
        currentRoot,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node;
              if (isIgnoredElement(el)) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
            if (node.nodeType === Node.TEXT_NODE) {
              const parent = node.parentElement;
              if (isIgnoredElement(parent)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (!node.nodeValue || node.nodeValue.trim().length === 0) {
                return NodeFilter.FILTER_SKIP;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          }
        }
      );
      let currentNode = walker.nextNode();
      while (currentNode) {
        if (currentNode.nodeType === Node.ELEMENT_NODE) {
          const el = currentNode;
          collectElementAttributes(el, targets);
          if (el.shadowRoot) {
            walkRoot(el.shadowRoot);
          }
        } else if (currentNode.nodeType === Node.TEXT_NODE) {
          targets.push({ kind: "text", node: currentNode });
        }
        currentNode = walker.nextNode();
      }
    }
    walkRoot(root);
    return targets;
  }

  // src/content/badge.ts
  var DEFAULT_LANGUAGE_OPTIONS = [
    { code: "fr", label: "Français (FR)" },
    { code: "en", label: "English (EN)" },
    { code: "wes", label: "Cameroon Pidgin (WES)" },
    { code: "ewo", label: "Ewondo (EWO)" },
    { code: "ff", label: "Fulfulde (FF)" },
    { code: "dua", label: "Duala (DUA)" }
  ];
  var FloatingBadge = class {
    constructor(onToggleClick, onSelectLanguage) {
      this.hostEl = null;
      this.wrapperEl = null;
      this.toggleBtn = null;
      this.footerSelect = null;
      this.unvalidatedBanner = null;
      this.onToggleClick = onToggleClick;
      this.onSelectLanguage = onSelectLanguage;
    }
    /**
     * Met à jour le petit sélecteur discret situé dans le footer.
     */
    update(state) {
      if (!state.visible) {
        this.destroy();
        return;
      }
      const langOptions = this.resolveLanguageOptions(state.availableLanguages);
      const currentSelection = state.translatedView ? state.targetLang : "original";
      if (!this.hostEl || !this.hostEl.isConnected) {
        this.mount(langOptions);
      } else {
        this.relocateToFooterIfAvailable();
        this.populateSelectOptions(this.footerSelect, langOptions, currentSelection);
      }
      if (!this.toggleBtn || !this.unvalidatedBanner || !this.wrapperEl) {
        return;
      }
      const langUpper = state.targetLang.toUpperCase();
      if (state.translatedView) {
        this.toggleBtn.textContent = `🌐 ${langUpper}`;
        this.toggleBtn.setAttribute(
          "aria-label",
          `Traduction LinguaFin active (${langUpper}). Cliquer pour basculer vers le texte original.`
        );
        this.toggleBtn.setAttribute("title", "Basculer entre la traduction et le texte original");
        this.toggleBtn.setAttribute("aria-pressed", "true");
      } else {
        this.toggleBtn.textContent = `🌐 Original`;
        this.toggleBtn.setAttribute(
          "aria-label",
          `Texte original affiché. Cliquer pour afficher la traduction (${langUpper}).`
        );
        this.toggleBtn.setAttribute("title", "Basculer entre le texte original et la traduction");
        this.toggleBtn.setAttribute("aria-pressed", "false");
      }
      if (this.footerSelect) {
        this.footerSelect.value = currentSelection;
      }
      const isUnvalidated = state.targetLangStatus !== "validated";
      if (isUnvalidated) {
        this.unvalidatedBanner.style.display = "inline-block";
        this.unvalidatedBanner.textContent = "Traduction non validée";
      } else {
        this.unvalidatedBanner.style.display = "none";
      }
    }
    /**
     * Détruit le composant et retire l'élément hôte du DOM.
     */
    destroy() {
      if (this.hostEl && this.hostEl.parentNode) {
        this.hostEl.parentNode.removeChild(this.hostEl);
      }
      this.hostEl = null;
      this.wrapperEl = null;
      this.toggleBtn = null;
      this.footerSelect = null;
      this.unvalidatedBanner = null;
    }
    resolveLanguageOptions(available) {
      if (!available || available.length === 0) {
        return DEFAULT_LANGUAGE_OPTIONS;
      }
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const info of available) {
        seen.add(info.code);
        out.push({
          code: info.code,
          label: `${info.nativeName} (${info.code.toUpperCase()})`
        });
      }
      for (const fallback of DEFAULT_LANGUAGE_OPTIONS) {
        if (!seen.has(fallback.code)) {
          out.push(fallback);
        }
      }
      return out;
    }
    triggerLanguageSelection(choice) {
      if (this.onSelectLanguage) {
        this.onSelectLanguage(choice);
      } else {
        this.onToggleClick();
      }
    }
    findFooterContainer() {
      if (!document.body) {
        return null;
      }
      return document.body.querySelector(
        "footer, [role='contentinfo'], #footer, .footer, .site-footer"
      );
    }
    applyPlacementStyle(inFooter) {
      if (!this.hostEl) {
        return;
      }
      if (inFooter) {
        this.hostEl.setAttribute("data-placement", "footer");
        this.hostEl.style.position = "";
        this.hostEl.style.bottom = "";
        this.hostEl.style.right = "";
        this.hostEl.style.zIndex = "";
      } else {
        this.hostEl.setAttribute("data-placement", "floating");
        this.hostEl.style.position = "fixed";
        this.hostEl.style.bottom = "16px";
        this.hostEl.style.right = "16px";
        this.hostEl.style.zIndex = "2147483647";
      }
    }
    relocateToFooterIfAvailable() {
      if (!this.hostEl) {
        return;
      }
      const footer = this.findFooterContainer();
      if (footer) {
        if (this.hostEl.parentElement !== footer) {
          footer.appendChild(this.hostEl);
        }
        this.applyPlacementStyle(true);
      } else {
        if (this.hostEl.parentElement !== document.body) {
          document.body.appendChild(this.hostEl);
        }
        this.applyPlacementStyle(false);
      }
    }
    populateSelectOptions(select, langOptions, currentSelection) {
      if (!select) {
        return;
      }
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
      const origOpt = document.createElement("option");
      origOpt.value = "original";
      origOpt.textContent = "Original";
      select.appendChild(origOpt);
      for (const item of langOptions) {
        const opt = document.createElement("option");
        opt.value = item.code;
        opt.textContent = item.label;
        select.appendChild(opt);
      }
      select.value = currentSelection;
    }
    mount(langOptions) {
      if (!document.body) {
        return;
      }
      const existing = document.getElementById(BADGE_HOST_ID);
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
      const host = document.createElement("div");
      host.id = BADGE_HOST_ID;
      host.setAttribute("translate", "no");
      host.className = "notranslate";
      const shadow = host.attachShadow({ mode: "closed" });
      const style = document.createElement("style");
      style.textContent = `
      :host {
        display: inline-block;
        margin: 6px 8px;
        vertical-align: middle;
      }
      .lf-wrapper {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        font-size: 12px;
        line-height: 1.2;
      }
      .lf-unvalidated {
        background-color: #fef3c7;
        color: #92400e;
        border: 1px solid #d97706;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 11px;
        font-weight: 600;
      }
      .lf-bar {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background-color: #0f172a;
        color: #f8fafc;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 8px;
        padding: 4px 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
      }
      .lf-btn {
        background: transparent;
        color: #f8fafc;
        border: none;
        padding: 2px 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
      }
      .lf-btn:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
      .lf-btn:focus-visible, .lf-select:focus-visible {
        outline: 2px solid #10b981;
        outline-offset: 1px;
      }
      .lf-select {
        background: transparent;
        color: #f8fafc;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.25);
        padding: 2px 4px;
        font-size: 12px;
        font-family: inherit;
        cursor: pointer;
      }
      .lf-select option {
        color: #111827;
        background-color: #ffffff;
      }
    `;
      const wrapper = document.createElement("div");
      wrapper.className = "lf-wrapper";
      const unvalidated = document.createElement("div");
      unvalidated.className = "lf-unvalidated";
      unvalidated.setAttribute("role", "status");
      unvalidated.style.display = "none";
      const bar = document.createElement("div");
      bar.className = "lf-bar";
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "lf-btn";
      toggleBtn.addEventListener("click", () => {
        this.onToggleClick();
      });
      const footerSelect = document.createElement("select");
      footerSelect.className = "lf-select";
      footerSelect.setAttribute("aria-label", "Choisir la langue de la page");
      footerSelect.setAttribute("title", "Choisir la langue de la page");
      this.populateSelectOptions(footerSelect, langOptions, "en");
      footerSelect.addEventListener("change", () => {
        const val = footerSelect.value;
        this.triggerLanguageSelection(val);
      });
      bar.appendChild(toggleBtn);
      bar.appendChild(footerSelect);
      wrapper.appendChild(unvalidated);
      wrapper.appendChild(bar);
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      this.hostEl = host;
      this.wrapperEl = wrapper;
      this.toggleBtn = toggleBtn;
      this.footerSelect = footerSelect;
      this.unvalidatedBanner = unvalidated;
      const footer = this.findFooterContainer();
      if (footer) {
        footer.appendChild(host);
        this.applyPlacementStyle(true);
      } else {
        document.body.appendChild(host);
        this.applyPlacementStyle(false);
      }
    }
  };

  // src/content/dom-applier.ts
  var DomApplier = class {
    constructor() {
      this.textRecords = /* @__PURE__ */ new WeakMap();
      this.textRefs = /* @__PURE__ */ new Set();
      this.attrRecords = /* @__PURE__ */ new WeakMap();
      this.attrElementRefs = /* @__PURE__ */ new Set();
      this.translatedView = true;
    }
    /**
     * Lit la valeur courante d'une cible dans le DOM.
     */
    readCurrentValue(target) {
      if (target.kind === "text") {
        return target.node.nodeValue ?? "";
      }
      return target.element.getAttribute(target.attr) ?? "";
    }
    /**
     * Récupère l'enregistrement existant pour une cible donnée.
     */
    getRecord(target) {
      if (target.kind === "text") {
        return this.textRecords.get(target.node);
      }
      return this.attrRecords.get(target.element)?.get(target.attr);
    }
    /**
     * Détermine le texte source original à traduire pour une cible :
     * - Si la cible n'a jamais été vue, retourne sa valeur courante.
     * - Si la cible a déjà été traduite mais que le site hôte a réécrit sa valeur (différente de record.translated et de record.original),
     *   considère la nouvelle valeur comme un NOUVEL original (Section 5.8).
     * - Si la valeur courante est déjà notre propre traduction (record.translated), retourne null pour indiquer qu'aucune retraduction n'est nécessaire.
     */
    resolveOriginalForTranslation(target, forceRetranslate = false) {
      const currentVal = this.readCurrentValue(target);
      const existing = this.getRecord(target);
      if (!existing) {
        return currentVal;
      }
      if (forceRetranslate) {
        if (currentVal !== existing.translated && currentVal !== existing.original) {
          return currentVal;
        }
        return existing.original;
      }
      if (this.translatedView && existing.status === "translated" && currentVal === existing.translated) {
        return null;
      }
      if (!this.translatedView && currentVal === existing.original) {
        return null;
      }
      if (existing.status !== "translated" && currentVal === existing.original) {
        if (existing.reason === "numeric-or-symbol-only" || existing.reason === "empty-input" || existing.reason === "already-in-target-lang") {
          return null;
        }
        return currentVal;
      }
      return currentVal;
    }
    /**
     * Enregistre le résultat de traduction et, si status === "translated" et que la vue traduite est active,
     * applique la valeur dans le DOM via nodeValue ou setAttribute.
     */
    applyTranslation(target, originalText, result) {
      const record = {
        original: originalText,
        translated: result.status === "translated" ? result.output : originalText,
        status: result.status,
        critical: result.critical,
        reason: result.reason
      };
      if (target.kind === "text") {
        this.textRecords.set(target.node, record);
        this.trackTextRef(target.node);
        if (this.translatedView && result.status === "translated") {
          target.node.nodeValue = result.output;
        }
      } else {
        let map = this.attrRecords.get(target.element);
        if (!map) {
          map = /* @__PURE__ */ new Map();
          this.attrRecords.set(target.element, map);
          this.trackElementRef(target.element);
        }
        map.set(target.attr, record);
        if (this.translatedView && result.status === "translated") {
          target.element.setAttribute(target.attr, result.output);
        }
      }
    }
    /**
     * Restaure instantanément tous les textes et attributs originaux dans le DOM (bascule "Original").
     */
    restoreAll() {
      this.translatedView = false;
      for (const ref of [...this.textRefs]) {
        const node = ref.deref();
        if (!node || !node.isConnected) {
          this.textRefs.delete(ref);
          continue;
        }
        const rec = this.textRecords.get(node);
        if (rec && rec.status === "translated") {
          node.nodeValue = rec.original;
        }
      }
      for (const ref of [...this.attrElementRefs]) {
        const el = ref.deref();
        if (!el || !el.isConnected) {
          this.attrElementRefs.delete(ref);
          continue;
        }
        const map = this.attrRecords.get(el);
        if (!map) {
          continue;
        }
        for (const [attr, rec] of map.entries()) {
          if (rec.status === "translated") {
            el.setAttribute(attr, rec.original);
          }
        }
      }
    }
    /**
     * Réapplique instantanément toutes les traductions mémorisées dans le DOM (bascule "Traduit").
     */
    reapplyAll() {
      this.translatedView = true;
      for (const ref of [...this.textRefs]) {
        const node = ref.deref();
        if (!node || !node.isConnected) {
          this.textRefs.delete(ref);
          continue;
        }
        const rec = this.textRecords.get(node);
        if (rec && rec.status === "translated") {
          node.nodeValue = rec.translated;
        }
      }
      for (const ref of [...this.attrElementRefs]) {
        const el = ref.deref();
        if (!el || !el.isConnected) {
          this.attrElementRefs.delete(ref);
          continue;
        }
        const map = this.attrRecords.get(el);
        if (!map) {
          continue;
        }
        for (const [attr, rec] of map.entries()) {
          if (rec.status === "translated") {
            el.setAttribute(attr, rec.translated);
          }
        }
      }
    }
    /**
     * Bascule entre la vue traduite et la vue originale et retourne le nouvel état translatedView.
     */
    toggleView() {
      if (this.translatedView) {
        this.restoreAll();
      } else {
        this.reapplyAll();
      }
      return this.translatedView;
    }
    /**
     * Indique si la vue traduite est actuellement affichée.
     */
    isTranslatedView() {
      return this.translatedView;
    }
    /**
     * Calcule les compteurs à jour sur les nœuds connectés au document.
     */
    getStats() {
      let translatedCount = 0;
      let fallbackCount = 0;
      let unchangedCount = 0;
      for (const ref of [...this.textRefs]) {
        const node = ref.deref();
        if (!node || !node.isConnected) {
          this.textRefs.delete(ref);
          continue;
        }
        const rec = this.textRecords.get(node);
        if (!rec) {
          continue;
        }
        if (rec.status === "translated") {
          translatedCount += 1;
        } else if (rec.status === "failed-safe") {
          fallbackCount += 1;
        } else {
          unchangedCount += 1;
        }
      }
      for (const ref of [...this.attrElementRefs]) {
        const el = ref.deref();
        if (!el || !el.isConnected) {
          this.attrElementRefs.delete(ref);
          continue;
        }
        const map = this.attrRecords.get(el);
        if (!map) {
          continue;
        }
        for (const rec of map.values()) {
          if (rec.status === "translated") {
            translatedCount += 1;
          } else if (rec.status === "failed-safe") {
            fallbackCount += 1;
          } else {
            unchangedCount += 1;
          }
        }
      }
      return {
        translatedCount,
        fallbackCount,
        unchangedCount,
        translatedView: this.translatedView
      };
    }
    trackTextRef(node) {
      for (const ref of this.textRefs) {
        if (ref.deref() === node) {
          return;
        }
      }
      this.textRefs.add(new WeakRef(node));
    }
    trackElementRef(el) {
      for (const ref of this.attrElementRefs) {
        if (ref.deref() === el) {
          return;
        }
      }
      this.attrElementRefs.add(new WeakRef(el));
    }
  };

  // src/content/observer.ts
  var TRANSLATABLE_ATTRIBUTES = [
    "placeholder",
    "title",
    "aria-label",
    "aria-placeholder",
    "data-placeholder",
    "alt",
    "label",
    "value"
  ];
  var STATE_ATTRIBUTES = [
    "class",
    "style",
    "hidden",
    "aria-hidden",
    "open",
    "data-state",
    "aria-expanded",
    "aria-invalid",
    "disabled"
  ];
  var ALL_OBSERVED_ATTRIBUTES = [
    ...TRANSLATABLE_ATTRIBUTES,
    ...STATE_ATTRIBUTES
  ];
  var DomTranslationObserver = class {
    constructor(onTargetsMutated, debounceMs = 45) {
      this.observer = null;
      this.applying = false;
      this.debounceTimer = null;
      this.pendingNodes = /* @__PURE__ */ new Set();
      this.pendingAttrs = /* @__PURE__ */ new Map();
      this.onTargetsMutated = onTargetsMutated;
      this.debounceMs = debounceMs;
    }
    /**
     * Démarre l'observation sur la racine spécifiée (typiquement document.documentElement).
     */
    start(root = document.documentElement) {
      this.stop();
      this.observer = new MutationObserver((records) => {
        this.handleMutations(records);
      });
      this.observer.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ALL_OBSERVED_ATTRIBUTES
      });
    }
    /**
     * Arrête l'observation et nettoie les files d'attente.
     */
    stop() {
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
      }
      if (this.observer) {
        this.observer.takeRecords();
        this.observer.disconnect();
        this.observer = null;
      }
      this.pendingNodes.clear();
      this.pendingAttrs.clear();
    }
    /**
     * Exécute une opération d'écriture DOM sous verrou anti-boucle :
     * 1. Récupère et traite d'abord toute mutation du site en attente dans la file du MutationObserver (pour ne jamais perdre un changement de formulaire).
     * 2. Exécute l'écriture de l'extension sous applying = true.
     * 3. Purge uniquement les enregistrements produits par cette écriture.
     */
    withApplying(fn) {
      if (this.observer && !this.applying) {
        const priorSiteRecords = this.observer.takeRecords();
        if (priorSiteRecords.length > 0) {
          this.handleMutations(priorSiteRecords);
        }
      }
      this.applying = true;
      try {
        return fn();
      } finally {
        if (this.observer) {
          this.observer.takeRecords();
        }
        this.applying = false;
      }
    }
    handleMutations(records) {
      if (this.applying) {
        return;
      }
      for (const record of records) {
        if (record.type === "childList") {
          record.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && isIgnoredElement(node)) {
              return;
            }
            if (node.nodeType === Node.TEXT_NODE && isIgnoredElement(node.parentElement)) {
              return;
            }
            this.pendingNodes.add(node);
          });
        } else if (record.type === "characterData") {
          const target = record.target;
          if (target.nodeType === Node.TEXT_NODE && !isIgnoredElement(target.parentElement)) {
            this.pendingNodes.add(target);
          }
        } else if (record.type === "attributes") {
          const el = record.target;
          const attrName = record.attributeName;
          if (!el || el.nodeType !== Node.ELEMENT_NODE || !attrName || isIgnoredElement(el)) {
            continue;
          }
          if (TRANSLATABLE_ATTRIBUTES.includes(attrName)) {
            let attrSet = this.pendingAttrs.get(el);
            if (!attrSet) {
              attrSet = /* @__PURE__ */ new Set();
              this.pendingAttrs.set(el, attrSet);
            }
            attrSet.add(attrName);
          } else if (STATE_ATTRIBUTES.includes(attrName)) {
            this.pendingNodes.add(el);
          }
        }
      }
      if (this.pendingNodes.size === 0 && this.pendingAttrs.size === 0) {
        return;
      }
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.flushPending();
      }, this.debounceMs);
    }
    flushPending() {
      this.debounceTimer = null;
      const nodes = [...this.pendingNodes];
      const attrs = [...this.pendingAttrs.entries()];
      this.pendingNodes.clear();
      this.pendingAttrs.clear();
      const collected = [];
      const seenTextNodes = /* @__PURE__ */ new Set();
      for (const node of nodes) {
        if (!node.isConnected) {
          continue;
        }
        const subTargets = collectTranslatableTargets(node);
        for (const t of subTargets) {
          if (t.kind === "text") {
            if (!seenTextNodes.has(t.node)) {
              seenTextNodes.add(t.node);
              collected.push(t);
            }
          } else {
            collected.push(t);
          }
        }
      }
      for (const [el, attrSet] of attrs) {
        if (!el.isConnected || isIgnoredElement(el)) {
          continue;
        }
        for (const attr of attrSet) {
          const val = el.getAttribute(attr);
          if (val && val.trim().length > 0) {
            collected.push({ kind: "attr", element: el, attr });
          }
        }
      }
      if (collected.length > 0) {
        this.onTargetsMutated(collected);
      }
    }
  };

  // src/content/index.ts
  var BATCH_SIZE = 12;
  var TAKEOVER_EVENT = "linguafin:takeover";
  function isContextInvalidatedError(err) {
    const msg = err instanceof Error ? err.message : String(err ?? "");
    return msg.includes("Extension context invalidated");
  }
  var ContentController = class {
    constructor(engine, debounceMs = 45) {
      this.settings = { ...DEFAULT_SETTINGS, enabledHosts: ["*"] };
      this.active = false;
      this.orphaned = false;
      this.pageDetection = { lang: "unknown", confidence: 0 };
      this.unsubscribeSettings = null;
      this.lastHref = "";
      this.hydrationTimers = [];
      this.scrollTimer = null;
      this.formTimers = [];
      this.remoteProvider = new RemoteProvider();
      this.engine = engine ?? new TranslationEngine({
        remoteProvider: this.remoteProvider,
        enableLiveTranslation: true
      });
      this.applier = new DomApplier();
      this.observer = new DomTranslationObserver((targets) => {
        if (this.orphaned || !isExtensionContextValid()) {
          this.disconnectOrphaned();
          return;
        }
        if (typeof window !== "undefined" && window.location.href !== this.lastHref) {
          this.lastHref = window.location.href;
          void this.translateFullPage(false).catch(() => {
          });
          return;
        }
        void this.translateTargetsInBatches(targets, false).catch(() => {
        });
      }, debounceMs);
      this.badge = new FloatingBadge(
        () => {
          if (!isExtensionContextValid()) {
            this.disconnectOrphaned();
            return;
          }
          this.handleToggleView();
        },
        (choice) => {
          if (!isExtensionContextValid()) {
            this.disconnectOrphaned();
            return;
          }
          void this.handleSelectLanguage(choice).catch(() => {
          });
        }
      );
      this.boundTakeoverListener = () => {
        this.disconnectOrphaned();
      };
      if (typeof window !== "undefined") {
        window.addEventListener(TAKEOVER_EVENT, this.boundTakeoverListener);
      }
      this.boundRouteListener = () => {
        if (this.orphaned || !isExtensionContextValid()) {
          this.disconnectOrphaned();
          return;
        }
        if (this.active) {
          this.lastHref = typeof window !== "undefined" ? window.location.href : "";
          void this.translateFullPage(false).catch(() => {
          });
        }
      };
      this.boundScrollListener = () => {
        if (this.orphaned || !isExtensionContextValid()) {
          this.disconnectOrphaned();
          return;
        }
        if (!this.active) {
          return;
        }
        if (this.scrollTimer !== null) {
          clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
          this.scrollTimer = null;
          if (this.orphaned || !isExtensionContextValid()) {
            this.disconnectOrphaned();
            return;
          }
          if (this.active) {
            void this.translateFullPage(false).catch(() => {
            });
          }
        }, 250);
      };
      this.boundFormInteractionListener = (ev) => {
        if (this.orphaned || !isExtensionContextValid()) {
          this.disconnectOrphaned();
          return;
        }
        if (!this.active) {
          return;
        }
        const targetEl = ev.target instanceof Element ? ev.target : null;
        if (targetEl && (targetEl.id === "linguafin-badge-host" || targetEl.closest("#linguafin-badge-host"))) {
          return;
        }
        this.clearFormTimers();
        for (const delay of [50, 200]) {
          const timer = setTimeout(() => {
            if (this.orphaned || !isExtensionContextValid()) {
              this.disconnectOrphaned();
              return;
            }
            if (!this.active) {
              return;
            }
            const root = document.body ?? document.documentElement;
            if (root) {
              const targets = collectTranslatableTargets(root);
              void this.translateTargetsInBatches(targets, false).catch(() => {
              });
            }
          }, delay);
          this.formTimers.push(timer);
        }
      };
    }
    /**
     * Initialise le contrôleur : lit les réglages, s'abonne aux changements et aux messages de la popup,
     * et active la traduction uniquement si l'hôte courant est autorisé.
     */
    async init() {
      try {
        this.settings = await getSettings();
        this.remoteProvider.setRemoteUrl(this.settings.remoteUrl);
        this.syncModelServerConfig(this.settings);
        this.unsubscribeSettings = onSettingsChanged((newSettings) => {
          void this.handleSettingsUpdate(newSettings);
        });
        if (isExtensionContextValid()) {
          try {
            import_webextension_polyfill.default.runtime.onMessage.addListener((msg) => {
              if (!isExtensionContextValid() || !isExtensionMessage(msg)) {
                return void 0;
              }
              if (msg.type === "GET_STATUS") {
                return Promise.resolve(this.getStatus());
              }
              if (msg.type === "TOGGLE_VIEW") {
                this.handleToggleView();
                return Promise.resolve(this.getStatus());
              }
              if (msg.type === "RETRANSLATE") {
                return this.retranslateFullPage().then(() => this.getStatus());
              }
              return void 0;
            });
          } catch {
          }
        }
        await this.evaluateActivation();
      } catch {
        this.safeDisableAndRestore();
      }
    }
    /**
     * Échantillonne les textes ORIGINAUX (non traduits) de la page afin que la détection de la langue source
     * ne soit jamais faussée par les nœuds déjà traduits lors d'une passe précédente.
     */
    detectOriginalPageLanguage(root) {
      const allTargets = collectTranslatableTargets(root);
      const samples = [];
      for (const target of allTargets) {
        if (samples.length >= 400) {
          break;
        }
        const rec = this.applier.getRecord(target);
        const raw = rec ? rec.original : this.applier.readCurrentValue(target);
        const trimmed = raw.trim();
        if (trimmed.length >= 2) {
          samples.push(trimmed);
        }
      }
      const htmlLang = document.documentElement?.getAttribute("lang") ?? void 0;
      return detectPageLanguage(samples, htmlLang);
    }
    /**
     * Traduit immédiatement la page complète (utile également dans les tests d'intégration jsdom).
     */
    async translateFullPage(forceRetranslate = false) {
      try {
        const root = document.body ?? document.documentElement;
        if (!root) {
          return;
        }
        this.pageDetection = this.detectOriginalPageLanguage(root);
        const allTargets = collectTranslatableTargets(root);
        await this.translateTargetsInBatches(allTargets, forceRetranslate);
        this.refreshBadge();
      } catch {
        this.safeDisableAndRestore();
      }
    }
    /**
     * Relance la traduction complète après un changement de langue cible, de fournisseur ou de mode.
     */
    async retranslateFullPage() {
      if (!this.active) {
        return;
      }
      try {
        if (isExtensionContextValid()) {
          this.settings = await getSettings();
          this.remoteProvider.setRemoteUrl(this.settings.remoteUrl);
          this.syncModelServerConfig(this.settings);
        }
        this.engine.clearCache();
        this.observer.withApplying(() => {
          this.applier.restoreAll();
          this.applier.reapplyAll();
        });
        await this.translateFullPage(true);
      } catch {
      }
    }
    /**
     * Bascule instantanément entre Original et Traduit.
     */
    handleToggleView() {
      const nextView = this.observer.withApplying(() => this.applier.toggleView());
      this.refreshBadge();
      return nextView;
    }
    /**
     * Sélection directe d'une langue (ou retour à l'original) depuis le sélecteur du site ou le petit bouton du footer.
     */
    async handleSelectLanguage(choice) {
      try {
        if (choice === "original") {
          this.observer.withApplying(() => {
            this.applier.restoreAll();
          });
          this.refreshBadge();
          return;
        }
        this.settings = {
          ...this.settings,
          mode: "manual",
          targetLang: choice
        };
        if (isExtensionContextValid()) {
          this.settings = await updateSettings({
            mode: "manual",
            targetLang: choice
          });
        }
        this.engine.clearCache();
        this.observer.withApplying(() => {
          this.applier.restoreAll();
          this.applier.reapplyAll();
        });
        await this.translateFullPage(true);
      } catch {
      }
    }
    /**
     * Retourne l'état complet de la page pour la popup.
     */
    getStatus() {
      const stats = this.applier.getStats();
      const targetLang = this.resolveCurrentTargetLang();
      const targetLangStatus = this.resolveLangValidationStatus(targetLang);
      return {
        enabled: this.active,
        host: window.location.hostname || "localhost",
        pageLang: this.pageDetection.lang,
        pageConfidence: this.pageDetection.confidence,
        targetLang,
        targetLangStatus,
        translatedCount: stats.translatedCount,
        fallbackCount: stats.fallbackCount,
        unchangedCount: stats.unchangedCount,
        translatedView: stats.translatedView
      };
    }
    /**
     * Arrête immédiatement une instance devenue orpheline suite au rechargement de l'extension
     * dans chrome://extensions, sans tenter d'appeler l'API browser.* invalidée.
     */
    disconnectOrphaned() {
      if (this.orphaned) {
        return;
      }
      this.orphaned = true;
      this.active = false;
      try {
        this.clearHydrationTimers();
        this.clearFormTimers();
        if (this.scrollTimer !== null) {
          clearTimeout(this.scrollTimer);
          this.scrollTimer = null;
        }
        if (typeof window !== "undefined") {
          window.removeEventListener("popstate", this.boundRouteListener);
          window.removeEventListener("hashchange", this.boundRouteListener);
          window.removeEventListener("scroll", this.boundScrollListener);
          window.removeEventListener(TAKEOVER_EVENT, this.boundTakeoverListener);
        }
        if (typeof document !== "undefined") {
          document.removeEventListener("input", this.boundFormInteractionListener, true);
          document.removeEventListener("change", this.boundFormInteractionListener, true);
          document.removeEventListener("click", this.boundFormInteractionListener, true);
          document.removeEventListener("submit", this.boundFormInteractionListener, true);
        }
        this.observer.stop();
        if (this.unsubscribeSettings) {
          this.unsubscribeSettings();
          this.unsubscribeSettings = null;
        }
        this.badge.destroy();
      } catch {
      }
    }
    /**
     * Arrête proprement le contrôleur et restaure tous les textes originaux.
     */
    safeDisableAndRestore() {
      try {
        this.disconnectOrphaned();
        this.observer.withApplying(() => {
          this.applier.restoreAll();
        });
      } catch {
      }
    }
    clearHydrationTimers() {
      for (const timer of this.hydrationTimers) {
        clearTimeout(timer);
      }
      this.hydrationTimers = [];
    }
    clearFormTimers() {
      for (const timer of this.formTimers) {
        clearTimeout(timer);
      }
      this.formTimers = [];
    }
    destroy() {
      this.safeDisableAndRestore();
      if (this.unsubscribeSettings) {
        this.unsubscribeSettings();
        this.unsubscribeSettings = null;
      }
    }
    syncModelServerConfig(settings) {
      this.engine.getModelServerProvider()?.configure({
        enabled: Boolean(settings.modelServerEnabled),
        serverUrl: settings.modelServerUrl ?? "",
        apiKey: settings.modelServerApiKey ?? ""
      });
    }
    async handleSettingsUpdate(nextSettings) {
      const prevSettings = this.settings;
      this.settings = nextSettings;
      this.remoteProvider.setRemoteUrl(nextSettings.remoteUrl);
      this.syncModelServerConfig(nextSettings);
      const providerChanged = prevSettings.remoteEnabled !== nextSettings.remoteEnabled || prevSettings.remoteUrl !== nextSettings.remoteUrl || prevSettings.modelServerEnabled !== nextSettings.modelServerEnabled || prevSettings.modelServerUrl !== nextSettings.modelServerUrl;
      if (providerChanged) {
        this.engine.clearCache();
      }
      const shouldBeActive = isHostEnabled(window.location.hostname || "localhost", nextSettings);
      if (!shouldBeActive && this.active) {
        this.safeDisableAndRestore();
        return;
      }
      if (shouldBeActive && !this.active) {
        await this.evaluateActivation();
        return;
      }
      if (this.active) {
        const langChanged = prevSettings.mode !== nextSettings.mode || prevSettings.targetLang !== nextSettings.targetLang || prevSettings.remoteEnabled !== nextSettings.remoteEnabled || prevSettings.modelServerEnabled !== nextSettings.modelServerEnabled || prevSettings.modelServerUrl !== nextSettings.modelServerUrl;
        if (langChanged) {
          await this.retranslateFullPage();
        } else {
          this.refreshBadge();
        }
      }
    }
    async evaluateActivation() {
      const hostname = window.location.hostname || "localhost";
      if (!isHostEnabled(hostname, this.settings)) {
        if (this.active) {
          this.safeDisableAndRestore();
        }
        return;
      }
      this.active = true;
      this.lastHref = typeof window !== "undefined" ? window.location.href : "";
      await this.translateFullPage(false);
      if (document.documentElement) {
        this.observer.start(document.documentElement);
      }
      if (typeof window !== "undefined") {
        window.addEventListener("popstate", this.boundRouteListener);
        window.addEventListener("hashchange", this.boundRouteListener);
      }
      if (typeof document !== "undefined") {
        document.addEventListener("input", this.boundFormInteractionListener, { capture: true, passive: true });
        document.addEventListener("change", this.boundFormInteractionListener, { capture: true, passive: true });
        document.addEventListener("click", this.boundFormInteractionListener, { capture: true, passive: true });
        document.addEventListener("submit", this.boundFormInteractionListener, { capture: true, passive: true });
      }
      const inVitest = typeof process !== "undefined" && Boolean(process.env?.VITEST);
      if (!inVitest) {
        if (typeof window !== "undefined") {
          window.addEventListener("scroll", this.boundScrollListener, { passive: true });
        }
        this.clearHydrationTimers();
        for (const delay of [350, 1200, 2800]) {
          const timer = setTimeout(() => {
            if (this.active) {
              void this.translateFullPage(false);
            }
          }, delay);
          this.hydrationTimers.push(timer);
        }
      }
    }
    async translateTargetsInBatches(targets, forceRetranslate) {
      if (this.orphaned || !isExtensionContextValid()) {
        this.disconnectOrphaned();
        return;
      }
      if (targets.length === 0) {
        return;
      }
      try {
        const root = document.body ?? document.documentElement;
        if (root && (this.pageDetection.lang === "unknown" || this.pageDetection.confidence < 0.7)) {
          const nextDetection = this.detectOriginalPageLanguage(root);
          if (nextDetection.lang !== "unknown") {
            const prevLang = this.pageDetection.lang;
            this.pageDetection = nextDetection;
            if (prevLang !== nextDetection.lang) {
              targets = collectTranslatableTargets(root);
              forceRetranslate = true;
            }
          }
        }
        const ctx = {
          mode: this.settings.mode,
          targetLang: this.resolveCurrentTargetLang(),
          pageDetection: this.pageDetection,
          remoteEnabled: this.settings.remoteEnabled,
          debug: this.settings.debug
        };
        for (let i = 0; i < targets.length; i += BATCH_SIZE) {
          if (this.orphaned || !isExtensionContextValid()) {
            this.disconnectOrphaned();
            return;
          }
          const slice = targets.slice(i, i + BATCH_SIZE);
          await this.processBatch(slice, ctx, forceRetranslate);
          if (i + BATCH_SIZE < targets.length) {
            await this.yieldToMainThread();
          }
        }
        this.refreshBadge();
      } catch (err) {
        if (isContextInvalidatedError(err)) {
          this.disconnectOrphaned();
        }
      }
    }
    async processBatch(batch, ctx, forceRetranslate) {
      if (this.orphaned || !isExtensionContextValid()) {
        this.disconnectOrphaned();
        return;
      }
      try {
        const candidates = [];
        for (const target of batch) {
          const original = this.applier.resolveOriginalForTranslation(target, forceRetranslate);
          if (original !== null) {
            candidates.push({ target, original });
          }
        }
        if (candidates.length === 0) {
          return;
        }
        const pendingApplies = await Promise.all(
          candidates.map(async ({ target, original }) => {
            const result = await this.engine.translateSegment(original, ctx);
            return { target, original, result };
          })
        );
        if (pendingApplies.length > 0 && !this.orphaned) {
          this.observer.withApplying(() => {
            for (const item of pendingApplies) {
              this.applier.applyTranslation(item.target, item.original, item.result);
            }
          });
        }
      } catch (err) {
        if (isContextInvalidatedError(err)) {
          this.disconnectOrphaned();
        }
      }
    }
    yieldToMainThread() {
      return new Promise((resolve) => {
        const w = globalThis;
        if (typeof w.requestIdleCallback === "function") {
          w.requestIdleCallback(() => resolve(), { timeout: 50 });
        } else {
          setTimeout(resolve, 0);
        }
      });
    }
    resolveCurrentTargetLang() {
      if (this.settings.mode === "manual" && this.settings.targetLang) {
        return this.settings.targetLang;
      }
      if (this.pageDetection.lang === "en") {
        return "fr";
      }
      return "en";
    }
    resolveLangValidationStatus(langCode) {
      const langs = this.engine.getLexiconProvider().getAvailableLanguages();
      const found = langs.find((l) => l.code === langCode);
      return found ? found.status : "experimental";
    }
    refreshBadge() {
      if (this.orphaned) {
        return;
      }
      this.observer.withApplying(() => {
        this.badge.update({
          visible: this.active && this.settings.showBadge,
          targetLang: this.resolveCurrentTargetLang(),
          targetLangStatus: this.resolveLangValidationStatus(this.resolveCurrentTargetLang()),
          translatedView: this.applier.isTranslatedView(),
          availableLanguages: this.engine.getLexiconProvider().getAvailableLanguages()
        });
      });
    }
  };
  var isTestEnv = typeof process !== "undefined" && Boolean(process.env?.VITEST);
  if (!isTestEnv && typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener("unhandledrejection", (ev) => {
      if (isContextInvalidatedError(ev.reason)) {
        ev.preventDefault();
        const win2 = window;
        win2.__linguafinController?.disconnectOrphaned();
      }
    });
    try {
      window.dispatchEvent(new CustomEvent(TAKEOVER_EVENT));
    } catch {
    }
    const win = window;
    if (win.__linguafinController) {
      try {
        win.__linguafinController.destroy();
      } catch {
      }
    }
    const controller = new ContentController();
    win.__linguafinController = controller;
    void controller.init().catch(() => {
    });
  }
})();
//# sourceMappingURL=index.js.map
