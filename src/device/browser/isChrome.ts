export function isChrome (ua: string = navigator.userAgent)
{
    const result = (/Chrome\/(\d+)/).test(ua);
    const version = parseInt(RegExp.$1, 10);

    return {
        chrome: result,
        chromeVersion: version
    };
}
