export function canPlayOGG (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return (audioElement.canPlayType('audio/ogg; codecs="vorbis"') !== '');
}
