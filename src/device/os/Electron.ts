import { Node } from './Node';

export function Electron (): boolean
{
    return (Node() && !!process.versions['electron']);
}
