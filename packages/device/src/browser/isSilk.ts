export function isSilk (): { silk: boolean }
{
    const silk = (/Silk/).test(navigator.userAgent);

    return {
        silk
    };
}
