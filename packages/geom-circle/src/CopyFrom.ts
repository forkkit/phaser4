import { Circle } from './Circle';

export function CopyFrom (source: Circle, dest: Circle): Circle
{
    return dest.setTo(source.x, source.y, source.radius);
}
