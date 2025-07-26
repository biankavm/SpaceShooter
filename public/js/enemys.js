import { PROB_ENEMY_SHIP, TAMX, WIDTH_ENEMY } from './config.js';
import { Ship, UFO, MeteorBig, MeteorSmall } from './enemys/enemyTypes.js';

const enemysMap = {
  1: Ship,
  2: UFO,
  3: MeteorBig,
  4: MeteorSmall,
};

export class Enemys {
  constructor() {
    this.enemysList = [];
    this.isMove = false;

    this.globalMultiplier = 1;
    this.speedIncreasePercent = 0.05;

    setInterval(() => {
      this.globalMultiplier *= 1 + this.speedIncreasePercent;
    }, 60_000);

    window.addEventListener('resize', () => {
      this.adjustEnemiesOnResize();
    });
  }

  adjustEnemiesOnResize() {
    this.enemysList.forEach((enemy) => {
      const currentLeft = parseInt(enemy.element.style.left);

      if (currentLeft < 0) enemy.element.style.left = '0px';
      else if (currentLeft > TAMX - WIDTH_ENEMY)
        enemy.element.style.left = `${TAMX - WIDTH_ENEMY}px`;
    });
  }

  #generateEnemy = () => {
    const randomPosition = Math.floor(Math.random() * 4) + 1;
    const EnemyClass = enemysMap[randomPosition];
    const enemy = new EnemyClass();

    enemy.speed *= this.globalMultiplier;

    this.enemysList.push(enemy);
  };

  createRandomEnemy = () => {
    if (this.isMove && Math.random() <= PROB_ENEMY_SHIP) this.#generateEnemy();
  };

  moveEnemy = () => {
    if (!this.isMove) return;
    this.enemysList.forEach((e) => e.move());
  };

  destroyEnemy = (enemy) =>
    (this.enemysList = this.enemysList.filter((e) => e !== enemy));
}

export const enemys = new Enemys();
