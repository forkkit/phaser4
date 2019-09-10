export function isTrident (): { trident: boolean, tridentVersion: number, tridentIEVersion: number }
{
    const trident = (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(navigator.userAgent);
    const tridentVersion = (trident) ? parseInt(RegExp.$1, 10) : 0;
    const tridentIEVersion = (trident) ? parseInt(RegExp.$3, 10) : 0;

    return {
        trident,
        tridentVersion,
        tridentIEVersion
    };
}
