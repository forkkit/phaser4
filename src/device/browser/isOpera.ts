export function isOpera (): { opera: boolean }
{
    const opera = (/Opera/).test(navigator.userAgent);

    return {
        opera
    };
}
