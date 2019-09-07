import { AddToDOM } from './dom/AddToDOM';
import { DOMContentLoaded } from './dom/DOMContentLoaded';

export default class Game
{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    isBooted: boolean = false;
    isRunning: boolean = false;
    
    private _initCallback: (game: Game) => void;

    constructor (init: (game: Game) => void)
    {
        this._initCallback = init;

        DOMContentLoaded(() => this.boot());
    }

    boot ()
    {
        console.log('Phaser 4.0.0-alpha.3');

        this.isBooted = true;

        this.createDebugCanvas();

        AddToDOM(this.canvas);

        this._initCallback(this);
    }

    createDebugCanvas (width: number = 800, height: number = 600)
    {
        this.canvas = document.createElement('canvas');

        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.context.fillStyle = '#2d2d2d';
        this.context.fillRect(0, 0, width, height);
    }

    drawImage (image: CanvasImageSource, x: number = 0, y: number = 0)
    {
        this.context.drawImage(image, x, y);
    }

    draw (text: string)
    {
        this.context.fillStyle = '#ff0000';
        this.context.fillText(text, 10, 40);
        this.context.fillStyle = '#0000ff';
        this.context.fillText(text, 10, 20);
        this.context.fillStyle = '#ffff00';
        this.context.fillText(text, 10, 60);
    }

    text (x: number, y: number, text: string)
    {
        this.context.fillStyle = '#00ff00';
        this.context.font = '16px Courier';
        this.context.fillText(text, x, y);
    }

}
