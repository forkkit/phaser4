/**
 * A Circle object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Circle you should look at the capabilities of the Graphics class.
 *
 * @export
 * @class Circle
 */
export class Circle
{
    x: number;

    y: number;

    private _radius: number;

    private _diameter: number;

    /**
     * Creates an instance of a Circle geometry object.
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     * @memberof Circle
     */
    constructor (x: number = 0, y: number = 0, radius: number = 0)
    {
        this.setTo(x, y, radius);
    }

    setTo (x: number, y: number, radius: number): Circle
    {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._diameter = radius * 2;

        return this;
    }

    setEmpty (): Circle
    {
        this._radius = 0;
        this._diameter = 0;

        return this;
    }

    setPosition (x: number, y: number = x): Circle
    {
        this.x = x;
        this.y = y;

        return this;
    }

    isEmpty (): boolean
    {
        return (this._radius <= 0);
    }

    get radius (): number
    {
        return this._radius;
    }

    set radius (value: number)
    {
        this._radius = value;
        this._diameter = value * 2;
    }

    get diameter (): number
    {
        return this._diameter;
    }

    set diameter (value: number)
    {
        this._diameter = value;
        this._radius = value / 2;
    }

    get left (): number
    {
        return this.x - this._radius;
    }

    set left (value: number)
    {
        this.x = value + this._radius;
    }

    get right (): number
    {
        return this.x + this._radius;
    }

    set right (value: number)
    {
        this.x = value - this._radius;
    }

    get top (): number
    {
        return this.y - this._radius;
    }

    set top (value: number)
    {
        this.y = value + this._radius;
    }

    get bottom (): number
    {
        return this.y + this._radius;
    }

    set bottom (value: number)
    {
        this.y = value - this._radius;
    }

}
