import { engine } from '@dcl/sdk/ecs'
import { main } from './game'

// This is the required export pattern for DCL SDK 7
export function onStart() {
  engine.addSystem(() => {
    console.log('Castle Geffen Scene Started')
  })
  main()
}

// Required for DCL SDK 7
export function onUpdate(dt: number) {
  // This is called every frame
  // The drawbridge system is already added in setupDrawbridgeSystem()
}