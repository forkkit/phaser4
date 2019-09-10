import { ICircle } from './ICircle';

export function Translate <T extends ICircle> (circle: T, x: number, y: number): T
{
    circle.x += x;
    circle.y += y;

    return circle;
}
