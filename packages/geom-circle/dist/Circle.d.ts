export declare class Circle {
    x: number;
    y: number;
    private _radius;
    private _diameter;
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