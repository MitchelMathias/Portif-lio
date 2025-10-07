"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Torus, Float } from "@react-three/drei"
import type * as THREE from "three"

export function ContactSphere({ mousePosition }: { mousePosition?: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const mouse = mousePosition || { x: 0, y: 0 }

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1 + mouse.x * 0.5
      groupRef.current.rotation.x = mouse.y * 0.3
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3 + mouse.y * 0.2
      torusRef.current.rotation.y = time * 0.2 + mouse.x * 0.3
    }

    if (sphereRef.current) {
      const scale = 1 + Math.sin(time * 0.5) * 0.1 + Math.abs(mouse.x) * 0.2
      sphereRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ec4899" />
      <pointLight position={[0, 10, 5]} intensity={1.5} color="#06b6d4" />

      {/* Central sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={1}
            emissive="#4f46e5"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Torus ref={torusRef} args={[3, 0.3, 16, 100]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
            emissive="#ec4899"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      {/* Small orbiting spheres */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[0.4, 32, 32]} position={[x, 0, z]}>
              <MeshDistortMaterial
                color="#06b6d4"
                attach="material"
                distort={0.4}
                speed={3}
                roughness={0.2}
                metalness={0.8}
                emissive="#06b6d4"
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        )
      })}
    </group>
  )
}
