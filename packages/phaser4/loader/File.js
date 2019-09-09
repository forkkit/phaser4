// import { FileState } from './FileState';
import { XHRLoader } from './XHRLoader';
import { XHRSettings } from './XHRSettings';
export var FileState;
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
export function File(key, url, type) {
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
            if (this.fileReject) {
                this.fileReject(this);
            }
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
            console.log('onComplete!');
            this.state = FileState.COMPLETE;
            if (this.fileResolve) {
                this.fileResolve(this);
            }
            else if (this.loaderResolve) {
                this.loaderResolve(this);
            }
        },
        onDestroy() {
            this.state = FileState.DESTROYED;
        }
    };
}
//# sourceMappingURL=File.js.map