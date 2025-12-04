"use client"

import { useGLTF } from '@react-three/drei'
import { Flower1, Flower2, Flower3, Flower4, Flower5, Flower7, Flower8, LotusFlower } from '../Flowers/flowers'

export function FlowersLayout(){
    return(
        <>
        <Flower1 position={[-8,0,-5]} scale={[0.1,0.1,0.1]} rotation={[0,Math.PI/4,0]}/>
        <Flower2 position={[-6,0,-7]} scale={[0.1,0.1,0.1]} rotation={[0,Math.PI/3,0]}/>
        <LotusFlower position={[-9,0,-8]} scale={[0.5,0.5,0.5]} rotation={[0,Math.PI/2,0]}/>
        <Flower4 position={[-5,0,-5]} scale={[0.01,0.01,0.01]} rotation={[0,0,0]}/>
        <Flower5 position={[-4,0,-8]} scale={[1,1,1]} rotation={[0,Math.PI/5,0]}/>
        <Flower7 position={[-6,-0.3,-4]} scale={[0.005,0.005,0.005]} rotation={[0,Math.PI/9,0]}/>
        <Flower8 position={[-7,0,-6]} scale={[0.002,0.002,0.002]} rotation={[0,Math.PI/10,0]}/>
        </>
    )
}