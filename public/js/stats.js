// src/stats.js
import { space } from './space.js';

export class PlayerStats {
  constructor() {
    this.numberLifes = 3;
    this.pontuation = 0; // valor interno da pontuação
    this.container = this.createContainer();
    this.mountContainer();
    // guarda referência ao elemento de pontuação já criado
    this.pontuationElement = this.container.querySelector('#pontuation');
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'statsContainer';
    return container;
  }

  mountContainer() {
    this.createLifes(this.numberLifes);
    this.createPontuation();
    space.element.appendChild(this.container);
  }

  createLifes(numberLifes) {
    for (let i = 0; i < numberLifes; i++) {
      const newLife = document.createElement('img');
      newLife.id = 'life';
      newLife.src = 'assets/png/life.png';
      this.container.appendChild(newLife);
    }
  }

  // formata número como string de 6 dígitos com zeros à esquerda
  #formatPontuation(value) {
    return value.toString().padStart(6, '0');
  }

  createPontuation() {
    const p = document.createElement('p');
    p.id = 'pontuation';
    // exibe com 6 dígitos, zeros à esquerda
    p.textContent = this.#formatPontuation(this.pontuation);
    this.container.appendChild(p);
  }

  // incrementa a pontuação e atualiza o display
  addPontuation(points) {
    this.pontuation += points;
    this.pontuationElement.textContent = this.#formatPontuation(
      this.pontuation
    );
  }

  removeLife() {
    if (this.numberLifes === 0) return;
    this.numberLifes--;
    this.container.children[this.numberLifes].remove();
  }
}

export const stats = new PlayerStats();
