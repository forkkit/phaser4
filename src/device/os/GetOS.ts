import { IDeviceOSResult } from './IDeviceOSResult';
import { isAndroid } from './isAndroid';
import { isChromeOS } from './isChromeOS';
import { isCordova } from './isCordova';
import { isCrosswalk } from './isCrosswalk';
import { isEjecta } from './isEjecta';
import { isElectron } from './isElectron';
import { isiOS } from './isiOS';
import { isKindle } from './isKindle';
import { isLinux } from './isLinux';
import { isMacOS } from './isMacOS';
import { isNode } from './isNode';
import { isNodeWebkit } from './isNodeWebkit';
import { isWebApp } from './isWebApp';
import { isWindows } from './isWindows';
import { isWindowsPhone } from './isWindowsPhone';

export function GetOS (): IDeviceOSResult
{
    const ua: string = navigator.userAgent;

    const { iOS, iOSVersion, iPad, iPhone } = isiOS();

    const result: IDeviceOSResult = {
        android: isAndroid(),
        chromeOS: isChromeOS(),
        cordova: isCordova(),
        crosswalk: isCrosswalk(),
        desktop: false,
        ejecta: isEjecta(),
        electron: isElectron(),
        iOS,
        iOSVersion,
        iPad,
        iPhone,
        kindle: isKindle(),
        linux: isLinux(),
        macOS: isMacOS(),
        node: isNode(),
        nodeWebkit: isNodeWebkit(),
        pixelRatio: 1,
        webApp: isWebApp(),
        windows: isWindows(),
        windowsPhone: isWindowsPhone()
    };

    if (result.windowsPhone)
    {
        result.android = false;
        result.iOS = false;
        result.macOS = false;
        result.windows = true;
    }

    const silk: boolean = (/Silk/).test(ua);

    if (result.windows || result.macOS || (result.linux && !silk) || result.chromeOS)
    {
        result.desktop = true;
    }

    //  Windows Phone / Table reset
    if (result.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
    {
        result.desktop = false;
    }

    return result;
}
