export function canPlayWAV (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return (audioElement.canPlayType('audio/wav; codecs="1"') !== '');
}
