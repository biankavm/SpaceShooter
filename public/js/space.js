import { TAMX, TAMY } from './config.js';

class Space {
  constructor() {
    this.element = document.getElementById('space');
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPositionY = '0px';
    this.isMove = false;

    window.addEventListener('resize', () => {
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
    });
  }

  move() {
    if (this.isMove)
      this.element.style.backgroundPositionY = `${
        parseInt(this.element.style.backgroundPositionY) + 1
      }px`; // parseInt tira o px, acrescentamos 1, e no final colocamos o px novamente
  }
}

export const space = new Space();
