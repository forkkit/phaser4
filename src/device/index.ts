//  @namespace Phaser.Device

import { default as Audio } from './audio/';
import { default as Browser } from './browser/';
import { default as OS } from './os/';
import { default as Video } from './video/';

export default {
    Audio,
    Browser,
    OS,
    Video
};

export * from './audio/';
export * from './browser/';
export * from './os/';
export * from './video/';
