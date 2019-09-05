import { XHRLoader } from './XHRLoader';
import { IXHRSettings, XHRSettings } from './XHRSettings';

export enum FileState {
    PENDING = 0,
    LOADING = 1,
    LOADED = 2,
    FAILED = 3,
    PROCESSING = 4,
    ERRORED = 5,
    COMPLETE = 6,
    DESTROYED = 7,
    POPULATED = 8,
    TIMED_OUT = 9,
    ABORTED = 10
}

export interface IFile {

    key: string;
    url: string;
    type: string;

    bytesLoaded: number;
    bytesTotal: number;
    percentComplete: number;

    xhrSettings: IXHRSettings;
    xhrLoader?: XMLHttpRequest;

    data: any;
    state: FileState;

    load: () => Promise<any>;

    resetXHR?: () => void;

    fileResolve?: () => void;
    fileReject?: () => void;
    loaderResolve?: () => void;
    loaderReject?: () => void;

    // The loadstart event is fired when a request has started to load data.
    onLoadStart: (event: ProgressEvent) => void;

    // The load event is fired when an XMLHttpRequest transaction completes successfully.
    onLoad: (event: ProgressEvent) => void;

    // The loadend event is fired when a request has completed, whether successfully (after load) or unsuccessfully
    onLoadEnd: (event: ProgressEvent) => void;

    // The progress event is fired periodically when a request receives more data.
    onProgress: (event: ProgressEvent) => void;

    // The timeout event is fired when progression is terminated due to preset time expiring.
    onTimeout: (event: ProgressEvent) => void;

    // The abort event is fired when a request has been aborted, for example because the program called XMLHttpRequest.abort().
    onAbort: (event: ProgressEvent) => void;

    // The error event is fired when the request encountered an error.
    onError: (event: ProgressEvent) => void;

    onProcess: () => Promise<any>;
    onComplete: () => void;
    onDestroy: () => void;
}

export function File (key: string, url: string, type: string): IFile
{
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

        load (): Promise<any>
        {
            console.log('File.load', this.key);

            this.state = FileState.PENDING;

            XHRLoader(this);

            return new Promise(
                (resolve, reject) => {
                    this.loaderResolve = resolve;
                    this.loaderReject = reject;
                }
            );
        },

        onLoadStart (event: ProgressEvent)
        {
            console.log('onLoadStart');

            this.state = FileState.LOADING;
        },

        onLoad (event: ProgressEvent)
        {
            console.log('onLoad');

            const xhr = this.xhrLoader;

            const localFileOk = ((xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && xhr.status === 0));

            let success = !(event.target && xhr.status !== 200) || localFileOk;

            //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
            if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599)
            {
                success = false;
            }

            this.onProcess()
                .then(() => this.onComplete())
                .catch(() => this.onError());
        },

        onLoadEnd (event: ProgressEvent)
        {
            console.log('onLoadEnd');

            this.resetXHR();

            this.state = FileState.LOADED;
        },

        onTimeout (event: ProgressEvent)
        {
            console.log('onTimeout');

            this.state = FileState.TIMED_OUT;
        },

        onAbort (event: ProgressEvent)
        {
            console.log('onAbort');

            this.state = FileState.ABORTED;
        },

        onError (event: ProgressEvent)
        {
            console.log('onError');

            this.state = FileState.ERRORED;

            this.fileReject(this);
        },

        onProgress (event: ProgressEvent)
        {
            console.log('onProgress');

            if (event.lengthComputable)
            {
                this.bytesLoaded = event.loaded;
                this.bytesTotal = event.total;
                this.percentComplete = Math.min((event.loaded / event.total), 1);

                console.log(this.percentComplete, '%');
            }
        },

        onProcess (): Promise<any>
        {
            console.log('File.onProcess');

            this.state = FileState.PROCESSING;

            return new Promise(
                (resolve, reject) => {
                    resolve();
                }
            );
        },

        onComplete ()
        {
            this.state = FileState.COMPLETE;

            this.fileResolve(this);
        },

        onDestroy ()
        {
            this.state = FileState.DESTROYED;
        }

    };
}
