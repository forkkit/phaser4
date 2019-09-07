//  @namespace Phaser.Loader

import { BaseLoader } from './BaseLoader';
import { BaseLoaderState } from './BaseLoaderState';
import { File } from './File';
import { FileState } from './FileState';
import * as FileTypes from './filetypes/index.defaults';
import { LoaderPlugin } from './LoaderPlugin';
import { XHRLoader } from './XHRLoader';
import { XHRSettings } from './XHRSettings';

const Loader = {
    BaseLoader,
    BaseLoaderState,
    File,
    FileState,
    LoaderPlugin,
    XHRLoader,
    XHRSettings,
    FileTypes
};

export default Loader;
