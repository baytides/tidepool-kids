import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class BootScene extends Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x26c6da, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    // Placeholder assets - will be replaced in Phase 2
    this.load.image('bay-area-map', '/assets/game/bay-area-map.png');
    this.load.image('node-locked', '/assets/game/node-locked.png');
    this.load.image('node-available', '/assets/game/node-available.png');
    this.load.image('node-complete', '/assets/game/node-complete.png');
    this.load.image('coral-character', '/assets/game/coral.png');
  }

  create() {
    EventBus.emit('boot-complete');
    this.scene.start('MapScene');
  }
}
