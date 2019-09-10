import { BaseLoaderState } from './BaseLoaderState';
import { IFile } from './File';
import { FileState } from './FileState';

export class BaseLoader
{
    fileGroup: string = '';
    prefix: string = '';
    baseURL: string = '';
    path: string = '';
    maxParallelDownloads: number = 32;
    crossOrigin: string = '';

    state: BaseLoaderState = BaseLoaderState.IDLE;

    progress: number = 0;

    totalToLoad: number = 0;
    totalFailed: number = 0;
    totalComplete: number = 0;

    list: Set<IFile> = new Set();
    inflight: Set<IFile> = new Set();
    queue: Set<IFile> = new Set();

    private _deleteQueue: Set<IFile> = new Set();

    constructor ()
    {
        this.state = BaseLoaderState.IDLE;
    }

    setBaseURL (value: string = '')
    {
        if (value !== '' && value.substr(-1) !== '/')
        {
            value = value.concat('/');
        }

        this.baseURL = value;

        return this;
    }

    setPath (value: string = '')
    {
        if (value !== '' && value.substr(-1) !== '/')
        {
            value = value.concat('/');
        }

        this.path = value;

        return this;
    }

    setFileGroup (name: string = '')
    {
        this.fileGroup = name;

        return this;
    }

    isLoading (): boolean
    {
        return (this.state === BaseLoaderState.LOADING || this.state === BaseLoaderState.PROCESSING);
    }

    isReady (): boolean
    {
        return (this.state === BaseLoaderState.IDLE || this.state === BaseLoaderState.COMPLETE);
    }

    addFile (file: IFile): Promise<any>
    {
        console.log('addFile');

        this.getURL(file);

        this.list.add(file);

        this.totalToLoad++;

        console.log(file);

        return new Promise(
            (resolve, reject) => {
                file.fileResolve = resolve;
                file.fileReject = reject;
            }
        );
    }

    start ()
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
            this.state = BaseLoaderState.LOADING;

            this.inflight.clear();
            this.queue.clear();
            this._deleteQueue.clear();

            this.updateProgress();

            this.checkLoadQueue();
        }
    }

    private getURL (file: IFile)
    {
        if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/))
        {
            return file;
        }
        else
        {
            file.url = this.baseURL + this.path + file.url;
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
        console.log('nextFile', previousFile, success);

        if (success)
        {
            this.queue.add(previousFile);
        }
        else
        {
            this._deleteQueue.add(previousFile);
        }

        this.inflight.delete(previousFile);

        if (this.list.size > 0)
        {
            console.log('nextFile - still something in the list');
            this.checkLoadQueue();
        }
        else if (this.inflight.size === 0)
        {
            console.log('nextFile calling finishedLoading');
            this.loadComplete();
        }
    }

    private loadComplete ()
    {
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
