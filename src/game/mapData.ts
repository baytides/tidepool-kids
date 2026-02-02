// src/game/mapData.ts
import { locations } from '@/data/locations';

/**
 * Bay Area bounding box (approximate)
 * Used to convert lat/lng to canvas positions
 */
const BAY_AREA_BOUNDS = {
  north: 38.2, // Marin headlands
  south: 37.2, // South of San Jose
  east: -121.5, // East Bay hills
  west: -122.8, // Pacific coast
};

/**
 * Convert geographic coordinates to normalized canvas position (0-1 range)
 */
export function geoToCanvas(lng: number, lat: number): { x: number; y: number } {
  const x = (lng - BAY_AREA_BOUNDS.west) / (BAY_AREA_BOUNDS.east - BAY_AREA_BOUNDS.west);
  const y = 1 - (lat - BAY_AREA_BOUNDS.south) / (BAY_AREA_BOUNDS.north - BAY_AREA_BOUNDS.south);
  return { x, y };
}

/**
 * Location nodes with canvas positions
 */
export interface MapNode {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'habitat' | 'infrastructure';
  canvasX: number; // 0-1 normalized
  canvasY: number; // 0-1 normalized
  connections: string[]; // IDs of connected locations
}

/**
 * Define path connections between locations
 * Based on real geography (Highway 1, coastal paths, transit corridors)
 */
const PATH_CONNECTIONS: Record<string, string[]> = {
  // Coastal Highway 1 path (tide pools & beaches)
  'fitzgerald-tide-pools': ['pillar-point-harbor', 'ocean-beach'],
  'pillar-point-harbor': ['fitzgerald-tide-pools', 'ocean-beach'],
  'ocean-beach': ['pillar-point-harbor', 'fitzgerald-tide-pools', 'crissy-field-marsh', 'sf-seawall'],
  'stinson-beach': ['muir-woods', 'crissy-field-marsh'],

  // SF Bay shoreline (north)
  'crissy-field-marsh': ['ocean-beach', 'stinson-beach', 'aquarium-of-bay', 'sf-seawall'],
  'aquarium-of-bay': ['crissy-field-marsh', 'embarcadero-bart', 'bay-bridge'],
  'sf-seawall': ['ocean-beach', 'crissy-field-marsh', 'embarcadero-bart'],

  // Marin County (forests)
  'muir-woods': ['stinson-beach'],

  // East Bay
  'redwood-regional': ['bay-bridge'],
  'bay-bridge': ['aquarium-of-bay', 'redwood-regional', 'water-treatment'],
  'water-treatment': ['bay-bridge', 'altamont-landfill'],
  'altamont-landfill': ['water-treatment'],

  // South Bay wetlands
  'don-edwards-wetlands': ['palo-alto-baylands', 'alviso-levee'],
  'palo-alto-baylands': ['don-edwards-wetlands', 'alviso-levee'],
  'alviso-levee': ['don-edwards-wetlands', 'palo-alto-baylands'],

  // Infrastructure network (follows transit/utility corridors)
  'recycling-center': ['sf-compost', 'embarcadero-bart'],
  'sf-compost': ['recycling-center'],
  'hetch-hetchy': ['embarcadero-bart'],
  'embarcadero-bart': ['aquarium-of-bay', 'sf-seawall', 'recycling-center', 'hetch-hetchy'],
};

/**
 * Generate map nodes from locations data
 */
export function generateMapNodes(): MapNode[] {
  return locations.map((location) => {
    const [lng, lat] = location.coordinates;
    const { x, y } = geoToCanvas(lng, lat);

    return {
      id: location.id,
      name: location.name,
      icon: location.icon,
      color: location.color,
      type: location.type,
      canvasX: x,
      canvasY: y,
      connections: PATH_CONNECTIONS[location.id] || [],
    };
  });
}

export const mapNodes = generateMapNodes();
