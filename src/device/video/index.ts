//  @namespace Phaser.Device.Video

import { canPlayH264Video } from './canPlayH264Video';
import { canPlayHLSVideo } from './canPlayHLSVideo';
import { canPlayOGGVideo } from './canPlayOGGVideo';
import { canPlayVP9Video } from './canPlayVP9Video';
import { canPlayWebMVideo } from './canPlayWebMVideo';
import { GetVideo } from './GetVideo';

export default {
    canPlayH264Video,
    canPlayHLSVideo,
    canPlayOGGVideo,
    canPlayVP9Video,
    canPlayWebMVideo,
    GetVideo
};

export * from './canPlayH264Video';
export * from './canPlayHLSVideo';
export * from './canPlayOGGVideo';
export * from './canPlayVP9Video';
export * from './canPlayWebMVideo';
export * from './GetVideo';
