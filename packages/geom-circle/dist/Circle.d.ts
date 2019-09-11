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
export declare class Circle {
    x: number;
    y: number;
    private _radius;
    private _diameter;
    /**
     * Creates an instance of a Circle geometry object.
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     * @memberof Circle
     */
    constructor(x?: number, y?: number, radius?: number);
    setTo(x: number, y: number, radius: number): Circle;
    setEmpty(): Circle;
    setPosition(x: number, y?: number): Circle;
    isEmpty(): boolean;
    radius: number;
    diameter: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
}
//# sourceMappingURL=Circle.d.ts.map