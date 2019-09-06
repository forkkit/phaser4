import { Android } from './Android';
import { ChromeOS } from './ChromeOS';
import { Cordova } from './Cordova';
import { Crosswalk } from './Crosswalk';
import { Ejecta } from './Ejecta';
import { Electron } from './Electron';
import { iOS as getiOS } from './iOS';
import { Kindle } from './Kindle';
import { Linux } from './Linux';
import { MacOS } from './MacOS';
import { Node } from './Node';
import { NodeWebkit } from './NodeWebkit';
import { WebApp } from './WebApp';
import { Windows } from './Windows';
import { WindowsPhone } from './WindowsPhone';

interface IOSResult {
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

export function OS (ua: string = navigator.userAgent): IOSResult
{
    const { iOS, iOSVersion, iPad, iPhone } = getiOS(ua);

    const result: IOSResult = {
        android: Android(ua),
        chromeOS: ChromeOS(ua),
        cordova: Cordova(),
        crosswalk: Crosswalk(ua),
        desktop: false,
        ejecta: Ejecta(),
        electron: Electron(),
        iOS,
        iOSVersion,
        iPad,
        iPhone,
        kindle: Kindle(ua),
        linux: Linux(ua),
        macOS: MacOS(ua),
        node: Node(),
        nodeWebkit: NodeWebkit(),
        pixelRatio: 1,
        webApp: WebApp(),
        windows: Windows(ua),
        windowsPhone: WindowsPhone(ua)
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
