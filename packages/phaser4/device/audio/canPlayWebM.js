export function canPlayWebM(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/webm; codecs="vorbis"') !== '');
}
//# sourceMappingURL=canPlayWebM.js.map