export function canPlayOpus(audioElement = document.createElement('audio')) {
    return ((audioElement.canPlayType('audio/ogg; codecs="opus"') !== '') || (audioElement.canPlayType('audio/webm; codecs="opus"') !== ''));
}
//# sourceMappingURL=canPlayOpus.js.map