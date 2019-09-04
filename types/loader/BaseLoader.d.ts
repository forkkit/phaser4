import { IFile } from './File';
export declare enum LoaderState {
    IDLE = 0,
    LOADING = 1,
    PROCESSING = 2,
    COMPLETE = 3,
    SHUTDOWN = 4,
    DESTROYED = 5
}
export declare class BaseLoader {
    fileGroup: string;
    prefix: string;
    baseURL: string;
    path: string;
    maxParallelDownloads: number;
    crossOrigin: string;
    state: LoaderState;
    progress: number;
    totalToLoad: number;
    totalFailed: number;
    totalComplete: number;
    list: Set<IFile>;
    inflight: Set<IFile>;
    queue: Set<IFile>;
    private _deleteQueue;
    constructor();
    setBaseURL(value?: string): this;
    setPath(value?: string): this;
    setFileGroup(name?: string): this;
    isLoading(): boolean;
    isReady(): boolean;
    addFile(key: string, url: string): Promise<any>;
    start(): void;
    private updateProgress;
    private checkLoadQueue;
    private nextFile;
    private loadComplete;
}
//# sourceMappingURL=BaseLoader.d.ts.map