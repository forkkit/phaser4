export function WindowsPhone (ua: string = navigator.userAgent): boolean
{
    return (/Windows Phone/i.test(ua) || (/IEMobile/i).test(ua));
}
