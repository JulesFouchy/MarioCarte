// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Car_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Car_Size", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(0)
    noFill();
    stroke("white")
    strokeWeight(1)//params.Car_Size*1.1)
    const circuit = new Circuit()
    circuit.show()
    fill("red")
    noStroke()
    const pos = circuit.eval(frameCount / 50)
    ellipse(pos[0], pos[1], 3)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}