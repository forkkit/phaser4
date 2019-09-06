export function ChromeOS (ua: string = navigator.userAgent): boolean
{
    return (/CrOS/.test(ua));
}
