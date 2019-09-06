export function Linux (ua: string = navigator.userAgent): boolean
{
    return (/Linux/.test(ua));
}
