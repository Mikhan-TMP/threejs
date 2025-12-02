"use client"

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { obstacles } from '@/app/components/Ground/obstacles'
import { Controls } from './controls'

export const Character = ({ debugRef }: { debugRef: React.RefObject<HTMLDivElement | null> }) => {
    const ref = useRef<THREE.Group>(null)
    
    // 1. Load Walking animation
    const { scene, animations: walkAnimations } = useGLTF('/Model/male_slow_walk_40_frames_loop.glb')
    
    // 2. Load Idle 1 
    const { animations: idleAnimations } = useGLTF('/Model/idle_1_male_free_animation_200_frames_loop.glb') 

    // 3. Load Idle 2
    const { animations: idle2Animations } = useGLTF('/Model/idle_2_male_free_animation_220_frames_loop.glb') 

    // 4. Load Running animation
    const { animations: runAnimations } = useGLTF('/Model/male_running_20_frames_loop.glb')

    // const { animations: jumpAnimations } = useFBX('/Model/Jump.fbx')
    const { animations: jumpAnimations } = useGLTF('/Model/Jump.glb')


    // Rename clips for easy access
    if (walkAnimations.length > 0) walkAnimations[0].name = 'Walk'
    if (idleAnimations.length > 0) idleAnimations[0].name = 'Idle'
    if (idle2Animations.length > 0) idle2Animations[0].name = 'Idle2'
    if (jumpAnimations.length > 0) {
        jumpAnimations[0].name = 'Jump'
        // Fix Mixamo FBX vs GLTF bone naming mismatch
        // FBX often has 'mixamorig:Hips' while GLTF has 'mixamorigHips'
        jumpAnimations[0].tracks.forEach((track) => {
            track.name = track.name.replace('mixamorig:', 'mixamorig')
        })
    }
    if (runAnimations.length > 0) runAnimations[0].name = 'Run'

    // Combine all animations
    const { actions } = useAnimations([...walkAnimations, ...idleAnimations, ...idle2Animations, ...runAnimations, ...jumpAnimations], ref)

    // Subscribe to keyboard controls
    const [, get] = useKeyboardControls<Controls>()
    
    // Track current animation state
    const [animation, setAnimation] = useState('Idle')
    
    // Jump state
    const jumpState = useRef({ 
        isJumping: false, 
        velocityY: 0,
        groundY: 0
    })

    // Handle Animation Transitions & Idle Switching
    useEffect(() => {
        const actionName = (animation === 'Crouch') ? 'Walk' : animation
        const action = actions[actionName]
        
        if (action) {
            // Ensure Jump plays once and clamps
            if (actionName === 'Jump') {
                action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1)
                action.clampWhenFinished = true
                action.play()
            } else {
                action.reset().fadeIn(0.2).play()
            }
            
            if (animation === 'Crouch') action.timeScale = 0.5
            else action.timeScale = 1.0

            let timer: NodeJS.Timeout
            if (animation === 'Idle' || animation === 'Idle2') {
                const timeToSwitch = Math.random() * 4000 + 4000 
                timer = setTimeout(() => {
                    setAnimation(prev => prev === 'Idle' ? 'Idle2' : 'Idle')
                }, timeToSwitch)
            }

            return () => {
                action.fadeOut(0.2)
                if (timer) clearTimeout(timer)
            }
        }
    }, [animation, actions])

    // Initialize position once on mount
    useEffect(() => {
        if (ref.current) {
            ref.current.position.set(0, 0, 0)
        }
    }, [])

    // --- Camera Control Logic ---
    const cameraState = useRef({ yaw: 0, pitch: 0.5 })

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                cameraState.current.yaw -= e.movementX * 0.002
                cameraState.current.pitch += e.movementY * 0.002
                // Clamp pitch to avoid flipping (limit vertical look)
                cameraState.current.pitch = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, cameraState.current.pitch))
            }
        }
        
        const onMouseDown = () => {
            // Lock pointer on click
            document.body.requestPointerLock()
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mousedown', onMouseDown)
        
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mousedown', onMouseDown)
        }
    }, [])

    useFrame((state, delta) => {
        if (!ref.current) return

        const { forward, backward, left, right, run, crouch, jump } = get()
        const isMoving = forward || backward || left || right
        
        let speed = 0
        let nextAnimation = 'Idle' // Default target

        // Handle Jump Input
        if (jump && !jumpState.current.isJumping) {
            jumpState.current.isJumping = true
            jumpState.current.velocityY = 8 // Initial jump velocity
            jumpState.current.groundY = ref.current.position.y
        }

        // Apply Gravity and Update Y Position
        if (jumpState.current.isJumping) {
            const gravity = -20 // Gravity acceleration
            jumpState.current.velocityY += gravity * delta
            ref.current.position.y += jumpState.current.velocityY * delta

            // Check if landed
            if (ref.current.position.y <= jumpState.current.groundY) {
                ref.current.position.y = jumpState.current.groundY
                jumpState.current.isJumping = false
                jumpState.current.velocityY = 0
            }
        }

        // Determine State and Speed
        if (jumpState.current.isJumping) {
            nextAnimation = 'Jump'
            speed = isMoving ? (run ? 8 * delta : delta * 5) : 0
        } else if (crouch) {
            nextAnimation = 'Crouch'
            speed = isMoving ? 2 * delta : 0
        } else if (run && isMoving) {
            nextAnimation = 'Run'
            speed = 8 * delta
        } else if (isMoving) {
            nextAnimation = 'Walk'
            speed = delta * 0.75
        }

        // NEW: If we are not moving, preserve the specific idle state (Idle or Idle2)
        // This prevents the loop from forcing it back to 'Idle' every frame
        if (nextAnimation === 'Idle' && (animation === 'Idle' || animation === 'Idle2')) {
            nextAnimation = animation
        }

        // Only trigger state update if animation actually changes
        if (nextAnimation !== animation) {
            setAnimation(nextAnimation)
        }

        const currentPos = ref.current.position
        const { yaw, pitch } = cameraState.current

        // 1. Calculate intended movement (Relative to Camera)
        let moveX = 0
        let moveZ = 0

        if (isMoving) {
            // Calculate input angle relative to "forward"
            // forward (W) = 0, backward (S) = PI, left (A) = PI/2, right (D) = -PI/2
            const inputAngle = Math.atan2(
                (left ? 1 : 0) - (right ? 1 : 0), 
                (forward ? 1 : 0) - (backward ? 1 : 0)
            )
            
            // Adjust for camera yaw. 
            // Camera is at 'yaw'. Character forward is 'yaw + PI'.
            const targetRotation = inputAngle + yaw + Math.PI
            
            // Smooth rotation
            let rotDiff = targetRotation - ref.current.rotation.y
            // Normalize angle to -PI..PI to take shortest turn
            while (rotDiff > Math.PI) rotDiff -= Math.PI * 2
            while (rotDiff < -Math.PI) rotDiff += Math.PI * 2
            
            ref.current.rotation.y += rotDiff * 10 * delta // Interpolate rotation

            // Move in the direction of the target rotation
            moveX = Math.sin(targetRotation) * speed
            moveZ = Math.cos(targetRotation) * speed
        }

        // 2. Define Obstacle Data (REMOVED LOCAL DEFINITION, USING GLOBAL)
        
        const characterRadius = 0.3 
        
        // Helper function to check collision against ALL obstacles
        const checkCollision = (x: number, z: number) => {
            return obstacles.some(obs => {
                const overlapX = x > obs.x - obs.width/2 - characterRadius && 
                                 x < obs.x + obs.width/2 + characterRadius 
                const overlapZ = z > obs.z - obs.depth/2 - characterRadius && 
                                 z < obs.z + obs.depth/2 + characterRadius
                return overlapX && overlapZ
            })
        }

        // 3. Check X Axis Collision
        const nextX = currentPos.x + moveX
        if (!checkCollision(nextX, currentPos.z)) {
            currentPos.x = nextX
        }

        // 4. Check Z Axis Collision
        const nextZ = currentPos.z + moveZ
        if (!checkCollision(currentPos.x, nextZ)) {
            currentPos.z = nextZ
        }

        // Update Debug Display
        if (debugRef.current) {
            debugRef.current.innerText = `X: ${currentPos.x.toFixed(2)}\nY: ${currentPos.y.toFixed(2)}\nZ: ${currentPos.z.toFixed(2)}`
        }
        
        // --- Camera Update ---
        const dist = 5
        // Calculate camera position relative to target based on spherical coordinates
        const camX = currentPos.x + dist * Math.sin(yaw) * Math.cos(pitch)
        const camZ = currentPos.z + dist * Math.cos(yaw) * Math.cos(pitch)
        const camY = currentPos.y + dist * Math.sin(pitch)

        // Smoothly move camera to new position
        state.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.2)
        // Look slightly above the character's feet (at the head/torso)
        state.camera.lookAt(currentPos.x, currentPos.y + 1, currentPos.z)
    })

    return (
        <group ref={ref} dispose={null}>
            <primitive object={scene} />
        </group>
    )
}