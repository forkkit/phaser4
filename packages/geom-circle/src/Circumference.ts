import { Circle } from './Circle';

export function Circumference (circle: Circle): number
{
    return 2 * (Math.PI * circle.radius);
}
