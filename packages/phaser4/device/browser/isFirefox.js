export function isFirefox() {
    const firefox = (/Firefox\D+(\d+)/).test(navigator.userAgent);
    const firefoxVersion = (firefox) ? parseInt(RegExp.$1, 10) : 0;
    return {
        firefox,
        firefoxVersion
    };
}
//# sourceMappingURL=isFirefox.js.map