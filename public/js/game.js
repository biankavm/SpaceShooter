import { FPS } from './config.js';
import { space } from './space.js';
import { player } from './player.js';
import { enemys } from './enemys.js';
import { TAMY } from './config.js';
import { stats } from './stats.js';

class Game {
  constructor() {
    this.isRunning = false;
  }

  #changeGameState() {
    this.isRunning = !this.isRunning;
    space.isMove = this.isRunning;
    player.isMove = this.isRunning;
    enemys.isMove = this.isRunning;
  }

  startGame() {
    window.addEventListener('keyup', (e) => {
      if (e.key === ' ' && !this.isRunning) {
        this.#changeGameState();
      }
    });
  }

  stop() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'p') {
        this.#changeGameState();
      }
    });
  }

  gameOver() {
    // evita chamar várias vezes
    if (document.getElementById('gameOverScreen')) return;

    saveScore(stats.pontuation);
    this.isRunning = false;
    space.isMove = false;
    player.isMove = false;
    enemys.isMove = false;

    const overlay = document.createElement('div');
    overlay.id = 'gameOverScreen';

    const msg = document.createElement('h1');
    msg.textContent = 'GAME OVER';
    msg.classList.add('game-over-message');

    const btn = document.createElement('button');
    btn.textContent = 'JOGAR NOVAMENTE';
    btn.classList.add('restart-button');
    btn.addEventListener('click', () => {
      window.location.reload();
    });

    overlay.appendChild(msg);
    overlay.appendChild(btn);
    const spaceEl = document.getElementById('space');
    spaceEl.appendChild(overlay);
  }

  movePlayer() {
    // evento quando tecla é pressionada
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        player.changeDirection(-1);
      }
      if (e.key === 'ArrowRight') {
        player.changeDirection(1);
      }
    });

    // evento quando tecla é solta
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.changeDirection(0); // nave reta
      }
    });
  }

  shootPlayer() {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' && this.isRunning) {
        player.shoot();
      }
    });
  }

  destroyEnemyWhenOutOfScreen() {
    setInterval(() => {
      enemys.enemysList = enemys.enemysList.filter((e) => {
        if (e.element.offsetTop >= TAMY) {
          // se o inimigo saiu da tela, destrói ele completamente
          e.destroy();
          return false; // remove da lista
        }
        return true; // mantém na lista
      });
    }, 1000);
  }

  init() {
    this.startGame();
    this.movePlayer();
    this.shootPlayer();
    this.destroyEnemyWhenOutOfScreen();
    this.stop();
    setInterval(() => this.run(), 1000 / FPS);
  }

  run() {
    if (stats.numberLifes <= 0) {
      this.gameOver();
      return;
    }

    if (!this.isRunning) return;

    space.move();
    player.move();
    player.colision();
    enemys.createRandomEnemy();
    enemys.moveEnemy();
  }
}

const game = new Game();
game.init();
