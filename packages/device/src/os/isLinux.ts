export function isLinux (): boolean
{
    return (/Linux/.test(navigator.userAgent));
}
