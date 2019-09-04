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
    onLoad: () => void;
    onError: () => void;
    onProcess: () => void;
    onComplete: () => void;
    onDestroy: () => void;
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
            console.log('onStateChange', value);

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
            console.log('File.load', this.key);

            this.onStateChange(FileState.LOADING);

            return XHRLoader(this);
        },

        onLoad () {

            //  If overridden it must set `state` to LOADED
            this.onStateChange(FileState.LOADED);
            this.onStateChange(FileState.COMPLETE);

        },

        onError () {

            //  If overridden it must set `state` to FAILED
            this.onStateChange(FileState.FAILED);

        },

        onProcess () {

            //  If overridden it must set `state` to PROCESSING
            this.onStateChange(FileState.PROCESSING);

        },

        onComplete () {

            //  If overridden it must set `state` to COMPLETE
            this.onStateChange(FileState.COMPLETE);

        },

        onDestroy () {

            //  If overridden it must set `state` to DESTROYED
            this.onStateChange(FileState.DESTROYED);

        }

    };
}
