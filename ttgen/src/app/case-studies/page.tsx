import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { 
  Quote, 
  TrendingUp, 
  Clock, 
  Users, 
  School, 
  GraduationCap, 
  Settings2,
  CheckCircle2
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

const caseStudies = [
  {
    institution: "Elite Engineering College",
    students: "1,500+ Students",
    type: "Engineering",
    icon: School,
    problem: "With 80+ faculty members and 30+ labs, manual scheduling took 4 weeks every semester. Conflicts were common, leading to frantic last-minute classroom swaps.",
    solution: "Implemented TimetablePro with AI syllabus parsing. Automated the batch splitting logic for practical sessions and optimized classroom allocation based on lab proximity.",
    results: [
      "Scheduling time reduced from 4 weeks to 2 days.",
      "Zero conflicts reported in 3 consecutive semesters.",
      "15% improvement in classroom occupancy rates.",
    ],
    testimonial: {
      quote: "TimetablePro didn't just save us time; it saved our sanity. The faculty is much happier with the balanced loads.",
      author: "Dr. Ramesh Sharma",
      role: "Dean of Academics",
    }
  },
  {
    institution: "Global Polytechnic Institute",
    students: "800+ Students",
    type: "Technical",
    icon: Settings2,
    problem: "The institute struggled with complex workshop rotations and part-time faculty availability, making it impossible to create a stable weekly schedule.",
    solution: "Used the 'Advanced Constraints' engine to lock part-time faculty hours and automated the workshop rotation patterns across all departments.",
    results: [
      "Manual intervention reduced by 90%.",
      "Part-time faculty satisfaction rose from 40% to 95%.",
      "Accurate workshop logs generated automatically.",
    ],
    testimonial: {
      quote: "The workshop rotation logic is the best we've seen. It handles our complex practical needs perfectly.",
      author: "Prof. Anjali Gupta",
      role: "Head of Mechanical Dept",
    }
  },
  {
    institution: "South National University",
    students: "10,000+ Students",
    type: "University",
    icon: GraduationCap,
    problem: "Managing 12 different departments with shared central infrastructure led to massive inefficiencies and constant overlap in centralized lecture halls.",
    solution: "Deployed the Enterprise multi-department sync. Centralized the resource bank while allowing individual departments to manage their core faculty hours.",
    results: [
      "Centralized resource conflicts eliminated entirely.",
      "Annual administrative costs reduced by ₹12 Lakhs.",
      "Inter-departmental coordination became fully automated.",
    ],
    testimonial: {
      quote: "Scale was our biggest challenge. TimetablePro handled our 10,000 student body without breaking a sweat.",
      author: "Mr. Vikram Mehta",
      role: "Registrar",
    }
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Case Studies Header */}
        <Section className="bg-primary/5 py-24 border-b">
          <Container>
            <div className="max-w-2xl text-center mx-auto space-y-6">
              <Badge variant="secondary" className="px-3 py-1">Success Stories</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How Institutions Scale with AI</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover how engineering colleges, polytechnics, and universities across 
                the country are using TimetablePro to transform their administrative efficiency.
              </p>
            </div>
          </Container>
        </Section>

        {/* Case Study List */}
        <Section>
          <Container>
            <div className="space-y-24">
              {caseStudies.map((study, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className={`lg:col-span-6 space-y-8 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary mb-2">
                           <study.icon className="h-6 w-6" />
                           <span className="font-bold uppercase tracking-wider text-xs">{study.type} Case Study</span>
                        </div>
                        <h2 className="text-3xl font-bold">{study.institution}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {study.students}
                           </div>
                           <Separator orientation="vertical" className="h-4" />
                           <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              Verified Results
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">The Problem</h3>
                           <p className="text-lg leading-relaxed">{study.problem}</p>
                        </div>
                        <div className="space-y-2">
                           <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">The Solution</h3>
                           <p className="text-lg leading-relaxed font-medium text-foreground">{study.solution}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-muted/30 border space-y-2">
                             <TrendingUp className="h-5 w-5 text-primary" />
                             <p className="text-sm font-semibold leading-snug">{result}</p>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="lg:col-span-6">
                     <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-primary opacity-5">
                           <Quote className="h-32 w-32" />
                        </div>
                        <CardHeader className="pt-12">
                           <Quote className="h-10 w-10 text-primary mb-6" />
                           <CardTitle className="text-2xl italic font-serif leading-relaxed text-foreground/90">
                              "{study.testimonial.quote}"
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-12">
                           <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                 {study.testimonial.author[0]}
                              </div>
                              <div>
                                 <h4 className="font-bold">{study.testimonial.author}</h4>
                                 <p className="text-sm text-muted-foreground">{study.testimonial.role}</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Global Stats Section */}
        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div className="space-y-2">
                    <h4 className="text-4xl font-bold text-primary">50k+</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Timetables Generated</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-4xl font-bold text-primary">95%</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Faculty Satisfaction</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-4xl font-bold text-primary">120+</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Institutes Scaled</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-4xl font-bold text-primary">85%</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Admin Time Saved</p>
                 </div>
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
