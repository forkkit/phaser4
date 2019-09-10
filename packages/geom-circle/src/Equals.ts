import { ICircle } from './ICircle';

export function Equals <T extends ICircle> (source: T, target: T): boolean
{
    return (
        source.x === target.x &&
        source.y === target.y &&
        source.radius === target.radius
    );
}
