/**
 * Created by evans mobile on 2/9/14.
 */

// Get current system time
function getTime() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// Find the relative position of thr mouse using the bounding rectangle around a canvas
function getMousePos(incanvas, evt) {
    var rect = incanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function Vector ( x, y ) {
    this.x = x;
    this.y = y;
}

// Initialize the canvas to default
function reset(ctx) {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
}

// Renders all the elements of a display list
function renderDisplayList(list, mainctx) {
    for (var i = 0; i < list.length; i++) {
        list[i].draw(mainctx);
    }
}
