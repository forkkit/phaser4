export function Windows (ua: string = navigator.userAgent): boolean
{
    return (/Windows/.test(ua));
}
