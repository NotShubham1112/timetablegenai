import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, CheckCircle } from "lucide-react"

const reviews = [
  {
    author: "Dr. Robert Chen",
    role: "Department Head",
    institution: "IIT Delhi",
    content: "The syllabus AI is a game-changer. We used to spend weeks manually counting credits and contact hours. TimetablePro does it in seconds with perfect accuracy.",
    rating: 5,
    featured: true,
  },
  {
    author: "Sarah Jenkins",
    role: "Academic Registrar",
    institution: "University of Manchester",
    content: "Scheduling for 5,000+ students across multiple buildings was always a nightmare. The conflict resolution engine in TimetablePro is the best we've ever used.",
    rating: 5,
    featured: false,
  },
  {
    author: "Prof. Maria Garcia",
    role: "Dean of Faculty",
    institution: "Technological University of Madrid",
    content: "TimetablePro respects our faculty preferences while ensuring zero overlaps. Our professor satisfaction scores have increased by 40% since implementation.",
    rating: 5,
    featured: false,
  },
  {
    author: "James Wilson",
    role: "IT Director",
    institution: "Sydney Institute of Technology",
    content: "The API-first approach allowed us to integrate TimetablePro with our existing ERP in less than a week. Highly recommended for large scale institutions.",
    rating: 5,
    featured: true,
  },
  {
    author: "Linda Thompson",
    role: "Scheduling Coordinator",
    institution: "Toronto Metro University",
    content: "We've tried every legacy scheduling software on the market. TimetablePro is the only one that actually understands how modern universities operate.",
    rating: 5,
    featured: false,
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
          badge="Wall of Love"
          title={
            <>
              Trusted by <span className="text-primary">Academic Leaders</span>
            </>
          }
          description="See how institutions around the world are transforming their administrative workflows with TimetablePro."
        />

        <Section variant="muted">
          <Container>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {reviews.map((review, i) => (
                <Card key={i} className={cn(
                  "break-inside-avoid bg-background/50 border-border/50 hover:border-primary/30 transition-all group",
                  review.featured && "md:col-span-2 border-primary/20 bg-primary/5"
                )}>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex gap-1">
                         {[...Array(review.rating)].map((_, j) => (
                           <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                         ))}
                       </div>
                       <Quote className="h-8 w-8 text-muted-foreground/20 group-hover:text-primary/20 transition-colors" />
                    </div>
                    
                    <p className="text-lg leading-relaxed italic text-foreground">
                      "{review.content}"
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                       <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 flex items-center justify-center font-bold text-primary">
                          {review.author.charAt(0)}
                       </div>
                       <div>
                          <div className="flex items-center gap-2">
                             <p className="font-bold">{review.author}</p>
                             <CheckCircle className="h-3 w-3 text-primary fill-primary/10" title="Verified User" />
                          </div>
                          <p className="text-sm text-muted-foreground">{review.role} at {review.institution}</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
           <Container>
              <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/10">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {[
                      { value: "98%", label: "Satisfaction Rate" },
                      { value: "500k+", label: "Slots Optimized" },
                      { value: "200+", label: "Universities" },
                      { value: "15+", label: "Countries" }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-2">
                         <div className="text-4xl md:text-5xl font-black text-primary">{stat.value}</div>
                         <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </Container>
        </Section>

        <CTA 
          title="Join the community of efficient educators"
          description="Stop manual scheduling today. Your teachers and students will thank you."
          ctaText="Start Free Today"
        />
      </main>

      <Footer />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
