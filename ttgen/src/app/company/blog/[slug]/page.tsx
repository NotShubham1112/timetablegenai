import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  CalendarDays, 
  Share2, 
  Copy, 
  Linkedin, 
  Twitter, 
  MessageSquare
} from "lucide-react"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock post content based on slug
  const post = {
    title: params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    author: "Ananya Iyer",
    role: "CTO, TimetablePro",
    date: "March 15, 2024",
    category: "AI & Education",
    readTime: "8 min read",
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Post Header */}
        <Section className="pb-12 pt-20 border-b bg-muted/5 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-32 text-primary/5 italic font-black text-9xl select-none uppercase pointer-events-none">
              Insight
           </div>
           <Container variant="narrow">
              <Link href="/company/blog" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12 group">
                 <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                 Back to Blog
              </Link>
              <div className="space-y-6">
                 <Badge variant="outline" className="px-3 py-1 font-bold text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px]">
                    {post.category}
                 </Badge>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    {post.title}
                 </h1>
                 <div className="flex flex-wrap items-center gap-6 pt-6 text-sm">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {post.author[0]}
                       </div>
                       <div>
                          <p className="font-bold">{post.author}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">{post.role}</p>
                       </div>
                    </div>
                    <Separator orientation="vertical" className="h-8 hidden md:block" />
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
                       <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {post.date}
                       </span>
                       <span className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          {post.readTime}
                       </span>
                    </div>
                 </div>
              </div>
           </Container>
        </Section>

        {/* Post Content */}
        <Section className="py-16">
           <Container variant="narrow">
              <article className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                 <p className="lead italic text-xl text-muted-foreground font-medium border-l-4 pl-8 border-primary/20 py-4 my-8">
                    "In the fast-evolving landscape of higher education, logistics often remains the silent bottleneck. 
                    AI is changing that narrative by turning weeks of planning into minutes of execution."
                 </p>

                 <h2>The Traditional Hurdle</h2>
                 <p>
                    For decades, academic scheduling has been a manual process—one fraught with human error, 
                    conflicting interests, and massive overhead. Department heads spent significant 
                    portions of their break time juggling faculty availability, student numbers, 
                    and classroom capacities.
                 </p>
                 
                 <div className="my-12 p-8 rounded-2xl bg-muted border border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground/20 text-4xl font-black italic select-none min-h-[300px]">
                    ARTICLE IMAGE PLACEHOLDER
                 </div>

                 <h2>The Shift Towards Automation</h2>
                 <p>
                    Automation isn't just about speed; it's about optimization. A human can create a 
                    fair schedule, but an AI can create the *best* schedule. By analyzing thousands 
                    of permutations simultaneously, TimetablePro ensures that faculty aren't overworked, 
                    travel distances between classes are minimized, and student learning hours are 
                    maximized.
                 </p>

                 <h3>Key Benefits of AI Scheduling:</h3>
                 <ul>
                    <li><strong>Conflict-Free Operations:</strong> Eliminate the need for last-minute room swaps and faculty complaints.</li>
                    <li><strong>Data-Driven Insights:</strong> Real-time visibility into classroom utilization and peak load times.</li>
                    <li><strong>Faculty Satisfaction:</strong> Respecting research hours and personal time leads to better teaching outcomes.</li>
                 </ul>

                 <blockquote>
                    "The goal isn't just to make scheduling faster—it's to make it fairer. 
                    Ensuring that every faculty member has a balanced load and every student 
                    has a logical sequence of classes is at the heart of what we do."
                 </blockquote>

                 <h2>Scale and Complexity</h2>
                 <p>
                    As institutions grow, the complexity of scheduling grows exponentially. 
                    Engineers and data scientists at TimetablePro have spent years refining 
                    algorithms that can handle the unique constraints of large universities—from 
                    multi-campus commutes to specialized laboratory certifications.
                 </p>

                 <div className="not-prose my-16 p-8 rounded-3xl bg-primary text-primary-foreground space-y-6 shadow-2xl">
                    <h4 className="text-2xl font-bold">Ready to see it in action?</h4>
                    <p className="text-lg text-primary-foreground/80 font-medium italic">
                       Join 500+ colleges using TimetablePro to automate their institutional workflows.
                    </p>
                    <Button variant="secondary" className="px-8 h-12 rounded-full font-bold shadow-lg" asChild>
                       <Link href="/register">Get Started Now</Link>
                    </Button>
                 </div>

                 <h2>Looking Ahead</h2>
                 <p>
                    Scheduling is the foundation. Looking forward, the automated campus will integrate 
                    student preferences, real-time classroom sensor data, and dynamic resource allocation 
                    to create a truly fluid academic environment.
                 </p>
              </article>

              {/* Post Footer / Share */}
              <Separator className="my-16" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex items-center gap-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Share this article:</span>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-muted hover:bg-primary/5 hover:text-primary transition-colors">
                          <Twitter className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-muted hover:bg-primary/5 hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-muted hover:bg-primary/5 hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-muted hover:bg-primary/5 hover:text-primary transition-colors">
                          <Copy className="h-4 w-4" />
                       </Button>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">#EducationTech</Badge>
                    <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">#AIScheduling</Badge>
                 </div>
              </div>
           </Container>
        </Section>

        {/* Related Posts */}
        <Section variant="muted" className="border-t">
           <Container>
              <h3 className="text-2xl font-bold mb-8">You might also like</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[1, 2, 3].map((i) => (
                    <Link key={i} href="#" className="group block space-y-4">
                       <div className="aspect-video bg-background border rounded-xl flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden shadow-sm">
                          <div className="p-4 text-xs font-bold text-muted-foreground/30 italic uppercase tracking-tighter select-none">TimetablePro Blog</div>
                       </div>
                       <h4 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">The Digital Transformation of Modern Campuses: What Deans need to know.</h4>
                       <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">5 Min Read</p>
                    </Link>
                 ))}
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
