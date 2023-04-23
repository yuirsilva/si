import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { FC, useRef } from 'react'
import { Mesh } from 'three'

const Experience: FC = () => {
    const sphere = useRef<Mesh>(null)

    useFrame((_, delta) => {
        if (sphere.current) {
            sphere.current.rotation.y += delta * 0.2
        }
    })

    return <>
        <ambientLight />

        <mesh ref={sphere} position={[3.5, 0, 0]}>
            <icosahedronGeometry args={[2, 20]} />
            <MeshDistortMaterial distort={0.5} speed={3} wireframe color='indigo' />
        </mesh>
    </>
}

export default Experience
