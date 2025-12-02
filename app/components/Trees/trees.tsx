"use client"

import { useGLTF } from '@react-three/drei'

const useTreeModel = () => {
    return useGLTF('/Nature/low_poly_tree_pack.glb')
}


interface ThreeTreesProps {
    rotation?: [number, number, number]
    scale?: [number, number, number]
    position?: [number, number, number]
}

export const ThreeTrees = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: ThreeTreesProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_109' || name === 'Object_110'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}


interface TreeProps {
    rotation?: [number, number, number]
    scale?: [number, number, number]
    position?: [number, number, number]
}

export const Tree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_106' || name === 'Object_107'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}


export const Tree2 = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_103' || name === 'Object_104'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const BigTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_101' || name === 'Object_100' || name === 'Object_99'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const RoundTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_96' || name === 'Object_95' || name === 'Object_97'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const BigRoundTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_90' || name === 'Object_91' || name === 'Object_92'){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const PineTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_86' || name === 'Object_87' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const BiggerRoundTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_84' || name === 'Object_83' || name === 'Object_82' ){
                    return <primitive key={name} object={node} />
                }   
            })}
        </group>
    )
}

export const Cloud = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_74' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const Cloud2 = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_68' || name === 'Object_69' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const Tree3 = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_64' || name === 'Object_63' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const PineTree2 = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_61' || name === 'Object_60' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const PineTree3 = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (name === 'Object_58' || name === 'Object_57' ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const LeafyTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_53' ||  
                    name === 'branch_wit' || 
                    name === 'Object_51' ||  
                    name === 'branch_w07' ||  
                    name === 'Object_49' ||  
                    name === 'Object_47' ||  
                    name === 'Object_45' ||  
                    name === 'Object_43' ||  
                    name === 'Object_41' ||  
                    name === 'Object_39' ||  
                    name === 'Object_54' || 
                    name === 'Object_55'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const ThinThree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_34' || // 
                    name === 'Object_32' || // 
                    name === 'Object_31' || // 
                    name === 'Leaves_2_3' || // 
                    name === 'Object_29' || // 
                    name === 'Object_28' || // 
                    name === 'Leaves_2_2' || // THIN ASS TREE
                    name === 'Object_26' || // 
                    name === 'Object_25' || // 
                    name === 'Leaves_2_1' || // 
                    name === 'Object_35' || // 
                    name === 'Object_21' || // 
                    name === 'Object_19' || // 
                    name === 'Object_22' 
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const GoodTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_15' || // NC DAMN TREE
                    name === 'Object_14'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}

export const LeavelessTree = ({ 
    rotation = [0,0,0], 
    scale = [0,0,0], 
    position = [0,0,0] 
}: TreeProps) => {
    const { nodes } = useTreeModel()
    return (
        <group rotation={rotation} scale={scale} position={position}>
            {Object.entries(nodes).map(([name, node]) => {
                if (
                    name === 'Object_6' || 
                    name === 'Object_5'
                ){
                    return <primitive key={name} object={node} />
                }
            })}
        </group>
    )
}