export function MacOS (ua: string = navigator.userAgent): boolean
{
    return (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)));
}
