export function canPlayM4A (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return ((audioElement.canPlayType('audio/x-m4a') !== '') || (audioElement.canPlayType('audio/aac') !== ''));
}
