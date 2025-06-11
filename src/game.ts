// CURRENT VERSION - Transfer to VS Code: src/index.ts
// This is the main game file using geometric shapes (no 3D models required)

import { 
  engine, 
  Transform, 
  MeshRenderer, 
  Material, 
  InputAction, 
  pointerEventsSystem,
  MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { DrawbridgeComponent, DrawbridgeState } from './components/drawbridge'
import { setupDrawbridgeSystem } from './systems/drawbridge'

export function main() {
  // TERRAIN & ENVIRONMENT
  const terrain = engine.addEntity()
  Transform.create(terrain, {
    position: Vector3.create(32, -0.5, 32),
    scale: Vector3.create(64, 1, 64)
  })
  MeshRenderer.create(terrain, {
    mesh: {
      $case: 'box',
      box: { }
    }
  })
  Material.create(terrain, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.4, 0.6, 0.2, 1),
        roughness: 0.8,
        metallic: 0.1
      }
    }
  })

  // MOAT SEGMENTS
  const moatSegments = [
    { pos: Vector3.create(32, -1.5, 4), scale: Vector3.create(52, 1, 4) },
    { pos: Vector3.create(24, -1.5, 60), scale: Vector3.create(36, 1, 4) },
    { pos: Vector3.create(60, -1.5, 32), scale: Vector3.create(4, 1, 52) },
    { pos: Vector3.create(4, -1.5, 32), scale: Vector3.create(4, 1, 52) }
  ]

  moatSegments.forEach((segment, index) => {
    const moatPart = engine.addEntity()
    Transform.create(moatPart, {
      position: segment.pos,
      scale: segment.scale
    })
    MeshRenderer.create(moatPart, {
      mesh: {
        $case: 'box',
        box: { }
      }
    })
    Material.create(moatPart, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.2, 0.4, 0.8, 0.8),
          roughness: 0.1,
          metallic: 0.0
        }
      }
    })
  })

  // CASTLE WALLS
  const wallMaterial = {
    material: {
      $case: 'pbr' as const,
      pbr: {
        albedoColor: Color4.create(0.7, 0.6, 0.4, 1),
        roughness: 0.9,
        metallic: 0.0
      }
    }
  }

  // North wall
  const northWall = engine.addEntity()
  Transform.create(northWall, {
    position: Vector3.create(32, 4, 8),
    scale: Vector3.create(48, 8, 2)
  })
  MeshRenderer.create(northWall, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(northWall, wallMaterial)
  MeshCollider.create(northWall)

  // South wall (left side of drawbridge)
  const southWall = engine.addEntity()
  Transform.create(southWall, {
    position: Vector3.create(16, 4, 56),
    scale: Vector3.create(24, 8, 2)
  })
  MeshRenderer.create(southWall, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(southWall, wallMaterial)
  MeshCollider.create(southWall)

  // South wall (right side of drawbridge)
  const southWallRight = engine.addEntity()
  Transform.create(southWallRight, {
    position: Vector3.create(36, 4, 56),
    scale: Vector3.create(8, 8, 2)
  })
  MeshRenderer.create(southWallRight, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(southWallRight, wallMaterial)
  MeshCollider.create(southWallRight)

  // East wall
  const eastWall = engine.addEntity()
  Transform.create(eastWall, {
    position: Vector3.create(56, 4, 32),
    scale: Vector3.create(2, 8, 48)
  })
  MeshRenderer.create(eastWall, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(eastWall, wallMaterial)
  MeshCollider.create(eastWall)

  // West wall
  const westWall = engine.addEntity()
  Transform.create(westWall, {
    position: Vector3.create(8, 4, 32),
    scale: Vector3.create(2, 8, 48)
  })
  MeshRenderer.create(westWall, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(westWall, wallMaterial)
  MeshCollider.create(westWall)

  // MAIN CASTLE KEEP
  const keep = engine.addEntity()
  Transform.create(keep, {
    position: Vector3.create(32, 17.5, 32),
    scale: Vector3.create(16, 35, 16)
  })
  MeshRenderer.create(keep, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(keep, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.6, 0.5, 0.3, 1),
        roughness: 0.9,
        metallic: 0.0
      }
    }
  })
  MeshCollider.create(keep)

  // CORNER TOWERS
  const towerMaterial = {
    material: {
      $case: 'pbr' as const,
      pbr: {
        albedoColor: Color4.create(0.65, 0.55, 0.35, 1),
        roughness: 0.9,
        metallic: 0.0
      }
    }
  }

  const towers = [
    { pos: Vector3.create(8, 12.5, 8), name: 'NW' },
    { pos: Vector3.create(56, 12.5, 8), name: 'NE' },
    { pos: Vector3.create(8, 12.5, 56), name: 'SW' },
    { pos: Vector3.create(40, 12.5, 56), name: 'SE' }
  ]

  towers.forEach((towerData, index) => {
    const tower = engine.addEntity()
    Transform.create(tower, {
      position: towerData.pos,
      scale: Vector3.create(8, 25, 8)
    })
    MeshRenderer.create(tower, {
      mesh: { $case: 'cylinder', cylinder: { } }
    })
    Material.create(tower, towerMaterial)
    MeshCollider.create(tower)

    // Tower roof (cone)
    const roof = engine.addEntity()
    Transform.create(roof, {
      position: Vector3.create(towerData.pos.x, towerData.pos.y + 15, towerData.pos.z),
      scale: Vector3.create(9, 6, 9)
    })
    MeshRenderer.create(roof, {
      mesh: { $case: 'cylinder', cylinder: { radiusTop: 0, radiusBottom: 1 } }
    })
    Material.create(roof, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.4, 0.2, 0.1, 1),
          roughness: 0.8,
          metallic: 0.0
        }
      }
    })
  })

  // DRAWBRIDGE
  const drawbridge = engine.addEntity()
  Transform.create(drawbridge, {
    position: Vector3.create(26, 1, 57),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(8, 1, 6)
  })
  MeshRenderer.create(drawbridge, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(drawbridge, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.4, 0.2, 0.1, 1),
        roughness: 0.8,
        metallic: 0.0
      }
    }
  })
  MeshCollider.create(drawbridge, {
    mesh: { $case: 'box', box: { } }
  })

  // Add drawbridge component
  DrawbridgeComponent.create(drawbridge, {
    state: DrawbridgeState.CLOSED,
    targetRotation: 0,
    currentRotation: 0,
    animationSpeed: 45
  })

  // Add interaction to drawbridge
  pointerEventsSystem.onPointerDown(
    {
      entity: drawbridge,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Open/Close Drawbridge' }
    },
    () => {
      const drawbridgeData = DrawbridgeComponent.getMutable(drawbridge)
      
      if (drawbridgeData.state === DrawbridgeState.CLOSED) {
        drawbridgeData.state = DrawbridgeState.OPENING
        drawbridgeData.targetRotation = -90
      } else if (drawbridgeData.state === DrawbridgeState.OPEN) {
        drawbridgeData.state = DrawbridgeState.CLOSING
        drawbridgeData.targetRotation = 0
      }
    }
  )

  // DECORATIVE ELEMENTS
  const courtyard = engine.addEntity()
  Transform.create(courtyard, {
    position: Vector3.create(32, 0.1, 32),
    scale: Vector3.create(24, 0.2, 24)
  })
  MeshRenderer.create(courtyard, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(courtyard, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.2, 0.7, 0.2, 1),
        roughness: 0.7,
        metallic: 0.0
      }
    }
  })

  // Flagpoles on towers
  towers.forEach((towerData, index) => {
    const flagpole = engine.addEntity()
    Transform.create(flagpole, {
      position: Vector3.create(towerData.pos.x, towerData.pos.y + 20, towerData.pos.z),
      scale: Vector3.create(0.2, 8, 0.2)
    })
    MeshRenderer.create(flagpole, {
      mesh: { $case: 'cylinder', cylinder: { } }
    })
    Material.create(flagpole, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.3, 0.2, 0.1, 1),
          roughness: 0.9,
          metallic: 0.0
        }
      }
    })

    // Flag
    const flag = engine.addEntity()
    Transform.create(flag, {
      position: Vector3.create(towerData.pos.x + 1, towerData.pos.y + 22, towerData.pos.z),
      scale: Vector3.create(2, 1.5, 0.1)
    })
    MeshRenderer.create(flag, {
      mesh: { $case: 'box', box: { } }
    })
    Material.create(flag, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.8, 0.1, 0.1, 1),
          roughness: 0.6,
          metallic: 0.0
        }
      }
    })
  })

  // Gatehouse
  const gatehouse = engine.addEntity()
  Transform.create(gatehouse, {
    position: Vector3.create(26, 8, 50),
    scale: Vector3.create(12, 16, 8)
  })
  MeshRenderer.create(gatehouse, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(gatehouse, towerMaterial)
  MeshCollider.create(gatehouse)

  // Portcullis (gate bars)
  const portcullis = engine.addEntity()
  Transform.create(portcullis, {
    position: Vector3.create(26, 4, 54),
    scale: Vector3.create(6, 8, 0.2)
  })
  MeshRenderer.create(portcullis, {
    mesh: { $case: 'box', box: { } }
  })
  Material.create(portcullis, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.2, 0.2, 0.2, 1),
        roughness: 0.4,
        metallic: 0.8
      }
    }
  })

  // SYSTEMS INITIALIZATION
  setupDrawbridgeSystem()

  console.log('Castle Geffen initialized with programmed geometric shapes!')
  console.log('Features: Main keep, 4 towers, walls, drawbridge, gatehouse, and decorations')
}