"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Desenvolvedor de Sistemas / T.I",
    company: "Dachery Transporte Logística LTDA",
    period: "Abr. 2025 - Atual",
    description: [
      "Desenvolvimento de sistemas de automação para otimizar processos repetitivos e demorados, aumentando a produtividade da equipe administrativa.",
      "Construção de dashboards em Power BI para acompanhamento de desempenho da frota e indicadores logísticos.",
      "Gestão de T.I, incluindo contato direto com suporte técnico do sistema para correção de bugs e otimização de processos.",
      "Controle de frota (multas, licenças, IPVA, transferências e processos relacionados).",
      "Emissão de documentos internacionais: manifesto, associação, averbação, oficialização e manifestação no Siscomex.",
    ],
  },
  {
    type: "work",
    title: "Militar",
    company: "Exército Brasileiro",
    period: "Mar. 2017 - Fev. 2025",
    description: [
      "Liderança em situações críticas e suporte em operações de alta responsabilidade, como segurança presidencial em 2020.",
      "Treinamento de militares em sistemas complexos, capacitando profissionais para desempenho estratégico.",
    ],
  },
]

const education = [
  {
    degree: "Análise e Desenvolvimento de Sistemas",
    institution: "Universidade Unicesumar",
    period: "2024 – 2026 (em andamento)",
  },
  {
    degree: "Especialização Desenvolvimento de Sistemas",
    institution: "Universidade EBAC",
    period: "2023 – 2025",
  },
]

export function ExperienceSection() {
  console.log("[v0] ExperienceSection rendering")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">
            Experiência<span className="text-primary">.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 sm:mb-16 text-pretty">
            Minha trajetória profissional e acadêmica
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Work Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={24} />
                <h3 className="text-2xl sm:text-3xl font-bold">Experiência Profissional</h3>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="relative pl-6 sm:pl-8 border-l-2 border-primary/30"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <div className="mb-2">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">{exp.title}</h4>
                      <p className="text-sm sm:text-base text-primary font-medium">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-xs sm:text-sm leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={24} />
                <h3 className="text-2xl sm:text-3xl font-bold">Formação Acadêmica</h3>
              </div>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="relative pl-6 sm:pl-8 border-l-2 border-primary/30"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">{edu.degree}</h4>
                      <p className="text-sm sm:text-base text-primary font-medium">{edu.institution}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{edu.period}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Courses */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mt-12"
                >
                  <h4 className="text-lg sm:text-xl font-bold mb-4">Cursos Complementares</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Python (120h)",
                      "HTML5 e CSS3 (200h)",
                      "JavaScript (40h)",
                      "Lógica de Programação (240h)",
                      "Git e GitHub (40h)",
                    ].map((course) => (
                      <div key={course} className="px-4 py-2 bg-secondary rounded-lg text-xs sm:text-sm text-center">
                        {course}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
