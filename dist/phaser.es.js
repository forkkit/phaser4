function canPlayM4A(audioElement = document.createElement('audio')) {
    return ((audioElement.canPlayType('audio/x-m4a') !== '') || (audioElement.canPlayType('audio/aac') !== ''));
}

function canPlayMP3(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/mpeg; codecs="mp3"') !== '');
}

function canPlayOGG(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/ogg; codecs="vorbis"') !== '');
}

function canPlayOpus(audioElement = document.createElement('audio')) {
    return ((audioElement.canPlayType('audio/ogg; codecs="opus"') !== '') || (audioElement.canPlayType('audio/webm; codecs="opus"') !== ''));
}

function canPlayWAV(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/wav; codecs="1"') !== '');
}

function canPlayWebM(audioElement = document.createElement('audio')) {
    return (audioElement.canPlayType('audio/webm; codecs="vorbis"') !== '');
}

function hasAudio() {
    return (window.hasOwnProperty('Audio'));
}

function hasWebAudio() {
    return (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext'));
}

function GetAudio() {
    const result = {
        audioData: hasAudio(),
        m4a: false,
        mp3: false,
        ogg: false,
        opus: false,
        wav: false,
        webAudio: hasWebAudio(),
        webm: false
    };
    if (result.audioData) {
        const audioElement = document.createElement('audio');
        // IE9 Running on Windows Server SKU can cause an exception to be thrown
        try {
            const canPlay = !!audioElement.canPlayType;
            if (canPlay) {
                result.m4a = canPlayM4A(audioElement);
                result.mp3 = canPlayMP3(audioElement);
                result.ogg = canPlayOGG(audioElement);
                result.opus = canPlayOpus(audioElement);
                result.wav = canPlayWAV(audioElement);
                result.webm = canPlayWebM(audioElement);
            }
        }
        catch (error) {
            result.audioData = false;
        }
    }
    return result;
}

function isChrome() {
    const chrome = (/Chrome\/(\d+)/).test(navigator.userAgent);
    const chromeVersion = (chrome) ? parseInt(RegExp.$1, 10) : 0;
    return {
        chrome,
        chromeVersion
    };
}

function isEdge() {
    const edge = (/Edge\/\d+/).test(navigator.userAgent);
    return {
        edge
    };
}

function isFirefox() {
    const firefox = (/Firefox\D+(\d+)/).test(navigator.userAgent);
    const firefoxVersion = (firefox) ? parseInt(RegExp.$1, 10) : 0;
    return {
        firefox,
        firefoxVersion
    };
}

function isiOS() {
    const ua = navigator.userAgent;
    const result = {
        iOS: false,
        iOSVersion: 0,
        iPhone: false,
        iPad: false
    };
    if (/iP[ao]d|iPhone/i.test(ua)) {
        (navigator.appVersion).match(/OS (\d+)/);
        result.iOS = true;
        result.iOSVersion = parseInt(RegExp.$1, 10);
        result.iPhone = (ua.toLowerCase().indexOf('iphone') !== -1);
        result.iPad = (ua.toLowerCase().indexOf('ipad') !== -1);
    }
    return result;
}

function isMobileSafari() {
    const { iOS } = isiOS();
    const mobileSafari = ((/AppleWebKit/).test(navigator.userAgent) && iOS);
    return {
        mobileSafari
    };
}

function isMSIE() {
    const ie = (/MSIE (\d+\.\d+);/).test(navigator.userAgent);
    const ieVersion = (ie) ? parseInt(RegExp.$1, 10) : 0;
    return {
        ie,
        ieVersion
    };
}

function isOpera() {
    const opera = (/Opera/).test(navigator.userAgent);
    return {
        opera
    };
}

function isWindowsPhone() {
    const ua = navigator.userAgent;
    return (/Windows Phone/i.test(ua) || (/IEMobile/i).test(ua));
}

function isSafari() {
    const ua = navigator.userAgent;
    const safari = ((/Safari/).test(ua) && !isWindowsPhone());
    const safariVersion = ((/Version\/(\d+)\./).test(ua)) ? parseInt(RegExp.$1, 10) : 0;
    return {
        safari,
        safariVersion
    };
}

function isSilk() {
    const silk = (/Silk/).test(navigator.userAgent);
    return {
        silk
    };
}

function isTrident() {
    const trident = (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(navigator.userAgent);
    const tridentVersion = (trident) ? parseInt(RegExp.$1, 10) : 0;
    const tridentIEVersion = (trident) ? parseInt(RegExp.$3, 10) : 0;
    return {
        trident,
        tridentVersion,
        tridentIEVersion
    };
}

function GetBrowser() {
    const { chrome, chromeVersion } = isChrome();
    const { edge } = isEdge();
    const { firefox, firefoxVersion } = isFirefox();
    let { ie, ieVersion } = isMSIE();
    const { mobileSafari } = isMobileSafari();
    const { opera } = isOpera();
    const { safari, safariVersion } = isSafari();
    const { silk } = isSilk();
    const { trident, tridentVersion, tridentIEVersion } = isTrident();
    if (trident) {
        ie = true;
        ieVersion = tridentIEVersion;
    }
    const result = {
        chrome,
        chromeVersion,
        edge,
        firefox,
        firefoxVersion,
        ie,
        ieVersion,
        mobileSafari,
        opera,
        safari,
        safariVersion,
        silk,
        trident,
        tridentVersion
    };
    return result;
}

function isAndroid() {
    return (/Android/.test(navigator.userAgent));
}

function isChromeOS() {
    return (/CrOS/.test(navigator.userAgent));
}

function isCordova() {
    return (window.hasOwnProperty('cordova'));
}

function isCrosswalk() {
    return ((/Crosswalk/).test(navigator.userAgent));
}

function isEjecta() {
    return (window.hasOwnProperty('ejecta'));
}

function isNode() {
    return (typeof process !== 'undefined' && typeof process.versions === 'object' && process.versions.hasOwnProperty('node'));
}

function isElectron() {
    return (isNode() && !!process.versions['electron']);
}

function isKindle() {
    // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
    // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
    const ua = navigator.userAgent;
    return ((/Kindle/.test(ua) || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua)));
}

function isLinux() {
    return (/Linux/.test(navigator.userAgent));
}

function isMacOS() {
    const ua = navigator.userAgent;
    return (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)));
}

