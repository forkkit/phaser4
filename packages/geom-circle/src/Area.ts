import { ICircle } from './ICircle';

export function Area <T extends ICircle> (circle: T): number
{
    return (circle.radius > 0) ? Math.PI * circle.radius * circle.radius : 0;
}
