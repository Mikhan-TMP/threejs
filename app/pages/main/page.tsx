'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useKeyboardControls, KeyboardControls, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useGLTF, useFBX } from '@react-three/drei'
import { rotate, xor } from 'three/tsl'
import { ThreeTrees,Tree, Tree2, BigTree, RoundTree, BigRoundTree, PineTree,BiggerRoundTree,Cloud, Cloud2, LeafyTree, Tree3, PineTree2,PineTree3, ThinThree,GoodTree,LeavelessTree  } from '@/app/components/Trees/trees'
import { Ground } from '@/app/components/Ground/ground'
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
                <ThreeTrees rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-95, -.5, 40.5]} />
                <Tree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-102.8, -.5, 28]} />
                <Tree2 rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-33.5, -.3, 25]} />
                <BigTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-60, -.3, 28]}  />
                <RoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 30]}/>
                <BigRoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-68, -.3, 30]} />
                {/* <PineTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 30]}/> */}
                <BiggerRoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 30]}/>
                <Cloud rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-50, -.3, 120]} />
                <Cloud2 />
                <Tree3 />
                <PineTree2 />
                <PineTree3 />
                <LeafyTree />
                <ThinThree />
                <GoodTree />
                <LeavelessTree />

                
                {/* Add the debug view here */}
                <ObstacleDebug />

                {/* <gridHelper args={[100, 100]} /> */}
                </Canvas>
            </KeyboardControls>
        </div>
    )
}