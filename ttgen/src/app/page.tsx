"use client"

import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  FileText,
  Users,
  Grid,
  AlertTriangle,
  Download,
  BookOpen,
  Sparkles,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  Building2,
  DoorOpen,
  FlaskConical,
} from "lucide-react"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero
          badge="✨ New: v2.0 with AI conflict resolution"
          title={
            <>
              AI-Powered Timetable Automation for <span className="text-primary">Colleges & Universities</span>
            </>
          }
          description="Stop wasting weeks on manual scheduling. Parse syllabus PDFs with AI, manage institutional resources, and generate conflict-free schedules in minutes."
          ctaText="Get Started for Free"
          ctaHref="/register"
          secondaryCtaText="Book a Demo"
          secondaryCtaHref="/company/contact"
          image={
             <div className="aspect-[16/10] sm:aspect-[16/8] w-full bg-zinc-950 flex overflow-hidden border border-zinc-800 relative group/mockup">
                {/* Sidebar Mock */}
                <div className="w-20 sm:w-56 border-r border-zinc-900 bg-zinc-900/50 flex flex-col p-4 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:inline text-sm font-bold tracking-tight">TimetablePro</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { icon: LayoutDashboard, label: 'Overview' },
                      { icon: Building2, label: 'Departments' },
                      { icon: Calendar, label: 'Semesters' },
                      { icon: DoorOpen, label: 'Classrooms' },
                      { icon: FlaskConical, label: 'Labs' },
                      { icon: BookOpen, label: 'Subjects' }
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'text-zinc-500'}`}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="hidden sm:inline text-xs font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Mock Area */}
                <div className="flex-1 flex flex-col">
                  {/* Topbar Mock */}
                  <div className="h-14 border-b border-zinc-900 flex items-center justify-between px-6 bg-zinc-900/20">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-zinc-500">Dashboard</span>
                      <div className="hidden sm:block h-3 w-px bg-zinc-800"></div>
                      <span className="hidden sm:inline text-xs font-medium text-zinc-400">Autumn Semester 2024</span>
                    </div>
                  </div>

                  {/* Content Mock */}
                  <div className="flex-1 p-6 sm:p-10 space-y-8 overflow-hidden">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-bold">University Dashboard</h3>
                      <p className="text-xs text-muted-foreground">Automating your institution's schedule.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { color: 'indigo', label: 'Departments', value: '12' },
                        { color: 'cyan', label: 'Classrooms', value: '45' },
                        { color: 'purple', label: 'Laboratories', value: '08' },
                        { color: 'amber', label: 'Semesters', value: '04' }
                      ].map((item, i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{item.label}</div>
                          <div className="text-2xl font-bold">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="relative border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 p-1 flex-1 min-h-[250px]">
                      <div className="p-6 space-y-4">
                        <div className="h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center px-4 justify-between">
                            <div className="flex items-center gap-4">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold">Advanced Algorithms</span>
                            </div>
                            <Badge variant="outline" className="text-[10px] h-5">Room 402</Badge>
                        </div>
                        <div className="h-12 bg-muted/50 border border-border/50 rounded-xl flex items-center px-4 justify-between">
                            <div className="flex items-center gap-4">
                                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs font-bold text-muted-foreground">Physics Lab I</span>
                            </div>
                            <Badge variant="outline" className="text-[10px] h-5">Lab 01</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          }
        />

        {/* Trusted By Section */}
        <Section variant="transparent" className="py-12 border-y border-border/50 flex flex-col gap-8">
           <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Trusted by 200+ Institutions Worldwide
          </p>
          <ScrollVelocityContainer className="opacity-40">
            <ScrollVelocityRow baseVelocity={1} direction={1} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mx-4">
              Harvard Stanford MIT Oxford Cambridge Eth-Zurich IIT-Bombay NIT-Surat DTU VIT
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </Section>

        {/* Features Overview */}
        <Section id="features">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built by educators, powered by AI. We handle the complexity so you can focus on excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: Calendar, 
                  title: "Instant Generation", 
                  desc: "Create full-semester timetables in seconds using multi-objective optimization." 
                },
                { 
                  icon: FileText, 
                  title: "AI Syllabus Parsing", 
                  desc: "Upload PDF syllabuses and let our AI extract course credits and hours automatically." 
                },
                { 
                  icon: Users, 
                  title: "Faculty Load Balancing", 
                  desc: "Automatically distribute teaching hours fairly across departments and faculty." 
                },
                { 
                  icon: Grid, 
                  title: "Complex Lab Routing", 
                  desc: "Manage shared laboratories and equipment without scheduling overlaps." 
                },
                { 
                  icon: AlertTriangle, 
                  title: "Smart Conflict Engine", 
                  desc: "Real-time alerts for faculty double-booking or classroom capacity issues." 
                },
                { 
                  icon: Download, 
                  title: "Enterprise Export", 
                  desc: "Export formatted PDFs or Excel sheets ready for notices and portal uploads." 
                },
              ].map((feature, i) => (
                <Card key={i} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* How It Works */}
        <Section variant="muted" id="how-it-works">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Automate in 3 Simple Steps</h2>
                <div className="space-y-6">
                  {[
                    { 
                      step: "01", 
                      title: "Upload & AI Parse", 
                      desc: "Upload your syllabus and academic calendar. Our AI extracts requirements instantly." 
                    },
                    { 
                      step: "02", 
                      title: "Configure Constraints", 
                      desc: "Set faculty preferences, classroom capacities, and mandatory lab timings." 
                    },
                    { 
                      step: "03", 
                      title: "Generate & Tweak", 
                      desc: "Run the algorithm, review the score, and make manual adjustments if needed." 
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-2xl font-black text-primary/20 leading-none">{item.step}</div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                   <Button size="lg" className="rounded-full" asChild>
                    <Link href="/register">Start Now</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                 <div className="aspect-square bg-gradient-to-tr from-primary/20 to-cyan-500/20 rounded-full blur-3xl absolute inset-0 -z-10" />
                 <div className="bg-card border border-border/50 rounded-[2.5rem] p-4 shadow-2xl">
                    <div className="aspect-[4/3] bg-zinc-950 rounded-[2rem] flex items-center justify-center border border-zinc-900">
                       <Zap className="h-16 w-16 text-primary animate-pulse" />
                    </div>
                 </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <Section>
          <Container>
             <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Loved by Administrators</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join the league of elite institutions that have transformed their administrative workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="bg-primary/5 border-primary/20 p-8 shadow-none group">
                  <div className="space-y-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-xl italic leading-relaxed text-foreground">
                      "TimetablePro reduced our semester planning time from 3 weeks to just 2 hours. The AI parsing for syllabus PDFs is truly magical."
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-full bg-primary/20" />
                       <div>
                          <p className="font-bold">Dr. Amanda Lee</p>
                          <p className="text-sm text-muted-foreground">Dean, Engineering at Stanford</p>
                       </div>
                    </div>
                  </div>
               </Card>
               <Card className="bg-card border-border/50 p-8 shadow-none">
                  <div className="space-y-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-xl italic leading-relaxed text-foreground">
                      "Handling lab allocations for 1500 students used to be a nightmare. TimetablePro solved it with zero conflicts on the first try."
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-full bg-zinc-800" />
                       <div>
                          <p className="font-bold">Prof. Rajesh Kumar</p>
                          <p className="text-sm text-muted-foreground">Registrar, NIT Trichy</p>
                       </div>
                    </div>
                  </div>
               </Card>
            </div>
          </Container>
        </Section>

        {/* FAQ - (Mini version for landing) */}
        <Section variant="muted">
           <Container variant="narrow">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Common Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "Is the data encrypted?", a: "Yes, all institutional data is encrypted in transit and at rest using AES-256." },
                  { q: "Can we export to Excel?", a: "Every generated schedule can be exported to Excel, CSV, and print-ready PDF." },
                  { q: "Do you support lab scheduling?", a: "Absolutely. Lab capacity and equipment constraints are core to our engine." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-lg font-bold">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
           </Container>
        </Section>

        {/* Final CTA */}
        <CTA 
          title="Ready to automate your institution?"
          description="Join 500+ colleges using TimetablePro to reclaim their time and eliminate scheduling stress."
          ctaText="Generate Your Free Timetable"
        />
      </main>

      <Footer />
    </div>
  )
}

