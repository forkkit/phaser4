export function canPlayWebMVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"') !== '');
}
//# sourceMappingURL=canPlayWebMVideo.js.map