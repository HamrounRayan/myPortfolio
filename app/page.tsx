"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowDownIcon, MailIcon, SendIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for sections to observe
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".reveal")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen subtle-gradient-bg">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <div className="font-semibold text-lg animate-fade-in">HR</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm hover:text-primary transition-colors animate-fade-in animate-delay-100">
              Home
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors animate-fade-in animate-delay-200">
              About
            </a>
            <a
              href="#skills"
              className="text-sm hover:text-primary transition-colors animate-fade-in animate-delay-300"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm hover:text-primary transition-colors animate-fade-in animate-delay-400"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm hover:text-primary transition-colors animate-fade-in animate-delay-500"
            >
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="container pt-24 pb-16">
        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-12">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">Hamroun Rayan</h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in animate-delay-200">
              Computer Science Engineering Student
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                variant="outline"
                asChild
                className="animated-border bg-background hover:bg-secondary/50 transition-all animate-fade-in animate-delay-300"
              >
                <a href="#about" className="flex items-center gap-2">
                  Learn more <ArrowDownIcon className="h-4 w-4 animate-float" />
                </a>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white animate-fade-in animate-delay-400">
                <a href="#contact" className="flex items-center gap-2">
                  Contact me <MailIcon className="h-4 w-4 ml-1 animate-pulse-slow" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-16 scroll-mt-20 reveal">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                My name is Hamroun Rayan, a Computer Science Engineering student at ESI, specializing in full-stack web
                development.
              </p>
              <p className="text-base">
                I work with modern web technologies including React, Node.js, and MongoDB to build responsive and
                scalable applications. My focus is on creating clean, efficient code and intuitive user experiences.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-premium-200 dark:border-premium-800 animate-float">
                <Image src="/images/profile.jpg" alt="Hamroun Rayan" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-16 scroll-mt-20 reveal">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {["C", "JavaScript", "React", "Express.js", "MongoDB", "Git", "Figma"].map((skill, index) => (
              <div
                key={skill}
                className="bg-muted/50 rounded-lg p-4 text-center hover:bg-premium-100 dark:hover:bg-premium-900/30 transition-all hover:scale-105 hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-16 scroll-mt-20 reveal">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid gap-6">
            {/* Khedemni (SKY-2.0) */}
            <Card className="overflow-hidden border border-white/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                <h3 className="text-2xl font-semibold">Khedemni (SKY-2.0)</h3>
              </div>
              <CardContent className="p-6">
                <p className="mb-4">
                  A web platform that helps students find jobs by connecting them with opportunities and employers.
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">Express.js</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">MongoDB</span>
                  </div>
                </div>
                <Button variant="outline" asChild size="sm" className="animated-border hover:bg-white/5">
                  <a
                    href="https://github.com/HamrounRayan/SKY-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* SKY-1.0 */}
            <Card className="overflow-hidden border border-white/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-primary/15 to-primary/5 flex items-center justify-center">
                <h3 className="text-2xl font-semibold">SKY-1.0</h3>
              </div>
              <CardContent className="p-6">
                <p className="mb-4">The first version of the SKY platform, built with vanilla web technologies.</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">HTML</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">CSS</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">JavaScript</span>
                  </div>
                </div>
                <Button variant="outline" asChild size="sm" className="animated-border hover:bg-white/5">
                  <a
                    href="https://github.com/HamrounRayan/SKY-1.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Eclipse */}
            <Card className="overflow-hidden border border-white/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                <h3 className="text-2xl font-semibold">Eclipse</h3>
              </div>
              <CardContent className="p-6">
                <p className="mb-4">
                  A Node.js backend application with a modular architecture for scalable web services.
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">Node.js</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">Express.js</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded">JavaScript</span>
                  </div>
                </div>
                <Button variant="outline" asChild size="sm" className="animated-border hover:bg-white/5">
                  <a
                    href="https://github.com/HamrounRayan/eclipse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-16 scroll-mt-20 reveal">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out to me through any of these platforms or use the contact form to send me a message
                directly.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:or_hamroun@esi.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  or_hamroun@esi.com
                </a>
                <a
                  href="https://github.com/HamrounRayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </div>
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/hamroun_rayan?igsh=ZG85aXdnajF5Nnk0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  Instagram
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-lg border border-white/10 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="transition-all focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="transition-all focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Message subject"
                    required
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    required
                    className="min-h-[120px] transition-all focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <SendIcon className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hamroun Rayan. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/HamrounRayan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hamroun_rayan?igsh=ZG85aXdnajF5Nnk0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
