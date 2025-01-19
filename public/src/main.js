import './style.css';
import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    // Load actual play button image
    this.load.image('playButton', 'play_button.png'); // Replace with the correct path to your asset
  }

  create() {
    // Title text
    this.add.text(150, 150, 'SpellScript', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: '"Inter", sans-serif',
    });

    // Add play button
    const playButton = this.add.image(256, 300, 'playButton').setInteractive();
    playButton.setScale(0.5); // Scale the button if needed

    // Start the GameScene on button click
    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    // Load actual assets for the game
    this.load.image('tileset', 'grass_tile.png'); // Replace with the correct path to your tileset
    this.load.image('player', 'player_square.png'); // Replace with the correct path to your player asset
  }

  create() {
    // Generate a tiled background
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        this.add.image(x * 32, y * 32, 'tileset').setOrigin(0);
      }
    }

    // Add a player character
    this.player = this.physics.add.sprite(250, 250, 'player');
    this.player.setCollideWorldBounds(true);

    // Create keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 200;

    // Reset velocity
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  backgroundColor: '#1e1e2f',
  parent: 'game-container',
  scene: [TitleScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
