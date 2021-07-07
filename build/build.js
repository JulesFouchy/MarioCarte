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
var gui = new dat.GUI();
var params = {
    Car_Size: 30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Car_Size", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    background(0);
    noFill();
    stroke("white");
    strokeWeight(1);
    var circuit = new Circuit();
    circuit.show();
    fill("red");
    noStroke();
    var pos = circuit.eval(frameCount / 50);
    ellipse(pos[0], pos[1], 3);
}
function setup() {
    p6_CreateCanvas();
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