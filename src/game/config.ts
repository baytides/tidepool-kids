import { Types } from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MapScene } from './scenes/MapScene';

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  backgroundColor: '#87CEEB',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%',
  },
  scene: [BootScene, MapScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
