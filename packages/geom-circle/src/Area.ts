import { Circle } from './Circle';

export function Area (circle: Circle): number
{
    return (circle.radius > 0) ? Math.PI * circle.radius * circle.radius : 0;
}
