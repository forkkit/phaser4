export function isWebApp (): boolean
{
    return (navigator.hasOwnProperty('standalone'));
}
