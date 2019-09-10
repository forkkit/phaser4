export function canPlayWAV(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/wav; codecs="1"') !== '');
}
//# sourceMappingURL=canPlayWAV.js.map