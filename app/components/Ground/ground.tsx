"use client"

export const  Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial color="#402905" />
        </mesh>
    )
}