export interface IXHRSettings {
    responseType: XMLHttpRequestResponseType;
    async: boolean;
    username: string;
    password: string;
    timeout: number;
    header?: string;
    headerValue?: string;
    requestedWith?: string;
    overrideMimeType?: string;
}
