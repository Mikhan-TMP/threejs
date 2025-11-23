'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useKeyboardControls, KeyboardControls, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

enum Controls {
    forward = 'forward',
    backward = 'backward',
    left = 'left',
    right = 'right',
    run = 'run',
    crouch = 'crouch',
}

// 1. Define Obstacles Globally so both Character and Debug view can use them
const obstacles = [
    { x: 3, z: 0, width: 1, depth: 1 }, // Red Rectangle
    { x: -1.25, z: -1.85, width: .5, depth: 1 }, // Obstacle for TREE AREA
    { x: 0, z: 2.5, width: 2, depth: 0.5 } // Obstacle near TREE AREA
]

const Character = ({ debugRef }: { debugRef: React.RefObject<HTMLDivElement | null> }) => {
    const ref = useRef<THREE.Group>(null)
    
    // 1. Load Walking animation
    const { scene, animations: walkAnimations } = useGLTF('/Model/male_slow_walk_40_frames_loop.glb')
    
    // 2. Load Idle 1 
    const { animations: idleAnimations } = useGLTF('/Model/idle_1_male_free_animation_200_frames_loop.glb') 

    // 3. Load Idle 2
    const { animations: idle2Animations } = useGLTF('/Model/idle_2_male_free_animation_220_frames_loop.glb') 

    // 4. Load Running animation
    const { animations: runAnimations } = useGLTF('/Model/male_running_20_frames_loop.glb')

    // Rename clips for easy access
    if (walkAnimations.length > 0) walkAnimations[0].name = 'Walk'
    if (idleAnimations.length > 0) idleAnimations[0].name = 'Idle'
    if (idle2Animations.length > 0) idle2Animations[0].name = 'Idle2'
    if (runAnimations.length > 0) runAnimations[0].name = 'Run'

    // Combine all animations
    const { actions } = useAnimations([...walkAnimations, ...idleAnimations, ...idle2Animations, ...runAnimations], ref)

    // Subscribe to keyboard controls
    const [, get] = useKeyboardControls<Controls>()
    
    // Track current animation state
    const [animation, setAnimation] = useState('Idle')

    // Handle Animation Transitions & Idle Switching
    useEffect(() => {
        const actionName = (animation === 'Crouch') ? 'Walk' : animation
        const action = actions[actionName]
        
        if (action) {
            action.reset().fadeIn(0.2).play()
            
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

        const { forward, backward, left, right, run, crouch } = get()
        const isMoving = forward || backward || left || right
        
        let speed = 0
        let nextAnimation = 'Idle' // Default target

        // Determine State and Speed
        if (crouch) {
            nextAnimation = 'Crouch'
            speed = isMoving ? 2 * delta : 0
        } else if (run && isMoving) {
            nextAnimation = 'Run'
            speed = 10 * delta
        } else if (isMoving) {
            nextAnimation = 'Walk'
            speed = 2 * delta
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

const Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#444" />
        </mesh>
    )
}

// NEW: Visual Debugger for Obstacles
const ObstacleDebug = () => {
    return (
        <group>
            {obstacles.map((obs, i) => (
                <mesh key={i} position={[obs.x, 0.5, obs.z]}>
                    <boxGeometry args={[obs.width, 1, obs.depth]} />
                    <meshBasicMaterial color="cyan" wireframe />
                </mesh>
            ))}
        </group>
    )
}

const ThreeTrees = () => {
    const { nodes } = useGLTF('/Nature/low_poly_tree_pack.glb')
    return (
        <group rotation={[-Math.PI / 2, 0, 0] } scale={[0.05, 0.05, 0.05]} position={[-100, -.5, 25]}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_109' || name === 'Object_110'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}


                    // name.includes('ARVORE_SEM') || //Another Tree
                    

                    // name === 'Object_106' || //GOOD 1 Tree
                    // name === 'Object_107' ||

                    // name === 'Object_103' ||  //ANOTHER TREE
                    // name === 'Object_104' ||   

                    // name === 'Object_101' || //BIG TREE
                    // name === 'Object_100' || 
                    // name === 'Object_99' ||

                    // name === 'Object_96' || //ROUND TREE
                    // name === 'Object_95' ||
                    // name === 'Object_97' ||

                    // name === 'Object_90' || //BIG ROUND TREE
                    // name === 'Object_91' ||
                    // name === 'Object_92' ||

                    // name === 'Object_86' || //PINE TREE
                    // name === 'Object_87' ||
                    
                    // name === 'Object_84' || //BIGGER ROUND TREE
                    // name === 'Object_83' ||
                    // name === 'Object_82' ||


                    // name === 'Object_74' || //CLOUD

                    // name === 'NUVEM_02_1' || //FLAT CLOUD

                    // name === 'Object_68' || //Cloud again
                    // name === 'Object_69' || 

                    // name === 'Object_64' || //LEAVES
                    // name === 'Object_63' || //TREE AGAIN

                    // name === 'Object_61' || //PINE TREE
                    // name === 'Object_60' || //PINE TREE

                    // name === 'Object_58' || //FPINE TREE2
                    // name === 'Object_57' || //PINE TREE2

                    // name === 'Object_53' || // 
                    // name === 'branch_wit' || //
                    // name === 'Object_51' || // 
                    // name === 'branch_w07' || // 
                    // name === 'Object_49' || // 
                    // name === 'Object_47' || // 
                    // name === 'Object_45' || // LEAFY ASS TREE
                    // name === 'Object_43' || // 
                    // name === 'Object_41' || // 
                    // name === 'Object_39' || // 
                    // name === 'Object_54' || //
                    // name === 'Object_55' || //



                    // name === 'Object_34' || // 
                    // name === 'Object_32' || // 
                    // name === 'Object_31' || // 
                    // name === 'Leaves_2_3' || // 
                    // name === 'Object_29' || // 
                    // name === 'Object_28' || // 
                    // name === 'Leaves_2_2' || // THIN ASS TREE
                    // name === 'Object_26' || // 
                    // name === 'Object_25' || // 
                    // name === 'Leaves_2_1' || // 
                    // name === 'Object_35' || // 
                    // name === 'Object_21' || // 
                    // name === 'Object_19' || // 
                    // name === 'Object_22' || // 


                    // name === 'Object_15' || // NC DAMN TREE
                    // name === 'Object_14' || // 
                    
                    

                    // name === 'Object_6' || // TREE NO LEAVES ASS
                    // name === 'Object_5' || // 
                    
                    
                    // name === 'skpEFB7_1' //NOTHING


const Rectangle = () => {
    return (
        <mesh position={[3, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default function Main() {
const debugRef = useRef<HTMLDivElement>(null)
const map = [
    { name: Controls.forward, keys: ['ArrowUp', 'w', 'W'] },
    { name: Controls.backward, keys: ['ArrowDown', 's', 'S'] },
    { name: Controls.left, keys: ['ArrowLeft', 'a', 'A'] },
    { name: Controls.right, keys: ['ArrowRight', 'd', 'D'] },
    { name: Controls.run, keys: ['Shift'] },
    { name: Controls.crouch, keys: ['Control'] },
]

return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <div 
        ref={debugRef} 
        style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            color: 'white', 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            padding: '10px', 
            borderRadius: '5px',
            zIndex: 999,
            pointerEvents: 'none',
            whiteSpace: 'pre-line',
            fontFamily: 'monospace'
        }}
    >
        Position Info
    </div>
    <KeyboardControls map={map}>
        <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
        />
        
        <Character debugRef={debugRef} />
        <Rectangle />
        <Ground />
        <ThreeTrees />
        
        {/* Add the debug view here */}
        <ObstacleDebug />

        <gridHelper args={[100, 100]} />
        </Canvas>
    </KeyboardControls>
    </div>
)
}