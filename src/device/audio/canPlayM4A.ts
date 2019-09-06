export function canPlayM4A (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    const canPlayType = audioElement.canPlayType;

    return ((canPlayType('audio/x-m4a') !== '') || (canPlayType('audio/aac') !== ''));
}
