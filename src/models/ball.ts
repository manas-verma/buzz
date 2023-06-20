import { Context } from "types";

export default class Ball {
  private x: number;
  private y: number;

  private dx: number;
  private dy: number;
  private dVx: number = 0;
  private dVy: number = 0;

  private radius: number;

  constructor(radius: number, speed: number) {
    this.radius = radius;
    const direction = Math.random() * 2 * Math.PI;
    this.dx = Math.cos(direction) * speed;
    this.dy = Math.sin(direction) * speed;
    this.x = Math.random();
    this.y = Math.random();
  }

  getRadius(): number {
    return this.radius;
  }

  getPosition(): [number, number] {
    return [this.x, this.y];
  }

  getVelocity(): [number, number] {
    return [this.dx, this.dy];
  }

  bounce(x: boolean, y: boolean) {
    if (x) this.dx = -this.dx;
    if (y) this.dy = -this.dy;
  }

  updateAcceleration(dVx: number, dVy: number) {
    this.dVx = dVx;
    this.dVy = dVy;
  }

  draw(context: Context) {
    const width = context.canvas.width;
    const height = context.canvas.height;
    const xPos = this.radius + (width - 2 * this.radius) * this.x;
    const yPos = this.radius + (height - 2 * this.radius) * this.y;

    context.moveTo(xPos + this.radius, yPos);
    context.arc(xPos, yPos, this.radius, 0, 2 * Math.PI, false);
  }

  update() {
    if (this.x > 1 || this.x < 0) this.dx = -this.dx;
    if (this.y > 1 || this.y < 0) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.dx += this.dVx;
    this.dy += this.dVy;
  }
}
