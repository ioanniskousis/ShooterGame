import Phaser from '../phaser';
import PlayerShip from '../Entities/player';
import AlienShip from '../Entities/alienShip';
import SkyLayer from '../Entities/skyLayer';
import DogShip from '../Entities/dogShip';
import MotherShip from '../Entities/motherShip';
import { renderScore, addPoints, renderPower } from './score';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
    this.alienShipDelay = 2000;
    this.dogShipDelay = 7000;
    this.motherShipDelay = 5000;
  }

  preload() {
    this.load.image('sky1', '../src/resources/images/sky1.png');
    this.load.image('sky2', '../src/resources/images/sky2.png');

    this.load.spritesheet('explosion', '../src/resources/images/ui/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('laserEnemy', '../src/resources/images/ui/laserEnemy.png');
    this.load.image('laserPlayer', '../src/resources/images/ui/laserPlayer.png');

    this.load.audio('explosionAlien', '../src/resources/audio/explosionAlien.wav');

    this.load.audio('laser', '../src/resources/audio/laser.wav');

    this.load.spritesheet('playerShip', '../src/resources/images/ui/playerShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  prepareAnimations() {
    this.anims.create({
      key: 'alienShip',
      frames: this.anims.generateFrameNumbers('alienShip'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });
  }

  renderPlayer() {
    this.player = new PlayerShip(
      this,
      480 * 0.5,
      640 * 0.9,
      'playerShip',
    );
  }

  prepareSoundFX() {
    this.sfx = {
      explosionAlien: this.sound.add('explosionAlien'),
      laser: this.sound.add('laser'),
    };
  }

  prepareBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'sky1', i * 10);
      this.backgrounds.push(bg);
    }
  }

  prepareKeyboard() {
    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  prepareGroups() {
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
  }

  addTimers() {
    this.time.addEvent({
      delay: this.alienShipDelay,
      callback: () => {
        const enemy = new AlienShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.dogShipDelay,
      callback: () => {
        const enemy = new DogShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.motherShipDelay,
      callback: () => {
        const enemy = new MotherShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
  }

  addCollisions() {
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();

        addPoints(enemy.destroyPoints);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        if (window.game.power <= 0) {
          player.explode(false);
          player.onDestroy();
        }
        enemy.explode(true);
        window.game.power -= 20;
        renderPower();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        if (window.game.power <= 0) {
          player.explode(false);
          player.onDestroy();
        }
        laser.destroy();
        window.game.power -= 10;
        renderPower();
      }
    });

    this.physics.add.overlap(this.playerLasers, this.enemyLasers, (playerLasers, laser) => {
      playerLasers.explode(false);
      laser.destroy();
      addPoints(laser.destroyPoints);
    });
  }

  create() {
    window.game.points = 0;
    window.game.power = 100;

    this.prepareAnimations();
    this.renderPlayer();
    this.prepareKeyboard();
    this.prepareSoundFX();
    this.prepareBackground();

    this.prepareGroups();

    this.addTimers();

    this.addCollisions();

    renderScore();
    renderPower();
  }

  updatePlayer() {
    if (this.player) {
      if (!this.player.getData('isDead')) {
        this.player.update();

        if (this.keyUP.isDown) {
          this.player.moveUp();
        } else if (this.keyDOWN.isDown) {
          this.player.moveDown();
        }

        if (this.keyLEFT.isDown) {
          this.player.moveLeft();
        } else if (this.keyRIGHT.isDown) {
          this.player.moveRight();
        }

        if (this.keySpace.isDown) {
          this.player.setData('isShooting', true);
        } else {
          this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
          this.player.setData('isShooting', false);
        }
      }
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
  }

  updateEnemiesLasers() {
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  updatePlayerLasers() {
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  updateBackground() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
    this.updateEnemiesLasers();
    this.updatePlayerLasers();
    this.updateBackground();
  }
}
