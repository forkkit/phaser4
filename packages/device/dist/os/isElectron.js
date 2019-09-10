import { isNode } from './isNode';
export function isElectron() {
    return (isNode() && !!process.versions['electron']);
}
//# sourceMappingURL=isElectron.js.map