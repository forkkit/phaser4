export function canPlayM4A(audioElement = document.createElement('audio')) {
    return ((audioElement.canPlayType('audio/x-m4a') !== '') || (audioElement.canPlayType('audio/aac') !== ''));
}
//# sourceMappingURL=canPlayM4A.js.map