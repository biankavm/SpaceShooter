export class Audio {
  constructor() {
    this.startGameMusic = null;
    this.gameOverMusic = null;
  }

  getStartGameMusic() {
    if (!this.startGameMusic) {
      this.startGameMusic = document.getElementById('battle-in-stars');
    }
    return this.startGameMusic;
  }

  getGameOverMusic() {
    if (!this.gameOverMusic) {
      this.gameOverMusic = document.getElementById('defeat');
    }
    return this.gameOverMusic;
  }

  resetStartGameMusic() {
    const music = this.getStartGameMusic();
    if (music) {
      music.currentTime = 0;
    }
  }

  resetGameOverMusic() {
    const music = this.getGameOverMusic();
    if (music) {
      music.currentTime = 0;
    }
  }

  playStartGameMusic() {
    const music = this.getStartGameMusic();
    if (music) {
      music.play().catch((error) => {
        console.error('Erro ao tocar música:', error);
      });
    } else {
      console.error('Elemento de música não encontrado');
    }
  }

  stopStartGameMusic() {
    const music = this.getStartGameMusic();
    if (music) {
      music.pause();
    }
  }

  playGameOverMusic() {
    const music = this.getGameOverMusic();
    if (music) {
      music.play().catch((error) => {
        console.error('Erro ao tocar música de defeat:', error);
      });
    } else {
      console.error('Elemento de música não encontrado');
    }
  }

  stopGameOverMusic() {
    const music = this.getGameOverMusic();
    if (music) {
      music.pause();
    }
  }
}

export const audio = new Audio();
