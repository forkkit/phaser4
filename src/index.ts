//  @namespace Phaser

import { default as Device } from './device/';
import { default as DOM } from './dom/';
import { Game } from './Game';
import { default as Loader } from './loader/';

export default {
    Game,
    Device,
    DOM,
    Loader
};

export * from './device/';
export * from './dom/';
export * from './Game';
export * from './loader/';
