'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    xhr.open('GET', file.src, true);
    xhr.responseType = 'blob';
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            resolve(file);
        };
        xhr.onerror = () => {
            reject(file);
        };
        xhr.send();
    });
}
//# sourceMappingURL=XHRLoader.js.map

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
})(exports.FileState || (exports.FileState = {}));
function File(key, url, type) {
    return {
        key,
        url,
        type,
        data: null,
        state: exports.FileState.PENDING,
        onStateChange(value) {
            if (this.state !== value) {
                this.state = value;
                //  Loaded AND Processed
                if (value === exports.FileState.COMPLETE) {
                    if (this.resolve) {
                        this.resolve(this);
                    }
                }
                else if (value === exports.FileState.FAILED) {
                    if (this.reject) {
                        this.reject(this);
                    }
                }
            }
        },
        load() {
            this.onStateChange(exports.FileState.LOADING);
            return XHRLoader(this);
        }
    };
}
//# sourceMappingURL=File.js.map

(function (LoaderState) {
    LoaderState[LoaderState["IDLE"] = 0] = "IDLE";
    LoaderState[LoaderState["LOADING"] = 1] = "LOADING";
    LoaderState[LoaderState["PROCESSING"] = 2] = "PROCESSING";
    LoaderState[LoaderState["COMPLETE"] = 3] = "COMPLETE";
    LoaderState[LoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
    LoaderState[LoaderState["DESTROYED"] = 5] = "DESTROYED";
})(exports.LoaderState || (exports.LoaderState = {}));
class BaseLoader {
    constructor() {
        this.fileGroup = '';
        this.prefix = '';
        this.baseURL = '';
        this.path = '';
        this.maxParallelDownloads = 32;
        this.crossOrigin = '';
        this.state = exports.LoaderState.IDLE;
        this.progress = 0;
        this.totalToLoad = 0;
        this.totalFailed = 0;
        this.totalComplete = 0;
        this.list = new Set();
        this.inflight = new Set();
        this.queue = new Set();
        this._deleteQueue = new Set();
        this.state = exports.LoaderState.IDLE;
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
        return (this.state === exports.LoaderState.LOADING || this.state === exports.LoaderState.PROCESSING);
    }
    isReady() {
        return (this.state === exports.LoaderState.IDLE || this.state === exports.LoaderState.COMPLETE);
    }
    addFile(key, url) {
        const file = File(key, url, 'image');
        this.list.add(file);
        this.totalToLoad++;
        return new Promise((resolve, reject) => {
            file.resolve = resolve;
            file.reject = reject;
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
            this.state = exports.LoaderState.LOADING;
            this.inflight.clear();
            this.queue.clear();
            this._deleteQueue.clear();
            this.updateProgress();
            this.checkLoadQueue();
        }
    }
    updateProgress() {
        this.progress = 1 - ((this.list.size + this.inflight.size) / this.totalToLoad);
    }
    checkLoadQueue() {
        for (const entry of this.list) {
            if ((entry.state === exports.FileState.POPULATED) ||
                (entry.state === exports.FileState.PENDING && this.inflight.size < this.maxParallelDownloads)) {
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
        //
    }
    loadComplete() {
        this.list.clear();
        this.inflight.clear();
        this.queue.clear();
        this.progress = 1;
        this.state = exports.LoaderState.COMPLETE;
        //  Call 'destroy' on each file ready for deletion
        // this._deleteQueue.iterateLocal('destroy');
        // this._deleteQueue.clear();
    }
}

class Loader extends BaseLoader {
    constructor() {
        super();
    }
    image(key, url = '') {
        return this.addFile(key, url);
    }
}

exports.BaseLoader = BaseLoader;
exports.File = File;
exports.Game = Game;
exports.Loader = Loader;
