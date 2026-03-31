import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Container } from "./container"

interface HeroProps {
  badge?: string
  title: React.ReactNode
  description: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  image?: React.ReactNode
}

export function Hero({
  badge,
  title,
  description,
  ctaText = "Get Started",
  ctaHref = "/register",
  secondaryCtaText = "Watch Demo",
  secondaryCtaHref = "#",
  image,
}: HeroProps) {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-20" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {badge && (
            <Badge variant="outline" className="mb-6 px-4 py-1.5 bg-primary/5 text-primary border-primary/20 rounded-full animate-fade-in">
              {badge}
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 group" asChild>
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold bg-background/50 backdrop-blur-sm" asChild>
              <Link href={secondaryCtaHref}>
                <PlayCircle className="mr-2 h-4 w-4" />
                {secondaryCtaText}
              </Link>
            </Button>
          </div>

          {image && (
            <div className="mt-16 md:mt-24 w-full relative group italic">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-[2rem] border border-border/50 bg-background/50 p-2 backdrop-blur-xl transition-all duration-300">
                <div className="rounded-[1.8rem] overflow-hidden border border-border/50">
                  {image}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
