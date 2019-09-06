export function canPlayOpus (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    const canPlayType = audioElement.canPlayType;

    return ((canPlayType('audio/ogg; codecs="opus"') !== '') || (canPlayType('audio/opus') !== ''));
}
