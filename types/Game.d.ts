export declare class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    isBooted: boolean;
    isRunning: boolean;
    constructor();
    boot(): void;
    createDebugCanvas(width?: number, height?: number): void;
    drawImage(image: CanvasImageSource, x?: number, y?: number): void;
    draw(text: string): void;
    text(x: number, y: number, text: string): void;
}
//# sourceMappingURL=Game.d.ts.map