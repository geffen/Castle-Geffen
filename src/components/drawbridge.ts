import { engine, Schemas } from '@dcl/sdk/ecs'

// Define the possible states for the drawbridge
export enum DrawbridgeState {
  CLOSED = 0,
  OPENING = 1,
  OPEN = 2,
  CLOSING = 3
}

// Define the custom component for the drawbridge
export const DrawbridgeComponent = engine.defineComponent('drawbridgeComponent', {
  // Current state of the drawbridge
  state: Schemas.EnumString<DrawbridgeState>(DrawbridgeState, DrawbridgeState.CLOSED),
  
  // Target rotation in degrees (0 = closed, -90 = open)
  targetRotation: Schemas.Float,
  
  // Current rotation in degrees
  currentRotation: Schemas.Float,
  
  // Speed of rotation animation in degrees per second
  animationSpeed: Schemas.Float
})