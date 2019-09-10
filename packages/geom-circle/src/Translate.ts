import { Circle } from './Circle';

export function Translate (circle: Circle, x: number, y: number): Circle
{
    circle.x += x;
    circle.y += y;

    return circle;
}
