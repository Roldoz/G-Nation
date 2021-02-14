const CANVAS_SIZE = [800, 700];
const SNAKE_START = [
  [5, 7],
  [5, 8]
];
const APPLE_START = [5, 3];
const SCALE = 40;
const SPEED = 210;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};
