import { GetBrowser } from './browser/GetBrowser';
import { GetOS } from './os/GetOS';

//  Phaser.Device

export const Device = {
    GetBrowser,
    GetOS,
    Browser: GetBrowser(),
    OS: GetOS()
};
