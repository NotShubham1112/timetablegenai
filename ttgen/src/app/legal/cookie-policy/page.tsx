import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Section className="pt-32 pb-12">
          <Container variant="narrow">
            <h1 className="text-4xl md:text-6xl font-black mb-8">Cookie Policy</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mb-12">Last Updated: March 30, 2024</p>
          </Container>
        </Section>

        <Section variant="transparent" className="pb-32">
          <Container variant="narrow">
            <div className="prose prose-invert prose-primary max-w-none space-y-12 leading-relaxed text-muted-foreground">
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">1. What are cookies?</h2>
                  <p>Cookies are small text files that are stored on your device when you visit a website. They help us provide a better experience by remembering your preferences and security settings.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">2. Essential Cookies</h2>
                  <p>These cookies are strictly necessary to provide you with the services available through our platform and to use some of its features, such as access to secure areas (the institutional dashboard).</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">3. Analytics and Performance</h2>
                  <p>We use performance cookies to understand how our visitors interact with the website, helping us to identify errors and improve overall performance. We do not use these cookies to identify individual users.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">4. Managing Cookies</h2>
                  <p>Most web browsers allow some control of cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
               </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
