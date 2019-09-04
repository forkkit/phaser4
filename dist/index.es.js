var Game = /** @class */ (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = '#2d2d2d';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = '#00ff00';
        this.context.fillText('Phaser 4', 10, 10);
    }
    return Game;
}());

//  Phaser 4 Entry point

export default Game;
