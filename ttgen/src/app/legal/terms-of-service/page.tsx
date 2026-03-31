import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { 
  ScrollText, 
  Clock, 
  Scale, 
  UserCheck, 
  CreditCard, 
  AlertTriangle, 
  Gavel 
} from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Legal Header */}
        <Section className="bg-muted/10 pt-24 pb-12 border-b">
           <Container variant="narrow">
              <div className="flex items-center gap-2 mb-4">
                 <ScrollText className="h-4 w-4 text-primary" />
                 <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal & Compliance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Terms of Service</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                 <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Last Updated: March 20, 2024
                 </span>
                 <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-widest">Version 1.2</Badge>
              </div>
           </Container>
        </Section>

        {/* Content Section */}
        <Section>
           <Container variant="narrow">
              <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12">
                 {/* Intro */}
                 <div className="space-y-4">
                    <p className="text-lg leading-relaxed italic border-l-4 pl-6 border-primary/20">
                       "By accessing or using TimetablePro, you agree to comply with and 
                       be bound by these Terms of Service. Please read them carefully."
                    </p>
                    <p>
                       These Terms of Service ("Terms") govern your access to and use of 
                       TimetablePro's website, application, and services. They constitute 
                       a legal agreement between your institution ("User" or "you") and 
                       TimetablePro Inc. ("Company," "we," or "us").
                    </p>
                 </div>

                 {/* 1. Definition of Service */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <Scale className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">1. Definition of Service</h2>
                    </div>
                    <p>
                       TimetablePro provides an AI-powered SaaS platform for educational 
                       institutions to automate the generation, management, and optimization 
                       of academic timetables. This includes syllabus parsing, faculty 
                       load balancing, and classroom allocation.
                    </p>
                 </div>

                 {/* 2. User Responsibilities */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <UserCheck className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">2. User Responsibilities</h2>
                    </div>
                    <p>To use our services, you must:</p>
                    <ul className="space-y-2">
                       <li>Provide accurate and complete institutional information during registration.</li>
                       <li>Maintain the security of your account credentials and notify us of any breaches.</li>
                       <li>Ensure that all data (syllabus, faculty lists) uploaded does not violate third-party rights.</li>
                       <li>Comply with all applicable laws and educational regulations in your jurisdiction.</li>
                    </ul>
                 </div>

                 {/* 3. Billing & Payments */}
                 <div className="space-y-6 border-y py-12 bg-muted/20 px-8 rounded-[2rem]">
                    <div className="flex items-center gap-3 text-primary">
                       <CreditCard className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">3. Billing & Payments</h2>
                    </div>
                    <p>
                       Subscription fees are based on your selected plan (Free, Standard, 
                       Professional, or Enterprise).
                    </p>
                    <ul className="space-y-2">
                       <li><strong>Payments:</strong> All fees are non-refundable except as required by law.</li>
                       <li><strong>Cancellations:</strong> You can cancel your subscription at any time; access will continue until the end of the current billing cycle.</li>
                       <li><strong>Late Payments:</strong> We reserve the right to suspend access for accounts with overdue invoices beyond 14 days.</li>
                    </ul>
                 </div>

                 {/* 4. Limitation of Liability */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <AlertTriangle className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">4. Limitation of Liability</h2>
                    </div>
                    <p>
                       TimetablePro is provided "as is." While we strive for 100% accuracy, 
                       we do not guarantee that the generated schedules will fit every 
                       unforeseen real-world constraint. Use the AI outputs as highly 
                       optimized drafts that require institutional review.
                    </p>
                    <p className="italic text-sm text-muted-foreground">
                       In no event shall TimetablePro be liable for any indirect, incidental, 
                       or consequential damages resulting from the use or inability to use 
                       the service.
                    </p>
                 </div>

                 {/* 5. Termination */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <Gavel className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">5. Termination</h2>
                    </div>
                    <p>
                       We reserve the right to terminate or suspend your account if you 
                       violate these Terms. Upon termination, your right to use the 
                       service will immediately cease, and all institutional data will 
                       be handled according to our Privacy Policy.
                    </p>
                 </div>

                 {/* 6. Legal Jurisdiction */}
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">6. Legal Jurisdiction</h2>
                    <p>
                       These Terms are governed by and construed in accordance with the 
                       laws of Mumbai, Maharashtra, India. Any disputes shall be subject 
                       to the exclusive jurisdiction of the courts in Mumbai.
                    </p>
                 </div>

                 {/* Contact */}
                 <div className="pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">Questions?</h2>
                    <p>If you have any questions about these Terms, please contact our legal team:</p>
                    <div className="mt-4 p-6 rounded-2xl border bg-muted/10 font-mono text-sm space-y-1">
                       <p>Email: legal@timetablepro.ai</p>
                       <p>Address: TimetablePro Inc, legal Division, Mumbai, MH, 400076</p>
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
