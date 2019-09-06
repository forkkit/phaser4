export function Crosswalk (ua: string = navigator.userAgent): boolean
{
    return ((/Crosswalk/).test(ua));
}
