import Entity from './entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laserPlayer');
    this.body.velocity.y = -1000;
  }
}
