"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import type * as THREE from "three"

export function SkillOrb() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      {/* Central large orb */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Orbiting smaller spheres */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Float key={i} speed={2 + i * 0.3} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[0.3, 32, 32]} position={[x, Math.sin(i) * 0.5, z]}>
              <MeshDistortMaterial
                color={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
                attach="material"
                distort={0.3}
                speed={3}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Float>
        )
      })}
    </group>
  )
}
