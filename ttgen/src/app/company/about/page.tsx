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
} from "@/components/ui/card"
import { 
  Target, 
  Rocket, 
  Lightbulb, 
  ShieldCheck, 
  Users2, 
  Award,
  BookOpenCheck
} from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Vikram Sethi",
    role: "Founder & CEO",
    bio: "Former Professor with 20+ years in academic administration. Ph.D. in Operations Research.",
    avatar: "VS",
  },
  {
    name: "Ananya Iyer",
    role: "CTO",
    bio: "AI research lead with a passion for educational technology and constraint-based optimization.",
    avatar: "AI",
  },
  {
    name: "Sanjay Reddy",
    role: "Head of Product",
    bio: "Led product teams at major EdTech firms. Focused on campus-wide digital transformation.",
    avatar: "SR",
  },
  {
    name: "Meera Kapoor",
    role: "Academic Liaison",
    bio: "Directly works with deans and registrars to tailor TimetablePro to institutional needs.",
    avatar: "MK",
  },
]

const values = [
  {
    title: "Academic First",
    description: "Every feature we build is designed with the unique needs of educational institutes in mind.",
    icon: BookOpenCheck,
  },
  {
    title: "Precision Engineering",
    description: "We don't settle for 'almost conflict-free'. Our algorithms aim for 100% accuracy every time.",
    icon: Target,
  },
  {
    title: "Data Stewardship",
    description: "Your institution's data is your own. We provide the highest levels of protection and privacy.",
    icon: ShieldCheck,
  },
  {
    title: "Incessant Innovation",
    description: "We are constantly refining our AI to handle more complex academic scenarios and schedules.",
    icon: Lightbulb,
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Mission/Vision Hero */}
        <Section className="bg-muted/10 pb-12 pt-24 border-b">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-8">
                  <Badge variant="outline" className="px-3 py-1 uppercase tracking-widest text-xs font-bold">Our Story</Badge>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Mission to Modernize Academic Scheduling</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Founded in 2024, TimetablePro was born out of a simple observation: 
                    colleges were spending weeks every semester on a task that AI could 
                    solve in minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                     <div className="space-y-2">
                        <h3 className="font-bold text-primary flex items-center gap-2">
                           <Rocket className="h-5 w-5" />
                           Our Mission
                        </h3>
                        <p className="text-muted-foreground">To eliminate scheduling conflicts globally through intelligent automation.</p>
                     </div>
                     <div className="space-y-2">
                        <h3 className="font-bold text-primary flex items-center gap-2">
                           <Award className="h-5 w-5" />
                           Our Vision
                        </h3>
                        <p className="text-muted-foreground">To become the standard operating system for institutional management.</p>
                     </div>
                  </div>
               </div>
               <div className="relative aspect-square bg-muted rounded-2xl border flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
                  <Users2 className="h-48 w-48 text-muted-foreground/10" />
                  <div className="absolute inset-x-8 bottom-8 p-6 bg-card/80 backdrop-blur border rounded-xl shadow-xl">
                     <p className="text-sm font-medium italic">"The most rewarding thing is seeing a Dean realize they just saved 100+ hours of work."</p>
                     <p className="text-xs font-bold mt-2 uppercase tracking-widest">— Vikram SETHI, Founder</p>
                  </div>
               </div>
            </div>
          </Container>
        </Section>

        {/* Founding Story */}
        <Section>
           <Container variant="narrow">
              <div className="prose prose-neutral dark:prose-invert max-w-none text-center">
                 <h2 className="text-3xl font-bold mb-8">The Journey from Classroom to Cloud</h2>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                    It started in a small faculty lounge at a leading engineering college. Our founder, 
                    Dr. Vikram Sethi, watched as three department heads spent their entire mid-term 
                    break manually drawing grids and checking faculty availability cards. 
                 </p>
                 <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    The frustration was palpable. Every time one change was made, three others 
                    broke. There had to be a better way. Leveraging his background in mathematical 
                    optimization, Vikram built the first prototype—a simple script that could 
                    generate a week-long schedule for a single department in seconds. Today, 
                    that script has evolved into TimetablePro, serving hundreds of campuses across 
                    the country.
                 </p>
              </div>
           </Container>
        </Section>

        {/* Values Grid */}
        <Section variant="muted">
           <Container>
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold">Our Core Values</h2>
                 <p className="text-muted-foreground mt-4">The principles that guide our product and our team.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {values.map((val, i) => (
                    <Card key={i} className="border-none bg-background shadow-sm group hover:shadow-md transition-shadow">
                       <CardHeader>
                          <div className="mb-4 w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                             <val.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{val.title}</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                       </CardContent>
                    </Card>
                 ))}
              </div>
           </Container>
        </Section>

        {/* Team Section */}
        <Section>
           <Container>
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold">Meet the Team</h2>
                 <p className="text-muted-foreground mt-4">A blend of academic experience and technical excellence.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {teamMembers.map((member, i) => (
                    <div key={i} className="group text-center space-y-4">
                       <div className="aspect-square relative rounded-2xl bg-muted border overflow-hidden flex items-center justify-center transition-transform group-hover:scale-[1.02]">
                          <div className="p-12 text-6xl font-bold text-muted-foreground/20 italic select-none">
                             {member.avatar}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                             <div className="flex justify-center gap-3">
                                {/* Twitter/LinkIn Icons Placeholder */}
                                <div className="h-8 w-8 rounded-full bg-background/50 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                   <Rocket className="h-4 w-4" />
                                </div>
                             </div>
                          </div>
                       </div>
                       <div>
                          <h4 className="text-lg font-bold">{member.name}</h4>
                          <p className="text-sm font-bold text-primary uppercase tracking-widest">{member.role}</p>
                       </div>
                       <p className="text-sm text-muted-foreground px-4 leading-relaxed line-clamp-2">{member.bio}</p>
                    </div>
                 ))}
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
