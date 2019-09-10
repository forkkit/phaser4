import { BaseLoader } from '@phaserjs/loader';
import { ImageFile } from '@phaserjs/loader-filetypes';
export class LoaderPlugin extends BaseLoader {
    constructor() {
        super();
    }
    image(key, url = '') {
        return this.addFile(ImageFile(key, url));
    }
}
//# sourceMappingURL=LoaderPlugin.js.map