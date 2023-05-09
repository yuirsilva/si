import { useFrame } from '@react-three/fiber'
import { GradientTexture, MeshDistortMaterial } from '@react-three/drei'
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

        <mesh ref={sphere} position={[8, 0, 0]}>
            <dodecahedronGeometry args={[3, 80]} />
            <MeshDistortMaterial
                distort={0.5}
                speed={5}
            >
                <GradientTexture stops={[0.2, 0.6, 0.8]} colors={['#3730A3', '#FFFFFF', '#3730A3']} size={100} />
            </MeshDistortMaterial>
        </mesh>
    </>
}

export default Experience
