export function canPlayH264Video (videoElement: HTMLVideoElement = document.createElement('video')): boolean
{
    return (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '');
}
