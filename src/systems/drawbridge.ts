import { engine, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { DrawbridgeComponent, DrawbridgeState } from '../components/drawbridge'

/**
 * System to handle drawbridge animation
 * @param dt Delta time in seconds
 */
export function drawbridgeSystem(dt: number): void {
  // Get all entities with drawbridge components
  for (const [entity, drawbridge] of engine.getEntitiesWith(DrawbridgeComponent)) {
    // Skip if the drawbridge is in a static state
    if (drawbridge.state !== DrawbridgeState.OPENING && drawbridge.state !== DrawbridgeState.CLOSING) {
      continue
    }

    // Get mutable versions of components
    const drawbridgeMutable = DrawbridgeComponent.getMutable(entity)
    const transform = Transform.getMutable(entity)
    
    // Calculate how much to rotate this frame
    const rotationStep = drawbridge.animationSpeed * dt
    
    // Update rotation based on state
    if (drawbridge.state === DrawbridgeState.OPENING) {
      // When opening, rotate downward (decrease angle)
      drawbridgeMutable.currentRotation -= rotationStep
      
      // Check if we've reached the target (or passed it)
      if (drawbridgeMutable.currentRotation <= drawbridge.targetRotation) {
        drawbridgeMutable.currentRotation = drawbridge.targetRotation
        drawbridgeMutable.state = DrawbridgeState.OPEN
      }
    } else if (drawbridge.state === DrawbridgeState.CLOSING) {
      // When closing, rotate upward (increase angle)
      drawbridgeMutable.currentRotation += rotationStep
      
      // Check if we've reached the target (or passed it)
      if (drawbridgeMutable.currentRotation >= drawbridge.targetRotation) {
        drawbridgeMutable.currentRotation = drawbridge.targetRotation
        drawbridgeMutable.state = DrawbridgeState.CLOSED
      }
    }
    
    // The drawbridge is now on the south wall (facing south),
    // so it rotates around the X axis (standard drawbridge rotation)
    // When closed: horizontal (0 degrees)
    // When open: rotated down (-90 degrees around X axis)
    
    // Apply the rotation around the X axis
    transform.rotation = Quaternion.fromEulerDegrees(
      drawbridgeMutable.currentRotation, // Rotate around X axis
      0, // No Y rotation needed
      0  // No Z rotation needed
    )
    
    // Log state changes for debugging
    if (drawbridgeMutable.state === DrawbridgeState.OPEN && drawbridge.state === DrawbridgeState.OPENING) {
      // Play sound when fully opened (we just changed state)
      console.log('Drawbridge fully opened')
      // TODO: Add sound effect for open drawbridge
    } else if (drawbridgeMutable.state === DrawbridgeState.CLOSED && drawbridge.state === DrawbridgeState.CLOSING) {
      // Play sound when fully closed (we just changed state)
      console.log('Drawbridge fully closed')
      // TODO: Add sound effect for closed drawbridge
    }
  }
}

/**
 * Setup the drawbridge system
 */
export function setupDrawbridgeSystem(): void {
  // Add the system to the engine
  engine.addSystem(drawbridgeSystem)
}