import { canPlayM4A } from './canPlayM4A';
import { canPlayMP3 } from './canPlayMP3';
import { canPlayOGG } from './canPlayOGG';
import { canPlayOpus } from './canPlayOpus';
import { canPlayWAV } from './canPlayWAV';
import { canPlayWebM } from './canPlayWebM';
import { hasAudio } from './hasAudio';
import { hasWebAudio } from './hasWebAudio';
import { IDeviceAudioResult } from './IDeviceAudioResult';

export function GetAudio (): IDeviceAudioResult
{
    const result: IDeviceAudioResult = {
        audioData: hasAudio(),
        m4a: false,
        mp3: false,
        ogg: false,
        opus: false,
        wav: false,
        webAudio: hasWebAudio(),
        webm: false
    };

    if (result.audioData)
    {
        const audioElement: HTMLAudioElement = document.createElement('audio');

        // IE9 Running on Windows Server SKU can cause an exception to be thrown
        try
        {
            const canPlay: boolean = !!audioElement.canPlayType;

            if (canPlay)
            {
                result.m4a = canPlayM4A(audioElement);
                result.mp3 = canPlayMP3(audioElement);
                result.ogg = canPlayOGG(audioElement);
                result.opus = canPlayOpus(audioElement);
                result.wav = canPlayWAV(audioElement);
                result.webm = canPlayWebM(audioElement);
            }
        }
        catch (error)
        {
            result.audioData = false;
        }
    }

    return result;
}
