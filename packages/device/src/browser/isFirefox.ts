export function isFirefox (): { firefox: boolean, firefoxVersion: number }
{
    const firefox = (/Firefox\D+(\d+)/).test(navigator.userAgent);
    const firefoxVersion = (firefox) ? parseInt(RegExp.$1, 10) : 0;

    return {
        firefox,
        firefoxVersion
    };
}
