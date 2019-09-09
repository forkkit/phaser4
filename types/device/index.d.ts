declare const _default: {
    Audio: {
        canPlayM4A: typeof import("./audio").canPlayM4A;
        canPlayMP3: typeof import("./audio").canPlayMP3;
        canPlayOGG: typeof import("./audio").canPlayOGG;
        canPlayOpus: typeof import("./audio").canPlayOpus;
        canPlayWAV: typeof import("./audio").canPlayWAV;
        canPlayWebM: typeof import("./audio").canPlayWebM;
        GetAudio: typeof import("./audio").GetAudio;
        hasAudio: typeof import("./audio").hasAudio;
        hasWebAudio: typeof import("./audio").hasWebAudio;
    };
    Browser: {
        GetBrowser: typeof import("./browser").GetBrowser;
        isChrome: typeof import("./browser").isChrome;
        isEdge: typeof import("./browser").isEdge;
        isFirefox: typeof import("./browser").isFirefox;
        isMobileSafari: typeof import("./browser").isMobileSafari;
        isMSIE: typeof import("./browser").isMSIE;
        isOpera: typeof import("./browser").isOpera;
        isSafari: typeof import("./browser").isSafari;
        isSilk: typeof import("./browser").isSilk;
        isTrident: typeof import("./browser").isTrident;
    };
    OS: {
        GetOS: typeof import("./os").GetOS;
        isAndroid: typeof import("./os").isAndroid;
        isChromeOS: typeof import("./os").isChromeOS;
        isCordova: typeof import("./os").isCordova;
        isCrosswalk: typeof import("./os").isCrosswalk;
        isEjecta: typeof import("./os").isEjecta;
        isElectron: typeof import("./os").isElectron;
        isiOS: typeof import("./os").isiOS;
        isKindle: typeof import("./os").isKindle;
        isLinux: typeof import("./os").isLinux;
        isMacOS: typeof import("./os").isMacOS;
        isNode: typeof import("./os").isNode;
        isNodeWebkit: typeof import("./os").isNodeWebkit;
        isWebApp: typeof import("./os").isWebApp;
        isWindows: typeof import("./os").isWindows;
        isWindowsPhone: typeof import("./os").isWindowsPhone;
    };
    Video: {
        canPlayH264Video: typeof import("./video").canPlayH264Video;
        canPlayHLSVideo: typeof import("./video").canPlayHLSVideo;
        canPlayOGGVideo: typeof import("./video").canPlayOGGVideo;
        canPlayVP9Video: typeof import("./video").canPlayVP9Video;
        canPlayWebMVideo: typeof import("./video").canPlayWebMVideo;
        GetVideo: typeof import("./video").GetVideo;
    };
};
export default _default;
export * from './audio/';
export * from './browser/';
export * from './os/';
export * from './video/';
//# sourceMappingURL=index.d.ts.map