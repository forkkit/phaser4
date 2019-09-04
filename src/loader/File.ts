import { XHRLoader } from './XHRLoader';

export enum FileState {
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
}

export function File (key: string, url: string, type: string): IFile
{
    return {

        key,
        url,
        type,

        data: null,
        state: FileState.PENDING,

        onStateChange (value: FileState)
        {
            if (this.state !== value)
            {
                this.state = value;

                //  Loaded AND Processed
                if (value === FileState.COMPLETE)
                {
                    if (this.resolve)
                    {
                        this.resolve(this);
                    }
                }
                else if (value === FileState.FAILED)
                {
                    if (this.reject)
                    {
                        this.reject(this);
                    }
                }
            }
        },

        load ()
        {
            this.onStateChange(FileState.LOADING);

            return XHRLoader(this);
        }

    };
}
