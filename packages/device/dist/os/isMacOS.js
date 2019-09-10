export function isMacOS() {
    const ua = navigator.userAgent;
    return (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)));
}
//# sourceMappingURL=isMacOS.js.map