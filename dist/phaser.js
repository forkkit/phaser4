var Phaser = (function (exports) {
    'use strict';

    var Game = /** @class */ (function () {
        function Game(width, height) {
            if (width === void 0) { width = 800; }
            if (height === void 0) { height = 600; }
            this.canvas = document.createElement('canvas');
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
            this.context = this.canvas.getContext('2d');
            this.context.fillStyle = '#2d2d2d';
            this.context.fillRect(0, 0, width, height);
        }
        Game.prototype.drawImage = function (image, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.context.drawImage(image, x, y);
        };
        Game.prototype.draw = function (text) {
            this.context.fillStyle = '#ff0000';
            this.context.fillText(text, 10, 40);
            this.context.fillStyle = '#0000ff';
            this.context.fillText(text, 10, 20);
            this.context.fillStyle = '#ffff00';
            this.context.fillText(text, 10, 60);
        };
        return Game;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    var BaseLoaderState;
    (function (BaseLoaderState) {
        BaseLoaderState[BaseLoaderState["IDLE"] = 0] = "IDLE";
        BaseLoaderState[BaseLoaderState["LOADING"] = 1] = "LOADING";
        BaseLoaderState[BaseLoaderState["PROCESSING"] = 2] = "PROCESSING";
        BaseLoaderState[BaseLoaderState["COMPLETE"] = 3] = "COMPLETE";
        BaseLoaderState[BaseLoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
        BaseLoaderState[BaseLoaderState["DESTROYED"] = 5] = "DESTROYED";
    })(BaseLoaderState || (BaseLoaderState = {}));

    var FileState;
    (function (FileState) {
        FileState[FileState["PENDING"] = 0] = "PENDING";
        FileState[FileState["LOADING"] = 1] = "LOADING";
        FileState[FileState["LOADED"] = 2] = "LOADED";
        FileState[FileState["FAILED"] = 3] = "FAILED";
        FileState[FileState["PROCESSING"] = 4] = "PROCESSING";
        FileState[FileState["ERRORED"] = 5] = "ERRORED";
        FileState[FileState["COMPLETE"] = 6] = "COMPLETE";
        FileState[FileState["DESTROYED"] = 7] = "DESTROYED";
        FileState[FileState["POPULATED"] = 8] = "POPULATED";
        FileState[FileState["TIMED_OUT"] = 9] = "TIMED_OUT";
        FileState[FileState["ABORTED"] = 10] = "ABORTED";
    })(FileState || (FileState = {}));

    var BaseLoader = /** @class */ (function () {
        function BaseLoader() {
            this.fileGroup = '';
            this.prefix = '';
            this.baseURL = '';
            this.path = '';
            this.maxParallelDownloads = 32;
            this.crossOrigin = '';
            this.state = BaseLoaderState.IDLE;
            this.progress = 0;
            this.totalToLoad = 0;
            this.totalFailed = 0;
            this.totalComplete = 0;
            this.list = new Set();
            this.inflight = new Set();
            this.queue = new Set();
            this._deleteQueue = new Set();
            this.state = BaseLoaderState.IDLE;
        }
        BaseLoader.prototype.setBaseURL = function (value) {
            if (value === void 0) { value = ''; }
            if (value !== '' && value.substr(-1) !== '/') {
                value = value.concat('/');
            }
            this.baseURL = value;
            return this;
        };
        BaseLoader.prototype.setPath = function (value) {
            if (value === void 0) { value = ''; }
            if (value !== '' && value.substr(-1) !== '/') {
                value = value.concat('/');
            }
            this.path = value;
            return this;
        };
        BaseLoader.prototype.setFileGroup = function (name) {
            if (name === void 0) { name = ''; }
            this.fileGroup = name;
            return this;
        };
        BaseLoader.prototype.isLoading = function () {
            return (this.state === BaseLoaderState.LOADING || this.state === BaseLoaderState.PROCESSING);
        };
        BaseLoader.prototype.isReady = function () {
            return (this.state === BaseLoaderState.IDLE || this.state === BaseLoaderState.COMPLETE);
        };
        BaseLoader.prototype.addFile = function (file) {
            console.log('addFile');
            this.getURL(file);
            this.list.add(file);
            this.totalToLoad++;
            console.log(file);
            return new Promise(function (resolve, reject) {
                file.fileResolve = resolve;
                file.fileReject = reject;
            });
        };
        BaseLoader.prototype.start = function () {
            if (!this.isReady()) {
                return;
            }
            this.progress = 0;
            this.totalFailed = 0;
            this.totalComplete = 0;
            this.totalToLoad = this.list.size;
            if (this.totalToLoad === 0) {
                this.loadComplete();
            }
            else {
                this.state = BaseLoaderState.LOADING;
                this.inflight.clear();
                this.queue.clear();
                this._deleteQueue.clear();
                this.updateProgress();
                this.checkLoadQueue();
            }
        };
        BaseLoader.prototype.getURL = function (file) {
            if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)) {
                return file;
            }
            else {
                file.url = this.baseURL + this.path + file.url;
            }
        };
        BaseLoader.prototype.updateProgress = function () {
            this.progress = 1 - ((this.list.size + this.inflight.size) / this.totalToLoad);
        };
        BaseLoader.prototype.checkLoadQueue = function () {
            var e_1, _a;
            var _this = this;
            try {
                for (var _b = __values(this.list), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var entry = _c.value;
                    if ((entry.state === FileState.POPULATED) ||
                        (entry.state === FileState.PENDING && this.inflight.size < this.maxParallelDownloads)) {
                        this.inflight.add(entry);
                        this.list.delete(entry);
                        //  Apply CORS
                        entry.load()
                            .then(function (file) { return _this.nextFile(file, true); })
                            .catch(function (file) { return _this.nextFile(file, false); });
                    }
                    if (this.inflight.size === this.maxParallelDownloads) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BaseLoader.prototype.nextFile = function (previousFile, success) {
            console.log('nextFile', previousFile, success);
            if (success) {
                this.queue.add(previousFile);
            }
            else {
                this._deleteQueue.add(previousFile);
            }
            this.inflight.delete(previousFile);
            if (this.list.size > 0) {
                console.log('nextFile - still something in the list');
                this.checkLoadQueue();
            }
            else if (this.inflight.size === 0) {
                console.log('nextFile calling finishedLoading');
                this.loadComplete();
            }
        };
        BaseLoader.prototype.loadComplete = function () {
            this.list.clear();
            this.inflight.clear();
            // this.queue.clear();
            this.progress = 1;
            this.state = BaseLoaderState.COMPLETE;
            //  Call 'destroy' on each file ready for deletion
            // this._deleteQueue.iterateLocal('destroy');
            // this._deleteQueue.clear();
        };
        return BaseLoader;
    }());

    function XHRLoader(file) {
        var e_1, _a;
        var xhr = new XMLHttpRequest();
        file.xhrLoader = xhr;
        var config = file.xhrSettings;
        xhr.open('GET', file.url, config.async, config.username, config.password);
        xhr.responseType = config.responseType;
        xhr.timeout = config.timeout;
        xhr.setRequestHeader('X-Requested-With', config.requestedWith);
        if (config.header && config.headerValue) {
            xhr.setRequestHeader(config.header, config.headerValue);
        }
        if (config.overrideMimeType) {
            xhr.overrideMimeType(config.overrideMimeType);
        }
        var onLoadStart = function (event) { return file.onLoadStart(event); };
        var onLoad = function (event) { return file.onLoad(event); };
        var onLoadEnd = function (event) { return file.onLoadEnd(event); };
        var onProgress = function (event) { return file.onProgress(event); };
        var onTimeout = function (event) { return file.onTimeout(event); };
        var onAbort = function (event) { return file.onAbort(event); };
        var onError = function (event) { return file.onError(event); };
        var eventMap = new Map([
            ['loadstart', onLoadStart],
            ['load', onLoad],
            ['loadend', onLoadEnd],
            ['progress', onProgress],
            ['timeout', onTimeout],
            ['abort', onAbort],
            ['error', onError]
        ]);
        try {
            for (var eventMap_1 = __values(eventMap), eventMap_1_1 = eventMap_1.next(); !eventMap_1_1.done; eventMap_1_1 = eventMap_1.next()) {
                var _b = __read(eventMap_1_1.value, 2), key = _b[0], value = _b[1];
                xhr.addEventListener(key, value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (eventMap_1_1 && !eventMap_1_1.done && (_a = eventMap_1.return)) _a.call(eventMap_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        file.resetXHR = function () {
            var e_2, _a;
            try {
                for (var eventMap_2 = __values(eventMap), eventMap_2_1 = eventMap_2.next(); !eventMap_2_1.done; eventMap_2_1 = eventMap_2.next()) {
                    var _b = __read(eventMap_2_1.value, 2), key = _b[0], value = _b[1];
                    xhr.removeEventListener(key, value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (eventMap_2_1 && !eventMap_2_1.done && (_a = eventMap_2.return)) _a.call(eventMap_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // xhr.removeEventListener('loadstart', onLoadStart);
            // xhr.removeEventListener('load', onLoad);
            // xhr.removeEventListener('loadend', onLoadEnd);
            // xhr.removeEventListener('progress', onProgress);
            // xhr.removeEventListener('timeout', onTimeout);
            // xhr.removeEventListener('abort', onAbort);
            // xhr.removeEventListener('error', onError);
        };
        // xhr.addEventListener('loadstart', onLoadStart);
        // xhr.addEventListener('load', onLoad);
        // xhr.addEventListener('loadend', onLoadEnd);
        // xhr.addEventListener('progress', onProgress);
        // xhr.addEventListener('timeout', onTimeout);
        // xhr.addEventListener('abort', onAbort);
        // xhr.addEventListener('error', onError);
        //  After a successful request, the xhr.response property will contain the requested data as a DOMString,
        //  ArrayBuffer, Blob, or Document (depending on what was set for responseType.)
        xhr.send();
    }

    function XHRSettings(config) {
        // Before sending a request, set the xhr.responseType to "text",
        // "arraybuffer", "blob", or "document", depending on your data needs.
        // Note, setting xhr.responseType = '' (or omitting) will default the response to "text".
        if (config === void 0) { config = { responseType: 'blob', async: true, username: '', password: '', timeout: 0 }; }
        return {
            //  Ignored by the Loader, only used by File.
            responseType: config.responseType,
            async: config.async,
            //  credentials
            username: config.username,
            password: config.password,
            //  timeout in ms (0 = no timeout)
            timeout: config.timeout,
            //  setRequestHeader
            header: undefined,
            headerValue: undefined,
            requestedWith: 'XMLHttpRequest',
            //  overrideMimeType
            overrideMimeType: undefined
        };
    }

    function File(key, url, type) {
        return {
            key: key,
            url: url,
            type: type,
            xhrLoader: undefined,
            xhrSettings: XHRSettings(),
            data: null,
            state: FileState.PENDING,
            bytesLoaded: 0,
            bytesTotal: 0,
            percentComplete: 0,
            load: function () {
                var _this = this;
                console.log('File.load', this.key);
                this.state = FileState.PENDING;
                XHRLoader(this);
                return new Promise(function (resolve, reject) {
                    _this.loaderResolve = resolve;
                    _this.loaderReject = reject;
                });
            },
            onLoadStart: function (event) {
                console.log('onLoadStart');
                this.state = FileState.LOADING;
            },
            onLoad: function (event) {
                var _this = this;
                console.log('onLoad');
                var xhr = this.xhrLoader;
                var localFileOk = ((xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && xhr.status === 0));
                var success = !(event.target && xhr.status !== 200) || localFileOk;
                //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
                if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) {
                    success = false;
                }
                this.onProcess()
                    .then(function () { return _this.onComplete(); })
                    .catch(function () { return _this.onError(); });
            },
            onLoadEnd: function (event) {
                console.log('onLoadEnd');
                this.resetXHR();
                this.state = FileState.LOADED;
            },
            onTimeout: function (event) {
                console.log('onTimeout');
                this.state = FileState.TIMED_OUT;
            },
            onAbort: function (event) {
                console.log('onAbort');
                this.state = FileState.ABORTED;
            },
            onError: function (event) {
                console.log('onError');
                this.state = FileState.ERRORED;
                if (this.fileReject) {
                    this.fileReject(this);
                }
            },
            onProgress: function (event) {
                console.log('onProgress');
                if (event.lengthComputable) {
                    this.bytesLoaded = event.loaded;
                    this.bytesTotal = event.total;
                    this.percentComplete = Math.min((event.loaded / event.total), 1);
                    console.log(this.percentComplete, '%');
                }
            },
            onProcess: function () {
                console.log('File.onProcess');
                this.state = FileState.PROCESSING;
                return new Promise(function (resolve, reject) {
                    resolve();
                });
            },
            onComplete: function () {
                console.log('onComplete!');
                this.state = FileState.COMPLETE;
                if (this.fileResolve) {
                    this.fileResolve(this);
                }
                else if (this.loaderResolve) {
                    this.loaderResolve(this);
                }
            },
            onDestroy: function () {
                this.state = FileState.DESTROYED;
            }
        };
    }

    function ImageFile(key, url) {
        if (!url) {
            url = key + '.png';
        }
        var file = File(key, url, 'image');
        file.xhrSettings.responseType = 'blob';
        file.onProcess = function () {
            console.log('ImageFile.onProcess');
            file.state = FileState.PROCESSING;
            var image = new Image();
            file.data = image;
            // if (file.crossOrigin)
            // {
            //     image.crossOrigin = file.crossOrigin;
            // }
            return new Promise(function (resolve, reject) {
                image.onload = function () {
                    console.log('ImageFile.onload');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.COMPLETE;
                    resolve(file);
                };
                image.onerror = function (event) {
                    console.log('ImageFile.onerror');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.FAILED;
                    reject(file);
                };
                console.log('ImageFile.set src', file.url);
                image.src = file.url;
                //  Image is immediately-available or cached
                if (image.complete && image.width && image.height) {
                    console.log('ImageFile.instant');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.COMPLETE;
                    resolve(file);
                }
            });
        };
        return file;
    }

    var LoaderPlugin = /** @class */ (function (_super) {
        __extends(LoaderPlugin, _super);
        function LoaderPlugin() {
            return _super.call(this) || this;
        }
        LoaderPlugin.prototype.image = function (key, url) {
            if (url === void 0) { url = ''; }
            return this.addFile(ImageFile(key, url));
        };
        return LoaderPlugin;
    }(BaseLoader));

    /**
     * @namespace Phaser.Loader
     */
    // export interface ILoader {
    //     BaseLoader: BaseLoader;
    //     BaseLoaderState: BaseLoaderState;
    //     File: File;
    //     FileState: FileState;
    //     LoaderPlugin: LoaderPlugin;
    //     XHRLoader;
    //     XHRSettings;
    //     FileTypes: {
    //         ImageFile
    //     };
    // }
    var Loader = {
        BaseLoader: BaseLoader,
        BaseLoaderState: BaseLoaderState,
        File: File,
        FileState: FileState,
        LoaderPlugin: LoaderPlugin,
        XHRLoader: XHRLoader,
        XHRSettings: XHRSettings,
        FileTypes: {
            ImageFile: ImageFile
        }
    };

    exports.Game = Game;
    exports.Loader = Loader;

    return exports;

}({}));
//# sourceMappingURL=phaser.js.map
