import { FileState } from './File';
export var BaseLoaderState;
(function (BaseLoaderState) {
    BaseLoaderState[BaseLoaderState["IDLE"] = 0] = "IDLE";
    BaseLoaderState[BaseLoaderState["LOADING"] = 1] = "LOADING";
    BaseLoaderState[BaseLoaderState["PROCESSING"] = 2] = "PROCESSING";
    BaseLoaderState[BaseLoaderState["COMPLETE"] = 3] = "COMPLETE";
    BaseLoaderState[BaseLoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
    BaseLoaderState[BaseLoaderState["DESTROYED"] = 5] = "DESTROYED";
})(BaseLoaderState || (BaseLoaderState = {}));
export class BaseLoader {
    constructor() {
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
        return (this.state === BaseLoaderState.LOADING || this.state === BaseLoaderState.PROCESSING);
    }
    isReady() {
        return (this.state === BaseLoaderState.IDLE || this.state === BaseLoaderState.COMPLETE);
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
            this.state = BaseLoaderState.LOADING;
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
        this.state = BaseLoaderState.COMPLETE;
        //  Call 'destroy' on each file ready for deletion
        // this._deleteQueue.iterateLocal('destroy');
        // this._deleteQueue.clear();
    }
}
//# sourceMappingURL=BaseLoader.js.map