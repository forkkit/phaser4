declare module "Game" {
    export default class Game {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D | null;
        constructor(canvas: HTMLCanvasElement);
    }
}
declare module "index" {
    export * from "Game";
}
//# sourceMappingURL=build.d.ts.map