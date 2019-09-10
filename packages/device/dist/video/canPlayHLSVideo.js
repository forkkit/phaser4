export function canPlayHLSVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"') !== '');
}
//# sourceMappingURL=canPlayHLSVideo.js.map