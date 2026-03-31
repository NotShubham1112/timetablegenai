"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import {
  Menu,
  X,
  Calendar,
  FileText,
  Users,
  Grid,
  AlertTriangle,
  Download,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Loader2,
  LayoutDashboard,
  Building2,
  DoorOpen,
  FlaskConical,
  BookOpen,
} from "lucide-react"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity"

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checkUser()

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [supabase])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800">
      {/* Navbar */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? 'py-3' 
            : 'py-6'
        }`}
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl transition-all duration-500 ${
          scrolled 
            ? 'h-14 bg-zinc-950/60 backdrop-blur-xl border border-zinc-700/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'h-16 bg-transparent border-b border-transparent'
        }`}>
          <div className="flex h-full items-center justify-between px-2 md:px-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-indigo-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-indigo-400">TimetablePro</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Features', 'How it Works', 'Pricing', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-all hover:translate-y-[-1px]"
                >
                  {item}
                </Link>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              ) : user ? (
                <Link href="/dashboard">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 h-9 rounded-full font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</Link>
                  <Link href="/register">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 h-9 rounded-full font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button 
              className="md:hidden text-zinc-300 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu using standard absolute div (Fallback to ensure app doesn't crash from missing Sheet component) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-16 h-svh z-40 bg-zinc-950 border-t border-zinc-800 p-6 flex flex-col gap-6">
            <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">Features</Link>
            <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">How it Works</Link>
            <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">Pricing</Link>
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">Contact</Link>
            <div className="h-px bg-zinc-800 w-full my-2" />
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-zinc-500 mx-auto" />
            ) : user ? (
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700" size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">Login</Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700" size="lg">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 container mx-auto px-4 max-w-7xl flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-4 py-1.5 text-sm rounded-full">
            ✨ AI-Powered Automation has arrived
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-4xl leading-tight">
            AI-Powered Timetable Generation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Colleges</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
            Stop wasting weeks on manual scheduling. Parse syllabus PDFs using AI, manage logistics effortlessly, and generate conflict-free schedules in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-12 px-8">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : user ? "Go to Dashboard" : "Generate Timetable"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 bg-transparent hover:bg-zinc-800 text-white h-12 px-8">
              Watch Demo
            </Button>
          </div>

          <div className="mt-20 w-full max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 shadow-2xl backdrop-blur-md">
            <div className="aspect-[16/10] sm:aspect-[16/8] w-full rounded-xl bg-zinc-950 flex overflow-hidden border border-zinc-800 relative group/mockup">
               {/* ── Sidebar Mock ── */}
               <div className="w-20 sm:w-56 border-r border-zinc-800 bg-zinc-900/30 flex flex-col p-3 gap-6">
                 <div className="flex items-center gap-2 px-3">
                   <div className="h-6 w-6 rounded bg-indigo-500 flex items-center justify-center">
                     <Sparkles className="h-4 w-4 text-white" />
                   </div>
                   <span className="hidden sm:inline text-sm font-bold text-white tracking-tight">TimetablePro</span>
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
                     <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${i === 0 ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-500'}`}>
                       <item.icon className="h-4 w-4 shrink-0" />
                       <span className="hidden sm:inline text-xs font-medium">{item.label}</span>
                     </div>
                   ))}
                 </div>
               </div>

               {/* ── Main Mock Area ── */}
               <div className="flex-1 flex flex-col">
                 {/* Topbar Mock */}
                 <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/20">
                   <div className="flex items-center gap-4">
                     <span className="text-xs font-medium text-zinc-400">Dashboard</span>
                     <div className="hidden sm:block h-3 w-px bg-zinc-800"></div>
                     <span className="hidden sm:inline text-xs font-medium text-zinc-600">Overview</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <Users className="h-4 w-4 text-zinc-600" />
                     </div>
                   </div>
                 </div>

                 {/* Content Mock */}
                 <div className="flex-1 p-4 sm:p-10 space-y-8 overflow-hidden">
                   {/* Header/Stats Mock */}
                   <div className="flex flex-col gap-1">
                     <h3 className="text-xl font-bold text-white">Welcome back, MIT!</h3>
                     <p className="text-xs text-zinc-500">Here's what's happening today at your campus.</p>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                       { color: 'indigo', label: 'Departments', value: '12' },
                       { color: 'cyan', label: 'Classrooms', value: '45' },
                       { color: 'purple', label: 'Laboratories', value: '08' },
                       { color: 'amber', label: 'Semesters', value: '04' }
                     ].map((item, i) => (
                       <div key={i} className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4 space-y-2 hover:bg-zinc-900 transition-colors">
                         <div className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full bg-${item.color}-500`}></div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{item.label}</span>
                         </div>
                         <div className="text-2xl font-bold text-white leading-none">{item.value}</div>
                       </div>
                     ))}
                   </div>

                   {/* Grid Mock */}
                   <div className="relative border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 p-1 flex-1 min-h-[300px]">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                     
                     <div className="relative p-6 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-4 w-32 bg-zinc-800 rounded"></div>
                            <div className="h-4 w-8 bg-zinc-800 rounded"></div>
                        </div>

                        {/* Sample Blocks */}
                        <div className="h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center px-4 justify-between group/block hover:bg-indigo-500/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                    <BookOpen className="h-4 w-4 text-indigo-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-indigo-200">Advanced Mathematics</span>
                                    <span className="text-[10px] text-indigo-400/60 font-medium">Room 102 · Prof. Richards</span>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-bold text-zinc-500 tracking-tighter">LIVE</span>
                            </div>
                        </div>

                        <div className="h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center px-4 gap-4 hover:bg-cyan-500/20 transition-colors">
                            <div className="h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <FlaskConical className="h-4 w-4 text-cyan-400" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-cyan-200">Digital Systems Lab</span>
                                <span className="text-[10px] text-cyan-400/60 font-medium">Lab 04 · Prof. Sharma</span>
                            </div>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Shine Effect */}
               <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Trusted By Section (Animated Velocity Scroll) */}
        <section className="border-y border-zinc-800/40 bg-zinc-900/10 py-16 overflow-hidden relative">
          <div className="container mx-auto px-4 max-w-7xl mb-8 relative z-10">
            <p className="text-center text-xs font-bold text-zinc-600 uppercase tracking-[0.2em]">
              Trusted by Engineering Colleges & Universities
            </p>
          </div>
          
          <ScrollVelocityContainer className="opacity-50 hover:opacity-80 transition-opacity duration-700">
            <ScrollVelocityRow 
              baseVelocity={1.2} 
              direction={1} 
              className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white"
            >
              UnivTech NIT Institute Global Engg State University
            </ScrollVelocityRow>
            <ScrollVelocityRow 
              baseVelocity={1.2} 
              direction={-1} 
              className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-indigo-500/90"
            >
              Automation Scheduling AI Timetables Management
            </ScrollVelocityRow>
          </ScrollVelocityContainer>

          {/* Fades for that premium look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-zinc-950 to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-zinc-950 to-transparent z-20"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Our comprehensive suite of tools makes planning semesters easier than ever before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <Calendar className="h-6 w-6 text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Automatic Timetable Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Generate complete departmental timetables in seconds using advanced scheduling algorithms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
                  <FileText className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-xl text-white">Parse Syllabus PDFs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Upload official syllabus PDFs and let our AI extract subjects, credits, and teaching hours automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-white">Manage Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Keep track of faculty availability, workload limits, and subject preferences in one place.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Grid className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Multi-Semester Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Schedule even and odd semesters simultaneously, avoiding global resource constraints.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
                  <AlertTriangle className="h-6 w-6 text-rose-400" />
                </div>
                <CardTitle className="text-xl text-white">Smart Conflict Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Never double-book a professor, classroom, or lab again. Instant alerts for any potential overlaps.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
                  <Download className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-xl text-white">Export PDF/Excel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base">
                  Export ready-to-print schedules formatted perfectly for notice boards, faculty distribution, or portal uploads.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32 bg-zinc-900/30 border-y border-zinc-800/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "Step 1", title: "Upload PDF", desc: "Upload official syllabus PDF for AI parsing." },
                { step: "Step 2", title: "Configure", desc: "Assign faculty, designate labs, and set constraints." },
                { step: "Step 3", title: "Generate", desc: "Click generate and let the core algorithm run." },
                { step: "Step 4", title: "Export", desc: "Review, tweak manually if needed, and export." }
              ].map((item, i) => (
                <div key={i} className="relative">
                  {i !== 3 && <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-gradient-to-r from-indigo-500/50 to-transparent -z-10"></div>}
                  <Card className="bg-zinc-950 border-zinc-800 h-full">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4">
                        <Badge className="bg-indigo-600 hover:bg-indigo-700 font-medium text-white px-3 py-1">
                          {item.step}
                        </Badge>
                      </div>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-zinc-400">{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Choose the plan that best fits your institution&apos;s needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <Card className="bg-zinc-900/50 border-zinc-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Free</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                  ₹0
                </div>
                <CardDescription className="text-zinc-400 mt-2 text-base">Perfect for small departments testing the waters.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-zinc-300">
                  {['1 Timetable Generation', 'Basic Conflict Checking', 'PDF Export only', 'Email Support'].map((feat, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700" variant="secondary">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card className="bg-zinc-900 border-indigo-500/50 shadow-xl shadow-indigo-900/20 relative flex flex-col scale-100 md:scale-105 z-10">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-t-xl"></div>
              <CardHeader>
                <Badge className="w-max mb-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Most Popular</Badge>
                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                  ₹499
                  <span className="ml-1 text-xl font-medium text-zinc-400">/mo</span>
                </div>
                <CardDescription className="text-zinc-400 mt-2 text-base">Everything a full college needs to operate smoothly.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-zinc-300">
                  {['Unlimited Generations', 'AI Syllabus Parsing', 'Advanced Conflict Checking', 'Excel & PDF Export', 'Priority Support'].map((feat, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Start 14-day trial</Button>
              </CardFooter>
            </Card>

            {/* Enterprise */}
            <Card className="bg-zinc-900/50 border-zinc-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Enterprise</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                  Custom
                </div>
                <CardDescription className="text-zinc-400 mt-2 text-base">For university-wide deployment & custom integrations.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-zinc-300">
                  {['Multi-Campus Support', 'Custom ERP Integrations', 'SSO Login', 'Dedicated Account Manager', '24/7 Phone Support'].map((feat, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700" variant="secondary">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-4 max-w-5xl">
          <Card className="bg-gradient-to-br from-indigo-900/40 to-zinc-900/80 border-indigo-500/20 text-center py-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to automate timetables?</h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto text-lg">
              Join dozens of top institutions saving weeks of administrative work. Sign up today and generate your first schedule for free.
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-14 px-10 text-lg">
              Start Free Today <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight text-white">TimetablePro</span>
            </div>
            <p className="text-zinc-400 text-sm mb-6 max-w-xs">
              Next-generation AI scheduling infrastructure for modern educational institutions.
            </p>
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} TimetablePro. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Reviews</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Data Security</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
