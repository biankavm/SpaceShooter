import { CommonRules } from './commonRules.js';

const generateRandomSpeed = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const speeds = {
  ship: generateRandomSpeed(1, 3),
  ufo: generateRandomSpeed(1, 3),
  meteorBig: generateRandomSpeed(1, 3),
  meteorSmall: generateRandomSpeed(1, 3),
};

export class Ship extends CommonRules {
  constructor() {
    super('assets/png/enemyShip.png');
    this.speed = speeds.ship;
  }
}

export class UFO extends CommonRules {
  constructor() {
    super('assets/png/enemyUFO.png');
    this.speed = speeds.ufo;
  }
}

export class MeteorBig extends CommonRules {
  constructor() {
    super('assets/png/meteorBig.png');
    this.speed = speeds.meteorBig;
  }
}

export class MeteorSmall extends CommonRules {
  constructor() {
    super('assets/png/meteorSmall.png');
    this.speed = speeds.meteorSmall;
  }
}

export const enemysMap = {
  ship: Ship,
  ufo: UFO,
  meteorBig: MeteorBig,
  meteorSmall: MeteorSmall,
};
