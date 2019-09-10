import { Circle } from './Circle';

export function Clone (source: Circle): Circle
{
    return new Circle(source.x, source.y, source.radius);
}
