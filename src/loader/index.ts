import { BaseLoader } from './BaseLoader';
import { BaseLoaderState } from './BaseLoaderState';
import { File } from './File';
import { FileState } from './FileState';
import { ImageFile } from './filetypes/ImageFile';
import { LoaderPlugin } from './LoaderPlugin';
import { XHRLoader } from './XHRLoader';
import { XHRSettings } from './XHRSettings';

/**
 * @namespace Phaser.Loader
 */

// export interface ILoader {
//     BaseLoader: BaseLoader;
//     BaseLoaderState: BaseLoaderState;
//     File: File;
//     FileState: FileState;
//     LoaderPlugin: LoaderPlugin;
//     XHRLoader;
//     XHRSettings;
//     FileTypes: {
//         ImageFile
//     };
// }

export const Loader = {
    BaseLoader,
    BaseLoaderState,
    File,
    FileState,
    LoaderPlugin,
    XHRLoader,
    XHRSettings,
    FileTypes: {
        ImageFile
    }
};