function isNodeWebkit() {
    return (isNode() && !!process.versions['node-webkit']);
}

function isWebApp() {
    return (navigator.hasOwnProperty('standalone'));
}

function isWindows() {
    return (/Windows/.test(navigator.userAgent));
}

function GetOS() {
    const ua = navigator.userAgent;
    const { iOS, iOSVersion, iPad, iPhone } = isiOS();
    const result = {
        android: isAndroid(),
        chromeOS: isChromeOS(),
        cordova: isCordova(),
        crosswalk: isCrosswalk(),
        desktop: false,
        ejecta: isEjecta(),
        electron: isElectron(),
        iOS,
        iOSVersion,
        iPad,
        iPhone,
        kindle: isKindle(),
        linux: isLinux(),
        macOS: isMacOS(),
        node: isNode(),
        nodeWebkit: isNodeWebkit(),
        pixelRatio: 1,
        webApp: isWebApp(),
        windows: isWindows(),
        windowsPhone: isWindowsPhone()
    };
    if (result.windowsPhone) {
        result.android = false;
        result.iOS = false;
        result.macOS = false;
        result.windows = true;
    }
    const silk = (/Silk/).test(ua);
    if (result.windows || result.macOS || (result.linux && !silk) || result.chromeOS) {
        result.desktop = true;
    }
    //  Windows Phone / Table reset
    if (result.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua)))) {
        result.desktop = false;
    }
    return result;
}

