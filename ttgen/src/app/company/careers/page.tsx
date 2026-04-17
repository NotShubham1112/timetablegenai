import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const jobs = [
  {
    title: "Senior AI Researcher",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Lead our core genetic algorithm and conflict engine initiatives.",
    featured: true,
  },
  {
    title: "SaaS Product Designer",
    department: "Product",
    location: "London / Hybrid",
    type: "Full-time",
    description: "Design intuitive interfaces for complex institutional dashboard datasets.",
    featured: false,
  },
  {
    title: "Academics Success Manager",
    department: "Operations",
    location: "New York / Hybrid",
    type: "Full-time",
    description: "Help university registrars successfully implement Slotify.",
    featured: false,
  },
  {
    title: "Full Stack Engineer (Next.js)",
    department: "Engineering",
    location: "Remote (US/EU Timezones)",
    type: "Contract",
    description: "Build out the next generation of our institutional collaboration suite.",
    featured: false,
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
           badge="Work With Us"
           title={
             <>
               Build the future of <span className="text-primary">Global Education</span>
             </>
           }
           description="Join a team of mission-driven engineers, designers, and educators reinventing how the world manages its academic infrastructure."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center mb-24">
                 {[
                   { title: "Remote-First", desc: "Work from anywhere in the world with flexible hours." },
                   { title: "Generous Equity", desc: "Every Slotify team member is an owner." },
                   { title: "Health & Wellness", desc: "Comprehensive insurance and wellness stipends." },
                   { title: "Learning Fund", desc: "Yearly budget for books, courses, and conferences." }
                 ].map((perk, i) => (
                   <div key={i} className="space-y-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-lg">{perk.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Open Positions</h2>
                 <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We're scaling fast and looking for passionate individuals to help us build.</p>
              </div>

              <div className="grid gap-6">
                 {jobs.map((job, i) => (
                   <Card key={i} className={cn(
                     "bg-background/50 border-border/50 hover:border-primary/20 transition-all group",
                     job.featured && "border-primary/10 bg-primary/5"
                   )}>
                      <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-8">
                         <div className="space-y-3">
                            <div className="flex items-center gap-3">
                               <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                               {job.featured && <Badge className="bg-primary hover:bg-primary">Urgent</Badge>}
                            </div>
                            <CardDescription className="text-base italic leading-relaxed">{job.description}</CardDescription>
                            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                               <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</div>
                               <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {job.type}</div>
                               <Badge variant="outline">{job.department}</Badge>
                            </div>
                         </div>
                         <Button className="rounded-full shadow-lg h-12 px-8 font-bold group" asChild>
                            <Link href="#">
                               Apply Now
                               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                         </Button>
                      </div>
                   </Card>
                 ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="Don't see the right role?"
          description="If you're passionate about our mission but don't see a match, we'd still love to hear from you."
          ctaText="Send Open Application"
        />
      </main>

      <Footer />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
