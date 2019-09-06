import { GetAudio } from './audio/GetAudio';
import { GetBrowser } from './browser/GetBrowser';
import { GetOS } from './os/GetOS';

//  Phaser.Device

export const Device = {
    GetAudio,
    GetBrowser,
    GetOS,
    Audio: GetAudio(),
    Browser: GetBrowser(),
    OS: GetOS()
};
