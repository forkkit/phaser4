import { GetOS } from './os/GetOS';
export declare const Device: {
    OS: {
        Android: typeof import("./os/isAndroid").isAndroid;
        ChromeOS: typeof import("./os/isChromeOS").isChromeOS;
        Cordova: typeof import("./os/isCordova").isCordova;
        Crosswalk: typeof import("./os/isCrosswalk").isCrosswalk;
        Ejecta: typeof import("./os/isEjecta").isEjecta;
        Electron: typeof import("./os/isElectron").isElectron;
        GetOS: typeof GetOS;
        iOS: typeof import("./os/isiOS").isiOS;
        Kindle: typeof import("./os/isKindle").isKindle;
        Linux: typeof import("./os/isLinux").isLinux;
        MacOS: typeof import("./os/isMacOS").isMacOS;
        Node: typeof import("./os/isNode").isNode;
        NodeWebkit: typeof import("./os/isNodeWebkit").isNodeWebkit;
        WebApp: typeof import("./os/isWebApp").isWebApp;
        Windows: typeof import("./os/isWindows").isWindows;
        WindowsPhone: typeof import("./os/isWindowsPhone").isWindowsPhone;
    };
    GetOS: typeof GetOS;
};
//# sourceMappingURL=index.d.ts.map