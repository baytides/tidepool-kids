import { Scene, GameObjects } from 'phaser';
import { EventBus } from '../EventBus';

interface LocationNode {
  id: string;
  x: number;
  y: number;
  sprite?: GameObjects.Container;
}

export class MapScene extends Scene {
  private nodes: LocationNode[] = [];
  private coral?: GameObjects.Sprite;

  constructor() {
    super('MapScene');
  }

  create() {
    // Placeholder: blue background representing the bay
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x87CEEB);

    // Add placeholder text
    this.add.text(width / 2, height / 2, 'Bay Area Map\n(Loading...)', {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    // Notify React that scene is ready
    EventBus.emit('map-scene-ready');

    // Listen for React events
    EventBus.on('navigate-to-location', this.navigateToLocation, this);
  }

  private navigateToLocation(locationId: string) {
    console.log('Navigate to:', locationId);
    // Will implement in Phase 2
  }

  // Clean up event listeners
  shutdown() {
    EventBus.off('navigate-to-location', this.navigateToLocation, this);
  }
}
