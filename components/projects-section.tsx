"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ProjectCard3D } from "./project-card-3d"

const projects = [
  {
    title: "Sistema de Automação Web",
    description:
      "Automatização de consultas a portais (DETRAN), validação de dados, extração de licenciamento/IPVA, atualização automatizada de registros internos, bypass de CAPTCHAs e geração de relatórios auditáveis em Power BI.",
    tags: ["Selenium", "Python", "Power BI", "Automação"],
    gradient: "from-blue-500/20 to-purple-500/20",
    color: "#4f46e5",
  },
  {
    title: "Sistema Web de Gestão",
    description:
      "Sistema web completo com login restrito, CRUD de usuários, formulários dinâmicos e integração Selenium para consultas externas. Deploy modular em ambiente serverless (Vercel).",
    tags: ["Next.js", "Serverless", "Vercel", "Selenium"],
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "#8b5cf6",
  },
  {
    title: "Plataforma de Personalização 3D",
    description:
      "Plataforma onde usuários personalizam produtos com cores, logos e elementos 3D em tempo real, integrando formulários em PHP para pedidos.",
    tags: ["3D", "WebGL", "PHP", "Real-time"],
    gradient: "from-pink-500/20 to-orange-500/20",
    color: "#ec4899",
  },
]

export function ProjectsSection() {
  console.log("[v0] ProjectsSection rendering")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute right-0 top-1/4 w-96 h-96 opacity-30 pointer-events-none hidden lg:block"
      >
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ProjectCard3D color="#4f46e5" />
          </Suspense>
        </Canvas>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">
            Projetos<span className="text-primary">.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 sm:mb-16 text-pretty">
            Alguns dos projetos que desenvolvi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                  <Canvas>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.3} />
                      <pointLight position={[5, 5, 5]} />
                      <ProjectCard3D color={project.color} />
                    </Suspense>
                  </Canvas>
                </div>

                <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-balance">{project.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed text-pretty">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs sm:text-sm bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Github size={20} />
              Ver mais no GitHub
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
