export function canPlayMP3 (audioElement: HTMLAudioElement = document.createElement('audio')): boolean
{
    return (audioElement.canPlayType('audio/mpeg; codecs="mp3"') !== '');
}
