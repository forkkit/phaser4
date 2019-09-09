export function XHRLoader(file) {
    const xhr = new XMLHttpRequest();
    file.xhrLoader = xhr;
    const config = file.xhrSettings;
    xhr.open('GET', file.url, config.async, config.username, config.password);
    xhr.responseType = config.responseType;
    xhr.timeout = config.timeout;
    xhr.setRequestHeader('X-Requested-With', config.requestedWith);
    if (config.header && config.headerValue) {
        xhr.setRequestHeader(config.header, config.headerValue);
    }
    if (config.overrideMimeType) {
        xhr.overrideMimeType(config.overrideMimeType);
    }
    const onLoadStart = (event) => file.onLoadStart(event);
    const onLoad = (event) => file.onLoad(event);
    const onLoadEnd = (event) => file.onLoadEnd(event);
    const onProgress = (event) => file.onProgress(event);
    const onTimeout = (event) => file.onTimeout(event);
    const onAbort = (event) => file.onAbort(event);
    const onError = (event) => file.onError(event);
    const eventMap = new Map([
        ['loadstart', onLoadStart],
        ['load', onLoad],
        ['loadend', onLoadEnd],
        ['progress', onProgress],
        ['timeout', onTimeout],
        ['abort', onAbort],
        ['error', onError]
    ]);
    for (const [key, value] of eventMap) {
        xhr.addEventListener(key, value);
    }
    file.resetXHR = () => {
        for (const [key, value] of eventMap) {
            xhr.removeEventListener(key, value);
        }
        // xhr.removeEventListener('loadstart', onLoadStart);
        // xhr.removeEventListener('load', onLoad);
        // xhr.removeEventListener('loadend', onLoadEnd);
        // xhr.removeEventListener('progress', onProgress);
        // xhr.removeEventListener('timeout', onTimeout);
        // xhr.removeEventListener('abort', onAbort);
        // xhr.removeEventListener('error', onError);
    };
    // xhr.addEventListener('loadstart', onLoadStart);
    // xhr.addEventListener('load', onLoad);
    // xhr.addEventListener('loadend', onLoadEnd);
    // xhr.addEventListener('progress', onProgress);
    // xhr.addEventListener('timeout', onTimeout);
    // xhr.addEventListener('abort', onAbort);
    // xhr.addEventListener('error', onError);
    //  After a successful request, the xhr.response property will contain the requested data as a DOMString,
    //  ArrayBuffer, Blob, or Document (depending on what was set for responseType.)
    xhr.send();
}
//# sourceMappingURL=XHRLoader.js.map