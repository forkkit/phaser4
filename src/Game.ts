export class Game
{
    public context: CanvasRenderingContext2D | null;

    constructor (public canvas: HTMLCanvasElement)
    {
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;

        this.context.fillStyle = '#2d2d2d';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = '#00ff00';
        this.context.fillText('Phaser 4', 10, 10);
    }
}