class Game {
    constructor(width = 800, height = 600) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#2d2d2d';
        this.context.fillRect(0, 0, width, height);
    }
    drawImage(image, x = 0, y = 0) {
        this.context.drawImage(image, x, y);
    }
    draw(text) {
        this.context.fillStyle = '#ff0000';
        this.context.fillText(text, 10, 40);
        this.context.fillStyle = '#0000ff';
        this.context.fillText(text, 10, 20);
        this.context.fillStyle = '#ffff00';
        this.context.fillText(text, 10, 60);
    }
}
//# sourceMappingURL=Game.js.map

function XHRLoader(file) {
    const xhr = new XMLHttpRequest();
    file.xhrLoader = xhr;
    const config = file.xhrSettings;
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
    const onLoadStart = (event) => file.onLoadStart(event);
    const onLoad = (event) => file.onLoad(event);
    const onLoadEnd = (event) => file.onLoadEnd(event);
    const onProgress = (event) => file.onProgress(event);
    const onTimeout = (event) => file.onTimeout(event);
    const onAbort = (event) => file.onAbort(event);
    const onError = (event) => file.onError(event);
    const eventMap = new Map([
        ['loadstart', onLoadStart],
        ['load', onLoad],
        ['loadend', onLoadEnd],
        ['progress', onProgress],
        ['timeout', onTimeout],
        ['abort', onAbort],
        ['error', onError]
    ]);
    for (const [key, value] of eventMap) {
        xhr.addEventListener(key, value);
    }
    file.resetXHR = () => {
        for (const [key, value] of eventMap) {
            xhr.removeEventListener(key, value);
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

function XHRSettings(config = { responseType: 'blob', async: true, username: '', password: '', timeout: 0 }) {
    // Before sending a request, set the xhr.responseType to "text",
    // "arraybuffer", "blob", or "document", depending on your data needs.
    // Note, setting xhr.responseType = '' (or omitting) will default the response to "text".
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
//# sourceMappingURL=XHRSettings.js.map

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
function File(key, url, type) {
    return {
        key,
        url,
        type,
        xhrLoader: undefined,
        xhrSettings: XHRSettings(),
        data: null,
        state: FileState.PENDING,
        bytesLoaded: 0,
        bytesTotal: 0,
        percentComplete: 0,
        load() {
            console.log('File.load', this.key);
            this.state = FileState.PENDING;
            XHRLoader(this);
            return new Promise((resolve, reject) => {
                this.loaderResolve = resolve;
                this.loaderReject = reject;
            });
        },
        onLoadStart(event) {
            console.log('onLoadStart');
            this.state = FileState.LOADING;
        },
        onLoad(event) {
            console.log('onLoad');
            const xhr = this.xhrLoader;
            const localFileOk = ((xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && xhr.status === 0));
            let success = !(event.target && xhr.status !== 200) || localFileOk;
            //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
            if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) {
                success = false;
            }
            this.onProcess()
                .then(() => this.onComplete())
                .catch(() => this.onError());
        },
        onLoadEnd(event) {
            console.log('onLoadEnd');
            this.resetXHR();
            this.state = FileState.LOADED;
        },
        onTimeout(event) {
            console.log('onTimeout');
            this.state = FileState.TIMED_OUT;
        },
        onAbort(event) {
            console.log('onAbort');
            this.state = FileState.ABORTED;
        },
        onError(event) {
            console.log('onError');
            this.state = FileState.ERRORED;
            this.fileReject(this);
        },
        onProgress(event) {
            console.log('onProgress');
            if (event.lengthComputable) {
                this.bytesLoaded = event.loaded;
                this.bytesTotal = event.total;
                this.percentComplete = Math.min((event.loaded / event.total), 1);
                console.log(this.percentComplete, '%');
            }
        },
        onProcess() {
            console.log('File.onProcess');
            this.state = FileState.PROCESSING;
            return new Promise((resolve, reject) => {
                resolve();
            });
        },
        onComplete() {
            this.state = FileState.COMPLETE;
            this.fileResolve(this);
        },
        onDestroy() {
            this.state = FileState.DESTROYED;
        }
    };
}

var LoaderState;
(function (LoaderState) {
    LoaderState[LoaderState["IDLE"] = 0] = "IDLE";
    LoaderState[LoaderState["LOADING"] = 1] = "LOADING";
    LoaderState[LoaderState["PROCESSING"] = 2] = "PROCESSING";
    LoaderState[LoaderState["COMPLETE"] = 3] = "COMPLETE";
    LoaderState[LoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
    LoaderState[LoaderState["DESTROYED"] = 5] = "DESTROYED";
})(LoaderState || (LoaderState = {}));
class BaseLoader {
    constructor() {
        this.fileGroup = '';
        this.prefix = '';
        this.baseURL = '';
        this.path = '';
        this.maxParallelDownloads = 32;
        this.crossOrigin = '';
        this.state = LoaderState.IDLE;
        this.progress = 0;
        this.totalToLoad = 0;
        this.totalFailed = 0;
        this.totalComplete = 0;
        this.list = new Set();
        this.inflight = new Set();
        this.queue = new Set();
        this._deleteQueue = new Set();
        this.state = LoaderState.IDLE;
    }
    setBaseURL(value = '') {
        if (value !== '' && value.substr(-1) !== '/') {
            value = value.concat('/');
        }
        this.baseURL = value;
        return this;
    }
    setPath(value = '') {
        if (value !== '' && value.substr(-1) !== '/') {
            value = value.concat('/');
        }
        this.path = value;
        return this;
    }
    setFileGroup(name = '') {
        this.fileGroup = name;
        return this;
    }
    isLoading() {
        return (this.state === LoaderState.LOADING || this.state === LoaderState.PROCESSING);
    }
    isReady() {
        return (this.state === LoaderState.IDLE || this.state === LoaderState.COMPLETE);
    }
    addFile(file) {
        console.log('addFile');
        this.getURL(file);
        this.list.add(file);
        this.totalToLoad++;
        console.log(file);
        return new Promise((resolve, reject) => {
            file.fileResolve = resolve;
            file.fileReject = reject;
        });
    }
    start() {
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
            this.state = LoaderState.LOADING;
            this.inflight.clear();
            this.queue.clear();
            this._deleteQueue.clear();
            this.updateProgress();
            this.checkLoadQueue();
        }
    }
    getURL(file) {
        if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)) {
            return file;
        }
        else {
            file.url = this.baseURL + this.path + file.url;
        }
    }
    updateProgress() {
        this.progress = 1 - ((this.list.size + this.inflight.size) / this.totalToLoad);
    }
    checkLoadQueue() {
        for (const entry of this.list) {
            if ((entry.state === FileState.POPULATED) ||
                (entry.state === FileState.PENDING && this.inflight.size < this.maxParallelDownloads)) {
                this.inflight.add(entry);
                this.list.delete(entry);
                //  Apply CORS
                entry.load()
                    .then((file) => this.nextFile(file, true))
                    .catch((file) => this.nextFile(file, false));
            }
            if (this.inflight.size === this.maxParallelDownloads) {
                break;
            }
        }
    }
    nextFile(previousFile, success) {
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
    }
    loadComplete() {
        this.list.clear();
        this.inflight.clear();
        // this.queue.clear();
        this.progress = 1;
        this.state = LoaderState.COMPLETE;
        //  Call 'destroy' on each file ready for deletion
        // this._deleteQueue.iterateLocal('destroy');
        // this._deleteQueue.clear();
    }
}
//# sourceMappingURL=BaseLoader.js.map

function ImageFile(key, url) {
    if (!url) {
        url = key + '.png';
    }
    const file = File(key, url, 'image');
    file.xhrSettings.responseType = 'blob';
    file.onProcess = () => {
        console.log('ImageFile.onProcess');
        file.state = FileState.PROCESSING;
        const image = new Image();
        file.data = image;
        // if (file.crossOrigin)
        // {
        //     image.crossOrigin = file.crossOrigin;
        // }
        return new Promise((resolve, reject) => {
            image.onload = () => {
                console.log('ImageFile.onload');
                image.onload = null;
                image.onerror = null;
                file.state = FileState.COMPLETE;
                resolve(file);
            };
            image.onerror = (event) => {
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
//# sourceMappingURL=ImageFile.js.map

class Loader extends BaseLoader {
    constructor() {
        super();
    }
    image(key, url = '') {
        return this.addFile(ImageFile(key, url));
    }
}
//# sourceMappingURL=Loader.js.map

export { BaseLoader, File, FileState, Game, Loader, LoaderState };
