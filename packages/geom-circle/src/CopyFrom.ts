import { Circle } from './Circle';
import { ICircle } from './ICircle';

export function CopyFrom <T extends ICircle> (source: T, dest: Circle): Circle
{
    return dest.setTo(source.x, source.y, source.radius);
}
