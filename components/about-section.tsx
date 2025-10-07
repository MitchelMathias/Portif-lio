"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Rocket, Target, Zap } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Developer",
    description: "Especializado em automação de processos, desenvolvimento de sistemas e gestão de tecnologia",
  },
  {
    icon: Zap,
    title: "Automação & Eficiência",
    description: "Soluções inteligentes que eliminam gargalos, reduzem custos e otimizam operações",
  },
  {
    icon: Target,
    title: "Visão Estratégica",
    description: "Combinação de habilidades técnicas com mentalidade analítica e liderança prática",
  },
  {
    icon: Rocket,
    title: "Inovação & Resultados",
    description: "Transformo ideias em resultados concretos e gero impacto real nos negócios",
  },
]

export function AboutSection() {
  console.log("[v0] AboutSection rendering")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 sm:py-32 relative overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50" />

      <motion.div style={{ y }} className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance text-white">
            Sobre<span className="text-white">.</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 mb-12 sm:mb-16 text-pretty max-w-3xl">
            Desenvolvedor Full Stack com visão estratégica e foco em resultados
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    x: (mousePosition.x - 0.5) * 20,
                    y: (mousePosition.y - 0.5) * 20,
                  }}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                  <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-500 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-500 flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/70 text-pretty leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-white/70">
              <p className="text-pretty">
                Minha experiência combina habilidades técnicas sólidas com mentalidade analítica e liderança prática,
                adquiridas em anos de atuação nos setores logístico nacional e internacional, administrativo e no
                Exército Brasileiro.
              </p>

              <p className="text-pretty">
                Tenho domínio no desenvolvimento de{" "}
                <span className="text-white font-medium">
                  aplicações web, integrações automatizadas, APIs serverless e dashboards em Power BI
                </span>
                , aliando tecnologia e estratégia para fortalecer a tomada de decisão e o desempenho empresarial.
              </p>

              <p className="text-pretty">
                Sou movido por desafios que envolvem{" "}
                <span className="text-white font-medium">inovação, eficiência e crescimento organizacional</span>, e
                acredito que a tecnologia é a ponte entre boa gestão e excelência operacional.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
