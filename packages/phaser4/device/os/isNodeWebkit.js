import { isNode } from './isNode';
export function isNodeWebkit() {
    return (isNode() && !!process.versions['node-webkit']);
}
//# sourceMappingURL=isNodeWebkit.js.map