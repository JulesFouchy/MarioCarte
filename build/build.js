var Curve = (function () {
    function Curve(x, y) {
        this.x = x;
        this.y = y;
    }
    Curve.prototype.show = function () {
        curve(this.x[0], this.y[0], this.x[1], this.y[1], this.x[2], this.y[2], this.x[3], this.y[3]);
    };
    Curve.prototype.eval = function (t) {
        return [
            curvePoint(this.x[0], this.x[1], this.x[2], this.x[3], t),
            curvePoint(this.y[0], this.y[1], this.y[2], this.y[3], t),
        ];
    };
    return Curve;
}());
var Circuit = (function () {
    function Circuit() {
        this.path = [];
        this.path.push(new Curve([5, 5, 73, 73], [26, 26, 24, 61]));
        this.path.push(new Curve([5, 73, 73, 15], [26, 24, 61, 65]));
        this.path.push(new Curve([73, 73, 15, 5], [24, 61, 65, 26]));
        this.path.push(new Curve([73, 15, 5, 5], [61, 65, 26, 26]));
    }
    Circuit.prototype.show = function () {
        this.path.forEach(function (curve) { return curve.show(); });
    };
    Circuit.prototype.eval = function (t) {
        t = t % 4;
        return this.path[Math.floor(t)].eval(t % 1);
    };
    return Circuit;
}());
function draw_circuit() {
    noFill();
    stroke("white");
    strokeWeight(CAR_SIZE * 1.1);
    circuit.show();
}
function draw_car(car) {
    fill(car.color);
    noStroke();
    ellipse(car.position[0], car.position[1], CAR_SIZE);
}
var gui = new dat.GUI();
var params = {
    Smooth_Min: true,
};
gui.add(params, "Smooth_Min");
var CAR_SIZE = 5;
var circuit;
function smin(a, b, k) {
    a = pow(a, k);
    b = pow(b, k);
    return pow((a * b) / (a + b), 1.0 / k);
}
function draw() {
    var cars = [
        {
            position: circuit.eval(0.2 + frameCount * 0.01),
            color: "red"
        },
        {
            position: circuit.eval(0.2 + frameCount * 0.0111),
            color: "green"
        },
        {
            position: circuit.eval(0.2 + frameCount * 0.011),
            color: "blue"
        },
    ];
    var x_min = cars.reduce(function (x_min, car) { return min(x_min, car.position[0]); }, +Infinity);
    var x_max = cars.reduce(function (x_max, car) { return max(x_max, car.position[0]); }, -Infinity);
    var y_min = cars.reduce(function (y_min, car) { return min(y_min, car.position[1]); }, +Infinity);
    var y_max = cars.reduce(function (y_max, car) { return max(y_max, car.position[1]); }, -Infinity);
    var scale_x = width / (x_max - x_min);
    var scale_y = height / (y_max - y_min);
    var actual_scale = min((params.Smooth_Min ? smin(scale_x, scale_y, 10) : min(scale_x, scale_y)) / 2, 50.);
    translate(width / 2, height / 2);
    scale(actual_scale, actual_scale);
    translate(-(x_min + x_max) / 2, -(y_min + y_max) / 2);
    background(0);
    draw_circuit();
    cars.forEach(function (car) { return draw_car(car); });
}
function setup() {
    frameCount;
    p6_CreateCanvas();
    circuit = new Circuit();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map