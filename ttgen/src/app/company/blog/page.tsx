import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card"
import { Search, CalendarDays, ArrowRight, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    slug: "ai-in-higher-education-2024",
    title: "The Role of AI in Higher Education Logistics",
    excerpt: "How automated scheduling is just the beginning of a broader digital transformation in colleges.",
    date: "March 15, 2024",
    author: "Ananya Iyer",
    category: "AI & Tech",
  },
  {
    slug: "solving-faculty-scheduling-conflicts",
    title: "5 Strategies to Solve Faculty Scheduling Conflicts",
    excerpt: "Common challenges in manual scheduling and how a data-driven approach can solve them permanently.",
    date: "March 10, 2024",
    author: "Dr. Vikram Sethi",
    category: "Operations",
  },
  {
    slug: "timetablepro-feature-update-q1",
    title: "What's New in TimetablePro: Q1 Update",
    excerpt: "Introducing multi-campus support and advanced lab rotation logic in our latest quarterly release.",
    date: "March 5, 2024",
    author: "Sanjay Reddy",
    category: "Product",
  },
  {
    slug: "maximising-classroom-efficiency",
    title: "Maximizing Classroom Occupancy Rates",
    excerpt: "Data insights on how most colleges underutilize 30% of their physical infrastructure.",
    date: "February 28, 2024",
    author: "Meera Kapoor",
    category: "Research",
  },
  {
    slug: "scaling-polytechnic-institutes",
    title: "Scaling Polytechnic Institutes: A Case for Automation",
    excerpt: "Why technical institutes face unique scheduling challenges compared to traditional universities.",
    date: "February 20, 2024",
    author: "Vikram Sethi",
    category: "Institutes",
  },
  {
    slug: "the-future-of-automated-campus",
    title: "The Future of the Automated Campus",
    excerpt: "Visionary look at how AI will manage everything from cafeteria supply to library slot bookings.",
    date: "February 15, 2024",
    author: "Ananya Iyer",
    category: "Future Tech",
  },
]

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Blog Hero */}
        <Section className="bg-muted/10 pt-24 pb-16 border-b">
           <Container>
              <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
                 <div className="max-w-2xl space-y-4">
                    <Badge variant="outline" className="px-3 py-1 uppercase tracking-widest text-xs font-bold text-primary">Insight & News</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">The TimetablePro Blog</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                       Explore the intersection of AI, automation, and higher education. 
                       Tips, updates, and research from the leaders in campus logistics.
                    </p>
                 </div>
                 <div className="w-full lg:w-96 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                       placeholder="Search articles..." 
                       className="pl-10 h-11 bg-background rounded-full border-muted-foreground/20 focus-visible:ring-primary"
                    />
                 </div>
              </div>
           </Container>
        </Section>

        {/* Featured Post (Optional) */}
        <Section className="pb-8">
           <Container>
             <Link href={`/company/blog/${blogPosts[0].slug}`} className="group block relative rounded-2xl overflow-hidden border bg-background shadow-lg transition-transform hover:scale-[1.005]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                   <div className="aspect-[16/9] lg:aspect-auto bg-muted border-r flex items-center justify-center p-12">
                      <div className="relative h-full w-full border border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center italic text-muted-foreground/20 text-8xl font-black select-none">
                         FEATURED
                      </div>
                   </div>
                   <div className="p-10 space-y-6 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                         <Badge variant="secondary">{blogPosts[0].category}</Badge>
                         <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {blogPosts[0].date}
                         </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">{blogPosts[0].title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 pl-6 border-primary/20">
                         "{blogPosts[0].excerpt}"
                      </p>
                      <div className="flex items-center gap-3 pt-4">
                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {blogPosts[0].author[0]}
                         </div>
                         <div className="text-sm font-bold">{blogPosts[0].author}</div>
                      </div>
                      <div className="pt-4 flex items-center text-primary font-bold gap-2">
                         Read Full Article <ArrowRight className="h-4 w-4" />
                      </div>
                   </div>
                </div>
             </Link>
           </Container>
        </Section>

        {/* Blog Post Grid */}
        <Section className="pt-8">
           <Container>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {blogPosts.slice(1).map((post, i) => (
                    <Card key={i} className="bg-background flex flex-col h-full border-muted/50 hover:border-primary/50 transition-colors shadow-sm group">
                       <CardHeader className="p-0">
                          <div className="aspect-video bg-muted border-b flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden">
                             <div className="text-4xl font-bold text-muted-foreground/20 italic select-none">TimetablePro</div>
                          </div>
                          <div className="p-6 pb-2">
                             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{post.category}</span>
                                <span className="flex items-center gap-1">
                                   <CalendarDays className="h-3 w-3" />
                                   {post.date}
                                </span>
                             </div>
                             <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                          </div>
                       </CardHeader>
                       <CardContent className="p-6 pt-2">
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 italic">
                             "{post.excerpt}"
                          </p>
                       </CardContent>
                       <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                {post.author[0]}
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-wider">{post.author}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary group" asChild>
                             <Link href={`/company/blog/${post.slug}`}>
                                Read More
                                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                             </Link>
                          </Button>
                       </CardFooter>
                    </Card>
                 ))}
              </div>

              {/* Pagination */}
              <div className="mt-20 flex justify-center gap-2">
                 <Button variant="outline" size="sm" disabled className="rounded-full shadow-sm">Previous</Button>
                 <Button variant="default" size="sm" className="rounded-full shadow-sm bg-primary/10 text-primary hover:bg-primary/20">1</Button>
                 <Button variant="outline" size="sm" className="rounded-full shadow-sm hover:bg-muted">2</Button>
                 <Button variant="outline" size="sm" className="rounded-full shadow-sm">Next</Button>
              </div>
           </Container>
        </Section>

        {/* Newsletter CTA */}
        <Section variant="muted" className="border-t">
           <Container variant="narrow">
              <Card className="bg-primary/5 border border-primary/20 p-8 md:p-12 text-center rounded-3xl shadow-xl overflow-hidden relative">
                 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                 <div className="relative z-10 space-y-6">
                    <h3 className="text-3xl font-bold">Stay Ahead of the Curve</h3>
                    <p className="text-muted-foreground text-lg italic max-w-md mx-auto">
                       "Join 2,000+ academic leaders who receive our monthly digest on EdTech trends and logistics."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                       <Input 
                          placeholder="Your professional email" 
                          className="h-12 bg-background border-muted-foreground/30 rounded-full text-center"
                       />
                       <Button size="lg" className="h-12 rounded-full px-8 font-bold shadow-lg shadow-primary/20">
                          Subscribe Now
                       </Button>
                    </div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                       No spam. Just peer-reviewed research and updates.
                    </p>
                 </div>
              </Card>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
