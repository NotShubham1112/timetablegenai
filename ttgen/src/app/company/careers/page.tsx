import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { 
  Briefcase, 
  Coffee, 
  Zap, 
  Globe, 
  Heart, 
  MapPin, 
  Users2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    title: "Flexible Work",
    description: "Fully remote or hybrid options to fit your lifestyle.",
    icon: Globe,
  },
  {
    title: "Healthcare",
    description: "Comprehensive medical and dental insurance plans.",
    icon: Heart,
  },
  {
    title: "Modern Tech Stack",
    description: "Work with AI, Next.js, and high-performance infra.",
    icon: Zap,
  },
  {
    title: "Coffee & Snacks",
    description: "Unlimited fuel for your productivity at our hubs.",
    icon: Coffee,
  },
  {
    title: "Global Team",
    description: "Collaborate with talented individuals across 10+ countries.",
    icon: Users2,
  },
  {
    title: "Growth Fund",
    description: "Annual budget for courses, books, and conferences.",
    icon: Briefcase,
  },
]

const openRoles = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Account Executive (Higher Ed)",
    department: "Sales",
    location: "Mumbai / Bangalore",
    type: "Full-time",
  },
]

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Careers Hero */}
        <Section className="bg-muted/10 pt-24 pb-16 border-b text-center overflow-hidden relative">
           <div className="absolute top-0 left-0 p-32 text-primary/5 italic font-black text-9xl select-none uppercase pointer-events-none">
              Build
           </div>
           <Container variant="narrow">
              <Badge variant="outline" className="px-3 py-1 font-bold text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] mb-8">
                 Careers at TimetablePro
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Join the Team Building the Future of Education</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
                 "We are a mission-driven team of engineers, designers, and educators 
                 reimagining how campuses operate globally."
              </p>
              <div className="pt-10 flex justify-center gap-4">
                 <Button size="lg" className="rounded-full px-8 font-bold shadow-lg shadow-primary/20" asChild>
                    <Link href="#roles">View Open Roles</Link>
                 </Button>
              </div>
           </Container>
        </Section>

        {/* Culture Section */}
        <Section>
           <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Our Culture is our Product</h2>
                    <p className="text-lg text-muted-foreground italic border-l-4 pl-6 border-primary/20">
                       "At TimetablePro, we value autonomous ownership, radical transparency, 
                       and an obsession with institutional efficiency. We don't just solve 
                       logistical problems; we build tools that empower thousands."
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                       <div className="space-y-2">
                          <h4 className="font-bold flex items-center gap-2 text-primary">
                             <Users2 className="h-4 w-4" />
                             Team First
                          </h4>
                          <p className="text-sm text-muted-foreground">Collaborative environment where every voice matters.</p>
                       </div>
                       <div className="space-y-2">
                          <h4 className="font-bold flex items-center gap-2 text-primary">
                             <Zap className="h-4 w-4" />
                             Impact Driven
                          </h4>
                          <p className="text-sm text-muted-foreground">Work on problems that have real-world consequences for education.</p>
                       </div>
                    </div>
                 </div>
                 <div className="aspect-[4/3] bg-muted border border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center p-12 overflow-hidden shadow-sm relative group">
                    <div className="text-sm font-bold text-muted-foreground/30 italic uppercase tracking-tighter select-none">OFFICE LIFE PREVIEW</div>
                    <div className="absolute inset-x-8 bottom-8 p-4 bg-background/80 backdrop-blur rounded-lg border shadow-lg text-[10px] font-bold text-center">
                       TEAM OFF-SITE 2024 - GOA
                    </div>
                 </div>
              </div>
           </Container>
        </Section>

        {/* Benefits Grid */}
        <Section variant="muted" className="border-y">
           <Container>
              <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                 <h2 className="text-3xl font-bold tracking-tight">Perks & Benefits</h2>
                 <p className="text-muted-foreground font-medium italic">We take care of our team so they can focus on making institutional impact.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {benefits.map((benefit, i) => (
                    <Card key={i} className="bg-background border-muted shadow-sm group hover:scale-[1.02] transition-transform">
                       <CardHeader>
                          <div className="mb-4 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                             <benefit.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                       </CardContent>
                    </Card>
                 ))}
              </div>
           </Container>
        </Section>

        {/* Open Roles */}
        <Section id="roles">
           <Container>
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                 <div className="max-w-xl space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">Current Openings</h2>
                    <p className="text-lg text-muted-foreground italic">Find your next role with us. We're always looking for brilliant minds.</p>
                 </div>
                 <Badge variant="outline" className="px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] border-primary/20 text-primary bg-primary/5 rounded-full mb-1">
                    {openRoles.length} Open Positions
                 </Badge>
              </div>
              <div className="space-y-4">
                 {openRoles.map((role, i) => (
                    <Link key={i} href="#" className="group flex flex-col md:flex-row justify-between items-center p-6 border rounded-2xl bg-background hover:border-primary/50 hover:bg-muted/30 transition-all shadow-sm">
                       <div className="space-y-1 text-center md:text-left">
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{role.title}</h4>
                          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                             <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {role.department}
                             </span>
                             <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {role.location}
                             </span>
                             <span className="flex items-center gap-1 border-l pl-4 md:border-none md:pl-0">
                                {role.type}
                             </span>
                          </div>
                       </div>
                       <Button variant="ghost" className="mt-6 md:mt-0 px-8 py-6 rounded-full font-bold group bg-muted md:bg-transparent border md:border-none hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                       </Button>
                    </Link>
                 ))}
              </div>
           </Container>
        </Section>

        {/* Closing CTA */}
        <Section className="pb-32 pt-20">
           <Container variant="narrow">
              <div className="text-center space-y-8 bg-muted/30 border border-dashed border-primary/30 p-12 md:p-20 rounded-[3rem] shadow-xl relative overflow-hidden">
                 <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Don't see a fit?</h2>
                 <p className="text-xl text-muted-foreground font-medium italic max-w-lg mx-auto leading-relaxed">
                    "We're always interested in meeting passionate individuals. Send us 
                    an open application and let's start a conversation."
                 </p>
                 <div className="pt-6">
                    <Button variant="outline" size="xl" className="px-10 h-14 rounded-full font-bold shadow-md hover:shadow-xl transition-all border-muted-foreground/30">
                       General Application &rarr;
                    </Button>
                 </div>
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
