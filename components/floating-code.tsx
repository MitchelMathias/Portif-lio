"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import type * as THREE from "three"

const codeSnippets = ["{ }", "< />", "=>", "( )", "[ ]", "//"]

export function FloatingCode({ mousePosition }: { mousePosition?: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const mouse = mousePosition || { x: 0, y: 0 }

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mouse.x * 0.3
      groupRef.current.rotation.x = mouse.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {codeSnippets.map((snippet, i) => {
        const angle = (i / codeSnippets.length) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (i % 2) * 0.5 - 0.25

        return (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
              position={[x, y, z]}
              fontSize={0.5}
              color="#4f46e5"
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono-Bold.ttf"
            >
              {snippet}
            </Text>
          </Float>
        )
      })}
    </group>
  )
}
