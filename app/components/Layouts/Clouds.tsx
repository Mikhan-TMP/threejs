"use client"
import { useGLTF } from '@react-three/drei'
import { Cloud, Cloud2 } from '@/app/components/Trees/trees'

export function Clouds() {
    return (
        <>
            <Cloud rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-50, -.3, 120]} />
            <Cloud rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-45, -.3, 110]} />
            <Cloud2 rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-50, -.3, 120]}/>
        </>
    )
}