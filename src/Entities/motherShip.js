import Phaser from '../phaser';
import Entity from './entity';

export default class MotherShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'motherShip', 'MotherShip');
    this.destroyPoints = 300;
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}