export function isMacOS (): boolean
{
    const ua: string = navigator.userAgent;

    return (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)));
}
