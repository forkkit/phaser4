export function Android (ua: string = navigator.userAgent): boolean
{
    return (/Android/.test(ua));
}
