//  @namespace Phaser.Device.Video

import { canPlayH264Video } from './canPlayH264Video';
import { canPlayHLSVideo } from './canPlayHLSVideo';
import { canPlayOGGVideo } from './canPlayOGGVideo';
import { canPlayVP9Video } from './canPlayVP9Video';
import { canPlayWebMVideo } from './canPlayWebMVideo';
import { GetVideo } from './GetVideo';

const Video = {
    canPlayH264Video,
    canPlayHLSVideo,
    canPlayOGGVideo,
    canPlayVP9Video,
    canPlayWebMVideo,
    GetVideo
};

export default Video;
