export function isKindle (): boolean
{
    // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
    // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
    const ua: string = navigator.userAgent;

    return ((/Kindle/.test(ua) || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua)));
}
