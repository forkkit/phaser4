import { isiOS } from '../os/isiOS';

export function isMobileSafari (): { mobileSafari: boolean }
{
    const { iOS } = isiOS();

    const mobileSafari = ((/AppleWebKit/).test(navigator.userAgent) && iOS);

    return {
        mobileSafari
    };
}
