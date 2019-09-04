import { BaseLoader } from "./BaseLoader";

export class Loader extends BaseLoader
{
    constructor ()
    {
        super();
    }

    public image (key: string, url: string = ''): Promise<any>
    {
        return this.addFile(key, url);
    }
}
