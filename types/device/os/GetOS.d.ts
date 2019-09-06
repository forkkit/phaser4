interface IDeviceOSResult {
    android: boolean;
    chromeOS: boolean;
    cordova: boolean;
    crosswalk: boolean;
    desktop: boolean;
    ejecta: boolean;
    electron: boolean;
    iOS: boolean;
    iOSVersion: number;
    iPad: boolean;
    iPhone: boolean;
    kindle: boolean;
    linux: boolean;
    macOS: boolean;
    node: boolean;
    nodeWebkit: boolean;
    pixelRatio: number;
    webApp: boolean;
    windows: boolean;
    windowsPhone: boolean;
}
export declare function GetOS(): IDeviceOSResult;
export {};
//# sourceMappingURL=GetOS.d.ts.map