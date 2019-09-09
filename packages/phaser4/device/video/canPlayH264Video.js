export function canPlayH264Video(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '');
}
//# sourceMappingURL=canPlayH264Video.js.map