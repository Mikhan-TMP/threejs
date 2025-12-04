"use client"

import { useGLTF } from '@react-three/drei'


interface FlowersProps {
    rotation?: [number, number, number]
    scale?: [number, number, number]
    position?: [number, number, number]
}

export const LotusFlower = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/lotus_flower_hat_minecraft_item.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}

export const Flower1 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/low_poly_flower.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}

export const Flower2 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/low_poly_flower(1).glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}
export const Flower3 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/low_poly_flower(2).glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}

export const Flower4 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/low_poly_flowers.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}
export const Flower5 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/low_poly_flowers(1).glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}



export const Flower7 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/lowpoly__flowers.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}

export const Flower8 = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/vervain_low-poly.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}


export const Flower = ({
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    position = [0, 0, 0],
}: FlowersProps) => {
    const { scene } = useGLTF('/Nature/waterlily_stylized_-_low_poly_-_fbx.glb')
    return <primitive object={scene} rotation={rotation} scale={scale} position={position} />
}