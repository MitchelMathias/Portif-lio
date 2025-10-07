"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true) // Track if current section has dark background
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      isDarkSection ? "rgba(13, 13, 20, 0)" : "rgba(255, 255, 255, 0)",
      isDarkSection ? "rgba(13, 13, 20, 0.95)" : "rgba(255, 255, 255, 0.95)",
    ],
  )

  const navItems = [
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Experiência", href: "#experience" },
    { name: "Contato", href: "#contact" },
  ]

  useEffect(() => {
    const sections = [
      { id: "hero", isDark: true },
      { id: "about", isDark: true },
      { id: "projects", isDark: false },
      { id: "skills", isDark: true },
      { id: "experience", isDark: false },
      { id: "contact", isDark: true },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id)
            if (section) {
              setIsDarkSection(section.isDark)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-500 ${
        isDarkSection ? "border-white/10" : "border-border/50"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a
              href="#"
              className={`text-2xl font-bold transition-colors duration-500 ${
                isDarkSection ? "text-white" : "text-foreground"
              }`}
            >
              MM<span className={isDarkSection ? "text-white" : "text-primary"}>.</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`transition-colors duration-500 relative group ${
                  isDarkSection ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkSection ? "bg-white" : "bg-primary"
                  }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-500 ${isDarkSection ? "text-white" : "text-foreground"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 transition-colors duration-500 ${
                  isDarkSection ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
