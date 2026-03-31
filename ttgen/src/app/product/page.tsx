import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileSearch,
  Zap,
  AlertCircle,
  MapPin,
  Users,
  Download,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
} from "lucide-react"

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
          badge="Product Overview"
          title={
            <>
              Deep Tech for <span className="text-primary">Institutional Planning</span>
            </>
          }
          description="A complete infrastructure for managing academic logistics at scale. From automated syllabus extraction to multi-objective scheduling optimization."
          ctaText="Request Enterprise Demo"
          ctaHref="/company/contact"
        />

        {/* Syllabus AI Section */}
        <Section variant="muted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">Syllabus AI</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Zero-Entry Data Extraction</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our proprietary AI models parse through unstructured syllabus PDFs from any university format. It automatically identifies:
                </p>
                <ul className="space-y-4">
                  {[
                    "Course codes and credit structures",
                    "Mandatory vs Elective contact hours",
                    "Laboratory to Theory ratios",
                    "Prerequisite dependencies for scheduling"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl">
                 <div className="space-y-4">
                    <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-32 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center">
                       <FileSearch className="h-12 w-12 text-primary/40" />
                    </div>
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                 </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Conflict Engine Section */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
              <div className="lg:order-2 space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">Conflict Resolution</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Optimization Core</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our genetic algorithm explores millions of permutations to find the optimal schedule while balancing 50+ institutional constraints.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl bg-card border border-border/50 space-y-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <p className="font-bold">Faculty Load</p>
                      <p className="text-xs text-muted-foreground">Ensures fair work distribution and respects preferred off-hours.</p>
                   </div>
                   <div className="p-4 rounded-xl bg-card border border-border/50 space-y-2">
                      <Database className="h-5 w-5 text-primary" />
                      <p className="font-bold">Resource Mapping</p>
                      <p className="text-xs text-muted-foreground">Optimal classroom sizing and proximity mapping for labs.</p>
                   </div>
                </div>
              </div>
              <div className="lg:order-1 relative">
                 <div className="aspect-square bg-primary/10 rounded-full blur-3xl absolute inset-0" />
                 <Card className="relative bg-background/50 border-border/50 overflow-hidden backdrop-blur-xl">
                    <CardHeader>
                       <CardTitle>Global Conflict Log</CardTitle>
                       <CardDescription>Real-time constraint monitoring</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {[
                         { msg: "Prof. Smith: Consecutive Lab Limit Exceeded", type: "warning" },
                         { msg: "Room 102: Capacity Overload (Batch B)", type: "error" },
                         { msg: "Conflict Resolved: Advanced Physics → Lab 04", type: "success" }
                       ].map((log, i) => (
                         <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                            <AlertCircle className={cn("h-4 w-4", 
                              log.type === "error" ? "text-destructive" : 
                              log.type === "warning" ? "text-amber-500" : "text-emerald-500"
                            )} />
                            <span className="text-xs font-medium">{log.msg}</span>
                         </div>
                       ))}
                    </CardContent>
                 </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Global Scalability */}
        <Section variant="surface">
           <Container>
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Enterprise Infrastructure</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Built on modern cloud architecture to handle institutions with 50,000+ students across multiple campuses.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Globe, title: "Multi-Campus Support", desc: "Manage separate branches with a unified administrative dashboard." },
                  { icon: Users, title: "SSO & RBAC", desc: "Integrate with Microsoft/Google SSO and set granular permissions." },
                  { icon: Zap, title: "Web-Scale API", desc: "Connect your existing ERP or Student Information System effortlessly." }
                ].map((item, i) => (
                  <div key={i} className="text-center space-y-4 p-6 hover:bg-muted/50 rounded-2xl transition-colors">
                     <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <item.icon className="h-8 w-8 text-primary" />
                     </div>
                     <h3 className="text-xl font-bold">{item.title}</h3>
                     <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="Transform your institutional planning"
          description="Join 200+ universities that have already digitized their scheduling workflows."
          ctaText="Contact Sales"
          ctaHref="/company/contact"
        />
      </main>

      <Footer />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

