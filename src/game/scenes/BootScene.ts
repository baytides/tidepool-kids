import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class BootScene extends Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Display loading progress
    const { width, height } = this.scale;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x26c6da, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    // Load map background
    this.load.svg('bay-area-map', '/assets/game/bay-area-map.svg', { width: 800, height: 800 });

    // Load node states
    this.load.svg('node-locked', '/assets/game/node-locked.svg', { width: 64, height: 64 });
    this.load.svg('node-available', '/assets/game/node-available.svg', { width: 64, height: 64 });
    this.load.svg('node-complete', '/assets/game/node-complete.svg', { width: 64, height: 64 });
    this.load.svg('node-progress', '/assets/game/node-progress.svg', { width: 64, height: 64 });

    // Load character
    this.load.svg('coral', '/assets/game/coral.svg', { width: 64, height: 64 });

    // Load path element
    this.load.svg('path-dot', '/assets/game/path-dot.svg', { width: 16, height: 16 });
  }

  create() {
    EventBus.emit('boot-complete');
    this.scene.start('MapScene');
  }
}
