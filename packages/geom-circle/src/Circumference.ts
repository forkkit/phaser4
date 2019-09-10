import { ICircle } from './ICircle';

export function Circumference <T extends ICircle> (circle: T): number
{
    return 2 * (Math.PI * circle.radius);
}
