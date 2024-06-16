class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "kid");
      this.scene = scene;
      scene.physics.world.enable(this);
      scene.add.existing(this);
      this.setCollideWorldBounds(true);

    }
  }