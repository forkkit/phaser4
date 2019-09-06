import { GetAudio } from './audio/GetAudio';
import { GetBrowser } from './browser/GetBrowser';
import { GetOS } from './os/GetOS';
import { GetVideo } from './video/GetVideo';

//  Phaser.Device

export const Device = {
    GetAudio,
    GetBrowser,
    GetOS,
    GetVideo,
    Audio: GetAudio(),
    Browser: GetBrowser(),
    OS: GetOS(),
    Video: GetVideo()
};
