import React from "react"
import Link from "next/link"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Hero } from "@/components/marketing/hero"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"
import { CTA } from "@/components/marketing/cta"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, User } from "lucide-react"

const blogPosts = [
  {
    slug: "ai-in-academia-scheduling",
    title: "How AI is Solving the NP-Hard Problem of University Scheduling",
    description: "Deep dive into the genetics algorithms behind Slotify's core engine and how we resolve millions of conflict points.",
    category: "Deep Tech",
    date: "Mar 28, 2024",
    author: "Dr. Elena Rossi",
    featured: true,
  },
  {
    slug: "efficiency-in-administration",
    title: "10 Ways to Reclaim 80% of your Administrative Hours",
    description: "Practical steps for university registrars to automate workflows and focus on student success.",
    category: "Best Practice",
    date: "Mar 15, 2024",
    author: "James Wilson",
    featured: false,
  },
  {
    slug: "syllabus-parsing-benefits",
    title: "Beyond OCR: The Value of Structured Syllabus Data",
    description: "Why extracting course credits and contact hours automatically matters for long-term institutional planning.",
    category: "Product",
    date: "Feb 22, 2024",
    author: "Linda Thompson",
    featured: false,
  }
]

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero
           badge="The Journal"
           title={
             <>
               Insights on <span className="text-primary">Academic Innovation</span>
             </>
           }
           description="Technical deep-dives, industry trends, and practical guides for modern educational administration."
        />

        <Section variant="muted">
           <Container>
              <div className="grid grid-cols-1 gap-12">
                 {/* Featured Post */}
                 {blogPosts.filter(p => p.featured).map((post, i) => (
                   <Link key={i} href={`/company/blog/${post.slug}`}>
                     <Card className="bg-background/50 border-primary/20 hover:border-primary/40 transition-all overflow-hidden group shadow-2xl">
                        <div className="flex flex-col lg:flex-row h-full">
                           <div className="lg:w-1/2 aspect-video bg-muted relative overflow-hidden">
                              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                           </div>
                           <div className="lg:w-1/2 p-8 md:p-12 space-y-6">
                              <Badge className="bg-primary/10 text-primary border-primary/20">{post.category}</Badge>
                              <h2 className="text-3xl md:text-5xl font-black group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                              <p className="text-lg text-muted-foreground leading-relaxed italic">{post.description}</p>
                              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-6 border-t border-border/50">
                                 <div className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</div>
                                 <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</div>
                              </div>
                           </div>
                        </div>
                     </Card>
                   </Link>
                 ))}

                 {/* Grid Posts */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.filter(p => !p.featured).map((post, i) => (
                      <Link key={i} href={`/company/blog/${post.slug}`}>
                        <Card className="h-full bg-background/50 border-border/50 hover:border-primary/20 transition-all group overflow-hidden">
                           <div className="aspect-video bg-muted relative">
                              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors" />
                           </div>
                           <CardHeader className="space-y-4">
                              <Badge variant="outline" className="w-fit">{post.category}</Badge>
                              <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">{post.title}</CardTitle>
                              <CardDescription className="text-base line-clamp-3 leading-relaxed italic">{post.description}</CardDescription>
                           </CardHeader>
                           <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/50 pt-4 mt-6">
                                 <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2"><User className="h-3 w-3" /> {post.author}</div>
                                 </div>
                                 <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                           </CardContent>
                        </Card>
                      </Link>
                    ))}
                 </div>
              </div>
           </Container>
        </Section>

        <CTA 
          title="Stay ahead of the scheduling curve"
          description="Join 5,000+ administrators subscribed to our weekly digest of academic innovation."
          ctaText="Subscribe to Journal"
        />
      </main>

      <Footer />
    </div>
  )
}
