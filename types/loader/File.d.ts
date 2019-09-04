export declare enum FileState {
    PENDING = 0,
    LOADING = 1,
    LOADED = 2,
    FAILED = 3,
    PROCESSING = 4,
    ERRORED = 5,
    COMPLETE = 6,
    DESTROYED = 7,
    POPULATED = 8
}
export interface IFile {
    key: string;
    url: string;
    type: string;
    data: any;
    state: FileState;
    onStateChange: (value: FileState) => void;
    load: () => Promise<any>;
    resolve?: () => void;
    reject?: () => void;
    onLoad: () => void;
    onError: () => void;
    onProcess: () => void;
    onComplete: () => void;
    onDestroy: () => void;
}
export declare function File(key: string, url: string, type: string): IFile;
//# sourceMappingURL=File.d.ts.map