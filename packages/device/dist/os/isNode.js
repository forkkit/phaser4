export function isNode() {
    return (typeof process !== 'undefined' && typeof process.versions === 'object' && process.versions.hasOwnProperty('node'));
}
//# sourceMappingURL=isNode.js.map