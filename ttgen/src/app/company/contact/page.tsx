import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Globe, Headphones, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
           badge="Get in Touch"
           title={
             <>
               Let's talk about <span className="text-primary">Academic Innovation</span>
             </>
           }
           description="Have questions about TimetablePro? Our academic infrastructure experts are ready to help."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="space-y-12">
                    <div className="space-y-6">
                       <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">We're here to help you scale.</h2>
                       <p className="text-lg text-muted-foreground leading-relaxed">
                          Whether you're a small department or a large university system, our team is ready to provide a customized walkthrough of our platform.
                       </p>
                    </div>

                    <div className="grid gap-8">
                       {[
                         { icon: Headphones, title: "Technical Support", desc: "For help with existing implementations.", contact: "support@timetablepro.com" },
                         { icon: MessageSquare, title: "Sales Inquiries", desc: "For enterprise pricing and demo requests.", contact: "sales@timetablepro.com" },
                         { icon: MapPin, title: "Our Headquarters", desc: "Visit us at our global office.", contact: "123 Academic Way, London" }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-6 items-start group">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                               <item.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="font-bold text-lg">{item.title}</h4>
                               <p className="text-sm text-muted-foreground">{item.desc}</p>
                               <p className="font-bold text-primary pt-2">{item.contact}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <Card className="bg-background/50 border-border/50 shadow-2xl p-4 md:p-8">
                    <form className="space-y-6">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="firstName">First Name</label>
                             <Input id="firstName" placeholder="John" className="rounded-xl h-12 bg-muted/20 border-border/50" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="lastName">Last Name</label>
                             <Input id="lastName" placeholder="Doe" className="rounded-xl h-12 bg-muted/20 border-border/50" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">Email Address</label>
                          <Input id="email" type="email" placeholder="john@university.edu" className="rounded-xl h-12 bg-muted/20 border-border/50" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="institution">Institution Name</label>
                          <Input id="institution" placeholder="Stanford University" className="rounded-xl h-12 bg-muted/20 border-border/50" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="message">Message</label>
                          <Textarea id="message" placeholder="How can we help your department?" className="rounded-xl min-h-[150px] bg-muted/20 border-border/50" />
                       </div>
                       <Button className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20">Send Inquiry</Button>
                    </form>
                 </Card>
              </div>
           </Container>
        </Section>

        <Section>
           <Container>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center opacity-50">
                 {[
                   { icon: Globe, label: "London, UK" },
                   { icon: Globe, label: "Mumbai, India" },
                   { icon: Globe, label: "New York, USA" },
                   { icon: Globe, label: "Singapore" }
                 ].map((loc, i) => (
                   <div key={i} className="flex flex-col items-center gap-2">
                      <loc.icon className="h-6 w-6 text-primary" />
                      <span className="font-bold uppercase tracking-widest text-sm">{loc.label}</span>
                   </div>
                 ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="Looking for the login page?"
          description="If you're an existing customer, click below to access your institutional dashboard."
          ctaText="Go to Dashboard"
          ctaHref="/login"
        />
      </main>

      <Footer />
    </div>
  )
}
