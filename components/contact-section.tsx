"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ContactSphere } from "./contact-sphere"
import { MagneticButton } from "./magnetic-button"

export function ContactSection() {
  console.log("[v0] ContactSection rendering")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mitchel.mathias.dev@gmail.com",
      href: "mailto:mitchel.mathias.dev@gmail.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(55) 53 991431660",
      href: "https://wa.me/5553991431660",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Bagé-RS, Brasil",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 sm:py-32 relative bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ y }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[600px] sm:h-[800px] pointer-events-none opacity-80"
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ContactSphere mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance text-center text-white">
            Vamos Conversar<span className="text-white">?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 mb-12 sm:mb-16 text-center text-pretty">
            Estou sempre aberto a novos projetos e oportunidades
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative p-4 sm:p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-white">{info.label}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-primary transition-colors break-words text-xs sm:text-sm block"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/70 break-words text-xs sm:text-sm">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic-btn flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border-2 border-white/30 hover:border-primary hover:bg-white/20 transition-colors text-white"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <MagneticButton href="mailto:mitchel.mathias.dev@gmail.com">Enviar Email</MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 sm:mt-16 text-center text-white/60 text-xs sm:text-sm"
          >
            <p>© 2025 Mitchel Mathias. Todos os direitos reservados.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
