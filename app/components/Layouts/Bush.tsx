"use client"

import { Bushes, Bushes2, Bushes3, Bushes4, Bushes5 } from '@/app/components/Bushes/bushes'
export function BushMain(){
    return(
        <>
            <Bushes rotation={[0, 0, 0]} scale={[0.3, 0.3, 0.3]} position={[-10, 0, 10]}/>
            <Bushes2 rotation={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} position={[-12, 0, 12]}/>
            <Bushes3 rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[-12, 0, 12]}/>
            {/* <Bushes4 rotation={[0, 0, 0]} scale={[0.004, 0.004, 0.004]} position={[-2, 0, 2]}/> */}
            <Bushes5 rotation={[0, 0, 0]} scale={[1, 1, 1]} position={[-15, 0, 15]}/>


        </>
    )
}