export function isChromeOS (): boolean
{
    return (/CrOS/.test(navigator.userAgent));
}
