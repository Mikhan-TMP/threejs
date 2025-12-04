'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useKeyboardControls, KeyboardControls, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useGLTF, useFBX } from '@react-three/drei'
import { rotate, xor } from 'three/tsl'
import { Ground } from '@/app/components/Ground/ground'
import { TreesMain } from '@/app/components/Layouts/Trees'
import { Clouds } from '@/app/components/Layouts/Clouds'
import { obstacles } from '@/app/components/Ground/obstacles'
import { Character } from '@/app/components/Character/character'
import { Controls } from '@/app/components/Character/controls'
import { ObstacleDebug } from '@/app/components/Ground/obstacles'


export default function Main() {
const debugRef = useRef<HTMLDivElement>(null)
    const map = [
        { name: Controls.forward, keys: ['ArrowUp', 'w', 'W'] },
        { name: Controls.backward, keys: ['ArrowDown', 's', 'S'] },
        { name: Controls.left, keys: ['ArrowLeft', 'a', 'A'] },
        { name: Controls.right, keys: ['ArrowRight', 'd', 'D'] },
        { name: Controls.run, keys: ['Shift'] },
        { name: Controls.crouch, keys: ['Control'] },
        { name: Controls.jump, keys: [' '] },
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
                <Ground />
                {/* <TreesMain /> */}

                <Clouds />
                {/* <GrassMain /> */}
                {/* <BushMain /> */}
                {/* <FlowersLayout /> */}
                {/* Add the debug view here */}
                <ObstacleDebug />

                {/* <gridHelper args={[100, 100]} /> */}
                </Canvas>
            </KeyboardControls>
        </div>
    )
}