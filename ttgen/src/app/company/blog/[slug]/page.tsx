import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2, Twitter, Linkedin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock data for the post
  const post = {
    title: "How AI is Solving the NP-Hard Problem of University Scheduling",
    category: "Deep Tech",
    date: "Mar 28, 2024",
    author: "Dr. Elena Rossi",
    authorRole: "Principal AI Researcher",
    content: `
      <p class="text-xl leading-relaxed text-muted-foreground mb-8">Scheduling university timetables is a classic computational challenge. With thousands of students, hundreds of rooms, and a myriad of constraints, finding an optimal solution manually is nearly impossible. Here's how we approach it with modern AI.</p>
      
      <h2 class="text-3xl font-bold mb-6 mt-12">The Complexity of Academic Planning</h2>
      <p class="mb-6 leading-relaxed">In computer science, university scheduling is classified as an NP-hard problem. This means that as the number of variables (students, courses, rooms) increases, the time required to find an absolute perfect solution grows exponentially. A typical university has millions of potential permutations, but only a handful of those are actually conflict-free.</p>
      
      <div class="bg-primary/5 border-l-4 border-primary p-8 my-10 italic text-lg leading-relaxed">
        "Traditional systems rely on human intuition, which is great for empathy but poor for multi-objective optimization. AI, on the other hand, can evaluate millions of possibilities in seconds."
      </div>
      
      <h2 class="text-3xl font-bold mb-6 mt-12">How Our Core Engine Works</h2>
      <p class="mb-6 leading-relaxed">We use a combination of constraint logic programming and a genetic algorithm. This approach mimics the process of natural selection: we 'evolve' schedules over several generations, keeping the strongest versions (those with the fewest conflicts) and 'mutating' them to explore better solutions.</p>
      
      <ul class="list-disc pl-6 mb-8 space-y-4">
        <li><strong>Multi-Objective Optimization:</strong> We don't just look for zero conflicts. We look for the most convenient schedule for both students and faculty.</li>
        <li><strong>Genetic Selection:</strong> Our algorithm evaluates fitness scores based on building proximity, preferred timeslots, and room utilization.</li>
        <li><strong>Heuristic Pruning:</strong> To handle the NP-hard nature, we use smart heuristics to quickly discard millions of obviously invalid schedules.</li>
      </ul>

      <h2 class="text-3xl font-bold mb-6 mt-12">Beyond the Algorithm</h2>
      <p class="mb-6 leading-relaxed">Technology is only half the battle. The other half is data entry. Our Syllabus AI extraction tools ensure that the 'starting material' for our algorithm is 100% accurate, removing human error from the foundational data points.</p>
    `,
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      
      <main>
        {/* Post Header */}
        <Section variant="transparent" className="pt-24 pb-12">
          <Container variant="narrow">
            <Link href="/company/blog" className="flex items-center gap-2 text-primary text-sm font-bold mb-8 hover:opacity-80 transition-opacity uppercase tracking-widest">
              <ArrowLeft className="h-4 w-4" /> Back to Journal
            </Link>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">{post.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-8 py-8 border-y border-border/50">
               <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                     {post.author.charAt(4)}
                  </div>
                  <div>
                     <p className="font-bold text-lg">{post.author}</p>
                     <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 text-muted-foreground ml-auto">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold"><Calendar className="h-4 w-4" /> {post.date}</div>
                  <div className="h-10 w-px bg-border/50 hidden sm:block" />
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="rounded-full select-none"><Twitter className="h-4 w-4" /></Button>
                     <Button variant="ghost" size="icon" className="rounded-full select-none"><Linkedin className="h-4 w-4" /></Button>
                     <Button variant="ghost" size="icon" className="rounded-full select-none"><Facebook className="h-4 w-4" /></Button>
                  </div>
               </div>
            </div>
          </Container>
        </Section>

        {/* Post Content */}
        <article className="pb-32">
          <Container variant="narrow">
            <div 
              className="prose prose-invert prose-primary max-w-none prose-p:leading-relaxed prose-h2:font-black prose-h2:text-3xl prose-h2:mt-12 prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </Container>
        </article>

        <CTA 
           title="Want the full technical whitepaper?"
           description="Download our detailed research paper on genetic algorithms in institutional scheduling."
           ctaText="Download Whitepaper"
        />
      </main>

      <Footer />
    </div>
  )
}
