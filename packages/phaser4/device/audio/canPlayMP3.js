export function canPlayMP3(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/mpeg; codecs="mp3"') !== '');
}
//# sourceMappingURL=canPlayMP3.js.map