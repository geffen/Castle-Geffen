// Castle Geffen - Simplified cube version for testing

import { 
  engine, 
  Transform, 
  MeshRenderer, 
  Material, 
  MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'

export function main() {
  console.log('Castle Geffen - Starting simplified version...')
  
  // GREEN GROUND PLANE
  const ground = engine.addEntity()
  Transform.create(ground, {
    position: Vector3.create(32, 0, 32),
    scale: Vector3.create(64, 0.5, 64)
  })
  MeshRenderer.create(ground, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.create(ground, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.2, 0.8, 0.2, 1)
      }
    }
  })

  // MAIN KEEP - Just a big gray cube
  const keep = engine.addEntity()
  Transform.create(keep, {
    position: Vector3.create(32, 10, 32),
    scale: Vector3.create(16, 20, 16)
  })
  MeshRenderer.create(keep, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  Material.create(keep, {
    material: {
      $case: 'pbr',
      pbr: {
        albedoColor: Color4.create(0.5, 0.5, 0.5, 1)
      }
    }
  })
  MeshCollider.create(keep)

  // FOUR CORNER TOWERS - Simple red cubes
  const towerPositions = [
    Vector3.create(8, 5, 8),
    Vector3.create(56, 5, 8),
    Vector3.create(8, 5, 56),
    Vector3.create(40, 5, 56)
  ]

  towerPositions.forEach((pos, index) => {
    const tower = engine.addEntity()
    Transform.create(tower, {
      position: pos,
      scale: Vector3.create(8, 10, 8)
    })
    MeshRenderer.create(tower, {
      mesh: {
        $case: 'box',
        box: { uvs: [] }
      }
    })
    Material.create(tower, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.8, 0.2, 0.2, 1)
        }
      }
    })
    MeshCollider.create(tower)
  })

  // SIMPLE WALLS - Just 4 yellow cubes
  const walls = [
    { pos: Vector3.create(32, 3, 8), scale: Vector3.create(48, 6, 2) },   // North
    { pos: Vector3.create(32, 3, 56), scale: Vector3.create(48, 6, 2) },  // South
    { pos: Vector3.create(8, 3, 32), scale: Vector3.create(2, 6, 48) },   // West
    { pos: Vector3.create(56, 3, 32), scale: Vector3.create(2, 6, 48) }   // East
  ]

  walls.forEach((wall, index) => {
    const wallEntity = engine.addEntity()
    Transform.create(wallEntity, {
      position: wall.pos,
      scale: wall.scale
    })
    MeshRenderer.create(wallEntity, {
      mesh: {
        $case: 'box',
        box: { uvs: [] }
      }
    })
    Material.create(wallEntity, {
      material: {
        $case: 'pbr',
        pbr: {
          albedoColor: Color4.create(0.8, 0.8, 0.2, 1)
        }
      }
    })
    MeshCollider.create(wallEntity)
  })

  console.log('Castle Geffen simplified version loaded!')
}

// Call main immediately when the module loads
main()