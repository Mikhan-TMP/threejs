"use client"

import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

interface BushProps {
    rotation?: [number, number, number]
    scale?: [number, number, number]
    position?: [number, number, number]
}

export const Bushes = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0], 
    position = [0, 0, 0],
}: BushProps) => {
    const { scene } = useGLTF('/Nature/low_poly_bushes.glb')
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <primitive object={cloned} rotation={rotation} scale={scale} position={position} />
    )
}

export const Bushes2 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: BushProps) => {
    const { scene } = useGLTF('/Nature/low_poly_bush_winter_03.glb')
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <primitive object={cloned} rotation={rotation} scale={scale} position={position} />
    )
}

export const Bushes3 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: BushProps) => {
    const { scene } = useGLTF('/Nature/stylized_bush.glb')
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <primitive object={cloned} rotation={rotation} scale={scale} position={position} />
    )
}


export const Bushes4 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: BushProps) => {
    const { scene } = useGLTF('/Nature/bush_1_-_low_poly.glb')
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <primitive object={cloned} rotation={rotation} scale={scale} position={position} />
    )
}

export const Bushes5 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: BushProps) => {
    const { scene } = useGLTF('/Nature/big_low_poly_bush.glb')
    const cloned = useMemo(() => scene.clone(true), [scene])    
    return (
        <primitive object={cloned} rotation={rotation} scale={scale} position={position} />
    )
}