import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Section className="pt-32 pb-12">
          <Container variant="narrow">
            <h1 className="text-4xl md:text-6xl font-black mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mb-12">Last Updated: March 30, 2024</p>
          </Container>
        </Section>

        <Section variant="transparent" className="pb-32">
          <Container variant="narrow">
            <div className="prose prose-invert prose-primary max-w-none space-y-12 leading-relaxed text-muted-foreground">
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                  <p>TimetablePro collects both institutional and personal information necessary to provide our scheduling services. This includes institutional data (curriculums, room lists, faculty names) and personal identifiers for registered administrators.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">2. How We Use Data</h2>
                  <p>We use the data provided to generate optimized institutional timetables. Our AI core processes university inputs solely for the purpose of conflict resolution and resource mapping. We do not sell institutional data to third parties.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">3. Data Retention</h2>
                  <p>Institutional data is retained as long as the account is active. Upon termination of service, all institutional archives and generated timetables are permanently purged from our primary servers within 30 days.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">4. Analytics and Cookies</h2>
                  <p>We use minimal tracking for performance optimization and debugging. For more details, explore our Cookie Policy.</p>
               </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
