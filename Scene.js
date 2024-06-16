/**
 * 定義一個 scene，用成員變數儲存 scene 上面的物件
 * override preload, create, update 函式
 */
class Scene extends Phaser.Scene {
    /*********************************************************************************************************************** */
    constructor() {
      super();
      this.player = null;
      this.cursors = null;
      this.platform1 = null;
      this.platform2 = null;
      this.platform3 = null;
      this.tileSprite = null;
      this.finish = true;
      this.interduct = false;
      this.score = 0;
      this.speed = -80;
    }
    preload() {
      this.load.image("bg", "assets/sky3.jpg");
      this.load.image("left_wall", "assets/wall_LR.png");
      this.load.image("right_wall", "assets/wall_LR.png");
      this.load.image("under_wall", "assets/wall_UD.png");
      this.load.image("above_wall", "assets/wall_UD.png");
      this.load.spritesheet("kid", "assets/bDinoSprites.png", {
        frameWidth: 24,
        frameHeight: 20
      });
      this.load.image("platform","assets/cloud3.jpg",{
      });
      
    }
    create() {
      this.tileSprite = this.add.tileSprite(0, 0, 1600, 1200, "bg");
      this.boundarys = this.physics.add.staticGroup();
      this.boundarys.create(-10, 300, "left_wall");
      this.boundarys.create(810, 300, "right_wall");
      this.boundarys.create(350, 20, "above_wall");
      this.boundarys.create(350, 615, "under_wall");
      this.detecline = this.physics.add.group({
        key: "above_wall",
        setXY: { x: 350, y:20  }
      });
      this.player = new Player(this, 60, 350);
      this.player.setScale(2);
      this.platform1 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 110, y: 580, stepY:530}
      });
      this.platform2 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 200, y:100, stepY: 750 }
      });
      this.platform3 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 300, y:0, stepY:530 }
      });
      this.platform4 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 400, y:400, stepY:330 }
      });
      this.platform5 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 500, y: 580, stepY:460}
      });
      this.platform6 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 600, y:100, stepY:230 }
      });
      this.platform7 = this.physics.add.group({
        key: "platform",
        repeat: 50,
        setXY: { x: 710, y:100, stepY:680 }
      });
      
      this.physics.add.collider(this.player, this.platform1);
      this.physics.add.collider(this.player, this.platform2);
      this.physics.add.collider(this.player, this.platform3);
      this.physics.add.collider(this.player, this.platform4);
      this.physics.add.collider(this.player, this.platform5);
      this.physics.add.collider(this.player, this.platform6);
      this.physics.add.collider(this.player, this.platform7);
      
      this.physics.add.collider(
        this.platform1,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform2,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform3,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform4,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform5,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform6,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      this.physics.add.collider(
        this.platform7,
        this.detecline,
        this.platform_touch_detecline,
        null,
        this
      );
      //動畫
      this.cursors = this.input.keyboard.createCursorKeys();
      this.anims.create({
        key: "run",
        frames: [
          { key: "kid", frame: 0 },
          { key: "kid", frame: 1 },
          { key: "kid", frame: 2 },
          { key: "kid", frame: 3 },
          { key: "kid", frame: 4 },
          { key: "kid", frame: 5 },
          { key: "kid", frame: 7 },
          { key: "kid", frame: 8 },
          { key: "kid", frame: 9 },
          { key: "kid", frame: 10 },
          { key: "kid", frame: 11 },
          { key: "kid", frame: 12 },
          { key: "kid", frame: 11 },
          { key: "kid", frame: 12 }
        ]
      });
      this.anims.create({
        key: "idle",
        frames: [{ key: "kid", frame: 6 }]
      });
      //
      

      this.scoreText = this.add.text(10, 10, "score: 0", {
        fontSize: "30px",
        color: "#ffffff"
      });
      this.gameneame = this.add.text(590, 5, "NS-SHAFT", {
        fontSize: "40px",
        color: "#000079"
      });
  
      this.time.addEvent({
        delay: 1000,
        callback: this.updateCounter,
        callbackScope: this,
        loop: true
      });
      this.physics.add.collider(
        this.player,
        this.boundarys,
        this.Player_touch_wall,
        null,
        this
      );
      if(this.interduct == false){
        this.player.disableBody(true,true);
        this.finish == true;
        this.add.text(140, 220, "press left and right to control the character\nLOSE if your chacter touch the wall\nyou will pass when the score get 42\npress the button below to star!", {
          fontSize: "20px",
          color: "yellow",
        });  
        this.clickButton = this.add
        .text(300, 400, " Start Game ", { fontSize: "25px", color: "white", backgroundColor:"green"})
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
          this.interduct = true;
          this.restart();
        });
      }
    }

  
    Player_touch_wall(player,boundarys) {
      player.disableBody(true,true);
      this.finish = true;
      this.add.text(180, 220, " GameOver! ", {
        fontSize: "64px",
        color: "white",
        backgroundColor:"red"
      });


  
    this.clickButton = this.add
        .text(270, 330, " Restart Game ", { fontSize: "30px", color: "white", backgroundColor:"green"})
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
          this.restart();
        });
    }
    
    platform_touch_detecline(platform,detecline){
      platform.disableBody(true,true);
    }
    restart() {
      this.scene.start();
      this.finish = false;
      this.score = 0;
      this.speed = -60;
    }
  
    /*********************************************************************************************************************** */
    updateCounter() {
      if (!this.finish)
        this.score = this.score + 1;
      if(this.score==42){
        this.player.disableBody(true,true);
        this.finish = true;
        this.add.text(190, 280, "You Pass!", { fontSize: "80px", fill: "white",backgroundColor:"green" });
        setTimeout(()=>{window.close();},3000);
      }
    }

    update() {
      this.tileSprite.tilePositionY += 1;
      this.detecline.setVelocityY(-9.8);
      if(this.speed>this.score*(-8))
        this.speed=this.score*(-8);
      else if(this.score>35)
        this.speed=-280;
      this.platform1.setVelocityY(this.speed);
      this.platform2.setVelocityY(this.speed);
      this.platform3.setVelocityY(this.speed);
      this.platform4.setVelocityY(this.speed);
      this.platform5.setVelocityY(this.speed);
      this.platform6.setVelocityY(this.speed);
      this.platform7.setVelocityY(this.speed);

      this.platform1.setVelocityX(0);
      this.platform2.setVelocityX(0);
      this.platform3.setVelocityX(0);
      this.platform4.setVelocityX(0);
      this.platform5.setVelocityX(0);
      this.platform6.setVelocityX(0);
      this.platform7.setVelocityX(0);


      this.scoreText.setText("Score: "+this.score);
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-250);
        this.player.anims.play('run', true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(250);
        this.player.anims.play('run', true);
        this.player.flipX = false;
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('idle', true);
      }

    }
  }
  