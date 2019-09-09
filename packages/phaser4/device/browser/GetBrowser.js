import { isChrome } from './isChrome';
import { isEdge } from './isEdge';
import { isFirefox } from './isFirefox';
import { isMobileSafari } from './isMobileSafari';
import { isMSIE } from './isMSIE';
import { isOpera } from './isOpera';
import { isSafari } from './isSafari';
import { isSilk } from './isSilk';
import { isTrident } from './isTrident';
export function GetBrowser() {
    const { chrome, chromeVersion } = isChrome();
    const { edge } = isEdge();
    const { firefox, firefoxVersion } = isFirefox();
    let { ie, ieVersion } = isMSIE();
    const { mobileSafari } = isMobileSafari();
    const { opera } = isOpera();
    const { safari, safariVersion } = isSafari();
    const { silk } = isSilk();
    const { trident, tridentVersion, tridentIEVersion } = isTrident();
    if (trident) {
        ie = true;
        ieVersion = tridentIEVersion;
    }
    const result = {
        chrome,
        chromeVersion,
        edge,
        firefox,
        firefoxVersion,
        ie,
        ieVersion,
        mobileSafari,
        opera,
        safari,
        safariVersion,
        silk,
        trident,
        tridentVersion
    };
    return result;
}
//# sourceMappingURL=GetBrowser.js.map