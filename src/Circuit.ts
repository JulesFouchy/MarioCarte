
class Curve {
      x: number[];
      y: number[];
      constructor(x: number[], y: number[]) {
            this.x = x;
            this.y = y;
      }

      show() {
            curve(
                  this.x[0], this.y[0],
                  this.x[1], this.y[1],
                  this.x[2], this.y[2],
                  this.x[3], this.y[3]
            )
      }

      eval(t: number) {
            return [
                  curvePoint(this.x[0], this.x[1], this.x[2], this.x[3], t),
                  curvePoint(this.y[0], this.y[1], this.y[2], this.y[3], t),
            ]
      }
}

class Circuit {
      private path: Curve[];

      show() {
            this.path.forEach(curve => curve.show())
      }

      eval(t: number) {
            t = t % 4
            return this.path[Math.floor(t)].eval(t % 1)
      }

      constructor() {
            this.path = []
            this.path.push(
                  new Curve(
                  [5, 5, 73, 73],
                  [26, 26, 24, 61],
                  )
            )
            this.path.push(
                  new Curve(
                  [5, 73, 73, 15],
                  [26, 24, 61, 65],
                  )
            )
            this.path.push(
                  new Curve(
                  [73, 73, 15, 5],
                  [24, 61, 65, 26],
                  )
            )
            this.path.push(
                  new Curve(
                  [73, 15, 5, 5],
                  [61, 65, 26, 26],
                  )
            )
      }
}