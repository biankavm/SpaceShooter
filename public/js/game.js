import { FPS } from './config.js';
import { space } from './space.js';
import { player } from './player.js';
import { enemys } from './enemys.js';
import { TAMY } from './config.js';
import { stats } from './stats.js';
import { audio } from './audio.js';

class Game {
  constructor() {
    this.isRunning = false;
  }

  #changeGameState() {
    this.isRunning = !this.isRunning;
    space.isMove = this.isRunning;
    player.isMove = this.isRunning;
    enemys.isMove = this.isRunning;

    const gameStartMusic = audio.getStartGameMusic();

    if (gameStartMusic) {
      if (this.isRunning) audio.playStartGameMusic();
      else audio.stopStartGameMusic();
    }
  }

  startGame() {
    window.addEventListener('keyup', (e) => {
      if (e.key === ' ' && !this.isRunning) this.#changeGameState();
    });
  }

  createOverlay(title, btnText, callback) {
    const overlay = document.createElement('div');
    overlay.id = 'gameOverScreen';

    const msg = document.createElement('h1');
    msg.textContent = title;
    msg.classList.add('game-over-message');

    const button = document.createElement('button');
    button.textContent = btnText;
    button.classList.add('restart-button');
    button.addEventListener('click', callback);

    overlay.appendChild(msg);
    overlay.appendChild(button);
    const spaceEl = document.getElementById('space');
    spaceEl.appendChild(overlay);
  }

  stop() {
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'p' && this.isRunning) {
        // hora de pausar o jogo
        this.#changeGameState();

        // criar o overlay
        this.createOverlay('JOGO PAUSADO', 'VOLTAR', () => {
          // clicou em voltar ? então precisamos remover o overlay
          const overlay = document.getElementById('gameOverScreen');
          if (overlay) overlay.remove();

          // aqui voltamos ao jogo
          this.#changeGameState();
        });
      } else if (e.key.toLowerCase() === 'p' && !this.isRunning) {
        const overlay = document.getElementById('gameOverScreen');
        if (overlay) overlay.remove();
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

    // pausa a música ao dar game over
    const gameStartMusic = audio.getStartGameMusic();
    if (gameStartMusic) {
      audio.stopStartGameMusic();
      audio.resetStartGameMusic();
      const gameOverMusic = audio.getGameOverMusic();
      if (gameOverMusic) audio.playGameOverMusic();
    }

    this.createOverlay('FIM DE JOGO', 'JOGAR NOVAMENTE', () => {
      window.location.reload();
    });
  }

  movePlayer() {
    const keysPressed = {
      left: false,
      right: false,
    };

    // tecla é pressionada
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && !keysPressed.left) {
        keysPressed.left = true;
        this.updatePlayerDirection(keysPressed);
      }
      if (e.key === 'ArrowRight' && !keysPressed.right) {
        keysPressed.right = true;
        this.updatePlayerDirection(keysPressed);
      }
    });

    // tecla é solta
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        keysPressed.left = false;
        this.updatePlayerDirection(keysPressed);
      }
      if (e.key === 'ArrowRight') {
        keysPressed.right = false;
        this.updatePlayerDirection(keysPressed);
      }
    });
  }

  updatePlayerDirection(keysPressed) {
    if (keysPressed.left && !keysPressed.right) player.changeDirection(-1);
    else if (keysPressed.right && !keysPressed.left) player.changeDirection(1);
    else player.changeDirection(0); // nave reta
  }

  shootPlayer() {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' && this.isRunning) player.shoot();
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
