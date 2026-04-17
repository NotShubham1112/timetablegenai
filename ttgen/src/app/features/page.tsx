import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Grid,
  Calendar,
  Zap,
  ShieldCheck,
  FileText,
  Clock,
  Layers,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
          badge="Feature Deep-Dive"
          title={
            <>
              Engineered for <span className="text-primary">Academic Excellence</span>
            </>
          }
          description="Explore the advanced capabilities that make Slotify the leading choice for modern university administrative teams."
          ctaText="Start Free Trial"
        />

        {/* Categories Tabs */}
        <Section variant="muted">
          <Container>
            <Tabs defaultValue="scheduling" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-background border border-border/50 rounded-xl mb-12">
                <TabsTrigger value="scheduling" className="py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Smart Scheduling
                </TabsTrigger>
                <TabsTrigger value="resource" className="py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Grid className="mr-2 h-4 w-4" />
                  Resource Management
                </TabsTrigger>
                <TabsTrigger value="admin" className="py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin Control
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scheduling" className="space-y-12 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h3 className="text-3xl font-bold">Intelligent Core Algorithm</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our core engine uses a combination of constraints-based logic and genetic algorithms to solve NP-hard scheduling problems in seconds.
                      </p>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Multi-Objective Optimization</AccordionTrigger>
                          <AccordionContent>
                            Balances student satisfaction (no gaps), faculty preferences (morning/evening), and institutional costs (room utilization).
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Gap Minimization</AccordionTrigger>
                          <AccordionContent>
                            Ensures students have a compact day without unnecessary 3-4 hour breaks between classes.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Elective Conflict Resolution</AccordionTrigger>
                          <AccordionContent>
                            Smartly maps elective streams to ensure no student has a conflict between their major and minor subjects.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                   </div>
                   <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center border border-border/50">
                      <Zap className="h-20 w-20 text-primary/20" />
                   </div>
                </div>
              </TabsContent>

              <TabsContent value="resource" className="space-y-12 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center border border-border/50 order-2 md:order-1">
                      <Layers className="h-20 w-20 text-primary/20" />
                   </div>
                   <div className="space-y-6 order-1 md:order-2">
                      <h3 className="text-3xl font-bold">Dynamic Venue Allocation</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Efficiently manage every square foot of your campus. From large auditoriums to specialized research labs.
                      </p>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Proximity Mapping</AccordionTrigger>
                          <AccordionContent>
                            Minimizes travel time for faculty and students by keeping consecutive classes in the same building wing.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Equipment-Based Routing</AccordionTrigger>
                          <AccordionContent>
                            Automatically routes classes to rooms with necessary equipment (projectors, smartboards, or high-end GPUs).
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Shared Resource Pooling</AccordionTrigger>
                          <AccordionContent>
                            Manage shared resources (like meeting halls or labs) across different departments with centralized priority rules.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                   </div>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-12 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center pt-8">
                   {[
                     { icon: Users, title: "Faculty Portal", desc: "Allows faculty to view their schedules and submit leaves directly." },
                     { icon: Clock, title: "Real-time Updates", desc: "Instant notifications for emergency schedule changes via Pushover/SMS." },
                     { icon: FileText, title: "Audit Logging", desc: "Full history of every manual override and schedule change." }
                   ].map((feat, i) => (
                     <div key={i} className="p-8 rounded-2xl bg-background border border-border/50 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                           <feat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-bold text-lg">{feat.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                     </div>
                   ))}
                </div>
              </TabsContent>
            </Tabs>
          </Container>
        </Section>

        {/* Detailed Breakdown */}
        <Section>
           <Container>
              <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                 <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold">Advanced Management</h2>
                    <p className="text-muted-foreground">Go beyond simple grids with tools designed for complex institution hierarchies.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="px-6 py-2 rounded-full border border-border bg-muted/50 text-sm font-medium">99.9% Uptime</div>
                    <div className="px-6 py-2 rounded-full border border-border bg-muted/50 text-sm font-medium">SSO Ready</div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                 {[
                   { title: "Parallel Batch Logic", desc: "Handle multiple batches for the same subject simultaneously without venue overlap." },
                   { title: "Holiday Integration", desc: "Sync with national and institutional calendars to avoid scheduling on break days." },
                   { title: "Manual Overrides", desc: "Fix specific slots manually; the engine will re-optimize the rest around your lock." },
                   { title: "Load Analytics", desc: "Visual heatmaps of room and faculty utilization across the entire semester." },
                   { title: "PDF Watermarking", desc: "Automatically brand your exported schedules with institution logos and watermarks." },
                   { title: "API First", desc: "Every feature is available via a secure REST API for deep institutional integrations." }
                 ].map((item, i) => (
                   <div key={i} className="space-y-4">
                      <div className="h-2 w-12 bg-primary rounded-full group-hover:w-full transition-all" />
                      <h3 className="font-bold text-xl">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed italic">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="See these features in action"
          description="Schedule a customized walkthrough with our product experts and see how Slotify fits your department."
          ctaText="Book a Walkthrough"
          ctaHref="/company/contact"
        />
      </main>

      <Footer />
    </div>
  )
}
