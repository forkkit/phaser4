import { BaseLoader } from './BaseLoader';
import { ImageFile } from './filetypes/ImageFile';
export class LoaderPlugin extends BaseLoader {
    constructor() {
        super();
    }
    image(key, url = '') {
        return this.addFile(ImageFile(key, url));
    }
}
//# sourceMappingURL=LoaderPlugin.js.map