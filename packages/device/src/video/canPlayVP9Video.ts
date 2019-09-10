export function canPlayVP9Video (videoElement: HTMLVideoElement = document.createElement('video')): boolean
{
    return (videoElement.canPlayType('video/webm; codecs="vp9"') !== '');
}
