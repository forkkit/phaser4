export function isEdge (): { edge: boolean }
{
    const edge = (/Edge\/\d+/).test(navigator.userAgent);

    return {
        edge
    };
}