function canPlayH264Video(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '');
}

function canPlayHLSVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"') !== '');
}

function canPlayOGGVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/ogg; codecs="theora"') !== '');
}

function canPlayVP9Video(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/webm; codecs="vp9"') !== '');
}

function canPlayWebMVideo(videoElement = document.createElement('video')) {
    return (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"') !== '');
}

function GetVideo() {
    const result = {
        h264Video: false,
        hlsVideo: false,
        mp4Video: false,
        oggVideo: false,
        vp9Video: false,
        webmVideo: false
    };
    const videoElement = document.createElement('video');
    // IE9 Running on Windows Server SKU can cause an exception to be thrown
    try {
        const canPlay = !!videoElement.canPlayType;
        if (canPlay) {
            result.h264Video = canPlayH264Video(videoElement);
            result.hlsVideo = canPlayHLSVideo(videoElement);
            result.oggVideo = canPlayOGGVideo(videoElement);
            result.vp9Video = canPlayVP9Video(videoElement);
            result.webmVideo = canPlayWebMVideo(videoElement);
        }
    }
    catch (error) {
        //  Nothing to do here
    }
    //  Duplicate the result for Phaser 3 compatibility
    result.mp4Video = result.hlsVideo;
    return result;
}

function AddToDOM(element, parent) {
    let target;
    if (parent) {
        if (typeof parent === 'string') {
            //  Hopefully an element ID
            target = document.getElementById(parent);
        }
        else if (typeof parent === 'object' && parent.nodeType === 1) {
            //  Quick test for a HTMLElement
            target = parent;
        }
    }
    else if (element.parentElement) {
        return element;
    }
    //  Fallback, covers an invalid ID and a non HTMLElement object
    if (!target) {
        target = document.body;
    }
    target.appendChild(element);
    return element;
}

function DOMContentLoaded(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        callback();
        return;
    }
    const check = () => {
        document.removeEventListener('deviceready', check, true);
        document.removeEventListener('DOMContentLoaded', check, true);
        window.removeEventListener('load', check, true);
        callback();
    };
    if (!document.body) {
        window.setTimeout(check, 20);
    }
    else if (isCordova()) {
        document.addEventListener('deviceready', check, true);
    }
    else {
        document.addEventListener('DOMContentLoaded', check, true);
        window.addEventListener('load', check, true);
    }
}

