export function canPlayOGGVideo (videoElement: HTMLVideoElement = document.createElement('video')): boolean
{
    return (videoElement.canPlayType('video/ogg; codecs="theora"') !== '');
}
