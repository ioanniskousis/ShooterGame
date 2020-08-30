import Phaser from '../phaser';
import Entity from './entity';
import AlienLaser from './alienLaser';

export default class AlienShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'alienShip', 'AlienShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback() {
        const laser = new AlienLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.alienLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.play('alienShip');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  };
}