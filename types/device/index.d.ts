import { GetAudio } from './audio/GetAudio';
import { GetBrowser } from './browser/GetBrowser';
import { GetOS } from './os/GetOS';
import { GetVideo } from './video/GetVideo';
export declare const Device: {
    GetAudio: typeof GetAudio;
    GetBrowser: typeof GetBrowser;
    GetOS: typeof GetOS;
    GetVideo: typeof GetVideo;
    Audio: import("./audio/IDeviceAudioResult").IDeviceAudioResult;
    Browser: import("./browser/IDeviceBrowserResult").IDeviceBrowserResult;
    OS: import("./os/IDeviceOSResult").IDeviceOSResult;
    Video: import("./video/IDeviceVideoResult").IDeviceVideoResult;
};
//# sourceMappingURL=index.d.ts.map