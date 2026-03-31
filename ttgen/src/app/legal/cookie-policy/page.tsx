import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { 
  Cookie, 
  Settings2, 
  Clock, 
  ShieldCheck, 
  Database,
  ScrollText
} from "lucide-react"

export default function CookiePolicyPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Cookie Policy</h1>
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
                       "TimetablePro uses cookies to enhance your experience, maintain your 
                       institutional session, and provide personalized AI-driven scheduling 
                       insights."
                    </p>
                    <p>
                       This Cookie Policy explains what cookies are, how we use them, and 
                       how you can manage your cookie preferences.
                    </p>
                 </div>

                 {/* 1. What are Cookies? */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                       <Cookie className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">1. What are Cookies?</h2>
                    </div>
                    <p>
                       Cookies are small text files stored on your computer or mobile 
                       device when you visit a website. They are widely used to make 
                       websites work more efficiently, as well as to provide 
                       reporting information.
                    </p>
                 </div>

                 {/* 2. Types of Cookies We Use */}
                 <div className="space-y-6 border-y py-12 bg-muted/20 px-8 rounded-[2rem]">
                    <div className="flex items-center gap-3 text-primary">
                       <Database className="h-6 w-6" />
                       <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">2. Types of Cookies We Use</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                       <div className="space-y-3">
                          <h4 className="font-bold text-sm text-foreground uppercase tracking-widest flex items-center gap-2">
                             <ShieldCheck className="h-4 w-4" />
                             Essential Cookies
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                             These are necessary for the website to function correctly. 
                             They include session cookies for authentication, security 
                             and CSRF protection.
                          </p>
                       </div>
                       <div className="space-y-3">
                          <h4 className="font-bold text-sm text-foreground uppercase tracking-widest flex items-center gap-2">
                             <Settings2 className="h-4 w-4" />
                             Preference Cookies
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                             These allow us to remember the choices you make (such as 
                             your default department or dashboard layout) to provide a 
                             more personalized experience.
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* 3. Session + Analytics Cookies */}
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">3. Session + Analytics Cookies</h2>
                    <p>
                       We use session cookies to keep you logged in while you navigate our 
                       dashboard and make real-time changes to your timetables.
                    </p>
                    <p>
                       We also use limited, anonymized analytics cookies (e.g., Google 
                       Analytics) to understand how academic administrators use our 
                       platform, allowing us to optimize our AI workflow.
                    </p>
                 </div>

                 {/* 4. Disabling Cookies */}
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">4. How to Disable Cookies</h2>
                    <p>
                       Most web browsers allow you to control cookies through their 
                       settings preferences. However, please note that disabling 
                       essential cookies will prevent you from logging into the 
                       TimetablePro dashboard.
                    </p>
                    <ul className="space-y-2">
                       <li><a href="#" className="font-bold underline">Manage Browser Settings</a></li>
                       <li><a href="#" className="font-bold underline">Opt-out of Analytics</a></li>
                    </ul>
                 </div>

                 {/* Contact */}
                 <div className="pt-8 border-t text-sm text-muted-foreground italic font-medium">
                    <p>
                       For further information regarding our use of cookies, please 
                       reach out to our technical team at <span className="text-primary font-bold">privacy@timetablepro.ai</span>.
                    </p>
                 </div>
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
