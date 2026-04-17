import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ShieldCheck, Lock, EyeOff, Server, Database, Key } from "lucide-react"

export default function DataSecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Hero
           badge="Enterprise Trust"
           title={
             <>
               Your data is <span className="text-primary">Sovereign</span>
             </>
           }
           description="We implement industry-leading security protocols to ensure your institutional data remains private and protected at all times."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { icon: Lock, title: "AES-256 Encryption", desc: "All institutional data is encrypted at rest using industry-standard AES-256 protocols." },
                   { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Our infrastructure and processes are regularly audited for compliance with global security standards." },
                   { icon: EyeOff, title: "Zero-Knowledge Parsing", desc: "Our AI extraction tools process documents in a secure, ephemeral environment." },
                   { icon: Server, title: "EU/US Data Residency", desc: "Institutions can choose where their primary data archives are physically stored." },
                   { icon: Database, title: "Point-in-Time Recovery", desc: "Continuous backups allow us to restore data and configurations instantly." },
                   { icon: Key, title: "SSO & RBAC", desc: "Integrate with institutional providers via SAML or OIDC for secure access management." }
                 ].map((item, i) => (
                   <Card key={i} className="bg-background/50 border-border/50 hover:border-primary/20 transition-all group">
                      <CardHeader>
                         <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <item.icon className="h-6 w-6" />
                         </div>
                         <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                         <CardDescription className="text-base leading-relaxed">{item.desc}</CardDescription>
                      </CardHeader>
                   </Card>
                 ))}
              </div>
           </Container>
        </Section>

        <Section>
           <Container variant="narrow">
              <div className="space-y-12 leading-relaxed text-muted-foreground">
                 <h2 className="text-3xl font-black text-foreground text-center mb-12">Building for the Modern University</h2>
                 <p>At Slotify, we understand that academic data is an institution's most valuable asset. We treat security not as a feature, but as the foundation of our entire infrastructure. Our 'Sovereignty-First' approach means that your university retains full ownership and control over its data archives, with granular visibility into every administrative action.</p>
                 <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-6">
                    <h3 className="font-bold text-foreground text-xl">Incident Response</h3>
                    <p>In the unlikely event of a security anomaly, Slotify has a 24-hour response protocol. Designated institutional security contacts are notified immediately, and our team of engineers works round-the-clock until resolution.</p>
                 </div>
              </div>
           </Container>
        </Section>

        <CTA 
          title="Questions about our infrastructure?"
          description="Download our detailed security whitepaper or talk directly to our engineering team."
          ctaText="Security Whitepaper"
        />
      </main>

      <Footer />
    </div>
  )
}
