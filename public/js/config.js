export const FPS = 100;
export let TAMX = window.innerWidth;
export let TAMY = window.innerHeight;

export const WIDTH_ENEMY = 100;
export const PROB_ENEMY_SHIP = 0.009; // 0.7% de chance de criar um inimigo a cada frame

export function updateScreenDimensions() {
  TAMX = window.innerWidth;
  TAMY = window.innerHeight;
}

window.addEventListener('resize', updateScreenDimensions);
