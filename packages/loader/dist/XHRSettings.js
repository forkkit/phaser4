export function XHRSettings(config = { responseType: 'blob', async: true, username: '', password: '', timeout: 0 }) {
    // Before sending a request, set the xhr.responseType to "text",
    // "arraybuffer", "blob", or "document", depending on your data needs.
    // Note, setting xhr.responseType = '' (or omitting) will default the response to "text".
    return {
        //  Ignored by the Loader, only used by File.
        responseType: config.responseType,
        async: config.async,
        //  credentials
        username: config.username,
        password: config.password,
        //  timeout in ms (0 = no timeout)
        timeout: config.timeout,
        //  setRequestHeader
        header: undefined,
        headerValue: undefined,
        requestedWith: 'XMLHttpRequest',
        //  overrideMimeType
        overrideMimeType: undefined
    };
}
//# sourceMappingURL=XHRSettings.js.map