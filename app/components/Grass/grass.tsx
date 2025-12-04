"use client"

import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

const useGrassModel = () => {
    useGLTF.preload('/Nature/low_poly_grass_pack.glb')
    return useGLTF('/Nature/low_poly_grass_pack.glb')
}

interface GrassProps {
    rotation?: [number, number, number]
    scale?: [number, number, number]
    position?: [number, number, number]
}

export const Grass = ({
    rotation = [0, 0, 0],
    scale = [1, 1, 1], // use 1s so it's visible
    position = [0, 0, 0],
}: GrassProps) => {
    const { scene } = useGrassModel()

    const cloned = useMemo(() => scene.clone(true), [scene])

    return (
        <group rotation={rotation} scale={scale} position={position}>
        {/* Render the imported GLTF */}
        <primitive object={cloned} />
        </group>
    )
}

const useGrassModelClump = () => {
  // Preload the model once
    useGLTF.preload('/Nature/low_poly_grass_clump.glb')
    return useGLTF('/Nature/low_poly_grass_clump.glb')
}

export const GrassClump = ({
    rotation = [0, 0, 0],
    scale = [1, 1, 1], // use 1s so it's visible
    position = [0, 0, 0],
}: GrassProps) => {
    const { scene } = useGrassModelClump()
    // Optional: clone the scene so multiple instances can be added safely
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <group rotation={rotation} scale={scale} position={position}>
        {/* Render the imported GLTF */}
        <primitive object={cloned} />
        </group>
    )
}   