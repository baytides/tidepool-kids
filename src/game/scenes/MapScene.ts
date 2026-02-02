// src/game/scenes/MapScene.ts
import { Scene, GameObjects } from 'phaser';
import { EventBus } from '../EventBus';
import { mapNodes, MapNode } from '../mapData';

interface NodeSprite {
  node: MapNode;
  container: GameObjects.Container;
  icon: GameObjects.Text;
  state: 'locked' | 'available' | 'progress' | 'complete';
}

export class MapScene extends Scene {
  private mapBackground!: GameObjects.Image;
  private nodeSprites: Map<string, NodeSprite> = new Map();
  private pathGraphics!: GameObjects.Graphics;
  private coral!: GameObjects.Image;
  private currentNodeId: string = 'fitzgerald-tide-pools'; // Starting location

  // Map dimensions (will be set on create)
  private mapWidth = 800;
  private mapHeight = 800;
  private mapOffsetX = 0;
  private mapOffsetY = 0;

  constructor() {
    super('MapScene');
  }

  create() {
    this.calculateMapDimensions();
    this.createBackground();
    this.createPaths();
    this.createNodes();
    this.createCoral();
    this.setupInteractions();

    // Handle resize
    this.scale.on('resize', this.onResize, this);

    // Notify React
    EventBus.emit('map-scene-ready');

    // Listen for React events
    EventBus.on('navigate-to-location', this.navigateToLocation, this);
    EventBus.on('update-node-state', this.updateNodeState, this);
  }

  private calculateMapDimensions() {
    const { width, height } = this.scale;

    // Fit map to screen while maintaining aspect ratio (1:1 square map)
    const mapAspect = 1;
    const screenAspect = width / height;

    if (screenAspect > mapAspect) {
      // Screen is wider - fit to height
      this.mapHeight = height * 0.95;
      this.mapWidth = this.mapHeight * mapAspect;
    } else {
      // Screen is taller - fit to width
      this.mapWidth = width * 0.95;
      this.mapHeight = this.mapWidth / mapAspect;
    }

    this.mapOffsetX = (width - this.mapWidth) / 2;
    this.mapOffsetY = (height - this.mapHeight) / 2;
  }

  private createBackground() {
    const { width, height } = this.scale;

    // Ocean background
    this.add.rectangle(width / 2, height / 2, width, height, 0x4FC3F7);

    // Map image
    this.mapBackground = this.add.image(
      this.mapOffsetX + this.mapWidth / 2,
      this.mapOffsetY + this.mapHeight / 2,
      'bay-area-map'
    );
    this.mapBackground.setDisplaySize(this.mapWidth, this.mapHeight);
  }

  private createPaths() {
    this.pathGraphics = this.add.graphics();
    this.pathGraphics.lineStyle(4, 0x8D6E63, 0.6);

    // Draw paths between connected nodes
    const drawnPaths = new Set<string>();

    mapNodes.forEach(node => {
      node.connections.forEach(connectedId => {
        // Create unique path ID to avoid drawing twice
        const pathId = [node.id, connectedId].sort().join('-');
        if (drawnPaths.has(pathId)) return;
        drawnPaths.add(pathId);

        const connectedNode = mapNodes.find(n => n.id === connectedId);
        if (!connectedNode) return;

        const startX = this.mapOffsetX + node.canvasX * this.mapWidth;
        const startY = this.mapOffsetY + node.canvasY * this.mapHeight;
        const endX = this.mapOffsetX + connectedNode.canvasX * this.mapWidth;
        const endY = this.mapOffsetY + connectedNode.canvasY * this.mapHeight;

        // Draw dotted line
        this.drawDottedLine(startX, startY, endX, endY);
      });
    });
  }

  private drawDottedLine(x1: number, y1: number, x2: number, y2: number) {
    const distance = Phaser.Math.Distance.Between(x1, y1, x2, y2);
    const dots = Math.floor(distance / 20);

    for (let i = 0; i <= dots; i++) {
      const t = i / dots;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      this.pathGraphics.fillStyle(0x8D6E63, 0.6);
      this.pathGraphics.fillCircle(x, y, 4);
    }
  }

