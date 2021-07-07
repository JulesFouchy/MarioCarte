function draw_circuit() {
      noFill()
      stroke("white")
      strokeWeight(CAR_SIZE*1.1)
      circuit.show()
}

function draw_car(car: Car) {
      fill(car.color)
      noStroke()
      ellipse(car.position[0], car.position[1], CAR_SIZE)
}