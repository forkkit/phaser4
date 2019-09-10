import { File, FileState, IFile } from '@phaserjs/loader';

export function ImageFile (key: string, url?: string): IFile
{
    if (!url)
    {
        url = key + '.png';
    }

    const file = File(key, url, 'image');

    file.xhrSettings.responseType = 'blob';

    file.onProcess = () => {

        console.log('ImageFile.onProcess');

        file.state = FileState.PROCESSING;

        const image = new Image();

        file.data = image;

        // if (file.crossOrigin)
        // {
        //     image.crossOrigin = file.crossOrigin;
        // }

        return new Promise(
            (resolve, reject) => {

                image.onload = () => {
                    console.log('ImageFile.onload');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.COMPLETE;
                    resolve(file);
                };

                image.onerror = (event) => {
                    console.log('ImageFile.onerror');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.FAILED;
                    reject(file);
                };

                console.log('ImageFile.set src', file.url);
                image.src = file.url;

                //  Image is immediately-available or cached
                if (image.complete && image.width && image.height)
                {
                    console.log('ImageFile.instant');
                    image.onload = null;
                    image.onerror = null;
                    file.state = FileState.COMPLETE;
                    resolve(file);
                }

            }
        );

    };

    return file;
}
