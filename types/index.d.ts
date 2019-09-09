import { Game } from './Game';
declare const _default: {
    Game: typeof Game;
    Device: {
        Audio: {
            canPlayM4A: typeof import("./device").canPlayM4A;
            canPlayMP3: typeof import("./device").canPlayMP3;
            canPlayOGG: typeof import("./device").canPlayOGG;
            canPlayOpus: typeof import("./device").canPlayOpus;
            canPlayWAV: typeof import("./device").canPlayWAV;
            canPlayWebM: typeof import("./device").canPlayWebM;
            GetAudio: typeof import("./device").GetAudio;
            hasAudio: typeof import("./device").hasAudio;
            hasWebAudio: typeof import("./device").hasWebAudio;
        };
        Browser: {
            GetBrowser: typeof import("./device").GetBrowser;
            isChrome: typeof import("./device").isChrome;
            isEdge: typeof import("./device").isEdge;
            isFirefox: typeof import("./device").isFirefox;
            isMobileSafari: typeof import("./device").isMobileSafari;
            isMSIE: typeof import("./device").isMSIE;
            isOpera: typeof import("./device").isOpera;
            isSafari: typeof import("./device").isSafari;
            isSilk: typeof import("./device").isSilk;
            isTrident: typeof import("./device").isTrident;
        };
        OS: {
            GetOS: typeof import("./device").GetOS;
            isAndroid: typeof import("./device").isAndroid;
            isChromeOS: typeof import("./device").isChromeOS;
            isCordova: typeof import("./device").isCordova;
            isCrosswalk: typeof import("./device").isCrosswalk;
            isEjecta: typeof import("./device").isEjecta;
            isElectron: typeof import("./device").isElectron;
            isiOS: typeof import("./device").isiOS;
            isKindle: typeof import("./device").isKindle;
            isLinux: typeof import("./device").isLinux;
            isMacOS: typeof import("./device").isMacOS;
            isNode: typeof import("./device").isNode;
            isNodeWebkit: typeof import("./device").isNodeWebkit;
            isWebApp: typeof import("./device").isWebApp;
            isWindows: typeof import("./device").isWindows;
            isWindowsPhone: typeof import("./device").isWindowsPhone;
        };
        Video: {
            canPlayH264Video: typeof import("./device").canPlayH264Video;
            canPlayHLSVideo: typeof import("./device").canPlayHLSVideo;
            canPlayOGGVideo: typeof import("./device").canPlayOGGVideo;
            canPlayVP9Video: typeof import("./device").canPlayVP9Video;
            canPlayWebMVideo: typeof import("./device").canPlayWebMVideo;
            GetVideo: typeof import("./device").GetVideo;
        };
    };
    DOM: {
        AddToDOM: typeof import("./dom").AddToDOM;
        DOMContentLoaded: typeof import("./dom").DOMContentLoaded;
        RemoveFromDOM: typeof import("./dom").RemoveFromDOM;
    };
    Loader: {
        BaseLoader: typeof import("./loader").BaseLoader;
        BaseLoaderState: typeof import("./loader").BaseLoaderState;
        File: typeof import("./loader").File;
        FileState: typeof import("./loader").FileState;
        LoaderPlugin: typeof import("./loader").LoaderPlugin;
        XHRLoader: typeof import("./loader").XHRLoader;
        XHRSettings: typeof import("./loader").XHRSettings;
        FileTypes: typeof import("./loader/filetypes");
    };
};
export default _default;
export * from './device/';
export * from './dom/';
export * from './Game';
export * from './loader/';
//# sourceMappingURL=index.d.ts.map