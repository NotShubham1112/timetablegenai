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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, MessageSquareQuote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sandeep Verma",
    role: "HOD, Computer Science",
    avatar: "/avatars/hod-1.jpg",
    rating: 5,
    content: "Calculating faculty load and ensuring no lab overlap was a nightmare. TimetablePro's AI logic handled 450 students and 20 faculty in under 10 minutes. Game changer for our department.",
  },
  {
    name: "Prof. Megha Iyer",
    role: "Assistant Professor",
    avatar: "/avatars/prof-1.jpg",
    rating: 5,
    content: "I love that I can sync my generated timetable directly with my Google Calendar. The automated split into tutorial batches for my 3rd-year students was flawless.",
  },
  {
    name: "Rahul Deshmukh",
    role: "Student Rep, Final Year",
    avatar: "/avatars/student-1.jpg",
    rating: 4,
    content: "Our classes are finally balanced. No more long gaps between core lectures and our practical sessions are better spaced out. It feels much more organized.",
  },
  {
    name: "Mr. Satish Kulkarni",
    role: "Admin, Academic Cell",
    avatar: "/avatars/admin-1.jpg",
    rating: 5,
    content: "The syllabus extraction tool is magic. We uploaded 15 different department syllabus PDFs and it extracted everything perfectly. Saved us weeks of data entry.",
  },
  {
    name: "Dr. Amit Singhal",
    role: "Principal, SVIT",
    avatar: "/avatars/hod-2.jpg",
    rating: 5,
    content: "The reporting dashboard gave us insights into classroom utilization we never had. We realized we were overusing our main auditorium while smaller halls were empty.",
  },
  {
    name: "Neha Kapoor",
    role: "Faculty, Civil Dept",
    avatar: "/avatars/prof-2.jpg",
    rating: 5,
    content: "The faculty load balancing is very fair. It respected my research hours and didn't give me any early morning slots as requested. High-quality automation.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} 
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Reviews Hero */}
        <Section className="bg-primary pt-24 pb-16 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
          <Container className="relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <Badge variant="secondary" className="px-3 py-1 font-bold">Trusted by 500+ Institutes</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hear it from the Users</h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                From academic deans to student representatives, here's how 
                TimetablePro is making everyday campus life better.
              </p>
            </div>
          </Container>
        </Section>

        {/* Testimonial Grid */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <Card key={i} className="bg-muted/10 border-none shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                   <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                      <MessageSquareQuote className="h-12 w-12" />
                   </div>
                   <CardHeader className="relative">
                      <div className="pb-4">
                        <StarRating rating={testimonial.rating} />
                      </div>
                      <CardTitle className="text-base font-normal leading-relaxed text-foreground/80 italic">
                        "{testimonial.content}"
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="pt-6 border-t bg-muted/20">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-background">
                           <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {testimonial.name[0]}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <h4 className="font-bold text-sm">{testimonial.name}</h4>
                           <p className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.role}</p>
                        </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Stats Section */}
        <Section variant="muted" className="border-y">
           <Container>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="max-w-md space-y-4">
                    <h2 className="text-3xl font-bold">A New Standard in Academic Scheduling</h2>
                    <p className="text-muted-foreground">
                       We pride ourselves on maintaining a 4.9/5 satisfaction rate across 
                       private and governmental institutes alike.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8 md:gap-16">
                    <div className="text-center">
                       <h3 className="text-5xl font-extrabold text-primary">4.9</h3>
                       <p className="text-xs font-bold uppercase tracking-widest mt-2">Overall Rating</p>
                       <StarRating rating={5} />
                    </div>
                    <div className="text-center">
                       <h3 className="text-5xl font-extrabold text-primary">99.2%</h3>
                       <p className="text-xs font-bold uppercase tracking-widest mt-2">Retention Rate</p>
                       <div className="flex items-center justify-center gap-1 mt-1 font-bold text-primary italic">Excellent</div>
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
