import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface CTAProps {
  title: string
  description: string
  ctaText?: string
  ctaHref?: string
  highlights?: string[]
}

export function CTA({
  title,
  description,
  ctaText = "Start Free Today",
  ctaHref = "/register",
  highlights = ["No credit card required", "Setup in 15 minutes", "Unlimited generations"],
}: CTAProps) {
  return (
    <section className="py-24 md:py-32">
      <Container variant="narrow">
        <div className="relative rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground overflow-hidden shadow-2xl shadow-primary/20">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-lg mx-auto leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Button 
                size="lg" 
                variant="secondary" 
                className="px-10 h-14 text-lg font-bold rounded-full group shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-primary-foreground/60">
                {highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
