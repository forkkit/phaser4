import { isNode } from './isNode';

export function isNodeWebkit (): boolean
{
    return (isNode() && !!process.versions['node-webkit']);
}