function RemoveFromDOM(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

var BaseLoaderState;
(function (BaseLoaderState) {
    BaseLoaderState[BaseLoaderState["IDLE"] = 0] = "IDLE";
    BaseLoaderState[BaseLoaderState["LOADING"] = 1] = "LOADING";
    BaseLoaderState[BaseLoaderState["PROCESSING"] = 2] = "PROCESSING";
    BaseLoaderState[BaseLoaderState["COMPLETE"] = 3] = "COMPLETE";
    BaseLoaderState[BaseLoaderState["SHUTDOWN"] = 4] = "SHUTDOWN";
    BaseLoaderState[BaseLoaderState["DESTROYED"] = 5] = "DESTROYED";
})(BaseLoaderState || (BaseLoaderState = {}));

var FileState;
(function (FileState) {
    FileState[FileState["PENDING"] = 0] = "PENDING";
    FileState[FileState["LOADING"] = 1] = "LOADING";
    FileState[FileState["LOADED"] = 2] = "LOADED";
    FileState[FileState["FAILED"] = 3] = "FAILED";
    FileState[FileState["PROCESSING"] = 4] = "PROCESSING";
    FileState[FileState["ERRORED"] = 5] = "ERRORED";
    FileState[FileState["COMPLETE"] = 6] = "COMPLETE";
    FileState[FileState["DESTROYED"] = 7] = "DESTROYED";
    FileState[FileState["POPULATED"] = 8] = "POPULATED";
    FileState[FileState["TIMED_OUT"] = 9] = "TIMED_OUT";
    FileState[FileState["ABORTED"] = 10] = "ABORTED";
})(FileState || (FileState = {}));

class BaseLoader {
    constructor() {
        this.fileGroup = '';
        this.prefix = '';
        this.baseURL = '';
        this.path = '';
        this.maxParallelDownloads = 32;
        this.crossOrigin = '';
        this.state = BaseLoaderState.IDLE;
        this.progress = 0;
        this.totalToLoad = 0;
        this.totalFailed = 0;
        this.totalComplete = 0;
        this.list = new Set();
        this.inflight = new Set();
        this.queue = new Set();
        this._deleteQueue = new Set();
        this.state = BaseLoaderState.IDLE;
    }
    setBaseURL(value = '') {
        if (value !== '' && value.substr(-1) !== '/') {
            value = value.concat('/');
        }
        this.baseURL = value;
        return this;
    }
    setPath(value = '') {
        if (value !== '' && value.substr(-1) !== '/') {
            value = value.concat('/');
        }
        this.path = value;
        return this;
    }
    setFileGroup(name = '') {
        this.fileGroup = name;
        return this;
    }
    isLoading() {
        return (this.state === BaseLoaderState.LOADING || this.state === BaseLoaderState.PROCESSING);
    }
    isReady() {
        return (this.state === BaseLoaderState.IDLE || this.state === BaseLoaderState.COMPLETE);
    }
    addFile(file) {
        console.log('addFile');
        this.getURL(file);
        this.list.add(file);
        this.totalToLoad++;
        console.log(file);
        return new Promise((resolve, reject) => {
            file.fileResolve = resolve;
            file.fileReject = reject;
        });
    }
    start() {
        if (!this.isReady()) {
            return;
        }
        this.progress = 0;
        this.totalFailed = 0;
        this.totalComplete = 0;
        this.totalToLoad = this.list.size;
        if (this.totalToLoad === 0) {
            this.loadComplete();
        }
        else {
            this.state = BaseLoaderState.LOADING;
            this.inflight.clear();
            this.queue.clear();
            this._deleteQueue.clear();
            this.updateProgress();
            this.checkLoadQueue();
        }
    }
    getURL(file) {
        if (file.url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)) {
            return file;
        }
        else {
            file.url = this.baseURL + this.path + file.url;
        }
    }
    updateProgress() {
        this.progress = 1 - ((this.list.size + this.inflight.size) / this.totalToLoad);
    }
    checkLoadQueue() {
        for (const entry of this.list) {
            if ((entry.state === FileState.POPULATED) ||
                (entry.state === FileState.PENDING && this.inflight.size < this.maxParallelDownloads)) {
                this.inflight.add(entry);
                this.list.delete(entry);
                //  Apply CORS
                entry.load()
                    .then((file) => this.nextFile(file, true))
                    .catch((file) => this.nextFile(file, false));
            }
            if (this.inflight.size === this.maxParallelDownloads) {
                break;
            }
        }
    }
    nextFile(previousFile, success) {
        console.log('nextFile', previousFile, success);
        if (success) {
            this.queue.add(previousFile);
        }
        else {
            this._deleteQueue.add(previousFile);
        }
        this.inflight.delete(previousFile);
        if (this.list.size > 0) {
            console.log('nextFile - still something in the list');
            this.checkLoadQueue();
        }
        else if (this.inflight.size === 0) {
            console.log('nextFile calling finishedLoading');
            this.loadComplete();
        }
    }
    loadComplete() {
        this.list.clear();
        this.inflight.clear();
        // this.queue.clear();
        this.progress = 1;
        this.state = BaseLoaderState.COMPLETE;
        //  Call 'destroy' on each file ready for deletion
        // this._deleteQueue.iterateLocal('destroy');
        // this._deleteQueue.clear();
    }
}

