export function identifyCollision(enemy, position) {
  const enemyPosition = enemy.element.getBoundingClientRect();

  const hit =
    position.left < enemyPosition.right &&
    position.right > enemyPosition.left &&
    position.top < enemyPosition.bottom &&
    position.bottom > enemyPosition.top;

  return hit;
}
