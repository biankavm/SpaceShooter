import { TAMX } from './config.js';
import { space } from './space.js';
import { Laser } from './laser.js';
import { enemys } from './enemys.js';
import { stats } from './stats.js';
import { identifyCollision } from '../utils/identifyColision.js';

const directions = [
  'assets/png/playerLeft.png',
  'assets/png/player.png',
  'assets/png/playerRight.png'
];

class Player {
  constructor() {
    this.element = document.createElement('img');
    this.element.id = 'player';
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.element.style.bottom = '20px';

    // Adicionar o elemento ao DOM primeiro para poder medir sua largura
    space.element.appendChild(this.element);

    // Agora podemos obter a largura real do player
    const playerWidth = this.element.offsetWidth;
    this.rightLimit = TAMX - playerWidth;

    // Centralizar o player usando a largura real
    this.element.style.left = `${TAMX / 2 - playerWidth / 2}px`;

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

    // obtem a largura real do player
    const playerWidth = this.element.offsetWidth;

    // atualiza o limite direito baseado na largura atual da tela e largura real do player
    this.rightLimit = TAMX - playerWidth;

    // obtem a posição atual do player
    const currentLeft = parseInt(this.element.style.left);

    // move para a esquerda (direction === 0)
    if (this.direction === 0) {
      const newLeft = currentLeft - 3;
      // verifica se não vai sair da tela pela esquerda
      if (newLeft >= 0) {
        this.element.style.left = `${newLeft}px`;
      }
    }

    // move para a direita (direction === 2)
    if (this.direction === 2) {
      const newLeft = currentLeft + 3;
      // verifica se não vai sair da tela pela direita
      if (newLeft <= this.rightLimit) {
        this.element.style.left = `${newLeft}px`;
      }
    }

    this.lasers = this.lasers.filter((laser) => {
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

    enemys.enemysList.forEach((enemy) => {
      const hit = identifyCollision(enemy, playerPosition);

      if (hit) {
        this.isMove = false;
        this.isDamaged = true;
        // se tomou dano, destruir todos os lasers disparados (e remover do DOM)
        this.lasers.forEach((laser) => {
          laser._destroyed = true;
          laser.element.remove();
        });

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
