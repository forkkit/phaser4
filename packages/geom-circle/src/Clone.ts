import { Circle } from './Circle';
import { ICircle } from './ICircle';

export function Clone <T extends ICircle> (source: T): Circle
{
    return new Circle(source.x, source.y, source.radius);
}
