import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileSearch, 
  Zap, 
  AlertCircle, 
  MapPin, 
  Users, 
  Download,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "AI-based Syllabus Extraction",
    description: "Automatically parse complex syllabus PDFs and extract course codes, credits, and contact hours with 99% accuracy.",
    icon: FileSearch,
  },
  {
    title: "Automated Schedule Generation",
    description: "Multi-objective optimization algorithm to generate thousands of possible schedules and pick the most efficient one.",
    icon: Zap,
  },
  {
    title: "Conflicts & Batch Resolution",
    description: "System intelligently handles batch splitting and resolves overlapping sessions for both faculty and classrooms.",
    icon: AlertCircle,
  },
  {
    title: "Classroom & Lab Allocation",
    description: "Dynamic mapping of groups to suitable venues based on capacity, equipment, and distance constraints.",
    icon: MapPin,
  },
  {
    title: "Faculty Load Management",
    description: "Balance teaching hours across your entire faculty automatically, respecting preferences and seniority.",
    icon: Users,
  },
  {
    title: "Export as PDF/Excel",
    description: "One-click export for individual departments, faculty schedules, and master institution-wide views.",
    icon: Download,
  },
]

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="relative overflow-hidden pt-20 pb-32">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          
          <Container className="relative">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
                The Future of Scheduling
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                The All-In-One Timetable Automation Platform
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Empower your institution with AI that turns syllabus PDFs into optimized, 
                conflict-free schedules in minutes. Not hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="px-8 h-12 text-base font-semibold group rounded-full" asChild>
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 h-12 text-base font-semibold rounded-full">
                  Book a Demo
                </Button>
              </div>
            </div>

            {/* Placeholder for Product UI Image */}
            <div className="mt-20 relative rounded-xl border bg-card/50 overflow-hidden shadow-2xl p-2 backdrop-blur-sm group">
               <div className="aspect-[16/9] w-full bg-muted/20 flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <LayoutDashboard className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground/50">Timetable Generation Dashboard Preview</p>
                  </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
          </Container>
        </Section>

        {/* Feature Grid */}
        <Section variant="muted">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Powerful Features, Zero Effort</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your institution's scheduling from a single, 
                intuitive dashboard.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <Card key={i} className="bg-background/50 border-none shadow-sm hover:shadow-md transition-shadow group">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base pt-2">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section>
          <Container variant="narrow">
            <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground relative overflow-hidden shadow-xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
               <div className="relative z-10 space-y-8">
                 <h2 className="text-3xl md:text-5xl font-bold">Ready to modernize your institute?</h2>
                 <p className="text-xl text-primary-foreground/80 max-w-lg mx-auto">
                   Join 500+ colleges using TimetablePro to automate their scheduling workflows.
                 </p>
                 <div className="flex justify-center pt-4">
                   <Button size="xl" variant="secondary" className="px-10 h-14 text-lg font-bold rounded-full group shadow-lg hover:shadow-xl transition-all" asChild>
                     <Link href="/register">
                       Start Your Free Trial
                       <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                     </Link>
                   </Button>
                 </div>
                 <div className="flex items-center justify-center gap-6 pt-4 text-sm font-medium text-primary-foreground/60">
                   <div className="flex items-center gap-2">
                     <CheckCircle2 className="h-4 w-4" />
                     No credit card required
                   </div>
                   <div className="flex items-center gap-2">
                     <CheckCircle2 className="h-4 w-4" />
                     Setup in 15 minutes
                   </div>
                 </div>
               </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

function LayoutDashboard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}
