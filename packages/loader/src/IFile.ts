import { FileState } from './FileState';
import { IXHRSettings } from './IXHRSettings';

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
