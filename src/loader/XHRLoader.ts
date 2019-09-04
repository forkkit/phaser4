export function XHRLoader (file): Promise<any>
{
    const xhr = new XMLHttpRequest();

    xhr.open('GET', file.src, true);

    xhr.responseType = 'blob';

    return new Promise(
        (resolve, reject) => {

            xhr.onload = () => {
                resolve(file);
            };

            xhr.onerror = () => {
                reject(file);
            };

            xhr.send();

        }
    );
}
