import { Contains } from './Contains';
export class Circle {
    constructor(x = 0, y = 0, radius = 0) {
        this.setTo(x, y, radius);
    }
    contains(x, y) {
        return Contains(this, x, y);
    }
    setTo(x, y, radius) {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._diameter = radius * 2;
        return this;
    }
    setEmpty() {
        this._radius = 0;
        this._diameter = 0;
        return this;
    }
    setPosition(x, y = x) {
        this.x = x;
        this.y = y;
        return this;
    }
    isEmpty() {
        return (this._radius <= 0);
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        this._diameter = value * 2;
    }
    get diameter() {
        return this._diameter;
    }
    set diameter(value) {
        this._diameter = value;
        this._radius = value / 2;
    }
    get left() {
        return this.x - this._radius;
    }
    set left(value) {
        this.x = value + this._radius;
    }
    get right() {
        return this.x + this._radius;
    }
    set right(value) {
        this.x = value - this._radius;
    }
    get top() {
        return this.y - this._radius;
    }
    set top(value) {
        this.y = value + this._radius;
    }
    get bottom() {
        return this.y + this._radius;
    }
    set bottom(value) {
        this.y = value - this._radius;
    }
}
//# sourceMappingURL=Circle.js.map