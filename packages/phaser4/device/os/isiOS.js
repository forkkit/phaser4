export function isiOS() {
    const ua = navigator.userAgent;
    const result = {
        iOS: false,
        iOSVersion: 0,
        iPhone: false,
        iPad: false
    };
    if (/iP[ao]d|iPhone/i.test(ua)) {
        (navigator.appVersion).match(/OS (\d+)/);
        result.iOS = true;
        result.iOSVersion = parseInt(RegExp.$1, 10);
        result.iPhone = (ua.toLowerCase().indexOf('iphone') !== -1);
        result.iPad = (ua.toLowerCase().indexOf('ipad') !== -1);
    }
    return result;
}
//# sourceMappingURL=isiOS.js.map