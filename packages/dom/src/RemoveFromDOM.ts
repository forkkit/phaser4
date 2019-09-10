export function RemoveFromDOM (element: HTMLElement)
{
    if (element.parentNode)
    {
        element.parentNode.removeChild(element);
    }
}
