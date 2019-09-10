export function canPlayWebMVideo (videoElement: HTMLVideoElement = document.createElement('video')): boolean
{
    return (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"') !== '');
}
