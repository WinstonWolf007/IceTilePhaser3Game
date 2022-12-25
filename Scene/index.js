class Main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    preload() {
        this.load.spritesheet('player', 'Assets/image/Player.png', {frameWidth: 120, frameHeight: 240});
        this.load.image("tiles", "./Assets/tile/object.png");
        this.load.tilemapTiledJSON("map", "./Assets/tile/map.json");

        this.load.audio("snowSound", "./Assets/music/ice-storm-49013.mp3");
        this.load.audio("fireSound", "./Assets/music/aachen_burning-fireplace-crackling-fire-soundswav-14561.mp3");
        this.load.audio("walkSnowSound", "./Assets/music/walking-in-crunchy-snow-63349.mp3");
    }

    create() {
        // sound
        this.backgroundMusic = this.sound.add("snowSound");
        this.backgroundMusic.play({loop: true});

        // tile map
        this.map = this.make.tilemap({ key: "map" });
        const tileset = this.map.addTilesetImage("object", "tiles");

        this.map.createLayer('ground', tileset)
        this.border = this.map.createLayer('border', tileset)
        this.obj = this.map.createLayer('obj', tileset)

        this.player = this.physics.add.sprite(500, 500, "player", 0);

        this.k_left = this.input.keyboard.addKey("LEFT");
        this.k_right = this.input.keyboard.addKey("RIGHT");
        this.k_up = this.input.keyboard.addKey("UP");
        this.k_down = this.input.keyboard.addKey("DOWN");

        this.playerPos = [500, 500];
        this.velocity = 5;

        this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'WalkUp',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.isDown = true;
        this.after = false;

        this.obj.setCollisionByExclusion([-1]);

        this.physics.add.existing(this.player);

        this.physics.add.collider(this.player, this.obj)
    }

    update() {
        if (this.isDown && this.isDown != this.after) {
            this.player.anims.stop();
            this.player.anims.play("walkDown");
            this.after = this.isDown;
        }
        else if (!this.isDown && this.isDown != this.after) {
            this.player.anims.stop();
            this.player.anims.play("WalkUp");
            this.after = this.isDown;
        }

        // check collide player -> tiles
        let tile = this.map.getTileAtWorldXY(this.player.x, this.player.y);
        let collide;
        if (tile) {
            collide = tile.properties.collide;
        }
        

        if (true) {

            // move player
            if (this.k_left.isDown) {
                this.player.flipX = true;
                this.playerPos[0] -= this.velocity;
            }
            else if (this.k_right.isDown) {
                this.player.flipX = false;
                this.playerPos[0] += this.velocity;
            }
            else if (this.k_up.isDown) {
                this.isDown = false;
                this.playerPos[1] -= this.velocity;
            }
            else if (this.k_down.isDown) {
                this.isDown = true;
                this.playerPos[1] += this.velocity;
            }
        }

        this.player.x = this.playerPos[0];
        this.player.y = this.playerPos[1];
    }
}