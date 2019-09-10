import { Circle } from './Circle';

export function Equals (source: Circle, target: Circle): boolean
{
    return (
        source.x === target.x &&
        source.y === target.y &&
        source.radius === target.radius
    );
}