function XHRLoader(file) {
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

function XHRSettings(config = { responseType: 'blob', async: true, username: '', password: '', timeout: 0 }) {
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

function File(key, url, type) {
    return {
        key,
        url,
        type,
        xhrLoader: undefined,
        xhrSettings: XHRSettings(),
        data: null,
        state: FileState.PENDING,
        bytesLoaded: 0,
        bytesTotal: 0,
        percentComplete: 0,
        load() {
            console.log('File.load', this.key);
            this.state = FileState.PENDING;
            XHRLoader(this);
            return new Promise((resolve, reject) => {
                this.loaderResolve = resolve;
                this.loaderReject = reject;
            });
        },
        onLoadStart(event) {
            console.log('onLoadStart');
            this.state = FileState.LOADING;
        },
        onLoad(event) {
            console.log('onLoad');
            const xhr = this.xhrLoader;
            const localFileOk = ((xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && xhr.status === 0));
            let success = !(event.target && xhr.status !== 200) || localFileOk;
            //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
            if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) {
                success = false;
            }
            this.onProcess()
                .then(() => this.onComplete())
                .catch(() => this.onError());
        },
        onLoadEnd(event) {
            console.log('onLoadEnd');
            this.resetXHR();
            this.state = FileState.LOADED;
        },
        onTimeout(event) {
            console.log('onTimeout');
            this.state = FileState.TIMED_OUT;
        },
        onAbort(event) {
            console.log('onAbort');
            this.state = FileState.ABORTED;
        },
        onError(event) {
            console.log('onError');
            this.state = FileState.ERRORED;
            if (this.fileReject) {
                this.fileReject(this);
            }
        },
        onProgress(event) {
            console.log('onProgress');
            if (event.lengthComputable) {
                this.bytesLoaded = event.loaded;
                this.bytesTotal = event.total;
                this.percentComplete = Math.min((event.loaded / event.total), 1);
                console.log(this.percentComplete, '%');
            }
        },
        onProcess() {
            console.log('File.onProcess');
            this.state = FileState.PROCESSING;
            return new Promise((resolve, reject) => {
                resolve();
            });
        },
        onComplete() {
            console.log('onComplete!');
            this.state = FileState.COMPLETE;
            if (this.fileResolve) {
                this.fileResolve(this);
            }
            else if (this.loaderResolve) {
                this.loaderResolve(this);
            }
        },
        onDestroy() {
            this.state = FileState.DESTROYED;
        }
    };
}

function ImageFile(key, url) {
    if (!url) {
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
        return new Promise((resolve, reject) => {
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
            if (image.complete && image.width && image.height) {
                console.log('ImageFile.instant');
                image.onload = null;
                image.onerror = null;
                file.state = FileState.COMPLETE;
                resolve(file);
            }
        });
    };
    return file;
}

class LoaderPlugin extends BaseLoader {
    constructor() {
        super();
    }
    image(key, url = '') {
        return this.addFile(ImageFile(key, url));
    }
}

export { AddToDOM, BaseLoader, BaseLoaderState, DOMContentLoaded, File, FileState, GetAudio, GetBrowser, GetOS, GetVideo, ImageFile, LoaderPlugin, RemoveFromDOM, XHRLoader, XHRSettings, canPlayH264Video, canPlayHLSVideo, canPlayM4A, canPlayMP3, canPlayOGG, canPlayOGGVideo, canPlayOpus, canPlayVP9Video, canPlayWAV, canPlayWebM, canPlayWebMVideo, hasAudio, hasWebAudio, isAndroid, isChrome, isChromeOS, isCordova, isCrosswalk, isEdge, isEjecta, isElectron, isFirefox, isKindle, isLinux, isMSIE, isMacOS, isMobileSafari, isNode, isNodeWebkit, isOpera, isSafari, isSilk, isTrident, isWebApp, isWindows, isWindowsPhone, isiOS };
//# sourceMappingURL=phaser.es.js.map
