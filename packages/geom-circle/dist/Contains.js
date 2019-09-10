/**
 * Check to see if the Circle contains the given `x` and `y` coordinates.
 *
 * @export
 * @param {Circle} circle - The Circle to test against.
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 * @returns {boolean} Returns `true` if the coordinates are within the circle, or `false` if they are not.
 */
export function Contains(circle, x, y) {
    //  Check the bounds first
    if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom) {
        const dx = (circle.x - x) * (circle.x - x);
        const dy = (circle.y - y) * (circle.y - y);
        return (dx + dy) <= (circle.radius * circle.radius);
    }
    else {
        return false;
    }
}
//# sourceMappingURL=Contains.js.map