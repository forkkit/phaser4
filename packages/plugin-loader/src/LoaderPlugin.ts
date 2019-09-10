// import { BaseLoader } from './BaseLoader';
// import { ImageFile } from './filetypes/ImageFile';

export class LoaderPlugin extends BaseLoader
{
    constructor ()
    {
        super();
    }

    image (key: string, url: string = ''): Promise<any>
    {
        // return this.addFile(ImageFile(key, url));
    }
}
