import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Rocket, Award, ShieldCheck, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
           badge="Our Story"
           title={
             <>
               Building the future of <span className="text-primary">Academic Planning</span>
             </>
           }
           description="Born at an engineering university, TimetablePro is on a mission to modernize educational administration with cutting-edge AI."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] items-center gap-1.5 px-3 py-1 font-black">
                       <Target className="h-3 w-3" />
                       Our Mission
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                       Empowering educators to focus on excellence, not paperwork.
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                       We believe that administrative friction is the biggest bottleneck to academic innovation. Our tools are designed to remove the complex manual scheduling tasks so that deans, registrars, and faculty can focus on what they do best: teaching and research.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                       Founded in 2022 by a team of engineering professors and AI researchers, TimetablePro has grown from a local project to a global infrastructure serving hundreds of institutions worldwide.
                    </p>
                 </div>
                 <div className="relative">
                    <div className="aspect-[4/5] bg-primary/10 rounded-3xl overflow-hidden border border-border/50 shadow-2xl relative group">
                       <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                          <div className="space-y-2">
                             <p className="font-bold text-xl uppercase tracking-widest text-primary">Est. 2022</p>
                             <p className="text-muted-foreground">From a research project to global infrastructure.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </Container>
        </Section>

        <Section>
           <Container>
              <div className="text-center mb-20 space-y-4">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Core Values</h2>
                 <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    The principles that guide our product, our culture, and our commitment to the academic community.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {[
                   { icon: Rocket, title: "Innovation First", desc: "We push the boundaries of what AI can do for institutional logistics every single day." },
                   { icon: ShieldCheck, title: "Unwavering Accuracy", desc: "In scheduling, 99% isn't enough. We strive for 100% collision-free excellence." },
                   { icon: Heart, title: "Academic Community", desc: "We're not just a vendor; we're part of the educational ecosystem we serve." },
                   { icon: Award, title: "Simplicity in Complexity", desc: "We take the most difficult NP-hard problems and turn them into intuitive clicks." },
                   { icon: Users, title: "User Empowerment", desc: "We build tools that give administrators their weekends back." },
                   { icon: Target, title: "Data Privacy", desc: "Institutional data belongs to the institution. We treat security as a first-class citizen." }
                 ].map((value, i) => (
                   <div key={i} className="space-y-4 group">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                         <value.icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-bold">{value.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                   </div>
                 ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="Become part of our mission"
          description="We're always looking for talented individuals to join our team of academic innovators."
          ctaText="Explore Careers"
          ctaHref="/company/careers"
        />
      </main>

      <Footer />
    </div>
  )
}
