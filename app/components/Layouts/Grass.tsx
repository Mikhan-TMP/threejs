"use client"

import { Grass, GrassClump } from '@/app/components/Grass/grass'

export function GrassMain(){
    return(
    <>
        <GrassPatch position={[-2.8, 0, 0]} />
        <GrassPatch position={[-2.8, 0, 4]} />
        <GrassPatch position={[-2.8, 0, 8]} />
        <GrassPatch position={[-2.8, 0, 12]} />
        <GrassPatch position={[0.5, 0, 13]} />
        <GrassPatch position={[3.5, 0, 13]} />
        <GrassPatch position={[5.5, 0, 14]} />
        <GrassPatch position={[8.5, 0, 14]} />
        <GrassPatch position={[11.5, 0, 14]} />
        <GrassPatch position={[14.5, 0, 14]} />
        <GrassPatch position={[17.5, 0, 14]} />
        <GrassPatch position={[20.5, 0, 14]} />






        <GrassPatch position={[3.5, 0, 1.2]} />
        <GrassPatch position={[4.5, 0, 5]} />
        <GrassPatch position={[4.5, 0, 5.7]} />
        <GrassPatch position={[7, 0, 7]} />
        <GrassPatch position={[11, 0, 7]} />
        <GrassPatch position={[14, 0, 7]} />
        <GrassPatch position={[17, 0, 7]} />
        <GrassPatch position={[20, 0, 7]} />
        <GrassPatch position={[22, 0, 7]} />
        <GrassPatch position={[25, 0, 7]} />
        <GrassPatch position={[27, 0, 7]} />
        <GrassPatch position={[27, 0, 11]} />
        <GrassPatch position={[27, 0, 15]} />
        <GrassPatch position={[27, 0, 19]} />
        <GrassPatch position={[27, 0, 23]} />
        







        {/* <GrassPatch position={[10, 0, 3]} />
        <GrassPatch position={[4, 0, -4]} />
        <GrassPatch position={[-6, 0, -2]} />
        <GrassPatch position={[-10, 0, -5]} /> */}

    </>
    )
}

interface GrassPatchProps {
    position?: [number, number, number];
}

const GrassPatch = ({ position = [0, 0, 0] }: GrassPatchProps) => {
    return (
        <group position={position}>
            <Grass rotation={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} position={[0, 0, 0]} />
            <Grass rotation={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} position={[0.3, 0, 0.3]} />
            <Grass rotation={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.2, 0, 0.8]} />
            <Grass rotation={[0, 0, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.7, 0, 1.3]} />
            <Grass rotation={[0, 0.3, 0]} scale={[0.01, 0.01, 0.01]} position={[0.6, 0, 1.1]} />
            <Grass rotation={[0, -0.5, 0]} scale={[0.01, 0.01, 0.01]} position={[-1.0, 0, -0.2]} />
            <Grass rotation={[0, 0.8, 0]} scale={[0.01, 0.01, 0.01]} position={[0.2, 0, 1.6]} />
            <Grass rotation={[0, -0.2, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.4, 0, 0.2]} />
            <Grass rotation={[0, 0.6, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.1, 0, 2.1]} />
            <Grass rotation={[0, -0.7, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.8, 0, 0.5]} />
            <Grass rotation={[0, 0.4, 0]} scale={[0.01, 0.01, 0.01]} position={[0.4, 0, 1.8]} />
            <Grass rotation={[0, -0.3, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.3, 0, -0.4]} />
            <Grass rotation={[0, 0.9, 0]} scale={[0.01, 0.01, 0.01]} position={[0.1, 0, 0.9]} />
            <Grass rotation={[0, -0.6, 0]} scale={[0.01, 0.01, 0.01]} position={[-0.6, 0, 1.9]} />
            <Grass rotation={[0, 0.2, 0]} scale={[0.01, 0.01, 0.01]} position={[0.5, 0, 0.2]} />
        </group>
    )
}