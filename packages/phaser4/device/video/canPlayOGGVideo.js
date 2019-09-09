export function canPlayOGGVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/ogg; codecs="theora"') !== '');
}
//# sourceMappingURL=canPlayOGGVideo.js.map