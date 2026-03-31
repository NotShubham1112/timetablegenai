import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/container"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  ArrowRight
} from "lucide-react"

const contactInfo = [
  {
    title: "Support Email",
    value: "support@timetablepro.ai",
    icon: Mail,
    description: "24/7 priority support for Pro and Enterprise users.",
  },
  {
    title: "Phone Support",
    value: "+91 (0) 22 4567 8900",
    icon: Phone,
    description: "Monday to Friday, 9am - 6pm IST.",
  },
  {
    title: "Headquarters",
    value: "Powai, Mumbai, MH, 400076",
    icon: MapPin,
    description: "Our main innovation hub and campus lab.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Contact Hero */}
        <Section className="bg-muted/10 pt-24 pb-16 border-b overflow-hidden relative">
           <div className="absolute top-0 right-0 p-32 text-primary/5 italic font-black text-9xl select-none uppercase pointer-events-none">
              Hello
           </div>
           <Container>
              <div className="max-w-2xl space-y-6">
                 <Badge variant="outline" className="px-3 py-1 font-bold text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px]">
                    Contact TimetablePro
                 </Badge>
                 <h1 className="text-4xl md:text-6xl font-bold tracking-tight">How can we help your institute?</h1>
                 <p className="text-xl text-muted-foreground leading-relaxed italic">
                    "From technical queries to full-scale enterprise deployments, we're 
                    here to ensure your academic year is optimized."
                 </p>
              </div>
           </Container>
        </Section>

        {/* Contact Form & Info Grid */}
        <Section>
           <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                 {/* Contact Info Column */}
                 <div className="lg:col-span-5 space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                       {contactInfo.map((info, i) => (
                          <div key={i} className="flex gap-6 group">
                             <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm shrink-0">
                                <info.icon className="h-6 w-6" />
                             </div>
                             <div className="space-y-1">
                                <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">{info.title}</h4>
                                <p className="text-lg font-bold text-foreground">{info.value}</p>
                                <p className="text-sm text-muted-foreground italic">{info.description}</p>
                             </div>
                          </div>
                       ))}
                    </div>

                    <Separator className="lg:hidden" />

                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/20 relative overflow-hidden shadow-xl">
                       <div className="absolute top-0 left-0 p-4 text-primary opacity-5">
                          <MessageSquare className="h-24 w-24" />
                       </div>
                       <h3 className="text-2xl font-bold mb-4">Quick Response Promise</h3>
                       <p className="text-muted-foreground italic mb-6">
                          "We respond to all institutional inquiries within 4 business hours. 
                          Guaranteed."
                       </p>
                       <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm font-bold text-primary italic">
                             <CheckCircle2 className="h-4 w-4" />
                             SOC2 Type II Compliant
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-primary italic">
                             <CheckCircle2 className="h-4 w-4" />
                             Dedicated Onboarding Team
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Contact Form Column */}
                 <div className="lg:col-span-7">
                    <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-sm rounded-[3rem] overflow-hidden p-2 md:p-8 relative group">
                        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <CardHeader className="space-y-4 text-center md:text-left">
                           <CardTitle className="text-3xl font-black">Send a Message</CardTitle>
                           <CardDescription className="text-lg italic font-medium">
                              Let's discuss how we can revolutionize your scheduling.
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</Label>
                                    <Input id="name" placeholder="Vikram Sethi" className="h-12 bg-background/50 border-muted-foreground/30 focus-visible:ring-primary rounded-full px-6" />
                                 </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1">Work Email</Label>
                                    <Input id="email" type="email" placeholder="vikram@institute.edu" className="h-12 bg-background/50 border-muted-foreground/30 focus-visible:ring-primary rounded-full px-6" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="institute" className="text-xs font-bold uppercase tracking-widest ml-1">Institute Name</Label>
                                 <Input id="institute" placeholder="Indian Institute of Technology, Mumbai" className="h-12 bg-background/50 border-muted-foreground/30 focus-visible:ring-primary rounded-full px-6" />
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest ml-1">Your Inquiry</Label>
                                 <textarea 
                                    id="message" 
                                    placeholder="Tell us about your institutional requirements..." 
                                    className="min-h-[160px] w-full rounded-2xl border border-muted-foreground/30 bg-background/50 px-6 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                 />
                              </div>
                              <div className="pt-4 flex items-center justify-between gap-4 flex-col md:flex-row">
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">
                                    <Clock className="h-3 w-3" />
                                    Avg. response time: 4 hours
                                 </div>
                                 <Button size="xl" className="w-full md:w-auto h-14 rounded-full px-12 font-black shadow-lg shadow-primary/20 group uppercase tracking-widest">
                                    Send Inquiry
                                    <ArrowRight className="ml-2 h-5 w-4 transition-transform group-hover:translate-x-1" />
                                 </Button>
                              </div>
                           </form>
                        </CardContent>
                    </Card>
                 </div>
              </div>
           </Container>
        </Section>

        {/* Map Placeholder */}
        <Section variant="muted" className="border-t">
           <Container>
              <div className="text-center mb-12 space-y-4">
                 <h2 className="text-4xl font-bold tracking-tight">Visit Our Innovation Lab</h2>
                 <p className="text-lg text-muted-foreground italic font-medium italic">"Where Higher Education meets High Technology."</p>
              </div>
              <div className="aspect-[21/9] bg-muted border border-dashed border-muted-foreground/30 rounded-[3rem] flex flex-col items-center justify-center p-12 overflow-hidden shadow-sm relative group overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                 <MapPin className="h-16 w-16 text-muted-foreground/20 animate-pulse mb-4" />
                 <div className="text-sm font-bold text-muted-foreground/30 italic uppercase tracking-tighter select-none">INTERACTIVE MAP PREVIEW</div>
                 <div className="mt-4 flex gap-4">
                    <Badge variant="outline" className="px-4 py-1 text-[10px] font-black uppercase tracking-widest border-muted-foreground/30 text-muted-foreground">POWAI, MUMBAI</Badge>
                    <Badge variant="outline" className="px-4 py-1 text-[10px] font-black uppercase tracking-widest border-muted-foreground/30 text-muted-foreground">LAT: 19.1176 | LONG: 72.9060</Badge>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
              </div>
           </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full bg-muted-foreground/10 ${className}`} />
}
