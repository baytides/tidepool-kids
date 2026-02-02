import { Events } from 'phaser';

/**
 * EventBus for communication between Phaser scenes and React components.
 *
 * Usage:
 * - From Phaser: EventBus.emit('location-selected', locationId)
 * - From React: EventBus.on('location-selected', (id) => { ... })
 */
export const EventBus = new Events.EventEmitter();
