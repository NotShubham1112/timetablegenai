import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    price: "₹0",
    description: "For individual professors or small departments.",
    features: [
      "1 Departmental Timetable",
      "Syllabus AI (5 uploads/mo)",
      "Basic Conflict Detection",
      "PDF Export",
      "Email Support",
    ],
    notIncluded: [
      "Excel Export",
      "Multi-Campus Logic",
      "SSO Integration",
      "Priority API Access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/mo",
    description: "Full-scale solution for entire engineering colleges.",
    features: [
      "Unlimited Timetables",
      "Unlimited Syllabus Parsing",
      "Advanced Multi-Batch Engine",
      "Excel & CSV Export",
      "Priority Support",
      "Custom Watermarking",
    ],
    notIncluded: [
      "SSO Integration",
      "Dedicated Database",
    ],
    cta: "Start 14-day Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "University-wide deployment with dedicated infrastructure.",
    features: [
      "Multi-Campus Hierarchy",
      "Full SSO (SAML/OIDC)",
      "Dedicated Account Manager",
      "On-Premise Deployment Option",
      "Custom ERP Integrations",
      "24/7 Phone Support",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
          badge="Pricing Plans"
          title={
            <>
              Scale your administrative <span className="text-primary">Efficiency</span>
            </>
          }
          description="Flexible pricing designed to grow with your institution. Choose the tier that matches your department's scale."
        />

        <Section variant="muted">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier, i) => (
                <Card key={i} className={cn(
                  "relative flex flex-col border-border/50 bg-background/50 backdrop-blur-sm",
                  tier.popular && "border-primary shadow-2xl shadow-primary/10 scale-105 z-10"
                )}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                    </div>
                    <CardDescription className="pt-2">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                       <p className="text-sm font-bold text-foreground">What's included:</p>
                       <ul className="space-y-3">
                         {tier.features.map((feat, j) => (
                           <li key={j} className="flex items-center gap-3 text-sm">
                             <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                             <span>{feat}</span>
                           </li>
                         ))}
                         {tier.notIncluded.map((feat, j) => (
                           <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground/50">
                             <XCircle className="h-4 w-4 shrink-0" />
                             <span className="line-through">{feat}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full rounded-full font-bold" 
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                       <Link href="/register">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ - Quick view */}
        <Section>
           <Container variant="narrow">
              <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
              <div className="grid gap-6">
                 {[
                   { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any point. Changes take effect on the next billing cycle." },
                   { q: "Do you offer educational discounts?", a: "The 'Starter' plan is free forever for small departments. For NGO-run universities, contact sales for a 30% discount." },
                   { q: "What constitutes a 'Department'?", a: "A department is defined as a unified scheduling scope (e.g., Computer Science) with up to 20 faculty members." }
                 ].map((item, i) => (
                   <div key={i} className="p-6 rounded-xl border border-border/50 bg-muted/20">
                      <h4 className="font-bold mb-2">{item.q}</h4>
                      <p className="text-sm text-muted-foreground">{item.a}</p>
                   </div>
                 ))}
              </div>
           </Container>
        </Section>

        <CTA 
          title="Ready to automate your institution?"
          description="Start with our free plan and upgrade as your department grows."
          ctaText="Get Started for Free"
        />
      </main>

      <Footer />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
