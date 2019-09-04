import { File, FileState, IFile } from './File';

export enum LoaderState {
    IDLE = 0,
    LOADING = 1,
    PROCESSING = 2,
    COMPLETE = 3,
    SHUTDOWN = 4,
    DESTROYED = 5
}

export class BaseLoader
{
    public fileGroup: string = '';
    public prefix: string = '';
    public baseURL: string = '';
    public path: string = '';
    public maxParallelDownloads: number = 32;
    public crossOrigin: string = '';

    public state: LoaderState = LoaderState.IDLE;

    public progress: number = 0;

    public totalToLoad: number = 0;
    public totalFailed: number = 0;
    public totalComplete: number = 0;

    public list: Set<IFile> = new Set();
    public inflight: Set<IFile> = new Set();
    public queue: Set<IFile> = new Set();

    private _deleteQueue: Set<IFile> = new Set();

    constructor ()
    {
        this.state = LoaderState.IDLE;
    }

    public setBaseURL (value: string = '')
    {
        if (value !== '' && value.substr(-1) !== '/')
        {
            value = value.concat('/');
        }

        this.baseURL = value;

        return this;
    }

    public setPath (value: string = '')
    {
        if (value !== '' && value.substr(-1) !== '/')
        {
            value = value.concat('/');
        }

        this.path = value;

        return this;
    }

    public setFileGroup (name: string = '')
    {
        this.fileGroup = name;

        return this;
    }

    public isLoading (): boolean
    {
        return (this.state === LoaderState.LOADING || this.state === LoaderState.PROCESSING);
    }

    public isReady (): boolean
    {
        return (this.state === LoaderState.IDLE || this.state === LoaderState.COMPLETE);
    }

    public addFile (key: string, url: string): Promise<any>
    {
        const file = File(key, url, 'image');

        this.list.add(file);

        this.totalToLoad++;

        return new Promise(
            (resolve, reject) => {
                file.resolve = resolve;
                file.reject = reject;
            }
        );
    }

    public start ()
    {
        if (!this.isReady())
        {
            return;
        }

        this.progress = 0;

        this.totalFailed = 0;
        this.totalComplete = 0;
        this.totalToLoad = this.list.size;

        if (this.totalToLoad === 0)
        {
            this.loadComplete();
        }
        else
        {
            this.state = LoaderState.LOADING;

            this.inflight.clear();
            this.queue.clear();
            this._deleteQueue.clear();

            this.updateProgress();

            this.checkLoadQueue();
        }
    }

    private updateProgress (): void
    {
        this.progress = 1 - ((this.list.size + this.inflight.size) / this.totalToLoad);
    }

    private checkLoadQueue ()
    {
        for (const entry of this.list)
        {
            if ((entry.state === FileState.POPULATED) ||
                (entry.state === FileState.PENDING && this.inflight.size < this.maxParallelDownloads))
            {
                this.inflight.add(entry);

                this.list.delete(entry);

                //  Apply CORS

                entry.load()
                    .then((file) => this.nextFile(file, true))
                    .catch((file) => this.nextFile(file, false));
            }

            if (this.inflight.size === this.maxParallelDownloads)
            {
                break;
            }
        }
    }

    private nextFile (previousFile, success)
    {
        //
    }

    private loadComplete ()
    {
        this.list.clear();
        this.inflight.clear();
        this.queue.clear();

        this.progress = 1;

        this.state = LoaderState.COMPLETE;

        //  Call 'destroy' on each file ready for deletion
        // this._deleteQueue.iterateLocal('destroy');

        // this._deleteQueue.clear();
    }

}
