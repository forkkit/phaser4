export function hasWebAudio (): boolean
{
    return (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext'));
}
