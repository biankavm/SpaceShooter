import { TAMX } from './config.js';
import { space } from './space.js';
import { Laser } from './laser.js';
import { enemys } from './enemys.js';
import { stats } from './stats.js';
import { identifyCollision } from '../utils/identifyColision.js';
import { audio } from './audio.js';

const directions = [
  'assets/png/playerLeft.png',
  'assets/png/player.png',
  'assets/png/playerRight.png',
];

class Player {
  constructor() {
    this.element = document.createElement('img');
    this.element.id = 'player';
    this.direction = 1;
    this.element.src = directions[this.direction];
    this.element.style.bottom = '20px';

    space.element.appendChild(this.element);

    const playerWidth = this.element.offsetWidth;
    this.rightLimit = TAMX - playerWidth;

    this.element.style.left = `${TAMX / 2 - playerWidth / 2}px`;

    this.isMove = false;
    this.lasers = [];
    this.isDamaged = false;
    this.shootMusic = audio.getShootMusic();
    this.keys = {
      left: false,
      right: false,
    };

    // Ajusta a posição do jogador quando a tela for redimensionada
    window.addEventListener('resize', () => {
      this.adjustPositionOnResize();
    });
  }

  adjustPositionOnResize() {
    const playerWidth = this.element.offsetWidth;
    this.rightLimit = TAMX - playerWidth;

    const currentLeft = parseInt(this.element.style.left);

    // Se o jogador estiver fora dos limites após o redimensionamento, reposiciona
    if (currentLeft < 0) {
      this.element.style.left = '0px';
    } else if (currentLeft > this.rightLimit) {
      this.element.style.left = `${this.rightLimit}px`;
    }
  }

  changeDirection(giro) {
    if (!this.isMove) return;

    if (giro === -1) {
      this.keys.left = true;
      this.keys.right = false;
    } else if (giro === 1) {
      this.keys.left = false;
      this.keys.right = true;
    } else {
      this.keys.left = false;
      this.keys.right = false;
    }

    if (!this.isDamaged) {
      if (this.keys.left) {
        this.direction = 0;
      } else if (this.keys.right) {
        this.direction = 2;
      } else {
        this.direction = 1;
      }
      this.element.src = directions[this.direction];
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

    // move para a esquerda (tecla esquerda pressionada)
    if (this.keys.left) {
      const newLeft = currentLeft - 3;
      // verifica se não vai sair da tela pela esquerda
      if (newLeft >= 0) {
        this.element.style.left = `${newLeft}px`;
      }
    }

    // move para a direita (tecla direita pressionada)
    if (this.keys.right) {
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

    if (this.shootMusic) {
      audio.playShootMusic();
    }
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
