import { TAMX } from './config.js';
import { space } from './space.js';
import { Laser } from './laser.js';
import { enemys } from './enemys.js';
import { stats } from './stats.js';
import { identifyCollision } from '../utils/identifyColision.js';

const directions = [
  'assets/png/playerLeft.png',
  'assets/png/player.png',
  'assets/png/playerRight.png',
];

const HALF_PLAYER_WIDTH = 50; // metade da largura do player, necessário para calcular a posição central

class Player {
  constructor() {
    this.element = document.createElement('img');
    this.element.id = 'player';
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.element.style.bottom = '20px';
    this.rightLimit = TAMX - 100;
    this.element.style.left = `${TAMX / 2 - HALF_PLAYER_WIDTH}px`;
    space.element.appendChild(this.element);
    this.isMove = false;
    this.lasers = [];
    this.isDamaged = false;
  }
  changeDirection(giro) {
    // -1 +1
    if (!this.isMove) return;

    const newDirection = this.direction + giro;
    if (newDirection >= 0 && newDirection <= 2) {
      if (!this.isDamaged) {
        this.direction = newDirection;

        this.element.src = directions[this.direction];
      }
    }
  }
  move() {
    if (!this.isMove) return;
    // style.left indica a posição horizontal do jogador.
    // decrementar move para a esquerda; incrementar, para a direita

    // se o left é 0 no canto ou TAMX no outro, impedir o movimento
    if (this.direction === 0 && parseInt(this.element.style.left) !== 0)
      this.element.style.left = `${parseInt(this.element.style.left) - 3}px`;
    if (
      this.direction === 2 &&
      parseInt(this.element.style.left) !== this.rightLimit
    )
      this.element.style.left = `${parseInt(this.element.style.left) + 3}px`;

    this.lasers = this.lasers.filter(laser => {
      laser.move();
      return !laser._destroyed;
    });
  }

  shoot() {
    if (this.isDamaged) return;

    const playerPosition = this.element.getBoundingClientRect();
    const containerPosition = space.element.getBoundingClientRect();

    // centro horizontal do player menos metade do laser
    const startX =
      playerPosition.left -
      containerPosition.left +
      playerPosition.width / 2 -
      Laser.WIDTH / 2;

    // topo do player, menos a altura do laser para sair por baixo
    const startY = playerPosition.top - containerPosition.top - Laser.HEIGHT;

    const laser = new Laser(startX, startY);
    this.lasers.push(laser);
  }

  colision() {
    if (this.isDamaged) return;
    const playerPosition = this.element.getBoundingClientRect();

    enemys.enemysList.forEach(enemy => {
      const hit = identifyCollision(enemy, playerPosition);

      if (hit) {
        this.isMove = false;
        this.isDamaged = true;
        this.element.src = 'assets/png/playerDamaged.png';
        stats.removeLife();
        setTimeout(() => {
          this.isMove = true;
          this.element.src = directions[this.direction];
          this.isDamaged = false;
        }, 5000);
      }
    });
  }
}

export const player = new Player();