  private createNodes() {
    mapNodes.forEach(node => {
      const x = this.mapOffsetX + node.canvasX * this.mapWidth;
      const y = this.mapOffsetY + node.canvasY * this.mapHeight;

      // Create container for node
      const container = this.add.container(x, y);

      // Background sprite (state-dependent)
      const bg = this.add.image(0, 0, 'node-available');
      bg.setDisplaySize(48, 48);
      bg.setTint(Phaser.Display.Color.HexStringToColor(node.color).color);

      // Icon text
      const icon = this.add.text(0, 0, node.icon, {
        fontSize: '24px',
      }).setOrigin(0.5);

      container.add([bg, icon]);
      container.setSize(48, 48);
      container.setInteractive({ useHandCursor: true });

      // Store reference
      this.nodeSprites.set(node.id, {
        node,
        container,
        icon,
        state: 'available', // Default state, will be updated from store
      });

      // Hover effect
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scale: 1.2,
          duration: 100,
        });
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scale: 1,
          duration: 100,
        });
      });

      // Click handler
      container.on('pointerdown', () => {
        this.onNodeClick(node);
      });
    });
  }

  private createCoral() {
    // Start at current node
    const startNode = mapNodes.find(n => n.id === this.currentNodeId);
    if (!startNode) return;

    const x = this.mapOffsetX + startNode.canvasX * this.mapWidth;
    const y = this.mapOffsetY + startNode.canvasY * this.mapHeight - 40;

    this.coral = this.add.image(x, y, 'coral');
    this.coral.setDisplaySize(40, 40);

    // Idle animation
    this.tweens.add({
      targets: this.coral,
      y: y - 5,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private onNodeClick(node: MapNode) {
    // Move coral to this node
    this.moveCoral(node);

    // Emit event to React
    EventBus.emit('location-selected', node.id);
  }

  private moveCoral(targetNode: MapNode) {
    const targetX = this.mapOffsetX + targetNode.canvasX * this.mapWidth;
    const targetY = this.mapOffsetY + targetNode.canvasY * this.mapHeight - 40;

    this.tweens.add({
      targets: this.coral,
      x: targetX,
      y: targetY,
      duration: 500,
      ease: 'Power2',
    });

    this.currentNodeId = targetNode.id;
  }

  private navigateToLocation(locationId: string) {
    const node = mapNodes.find(n => n.id === locationId);
    if (node) {
      this.moveCoral(node);
    }
  }

  private updateNodeState(locationId: string, state: 'locked' | 'available' | 'progress' | 'complete') {
    const nodeSprite = this.nodeSprites.get(locationId);
    if (!nodeSprite) return;

    nodeSprite.state = state;

    // Update visual based on state
    const bg = nodeSprite.container.list[0] as GameObjects.Image;

    switch (state) {
      case 'locked':
        bg.setTexture('node-locked');
        bg.clearTint();
        nodeSprite.container.setAlpha(0.5);
        nodeSprite.container.disableInteractive();
        break;
      case 'available':
        bg.setTexture('node-available');
        bg.setTint(Phaser.Display.Color.HexStringToColor(nodeSprite.node.color).color);
        nodeSprite.container.setAlpha(1);
        nodeSprite.container.setInteractive({ useHandCursor: true });
        break;
      case 'progress':
        bg.setTexture('node-progress');
        bg.setTint(Phaser.Display.Color.HexStringToColor(nodeSprite.node.color).color);
        nodeSprite.container.setAlpha(1);
        nodeSprite.container.setInteractive({ useHandCursor: true });
        break;
      case 'complete':
        bg.setTexture('node-complete');
        bg.clearTint();
        nodeSprite.container.setAlpha(1);
        nodeSprite.container.setInteractive({ useHandCursor: true });
        break;
    }
  }

  private onResize(gameSize: Phaser.Structs.Size) {
    // Recalculate and redraw on resize
    this.calculateMapDimensions();

    // This is a simplified resize - in production you'd want to
    // properly reposition all elements
    this.scene.restart();
  }

  private setupInteractions() {
    // Request initial state from React
    EventBus.emit('request-location-states');
  }

  shutdown() {
    EventBus.off('navigate-to-location', this.navigateToLocation, this);
    EventBus.off('update-node-state', this.updateNodeState, this);
    this.scale.off('resize', this.onResize, this);
  }
}
