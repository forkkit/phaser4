export function XHRLoader (file): Promise<any>
{
    const xhr = new XMLHttpRequest();

    xhr.open('GET', file.url, true);

    xhr.responseType = 'blob';

    return new Promise(
        (resolve, reject) => {

            xhr.onload = () => {
                file.onLoad(xhr);
                resolve(file);
            };

            xhr.onerror = () => {
                file.onError(xhr);
                reject(file);
            };

            xhr.send();

        }
    );
}
