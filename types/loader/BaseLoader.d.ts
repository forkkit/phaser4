import { BaseLoaderState } from './BaseLoaderState';
import { IFile } from './File';
export declare class BaseLoader {
    fileGroup: string;
    prefix: string;
    baseURL: string;
    path: string;
    maxParallelDownloads: number;
    crossOrigin: string;
    state: BaseLoaderState;
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
    addFile(file: IFile): Promise<any>;
    start(): void;
    private getURL;
    private updateProgress;
    private checkLoadQueue;
    private nextFile;
    private loadComplete;
}
//# sourceMappingURL=BaseLoader.d.ts.map