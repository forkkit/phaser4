import { Cordova } from '../device/os/Cordova';

export function DOMContentLoaded (callback: () => void)
{
    if (document.readyState === 'complete' || document.readyState === 'interactive')
    {
        callback();

        return;
    }

    const check = () =>
    {
        document.removeEventListener('deviceready', check, true);
        document.removeEventListener('DOMContentLoaded', check, true);
        window.removeEventListener('load', check, true);

        callback();
    };

    if (!document.body)
    {
        window.setTimeout(check, 20);
    }
    else if (Cordova())
    {
        document.addEventListener('deviceready', check, true);
    }
    else
    {
        document.addEventListener('DOMContentLoaded', check, true);
        window.addEventListener('load', check, true);
    }
}
