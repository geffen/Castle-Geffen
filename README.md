# CURRENT VERSION - Transfer to VS Code: README.md
# Castle Geffen - Decentraland L-shaped Estate

This Decentraland scene features a medieval castle built on an L-shaped estate with an interactive drawbridge that players can open and close by clicking on it.

## Description

Castle Geffen is located on a unique L-shaped estate of 12 parcels in Decentraland. The scene includes:

- A detailed castle with walls following the L-shape of the estate
- A main keep positioned at the inner corner of the L-shape
- Four towers at each corner of the estate
- An interactive drawbridge on the west wall that animates when clicked
- An L-shaped moat surrounding the castle
- Medieval-themed terrain and decorations including gardens and banners

## Estate Layout

The estate consists of 12 parcels arranged in an L-shape:
```
     N
     ^
     |
136,-141  137,-141  138,-141  139,-141  → Full row (4 parcels)
136,-142  137,-142  138,-142  139,-142  → Full row (4 parcels)
136,-143  137,-143                      → Partial row (2 parcels)
136,-144  137,-144                      → Partial row (2 parcels)
     +----------------->
     |    E
```

## Key Positions

- **Main Keep**: (24,0,32) - Positioned at the inner corner of the L
- **Drawbridge**: (4,1,32) - Middle of the west wall, facing east
- **Corner Towers**: At (8,0,8), (56,0,8), (8,0,56), and (56,0,56)
- **Castle Walls**: Follow the L-shape of the estate
- **Moat**: Follows the perimeter of the estate in an L-shape
- **Spawn Point**: (16,1,8) - Located near the southwest of the estate

## Installation and Running

1. Download this repository
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Development

This project uses the Decentraland SDK 7 and follows a component-based architecture:

- `src/game.ts` - Main entry point and scene setup with positioning optimized for the L-shaped estate
- `src/components/drawbridge.ts` - Component for storing drawbridge state
- `src/systems/drawbridge.ts` - System for animating the drawbridge

## Current Implementation

This scene is currently implemented using **programmed geometric shapes** (boxes, cylinders, etc.) with materials and colors. This provides a fully functional castle experience while 3D models are being developed.

### Features Include:
- **Main Castle Keep**: Large central tower (16×16×35m) at the heart of the castle
- **Four Corner Towers**: Cylindrical towers with conical roofs at strategic positions
- **Castle Walls**: Stone-colored walls forming a nearly complete rectangle
- **Interactive Drawbridge**: Wooden drawbridge that opens/closes on click
- **Moat System**: Blue water-filled moat surrounding the castle
- **Gatehouse**: Fortified entrance with portcullis
- **Decorative Elements**: Flags on towers, central courtyard garden
- **Proper Materials**: Stone, wood, metal, and water materials with appropriate colors

### Interactive Elements:
- Click the drawbridge to open/close it with smooth animation
- Walk around and explore the castle grounds
- All structures have collision detection

## Future 3D Models

When custom 3D models are ready, they can easily replace the geometric shapes by updating the model file references:

1. `models/terrain.glb` - The L-shaped terrain for the estate
2. `models/moat.glb` - The L-shaped water-filled moat around the castle
3. `models/keep.glb` - The central castle keep at the inner corner
4. `models/tower.glb` - Tower model for the four corners
5. `models/wall.glb` - Wall segments that can be scaled to form the castle perimeter
6. `models/drawbridge.glb` - The interactive drawbridge
7. `models/gardens.glb` - Decorative gardens for the castle courtyard
8. `models/banners.glb` - Banners and flags to decorate the castle
9. `models/torches.glb` - Torch lights around the castle

## License

This project is licensed under the MIT License - see the LICENSE file for details.