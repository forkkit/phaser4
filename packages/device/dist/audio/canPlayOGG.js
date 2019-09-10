export function canPlayOGG(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/ogg; codecs="vorbis"') !== '');
}
//# sourceMappingURL=canPlayOGG.js.map