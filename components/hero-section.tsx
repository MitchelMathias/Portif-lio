"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { MagneticButton } from "./magnetic-button"
import { Canvas } from "@react-three/fiber"

const Hero3DScene = dynamic(() => import("./hero-3d-scene"), { ssr: false })

export function HeroSection() {
  console.log("[v0] HeroSection rendering")

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <motion.section
      id="hero"
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute left-0 top-0 w-1/3 h-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <Hero3DScene position="left" />
            </Suspense>
          </Canvas>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <Hero3DScene position="right" />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-primary text-base sm:text-lg mb-4 font-mono tracking-wider"
            >
              Olá, eu sou
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70 px-2 sm:px-4"
            >
              Mitchel Mathias
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mb-8 text-balance px-2"
            >
              Desenvolvedor Full Stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty px-2"
            >
              Especializado em automação de processos, desenvolvimento de sistemas e gestão de tecnologia. Transformando
              ideias em soluções inteligentes que geram impacto real.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex gap-4 sm:gap-6 justify-center flex-wrap px-4"
          >
            <MagneticButton href="/Curriculo.pdf" target="_blank">Currículo</MagneticButton>
            <MagneticButton href="#contact">Entrar em Contato</MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="text-muted-foreground" size={32} />
      </motion.div>
    </motion.section>
  )
}
