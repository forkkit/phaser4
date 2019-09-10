export function canPlayOpus (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return ((audioElement.canPlayType('audio/ogg; codecs="opus"') !== '') || (audioElement.canPlayType('audio/webm; codecs="opus"') !== ''));
}
