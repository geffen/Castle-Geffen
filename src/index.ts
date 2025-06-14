// COORDINATE SYSTEM DEBUG - Colored walls to understand positioning
// This will help us see exactly where things are being placed

import { engine, Transform, MeshRenderer, Material, MeshCollider } from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'

export function main() {
  console.log('🧭 COORDINATE SYSTEM DEBUG - Colored Walls')
  console.log('RED = West, GREEN = North, BLUE = East, YELLOW = South')

  // Simple terrain for reference
  const terrain = engine.addEntity()
  Transform.create(terrain, {
    position: Vector3.create(32, -0.5, 32),
    scale: Vector3.create(64, 1, 64)
  })
  MeshRenderer.create(terrain, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(terrain, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.5, 0.5, 0.5, 1) // Gray terrain
      }
    }
  })

  // WEST WALL - RED
  const westWall = engine.addEntity()
  Transform.create(westWall, {
    position: Vector3.create(4, 4, 32), // Should be on the western edge
    scale: Vector3.create(2, 8, 32)
  })
  MeshRenderer.create(westWall, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(westWall, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(1, 0, 0, 1), // RED = WEST
        emissiveColor: Color4.create(0.3, 0, 0, 1)
      }
    }
  })
  MeshCollider.create(westWall)

  // NORTH WALL - GREEN (corrected)
  const northWall = engine.addEntity()
  Transform.create(northWall, {
    position: Vector3.create(32, 4, 60), // North should be higher Z values
    scale: Vector3.create(32, 8, 2)
  })
  MeshRenderer.create(northWall, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(northWall, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0, 1, 0, 1), // GREEN = NORTH
        emissiveColor: Color4.create(0, 0.3, 0, 1)
      }
    }
  })
  MeshCollider.create(northWall)

  // EAST WALL - BLUE
  const eastWall = engine.addEntity()
  Transform.create(eastWall, {
    position: Vector3.create(60, 4, 32), // Should be on the eastern edge
    scale: Vector3.create(2, 8, 32)
  })
  MeshRenderer.create(eastWall, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(eastWall, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0, 0, 1, 1), // BLUE = EAST
        emissiveColor: Color4.create(0, 0, 0.3, 1)
      }
    }
  })
  MeshCollider.create(eastWall)

  // SOUTH WALL - YELLOW (corrected)
  const southWall = engine.addEntity()
  Transform.create(southWall, {
    position: Vector3.create(32, 4, 4), // South should be lower Z values
    scale: Vector3.create(32, 8, 2)
  })
  MeshRenderer.create(southWall, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(southWall, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(1, 1, 0, 1), // YELLOW = SOUTH
        emissiveColor: Color4.create(0.3, 0.3, 0, 1)
      }
    }
  })
  MeshCollider.create(southWall)

  // SPAWN POINT MARKER
  const spawnMarker = engine.addEntity()
  Transform.create(spawnMarker, {
    position: Vector3.create(16, 3, 8), // Near spawn point from scene.json
    scale: Vector3.create(2, 6, 2)
  })
  MeshRenderer.create(spawnMarker, {
    mesh: { $case: 'cylinder', cylinder: {} }
  })
  Material.create(spawnMarker, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(1, 0, 1, 1), // MAGENTA = SPAWN AREA
        emissiveColor: Color4.create(0.3, 0, 0.3, 1)
      }
    }
  })

  // COORDINATE MARKERS
  // Origin marker
  const originMarker = engine.addEntity()
  Transform.create(originMarker, {
    position: Vector3.create(0, 2, 0),
    scale: Vector3.create(4, 4, 4)
  })
  MeshRenderer.create(originMarker, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(originMarker, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(1, 1, 1, 1), // WHITE = ORIGIN (0,0,0)
        emissiveColor: Color4.create(0.5, 0.5, 0.5, 1)
      }
    }
  })

  // Center marker
  const centerMarker = engine.addEntity()
  Transform.create(centerMarker, {
    position: Vector3.create(32, 2, 32),
    scale: Vector3.create(4, 4, 4)
  })
  MeshRenderer.create(centerMarker, {
    mesh: { $case: 'box', box: { uvs: [] } }
  })
  Material.create(centerMarker, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0, 0, 0, 1), // BLACK = CENTER (32,32)
        emissiveColor: Color4.create(0.2, 0.2, 0.2, 1)
      }
    }
  })

  // Edge markers to show coordinate extents
  const edgeMarkers = [
    { pos: Vector3.create(64, 1, 0), color: Color4.create(1, 0.5, 0, 1) }, // Orange - (64,0)
    { pos: Vector3.create(0, 1, 64), color: Color4.create(0.5, 0, 1, 1) }, // Purple - (0,64)
    { pos: Vector3.create(64, 1, 64), color: Color4.create(0, 1, 1, 1) }   // Cyan - (64,64)
  ]

  edgeMarkers.forEach((marker, index) => {
    const edgeMarker = engine.addEntity()
    Transform.create(edgeMarker, {
      position: marker.pos,
      scale: Vector3.create(2, 2, 2)
    })
    MeshRenderer.create(edgeMarker, {
      mesh: { $case: 'box', box: { uvs: [] } }
    })
    Material.create(edgeMarker, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: marker.color,
          emissiveColor: Color4.create(marker.color.r * 0.3, marker.color.g * 0.3, marker.color.b * 0.3, 1)
        }
      }
    })
  })

  console.log('🎨 COLOR CODE:')
  console.log('🔴 RED WALL = West')
  console.log('🟡 YELLOW WALL = South') 
  console.log('🔵 BLUE WALL = East')
  console.log('🟢 GREEN WALL = North')
  console.log('🟣 MAGENTA POLE = Spawn area')
  console.log('⚪ WHITE CUBE = Origin (0,0,0)')
  console.log('⚫ BLACK CUBE = Center (32,32)')
  console.log('🟠 ORANGE CUBE = (64,0) - OUTSIDE your land')
  console.log('🟣 PURPLE CUBE = (0,64)')
  console.log('🔷 CYAN CUBE = (64,64) - OUTSIDE your land')
}