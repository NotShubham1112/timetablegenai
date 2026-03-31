import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import {
   Lock,
   Database,
   Key,
   History,
   AlertTriangle,
   FileCheck,
   Building,
   ScrollText,
   Clock
} from "lucide-react"

export default function DataSecurityPage() {
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
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Data Security Overview</h1>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                     <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Last Updated: March 20, 2024
                     </span>
                     <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-widest">Enterprise Ready</Badge>
                  </div>
               </Container>
            </Section>

            {/* Security Pillars */}
            <Section>
               <Container variant="narrow">
                  <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12">
                     {/* Intro */}
                     <div className="space-y-4">
                        <p className="text-lg leading-relaxed italic border-l-4 pl-6 border-primary/20">
                           "TimetablePro is built on a 'Security-by-Design' architecture.
                           We understand that institutional data is a critical asset, and we
                           employ multiple layers of protection to keep it safe."
                        </p>
                     </div>

                     {/* 1. Encryption Standards */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                           <Lock className="h-6 w-6" />
                           <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">1. Encryption Standards</h2>
                        </div>
                        <p>
                           We use industry-leading encryption protocols to protect your data
                           at all stages of its lifecycle:
                        </p>
                        <ul className="space-y-2">
                           <li><strong>In Transit:</strong> All data transmitted between your browser and our servers is encrypted using TLS 1.3 (Transport Layer Security).</li>
                           <li><strong>At Rest:</strong> All stored data, including backups, is encrypted using AES-256 (Advanced Encryption Standard).</li>
                           <li><strong>End-to-End:</strong> Sensitive API keys and credentials are encrypted using vault-based secrets management.</li>
                        </ul>
                     </div>

                     {/* 2. Access Level Controls */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                           <Key className="h-6 w-6" />
                           <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">2. Access Controls</h2>
                        </div>
                        <p>
                           We implement strict Role-Based Access Control (RBAC) to ensure
                           that users only see the data they are authorized to access.
                        </p>
                        <ul className="space-y-2">
                           <li><strong>Admin Role:</strong> Full control over institutional settings and user management.</li>
                           <li><strong>Department Head:</strong> Access to specific departmental timetables and faculty lists.</li>
                           <li><strong>Faculty:</strong> View-only access to personal and shared departmental schedules.</li>
                           <li><strong>Audit:</strong> View-only access to system logs for compliance reviews.</li>
                        </ul>
                     </div>

                     {/* 3. Database Protection */}
                     <div className="space-y-6 border-y py-12 bg-muted/20 px-8 rounded-[2rem]">
                        <div className="flex items-center gap-3 text-primary text-center justify-center">
                           <Database className="h-6 w-6 shrink-0" />
                           <h2 className="text-2xl font-bold m-0 uppercase tracking-tight text-center">3. Database Protection</h2>
                        </div>
                        <p className="text-center">
                           Our database architecture is powered by Supabase, providing
                           enterprise-grade reliability and security features.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                           <div className="p-4 rounded-xl bg-background border flex items-start gap-3">
                              <Building className="h-5 w-5 text-primary mt-1 shrink-0" />
                              <div>
                                 <h4 className="font-bold text-sm">Row-Level Security (RLS)</h4>
                                 <p className="text-xs text-muted-foreground mt-1">Ensures that data is strictly partitioned at the database level.</p>
                              </div>
                           </div>
                           <div className="p-4 rounded-xl bg-background border flex items-start gap-3">
                              <History className="h-5 w-5 text-primary mt-1 shrink-0" />
                              <div>
                                 <h4 className="font-bold text-sm">PITR Backups</h4>
                                 <p className="text-xs text-muted-foreground mt-1">Point-in-Time Recovery allows us to restore data to any state in the last 30 days.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* 4. Audit Logs & Monitoring */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                           <FileCheck className="h-6 w-6" />
                           <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">4. Audit Logs</h2>
                        </div>
                        <p>
                           We maintain comprehensive audit logs for all security-sensitive
                           actions, including:
                        </p>
                        <ul className="space-y-2 italic text-sm text-muted-foreground">
                           <li>Login and logout attempts.</li>
                           <li>Changes to institutional configuration or faculty data.</li>
                           <li>Finalization and export of department-wide timetables.</li>
                           <li>Administrative user role assignments.</li>
                        </ul>
                     </div>

                     {/* 5. Incident Response */}
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                           <AlertTriangle className="h-6 w-6" />
                           <h2 className="text-2xl font-bold m-0 uppercase tracking-tight">5. Incident Response</h2>
                        </div>
                        <p>In the event of a security incident, our team follows a rigorous protocol:</p>
                        <ul className="space-y-2">
                           <li><strong>Detection:</strong> Automated monitoring alerts our security team of any anomalies.</li>
                           <li><strong>Containment:</strong> Rapid isolation of affected services to prevent further impact.</li>
                           <li><strong>Notification:</strong> Affected institutions are notified within 24 hours of a confirmed breach.</li>
                           <li><strong>Recovery:</strong> Restoring services via validated clean backups within a 1-hour RTO.</li>
                        </ul>
                     </div>

                     {/* 6. Compliance Overview */}
                     <div className="pt-8 border-t">
                        <h2 className="text-xl font-bold mb-4">Compliance Certificates</h2>
                        <p>TimetablePro aligns with the following industrial and academic standards:</p>
                        <div className="mt-4 flex flex-wrap gap-4">
                           <Badge className="px-4 py-2 font-black uppercase tracking-widest text-[10px]">SOC2 Type II Compliant</Badge>
                           <Badge className="px-4 py-2 font-black uppercase tracking-widest text-[10px]" variant="outline">ISO/IEC 27001 (Aligned)</Badge>
                           <Badge className="px-4 py-2 font-black uppercase tracking-widest text-[10px]" variant="secondary">GDPR Ready</Badge>
                           <Badge className="px-4 py-2 font-black uppercase tracking-widest text-[10px]" variant="outline">FERPA (Institutional Data)</Badge>
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

function CloudBackup(props: any) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M12 13v8" />
         <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
         <path d="m8 17 4-4 4 4" />
      </svg>
   )
}
