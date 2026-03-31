import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { 
  BrainCircuit, 
  Database, 
  Layers, 
  GitBranch, 
  Microscope, 
  UserSquare2, 
  ShieldCheck, 
  Cloud 
} from "lucide-react"

const featureDetails = [
  {
    id: "syllabus-ai",
    title: "Syllabus Parsing AI",
    description: "Our proprietary NLP model extracts structured data from unstructured academic documents. It identifies course credits, contact hours, and prerequisites automatically.",
    details: "Trained on over 100,000 university syllabus formats, the TimetablePro AI can handle tables, multi-column layouts, and nested headers typical of engineering and medical curriculums.",
    icon: BrainCircuit,
  },
  {
    id: "resource-allocation",
    title: "Smart Resource Allocation",
    description: "Constraint-based engine for optimal classroom and laboratory usage. Minimizes 'dead time' and campus travel distance.",
    details: "The engine considers room capacity, specialized equipment (like AV systems or specialized hardware), and accessibility requirements while maximizing overall occupancy rates.",
    icon: Database,
  },
  {
    id: "multi-semester",
    title: "Multi-semester Support",
    description: "Plan for the entire academic year across all departments simultaneously. Sync even and odd semester requirements.",
    details: "TimetablePro maintains a holistic view of your academic cycle, allowing you to rollover successful patterns and adjust for new faculty or student intake variations.",
    icon: Layers,
  },
  {
    id: "batch-splitting",
    title: "Batch Splitting Logic",
    description: "Intelligently divide large student groups for tutorial and practical sessions based on faculty availability.",
    details: "Automatically handle 30+ students per batch splitting into smaller groups of 15 for lab sessions, ensuring no student has back-to-back intense practicals.",
    icon: GitBranch,
  },
  {
    id: "lab-engine",
    title: "Lab Scheduling Engine",
    description: "Specialized logic for handling complex laboratory requirements, equipment sharing, and safety buffer times.",
    details: "Supports concurrent lab sessions, equipment-specific constraints, and the mandatory setup/cleanup times required between sessions.",
    icon: Microscope,
  },
  {
    id: "faculty-views",
    title: "Faculty Timetable Views",
    description: "Personalized portals for faculty members to view, manage, and sync their schedules with Google/Outlook calendars.",
    details: "Faculty can mark unavailability, request swaps through the admin, and receive real-time notifications for any changes to their weekly schedule.",
    icon: UserSquare2,
  },
  {
    id: "admin-controls",
    title: "Admin Controls",
    description: "Enterprise-grade user management with role-based access control for deans, department heads, and registrars.",
    details: "Audit logs for every change made, version control for timetable drafts, and restricted access to sensitive faculty performance data.",
    icon: ShieldCheck,
  },
  {
    id: "cloud-infra",
    title: "High Availability Cloud Infra",
    description: "Powered by 99.9% uptime infrastructure with automatic backups and multi-region redundancy.",
    details: "Your academic data is encrypted at rest and in transit. We ensure that your critical scheduling information is always accessible and never lost.",
    icon: Cloud,
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Features Header */}
        <Section className="bg-muted/10 border-b">
          <Container>
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">Capabilities</Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-6">Deeply Detailed Features</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Explore the advanced logic and enterprise-grade tools that make TimetablePro 
                the world's most powerful scheduling platform for higher education.
              </p>
            </div>
          </Container>
        </Section>

        {/* Feature Accordion Section */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                <h2 className="text-3xl font-bold">Built for Scale and Precision</h2>
                <p className="text-lg text-muted-foreground">
                  Our platform is not just a calendar tool. It's a complex optimization 
                  engine designed to solve the hardest scheduling problems in academia.
                </p>
                <div className="pt-4 space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-primary" />
                     <span className="text-sm font-medium">99.9% Conflict-free Generation</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-primary" />
                     <span className="text-sm font-medium">SOC2 Type II Compliant Infra</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-primary" />
                     <span className="text-sm font-medium">API Integration with major ERPs</span>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {featureDetails.map((feature) => (
                    <AccordionItem 
                      key={feature.id} 
                      value={feature.id}
                      className="border rounded-lg px-6 bg-card/30 data-[state=open]:bg-card/80 transition-colors"
                    >
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex items-center gap-4 text-left">
                          <div className="p-2 rounded-md bg-primary/10 text-primary">
                            <feature.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-lg font-semibold block">{feature.title}</span>
                            <span className="text-sm font-normal text-muted-foreground block mt-1 line-clamp-1 group-data-[state=open]:hidden">
                              {feature.description}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                        <p className="mb-4 text-foreground font-medium">{feature.description}</p>
                        <p className="border-l-2 pl-4 border-primary/30 py-2 italic text-sm">
                          {feature.details}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
