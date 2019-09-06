import { Node } from './Node';

export function NodeWebkit (): boolean
{
    return (Node() && !!process.versions['node-webkit']);
}
