"use client"
export const ObstacleDebug = () => {
    return (
        <group>
            {obstacles.map((obs, i) => (
                <mesh key={i} position={[obs.x, 0.5, obs.z]}>
                    <boxGeometry args={[obs.width, 1, obs.depth]} />
                    <meshBasicMaterial color="cyan" wireframe />
                </mesh>
            ))}
        </group>
    )
}
export const obstacles = [
    { x: 0, z: -5, width: 2, depth: 2 },
]



