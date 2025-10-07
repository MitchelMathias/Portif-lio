"use client"

import type React from "react"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Palette, GitBranch, BarChart3, Users, Target } from "lucide-react"

const skillCategories = [
  {
    title: "Linguagens & Frameworks",
    icon: Code2,
    skills: ["Python", "JavaScript", "HTML5 & CSS3", "Next.js", "React"],
  },
  {
    title: "Ferramentas & DevOps",
    icon: GitBranch,
    skills: ["Git & GitHub", "Selenium", "APIs REST", "Serverless", "Docker"],
  },
  {
    title: "Data & Analytics",
    icon: BarChart3,
    skills: ["Power BI", "SQL", "Data Analysis", "ETL", "Dashboards"],
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: ["UI/UX Design", "Responsive Design", "Figma", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Liderança", "Trabalho em Equipe", "Comunicação", "Gestão de Projetos", "Mentoria"],
  },
  {
    title: "Competências Estratégicas",
    icon: Target,
    skills: ["Solução de Problemas", "Pensamento Crítico", "Gestão de Tempo", "Tomada de Decisões", "Inovação"],
  },
]

function MagneticSkillCard({ category, categoryIndex, isInView }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * 0.1)
    y.set(distanceY * 0.1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-all duration-500"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-300">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 flex-1">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: categoryIndex * 0.1 + skillIndex * 0.05,
                duration: 0.3,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-sm font-medium text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-default border border-white/10 hover:border-primary/50"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-20 sm:py-32 relative bg-black overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance text-white">
            Habilidades<span className="text-primary">.</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 mb-12 sm:mb-16 text-pretty">
            Tecnologias e competências que domino para criar soluções impactantes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <MagneticSkillCard
                key={category.title}
                category={category}
                categoryIndex={categoryIndex}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
