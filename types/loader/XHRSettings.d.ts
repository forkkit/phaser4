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
export declare function XHRSettings(config?: IXHRSettings): IXHRSettings;
//# sourceMappingURL=XHRSettings.d.ts.map