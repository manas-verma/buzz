import Ball from "models/ball";

const GRAVITATIONAL_CONSTANT = 1e-5;
const COULOMB_CONSTANT = 5e-8;
const DRAG_FORCE = 5e-5;
const REPULSION_THRESHOLD = 0.02;

type Args = {
  numBalls: number;
  radius: number;
  speed: number;
  attraction: number;
  repulsion: number;
  drag: number;
  threshold: number;
};

function getValue(value: number, max: number, min: number = 0) {
  return (max - min) * (value / 100) + min;
}

export default class Swarm {
  private balls: Ball[];
  private radius: number;
  private attraction: number;
  private repulsion: number;
  private drag: number;
  private threshold: number;

  constructor(args: Args) {
    const { numBalls, radius, speed, attraction, repulsion, drag, threshold } =
      args;
    this.attraction = getValue(attraction, GRAVITATIONAL_CONSTANT * 100);
    this.repulsion = getValue(repulsion, COULOMB_CONSTANT * 100);
    this.drag = getValue(drag, DRAG_FORCE * 100);
    this.threshold = getValue(threshold, REPULSION_THRESHOLD * 3);
    this.radius = radius / 1000;
    this.balls = Array.from(
      { length: numBalls },
      () => new Ball(this.radius, speed / 1000)
    );
  }

  draw(context: CanvasRenderingContext2D) {
    function drawBall(ball: Ball) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const [x, y] = ball.getPosition();
      const radius = ball.getRadius() * width;
      const xPos = radius + (width - 2 * radius) * x;
      const yPos = radius + (height - 2 * radius) * y;

      context.moveTo(xPos + radius, yPos);
      context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
    }

    context.beginPath();
    context.strokeStyle = "#fffefe";
    context.fillStyle = "#ffffff";
    this.balls.forEach(drawBall);
    context.fill();
    context.stroke();
  }

  update() {
    this.balls.forEach((ball) => ball.update());
    this.balls.forEach((ball, index) => {
      const [closestBall, _] = this.closestBall(ball, index);
      const [x1, y1] = ball.getPosition();
      const [x2, y2] = closestBall.getPosition();
      const [vx1, vy1] = ball.getVelocity();
      const [vx2, vy2] = closestBall.getVelocity();

      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance < 2 * this.radius) {
        const bounceX = Math.sign(vx1) !== Math.sign(vx2);
        const bounceY = Math.sign(vy1) !== Math.sign(vy2);
        ball.bounce(bounceX, bounceY);
        return;
      }

      const multiplier =
        distance < this.threshold ? -this.repulsion : this.attraction;
      const force = multiplier / distance ** 2;

      const dVx = (force * dx) / distance + (vx1 > 0 ? -this.drag : this.drag);
      const dVy = (force * dy) / distance + (vy1 > 0 ? -this.drag : this.drag);
      const sizeFactor = Math.sqrt(this.radius / 5e-1);
      ball.updateAcceleration(dVx * sizeFactor, dVy * sizeFactor);
    });
  }

  closestBall(ball: Ball, index: number): [Ball, number] {
    const distances = this.balls.map((otherBall, otherIndex) => {
      if (index === otherIndex) return Infinity;
      const [x1, y1] = ball.getPosition();
      const [x2, y2] = otherBall.getPosition();
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    });
    const minDistance = Math.min(...distances);
    const otherIndex = distances.indexOf(minDistance);
    return [this.balls[otherIndex], otherIndex];
  }
}
