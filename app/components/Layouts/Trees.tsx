"use client"

import { useGLTF } from '@react-three/drei'
import { ThreeTrees,Tree, Tree2, BigTree, RoundTree, BigRoundTree, PineTree,BiggerRoundTree,Cloud, Cloud2, LeafyTree, Tree3, PineTree2,PineTree3, ThinThree,GoodTree,LeavelessTree  } from '@/app/components/Trees/trees'


export function TreesMain() {
    return (
        <>
            <ThreeTrees rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-95, -.5, 40.5]} />
            <Tree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-102.8, -.5, 28]} />
            <Tree2 rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-33.5, -.3, 25]} />
            <BigTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-60, -.3, 28]}  />
            <RoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 30]}/>
            <BigRoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-68, -.3, 30]} />
            <BiggerRoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 34]} />
            <BiggerRoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-81, -.3, 34]} />
            <Tree3 rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-41, -.3, 39]}/>
            <LeavelessTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-61, -.3, 21]}/>
            <PineTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-62, -.3, 30]}/>
            <PineTree2 />
            <PineTree3 />
            <LeafyTree />
            <ThinThree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-10, -.3, 29]}/>
            <GoodTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-25, -.3, 40.5]}/>
            <RoundTree rotation={[-Math.PI/2, 0, 0]} scale={[0.05, 0.05, 0.05]} position={[-43, -.3, 38]}/>
        </>
    )
}