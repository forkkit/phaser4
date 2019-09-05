import { IXHRSettings } from './XHRSettings';
export declare enum FileState {
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
    onLoadStart: (event: ProgressEvent) => void;
    onLoad: (event: ProgressEvent) => void;
    onLoadEnd: (event: ProgressEvent) => void;
    onProgress: (event: ProgressEvent) => void;
    onTimeout: (event: ProgressEvent) => void;
    onAbort: (event: ProgressEvent) => void;
    onError: (event: ProgressEvent) => void;
    onProcess: () => Promise<any>;
    onComplete: () => void;
    onDestroy: () => void;
}
export declare function File(key: string, url: string, type: string): IFile;
//# sourceMappingURL=File.d.ts.map