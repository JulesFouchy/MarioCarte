// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Car_Size: 5,
    Smooth_Min: true,
}
gui.add(params, "Car_Size", 0, 100, 1)
gui.add(params, "Smooth_Min")

// -------------------
//       Drawing
// -------------------

function smin(a: number, b: number, k: number)
{
    a = pow( a, k )
    b = pow( b, k )
    return pow( (a*b)/(a+b), 1.0/k )
}

let circuit: Circuit

function draw_circuit() {
    noFill()
    stroke("white")
    strokeWeight(params.Car_Size*1.1)
    circuit.show()
}

interface Car {
    color: string;
    position: number[];
}

function draw_car(car: Car) {
    fill(car.color)
    noStroke()
    ellipse(car.position[0], car.position[1], params.Car_Size)
}

function draw() {
    push()
    background(0)
    const cars: Car[] = [
        {
            position: circuit.eval(frameCount * 0.01),
            color: "red"
        },
        {
            position: circuit.eval(frameCount * 0.0111),
            color: "green"
        },
        {
            position: circuit.eval(frameCount * 0.011),
            color: "blue"
        },
    ]
    const x_left = cars.reduce((x_left, car) => min(x_left, car.position[0]), +Infinity)
    const x_rght = cars.reduce((x_rght, car) => max(x_rght, car.position[0]), -Infinity)
    const y_left = cars.reduce((y_left, car) => min(y_left, car.position[1]), +Infinity)
    const y_rght = cars.reduce((y_rght, car) => max(y_rght, car.position[1]), -Infinity)
    console.log(x_left, x_rght, y_left, y_rght)
    translate(width/2, height/2)
    const sx = width  / (x_rght - x_left)
    const sy = height / (y_rght - y_left)
    const s = (params.Smooth_Min ? smin(sx, sy, 1) : min(sx, sy)) / 2
    scale(s, s)
    translate(-(x_left + x_rght)/2, -(y_left + y_rght)/2)
    // scale(width, height)
    draw_circuit()
    cars.forEach(car => draw_car(car))
    pop()
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    circuit = new Circuit()
}

function windowResized() {
    p6_ResizeCanvas()
}