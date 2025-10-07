"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei"
import * as THREE from "three"

export default function Hero3DScene({ position }: { position: "left" | "right" }) {
  const { mouse } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const sphere1Ref = useRef<THREE.Mesh>(null)
  const sphere2Ref = useRef<THREE.Mesh>(null)

  const xOffset = position === "left" ? -2 : 2

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.05)
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.z = time * 0.2
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.rotation.z = -time * 0.15
    }
  })

  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

      <group ref={groupRef} position={[xOffset, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere ref={sphere1Ref} args={[1.2, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#4f46e5"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          <Sphere ref={sphere2Ref} args={[0.4, 32, 32]} position={[position === "left" ? 1.5 : -1.5, 1, -1]}>
            <MeshDistortMaterial
              color="#8b5cf6"
              attach="material"
              distort={0.3}
              speed={3}
              roughness={0.3}
              metalness={0.6}
            />
          </Sphere>
        </Float>
      </group>
    </>
  )
}
