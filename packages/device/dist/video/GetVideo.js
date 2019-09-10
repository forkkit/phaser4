import { canPlayH264Video } from './canPlayH264Video';
import { canPlayHLSVideo } from './canPlayHLSVideo';
import { canPlayOGGVideo } from './canPlayOGGVideo';
import { canPlayVP9Video } from './canPlayVP9Video';
import { canPlayWebMVideo } from './canPlayWebMVideo';
export function GetVideo() {
    const result = {
        h264Video: false,
        hlsVideo: false,
        mp4Video: false,
        oggVideo: false,
        vp9Video: false,
        webmVideo: false
    };
    const videoElement = document.createElement('video');
    // IE9 Running on Windows Server SKU can cause an exception to be thrown
    try {
        const canPlay = !!videoElement.canPlayType;
        if (canPlay) {
            result.h264Video = canPlayH264Video(videoElement);
            result.hlsVideo = canPlayHLSVideo(videoElement);
            result.oggVideo = canPlayOGGVideo(videoElement);
            result.vp9Video = canPlayVP9Video(videoElement);
            result.webmVideo = canPlayWebMVideo(videoElement);
        }
    }
    catch (error) {
        //  Nothing to do here
    }
    //  Duplicate the result for Phaser 3 compatibility
    result.mp4Video = result.hlsVideo;
    return result;
}
//# sourceMappingURL=GetVideo.js.map