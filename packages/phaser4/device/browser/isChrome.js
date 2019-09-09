export function isChrome() {
    const chrome = (/Chrome\/(\d+)/).test(navigator.userAgent);
    const chromeVersion = (chrome) ? parseInt(RegExp.$1, 10) : 0;
    return {
        chrome,
        chromeVersion
    };
}
//# sourceMappingURL=isChrome.js.map