export function canPlayHLSVideo (videoElement: HTMLVideoElement = document.createElement('video')): boolean
{
    return (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"') !== '');
}
