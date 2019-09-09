export function canPlayVP9Video(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/webm; codecs="vp9"') !== '');
}
//# sourceMappingURL=canPlayVP9Video.js.map