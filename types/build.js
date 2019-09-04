System.register("Game", [], function (exports_1, context_1) {
    "use strict";
    var Game;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Game = class Game {
                constructor(canvas) {
                    this.canvas = canvas;
                    this.context = canvas.getContext('2d');
                    this.context.fillStyle = '#2d2d2d';
                    this.context.fillRect(0, 0, canvas.width, canvas.height);
                    this.context.fillStyle = '#00ff00';
                    this.context.fillText('Phaser 4', 10, 10);
                }
            };
            exports_1("default", Game);
        }
    };
});
System.register("index", ["Game"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_2(exports);
    }
    return {
        setters: [
            function (Game_1_1) {
                exportStar_1(Game_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=build.js.map