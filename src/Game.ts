export class Game
{
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D | null;

    constructor (width: number = 800, height: number = 600)
    {
        this.canvas = document.createElement('canvas');

        this.canvas.width = width;
        this.canvas.height = height;

        document.body.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.context.fillStyle = '#2d2d2d';
        this.context.fillRect(0, 0, width, height);
    }

    public draw (text: string)
    {
        this.context.fillStyle = '#ff0000';
        this.context.fillText(text, 10, 40);
        this.context.fillStyle = '#0000ff';
        this.context.fillText(text, 10, 20);
        this.context.fillStyle = '#ffff00';
        this.context.fillText(text, 10, 60);
    }
}
