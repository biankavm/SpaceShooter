// src/laser.js
import { space } from './space.js';
import { enemys } from './enemys.js';
import { stats } from './stats.js';
import { enemysMap } from './enemys/enemyTypes.js';
import { identifyCollision } from '../utils/identifyColision.js';

export class Laser {
  static WIDTH = 6;
  static HEIGHT = 20;
  static SPEED = 5;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this._destroyed = false;

    this.element = document.createElement('img');
    this.element.src = 'assets/png/laserRed.png';

    Object.assign(this.element.style, {
      position: 'absolute',
      width: `${Laser.WIDTH}px`,
      height: `${Laser.HEIGHT}px`,
      left: `${this.x}px`,
      top: `${this.y}px`,
      zIndex: 1000,
    });

    space.element.appendChild(this.element);
  }

  #choosePontuation(enemy) {
    if (enemy instanceof enemysMap.ship) return 50;
    if (enemy instanceof enemysMap.ufo) return 20;
    if (enemy instanceof enemysMap.meteorBig) return 10;
    if (enemy instanceof enemysMap.meteorSmall) return 100;
  }

  move() {
    if (this._destroyed) return;

    this.y -= Laser.SPEED;

    if (this.y + Laser.HEIGHT < 0) {
      this.destroy();
      return;
    }

    this.element.style.top = `${this.y}px`;

    const laserPosition = this.element.getBoundingClientRect();

    enemys.enemysList.forEach(enemy => {
      const hit = identifyCollision(enemy, laserPosition);

      if (hit) {
        const pontuation = this.#choosePontuation(enemy);
        stats.addPontuation(pontuation);
        this.destroy();
        enemy.destroy();
        enemys.destroyEnemy(enemy);
        return;
      }
    });
  }

  destroy() {
    this._destroyed = true;
    this.element.remove();
  }
}
