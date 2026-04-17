import React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Section } from "@/components/marketing/section"
import { Container } from "@/components/marketing/container"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Section className="pt-32 pb-12">
          <Container variant="narrow">
            <h1 className="text-4xl md:text-6xl font-black mb-8">Terms of Service</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mb-12">Last Updated: March 30, 2024</p>
          </Container>
        </Section>

        <Section variant="transparent" className="pb-32">
          <Container variant="narrow">
            <div className="prose prose-invert prose-primary max-w-none space-y-12 leading-relaxed text-muted-foreground">
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                  <p>By accessing or using Slotify, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
                  <p>Permission is granted to temporarily download one copy of the materials (information or software) on Slotify's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                  <ul className="list-disc pl-6 space-y-2">
                     <li>Modify or copy the materials;</li>
                     <li>Use the materials for any commercial purpose;</li>
                     <li>Attempt to decompile or reverse engineer any software;</li>
                     <li>Transfer the materials to another person or "mirror" the materials.</li>
                  </ul>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">3. User Responsibility</h2>
                  <p>Institutional administrators are responsible for the accuracy of the data uploaded (syllabuses, room capacities, etc.). Slotify provides optimization based on provided inputs and does not verify the legal standing of the academic documents.</p>
               </section>
               <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">4. Service Limitations</h2>
                  <p>While we strive for 100% accuracy, Slotify is provided "as is". We do not warrant that the service will be uninterrupted or error-free for every possible institutional constraint.</p>
               </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
