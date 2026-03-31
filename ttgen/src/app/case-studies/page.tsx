import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { University, Building2, FlaskConical, TrendingUp, Clock, CheckCircle2 } from "lucide-react"

const caseStudies = [
  {
    institution: "Stanford University",
    department: "School of Engineering",
    title: "Optimizing 4,000+ Students Across 80+ Lab Venues",
    description: "How Stanford Engineering reduced their semester planning time by 75% using TimetablePro's AI Conflict Engine.",
    icon: University,
    metrics: [
      { label: "Plan Time", value: "-75%" },
      { label: "Conflicts", value: "Zero" },
      { label: "Efficiency", value: "+40%" }
    ],
    featured: true,
  },
  {
    institution: "IIT Bombay",
    department: "Physics & Chemistry Labs",
    title: "Managing Shared Laboratory Resources with Precision",
    description: "Complex equipment-based routing for research labs and undergraduate practicals across 12 departments.",
    icon: FlaskConical,
    metrics: [
      { label: "Utilization", value: "+30%" },
      { label: "Manual Hours", value: "-120/mo" }
    ],
    featured: false,
  },
  {
    institution: "University of Manchester",
    department: "Main Campus Administration",
    title: "Consolidating 15 Individual Department Systems",
    description: "Moving from fragmented Excel sheets to a unified, institutional-scale scheduling infrastructure.",
    icon: Building2,
    metrics: [
      { label: "Error Rate", value: "-90%" },
      { label: "Staff Savings", value: "$45k/yr" }
    ],
    featured: false,
  }
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
           badge="Success Stories"
           title={
             <>
               Real impact on <span className="text-primary">Academic Excellence</span>
             </>
           }
           description="Explore how world-class institutions use TimetablePro to solve their most complex scheduling challenges."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                 {caseStudies.filter(cs => cs.featured).map((cs, i) => (
                   <Card key={i} className="bg-background/50 border-primary/20 overflow-hidden shadow-2xl">
                      <div className="flex flex-col lg:flex-row">
                         <div className="lg:w-1/3 bg-primary/5 p-12 flex items-center justify-center border-r border-border/50">
                            <cs.icon className="h-32 w-32 text-primary opacity-20" />
                         </div>
                         <div className="lg:w-2/3 p-12 space-y-8">
                            <div className="space-y-4">
                               <Badge className="bg-primary/10 text-primary uppercase text-[10px] tracking-widest font-black">Featured Story</Badge>
                               <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-widest font-bold">
                                  <cs.icon className="h-4 w-4" />
                                  {cs.institution} · {cs.department}
                               </div>
                               <h2 className="text-3xl md:text-5xl font-black">{cs.title}</h2>
                               <p className="text-xl text-muted-foreground leading-relaxed">{cs.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/50">
                               {cs.metrics.map((metric, j) => (
                                 <div key={j} className="space-y-1">
                                    <div className="text-3xl font-black text-primary">{metric.value}</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </Card>
                 ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                 {caseStudies.filter(cs => !cs.featured).map((cs, i) => (
                   <Card key={i} className="bg-background/50 border-border/50 hover:border-primary/20 transition-all group">
                      <CardHeader>
                         <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest font-bold mb-4">
                            <cs.icon className="h-3 w-3" />
                            {cs.institution}
                         </div>
                         <CardTitle className="text-2xl font-bold">{cs.title}</CardTitle>
                         <CardDescription className="pt-2 text-base">{cs.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                         <div className="flex gap-8 pt-4">
                            {cs.metrics.map((metric, j) => (
                              <div key={j} className="space-y-1">
                                <div className="text-xl font-black text-primary">{metric.value}</div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</div>
                              </div>
                            ))}
                         </div>
                      </CardContent>
                   </Card>
                 ))}
              </div>
           </Container>
        </Section>

        <Section>
           <Container>
              <div className="flex flex-col items-center text-center space-y-8">
                 <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Your institution is next</h2>
                 <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                   Join these world-renowned universities and take control of your academic infrastructure. We've helped over 200 campuses optimize their operations.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full pt-12">
                    {[
                      { icon: Clock, title: "70% Faster Planning", desc: "Reduce total planning hours per semester." },
                      { icon: CheckCircle2, title: "Zero Conflicts", desc: "No double-booked professors or labs." },
                      { icon: University, title: "100% Digital", desc: "Move your entire workflow to the cloud." }
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                         <div className="h-10 w-10 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-4 border border-primary/10">
                            <item.icon className="h-5 w-5 text-primary" />
                         </div>
                         <h4 className="font-bold text-lg">{item.title}</h4>
                         <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </Container>
        </Section>

        <CTA 
          title="See how we can transform your department"
          description="Book a free consultation with our academic specialists today."
          ctaText="Schedule a Call"
          ctaHref="/company/contact"
        />
      </main>

      <Footer />
    </div>
  )
}
