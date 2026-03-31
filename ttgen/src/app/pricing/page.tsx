import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  HelpCircle, 
  Info, 
  Minus,
  Sparkles
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const pricingTiers = [
  {
    name: "Free",
    price: "₹0",
    description: "Try TimetablePro with limited features for small departments.",
    features: [
      "1 Department limit",
      "Up to 20 Faculty members",
      "Manual batch definitions",
      "PDF export only",
      "Standard community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Standard",
    price: "₹999",
    period: "/mo",
    description: "Optimize your department scheduling with automated AI tools.",
    features: [
      "Up to 3 Departments",
      "50 Faculty members",
      "AI syllabus extraction",
      "Automated generation",
      "PDF & Excel export",
      "Email support",
    ],
    cta: "Start Standard",
    popular: true,
  },
  {
    name: "Professional",
    price: "₹2999",
    period: "/mo",
    description: "Full automation for entire mid-sized colleges.",
    features: [
      "Unlimited Departments",
      "200 Faculty members",
      "Advanced conflict resolution",
      "Classroom distance optimization",
      "Priority faculty views",
      "Priority support",
    ],
    cta: "Start Pro",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large universities and multicampus institutes.",
    features: [
      "Multi-campus support",
      "SSO & API access",
      "White-labeled reporting",
      "Dedicated account manager",
      "Custom SLA & training",
      "On-premise deployment options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "Do you offer discounts for non-profit educational institutions?",
    answer: "Yes! We offer a 30% discount for registered non-profit institutes. Contact our sales team to verify your status and apply the discount.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Absolutely. You can change your plan at any time through the Billing section of your dashboard. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "How safe is my institutional data?",
    answer: "We use enterprise-grade encryption for all data at rest and in transit. Our infrastructure is hosted on SOC2 compliant data centers with regular security audits.",
  },
  {
    question: "Is there a limit on the number of timetables we can generate?",
    answer: "No. You can generate and save as many draft versions as you need before finalizing. We want you to find the perfect schedule.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Pricing Header */}
        <Section className="text-center pt-24 pb-16">
          <Container variant="narrow">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple Pricing for Colleges & Institutes</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose the perfect plan to streamline your institutional scheduling. 
              Transparent, scalable, and built for academia.
            </p>
          </Container>
        </Section>

        {/* Pricing Tiers */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier) => (
                <Card 
                  key={tier.name}
                  className={`flex flex-col relative transition-all duration-300 hover:shadow-lg ${tier.popular ? "border-primary shadow-md lg:-mt-4 lg:mb-4 lg:py-4 scale-105 z-10 bg-primary/5" : "border-muted"}`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground text-sm font-medium">{tier.period}</span>}
                    </div>
                    <CardDescription className="pt-4 min-h-[60px] text-sm">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button variant={tier.popular ? "default" : "outline"} className="w-full h-12 text-sm font-bold rounded-full">
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Comparison Table */}
        <Section variant="muted">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Detailed Plan Comparison</h2>
              <p className="text-muted-foreground">Find the exact features you need for your institute.</p>
            </div>
            <div className="rounded-xl border bg-background overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[300px]">Features</TableHead>
                    <TableHead className="text-center">Free</TableHead>
                    <TableHead className="text-center font-bold text-primary">Standard</TableHead>
                    <TableHead className="text-center">Pro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AI Syllabus parsing</TableCell>
                    <TableCell className="text-center"><Minus className="h-4 w-4 mx-auto text-muted-foreground" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Faculty unavailibility sync</TableCell>
                    <TableCell className="text-center"><Minus className="h-4 w-4 mx-auto text-muted-foreground" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Distance optimization</TableCell>
                    <TableCell className="text-center"><Minus className="h-4 w-4 mx-auto text-muted-foreground" /></TableCell>
                    <TableCell className="text-center"><Minus className="h-4 w-4 mx-auto text-muted-foreground" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Classroom sharing</TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                    <TableCell className="text-center"><Check className="h-4 w-4 mx-auto text-primary" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support response time</TableCell>
                    <TableCell className="text-center text-sm">48h</TableCell>
                    <TableCell className="text-center text-sm font-bold text-primary">24h</TableCell>
                    <TableCell className="text-center text-sm">Priority</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section>
          <Container variant="narrow">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Everything you need to know about our pricing and services.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4 hover:bg-muted/50 transition-colors">
                  <AccordionTrigger className="hover:no-underline font-medium py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <HelpCircle className="h-6 w-6" />
                 </div>
                 <div>
                    <h4 className="font-bold">Still have questions?</h4>
                    <p className="text-sm text-muted-foreground">We're here to help you choose the right plan.</p>
                 </div>
              </div>
              <Button variant="link" className="text-primary font-bold">
                 Contact our support team &rarr;
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
