const INITIAL_VELOCITY = 0.02;
const ACCELERATION = 0.000001;
export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }
  get x() {
    return parseFloat(
      window.getComputedStyle(this.ballElem).getPropertyValue("--x")
    );
  }
  set x(value) {
    return this.ballElem.style.setProperty("--x", value);
  }
  get y() {
    return parseFloat(
      window.getComputedStyle(this.ballElem).getPropertyValue("--y")
    );
  }
  set y(value) {
    return this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }
  reset() {
    this.y = 50;
    this.x = 50;
    this.direction = { x: 0.1, y: 0.5 };

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const angle = getRandomNumber(0, 2 * Math.PI);
      this.direction = { x: Math.cos(angle), y: Math.sin(angle) };
    }
    this.velocity = INITIAL_VELOCITY;
    console.log(this.rect());
  }
  update(delta, paddlesElemRect) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += ACCELERATION * delta;
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    // [0] -> userPaddle
    // [1] -> computerPaddle

    if (
      userCollision(paddlesElemRect[0], rect) ||
      compCollision(paddlesElemRect[1], rect)
    ) {
      this.direction.x *= -1;
    }
  }
}

function userCollision(paddleElem, rect) {
  return (
    paddleElem.right >= rect.left &&
    paddleElem.left <= rect.left &&
    paddleElem.top <= rect.bottom &&
    paddleElem.bottom >= rect.top
  );
}
function compCollision(paddleElem, rect) {
  return (
    paddleElem.left <= rect.right &&
    paddleElem.right >= rect.right &&
    paddleElem.top <= rect.bottom &&
    paddleElem.bottom >= rect.top
  );
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
