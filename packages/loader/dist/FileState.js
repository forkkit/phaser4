export var FileState;
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
//# sourceMappingURL=FileState.js.map