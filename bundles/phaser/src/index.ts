//  @namespace Phaser

import * as Device from '@phaserjs/device';
import * as DOM from '@phaserjs/dom';
import { Game } from '@phaserjs/core';

import { BaseLoader, BaseLoaderState, File, FileState, XHRLoader, XHRSettings } from '@phaserjs/loader';
import { LoaderPlugin } from '@phaserjs/plugin-loader';
import * as FileTypes from '@phaserjs/loader-filetypes';

const Loader = {
    BaseLoader,
    BaseLoaderState,
    File,
    FileState,
    XHRLoader,
    XHRSettings,
    FileTypes,
    LoaderPlugin
};

export {
    Device,
    DOM,
    Game,
    Loader
};
