export function canPlayWebM (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return (audioElement.canPlayType('audio/webm; codecs="vorbis"') !== '');
}
