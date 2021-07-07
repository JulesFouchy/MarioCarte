// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Smooth_Min: true,
}
gui.add(params, "Smooth_Min")
const CAR_SIZE = 5
let circuit: Circuit

// -------------------
//       Drawing
// -------------------

// Like a minimum, but smoother !
// Look at https://www.iquilezles.org/www/articles/smin/smin.htm
function smin(a: number, b: number, k: number) {
    a = pow( a, k )
    b = pow( b, k )
    return pow( (a*b)/(a+b), 1.0/k )
}

interface Car {
    color: string;
    position: number[];
}

function draw() {
    // Compute car positions
    const cars: Car[] = [
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
    ]
    // Translate to the middle (barycenter) of the cars and scale to be close up to the cars
    const x_min = cars.reduce((x_min, car) => min(x_min, car.position[0]), +Infinity)
    const x_max = cars.reduce((x_max, car) => max(x_max, car.position[0]), -Infinity)
    const y_min = cars.reduce((y_min, car) => min(y_min, car.position[1]), +Infinity)
    const y_max = cars.reduce((y_max, car) => max(y_max, car.position[1]), -Infinity)
    const scale_x = width  / (x_max - x_min)
    const scale_y = height / (y_max - y_min)
    const actual_scale = min((params.Smooth_Min ? smin(scale_x, scale_y, 1) : min(scale_x, scale_y)) / 2, 50.)
    translate(width/2, height/2)
    scale(actual_scale, actual_scale)
    translate(-(x_min + x_max)/2, -(y_min + y_max)/2)
    // Drawing
    background(0)
    draw_circuit()
    cars.forEach(car => draw_car(car))
}

// -------------------
//    Initialization
// -------------------

function setup() {
    frameCount
    p6_CreateCanvas()
    circuit = new Circuit()
}

function windowResized() {
    p6_ResizeCanvas()
}