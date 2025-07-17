import { TAMX, WIDTH_ENEMY } from '../config.js';
import { space } from '../space.js';

export class CommonRules {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.className = 'enemy';
    this.element.src = src;
    this.element.style.top = '-40px';
    this.element.style.left = `${parseInt(
      Math.random() * (TAMX - WIDTH_ENEMY) // -WIDTH_ENEMY para nao ultrapassar a borda
    )}px`;
    space.element.appendChild(this.element);
    this._speed = 0;
    this.destroyed = false;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }

  move() {
    const y = parseInt(this.element.style.top, 10);
    this.element.style.top = `${y + this.speed}px`;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.element.remove();
  }
}
