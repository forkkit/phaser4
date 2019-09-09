//  @namespace Phaser.Loader

import { BaseLoader } from './BaseLoader';
import { BaseLoaderState } from './BaseLoaderState';
import { File } from './File';
import { FileState } from './FileState';
import * as FileTypes from './filetypes/';
import { LoaderPlugin } from './LoaderPlugin';
import { XHRLoader } from './XHRLoader';
import { XHRSettings } from './XHRSettings';

export default {
    BaseLoader,
    BaseLoaderState,
    File,
    FileState,
    LoaderPlugin,
    XHRLoader,
    XHRSettings,
    FileTypes
};

export * from './BaseLoader';
export * from './BaseLoaderState';
export * from './File';
export * from './FileState';
export * from './LoaderPlugin';
export * from './XHRLoader';
export * from './XHRSettings';

export * from './filetypes/';
