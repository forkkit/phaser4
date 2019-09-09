import { isiOS } from '../os/isiOS';
export function isMobileSafari() {
    const { iOS } = isiOS();
    const mobileSafari = ((/AppleWebKit/).test(navigator.userAgent) && iOS);
    return {
        mobileSafari
    };
}
//# sourceMappingURL=isMobileSafari.js.map