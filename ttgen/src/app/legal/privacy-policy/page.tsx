import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  ScrollText,
  Clock
} from "lucide-react"

export default function PrivacyPolicyPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Privacy Policy</h1>
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
                       "At TimetablePro, your institutional data privacy is our highest priority. 
                       We are committed to being transparent about how we collect, use, and 
                       protect your information."
                    </p>
                    <p>
                       This Privacy Policy describes our practices regarding the personal 
                       information and institutional data we collect through our website, 
                       web application, and related services.
                    </p>
                 </div>

                 {/* 1. Data Collection */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <Database className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">1. Data We Collect</h2>
                    </div>
                    <p>We collect information that you provide directly to us, including:</p>
                    <ul className="space-y-2">
                       <li><strong>Account Information:</strong> Name, professional email, institute name, and credentials.</li>
                       <li><strong>Academic Data:</strong> Syllabus PDFs, faculty lists, classroom details, and departmental constraints.</li>
                       <li><strong>Communication Data:</strong> Records of your interactions with our support and sales teams.</li>
                       <li><strong>Usage Data:</strong> Information about how you interact with our platform (IP addresses, browser type, pages visited).</li>
                    </ul>
                 </div>

                 {/* 2. Use of Data */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <Eye className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">2. How We Use It</h2>
                    </div>
                    <p>The information we collect is used solely to provide and improve our services:</p>
                    <ul className="space-y-2">
                       <li>To generate automated timetables using our AI engines.</li>
                       <li>To process payments and manage your institutional account.</li>
                       <li>To provide priority technical support and training.</li>
                       <li>To analyze platform performance and fix operational bugs.</li>
                       <li>To send critical system updates and security alerts.</li>
                    </ul>
                 </div>

                 {/* 3. Storage & Protection */}
                 <div className="space-y-6 border-y py-12 bg-muted/20 px-8 rounded-[2rem]">
                    <div className="flex items-center gap-3 text-primary">
                       <Lock className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">3. Storage & Protection</h2>
                    </div>
                    <p>
                       Your data is encrypted using AES-256 standards at rest and TLS 1.3 in transit. 
                       We utilize multi-region redundancy to ensure 99.9% availability.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                       <div className="p-4 rounded-xl bg-background border flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-primary mt-1 shrink-0" />
                          <div>
                             <h4 className="font-bold text-sm">SOC2 Type II</h4>
                             <p className="text-xs text-muted-foreground mt-1">Our infrastructure meets the highest industry security benchmarks.</p>
                          </div>
                       </div>
                       <div className="p-4 rounded-xl bg-background border flex items-start gap-3">
                          <Server className="h-5 w-5 text-primary mt-1 shrink-0" />
                          <div>
                             <h4 className="font-bold text-sm">Isolated Environments</h4>
                             <p className="text-xs text-muted-foreground mt-1">Each institution's data is stored in logically isolated database clusters.</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 4. Third-party Tools */}
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">4. Third-party Tools</h2>
                    <p>
                       We use a limited number of trusted third-party sub-processors to assist 
                       in providing our services, including:
                    </p>
                    <ul className="space-y-2 italic text-sm text-muted-foreground">
                       <li><strong>Supabase:</strong> For cloud database management.</li>
                       <li><strong>Vercel:</strong> For high-availability web hosting.</li>
                       <li><strong>Stripe:</strong> For secure payment processing.</li>
                       <li><strong>OpenRouter/Gemini:</strong> For AI-driven syllabus parsing.</li>
                    </ul>
                 </div>

                 {/* 5. User Rights */}
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">5. User Rights</h2>
                    <p>As a user, you have the following rights regarding your data:</p>
                    <ul className="space-y-2">
                       <li><strong>Access:</strong> You can request a full copy of all data we hold about your institute.</li>
                       <li><strong>Portability:</strong> You can export your generated timetables in various formats anytime.</li>
                       <li><strong>Deletion:</strong> Upon contract termination, you can request permanent deletion of all your records.</li>
                       <li><strong>Rectification:</strong> You can update your institutional constraints and faculty lists at any time.</li>
                    </ul>
                 </div>

                 {/* 6. Contact */}
                 <div className="pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">Contact Details</h2>
                    <p>If you have any questions about this Privacy Policy, please contact our Data Protection Officer:</p>
                    <div className="mt-4 p-6 rounded-2xl border bg-muted/10 font-mono text-sm space-y-1">
                       <p>Email: dpo@timetablepro.ai</p>
                       <p>Address: TimetablePro Inc, Mumbai, MH, 400076</p>
                       <p>Subject: Privacy Inquiry</p>
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
