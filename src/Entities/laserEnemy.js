import Entity from './entity';

export default class LaserEnemy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laserEnemy');
    this.destroyPoints = 400;
    this.body.velocity.y = 200;
  }
}
