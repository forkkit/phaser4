import { BaseLoader } from '@phaserjs/loader';
import { ImageFile } from '@phaserjs/loader-filetypes';

export class LoaderPlugin extends BaseLoader
{
    constructor ()
    {
        super();
    }

    image (key: string, url: string = ''): Promise<any>
    {
        return this.addFile(ImageFile(key, url));
    }
}
