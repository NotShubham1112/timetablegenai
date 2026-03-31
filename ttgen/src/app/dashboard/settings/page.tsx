'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Settings, 
  Database, 
  LogOut, 
  Trash2, 
  Download, 
  Upload, 
  Moon, 
  Sun,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  Globe,
  Save,
  AlertCircle,
  Loader2
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { getSettings, updateSettings, resetData, logout } from './actions';

const settingsSchema = z.object({
  display_name: z.string().min(2, "Display name is too short").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  timezone: z.string(),
  weekly_start_day: z.string(),
  academic_year_format: z.string(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const [initialData, setInitialData] = React.useState<any>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      display_name: "",
      phone: "",
      timezone: "ist",
      weekly_start_day: "Monday",
      academic_year_format: "YYYY-YYYY",
    },
  });

  React.useEffect(() => {
    setMounted(true);
    async function loadSettings() {
      try {
        const data = await getSettings();
        if (data) {
          setInitialData(data);
          form.reset({
            display_name: data.display_name || "",
            phone: data.phone || "",
            timezone: data.timezone || "ist",
            weekly_start_day: data.weekly_start_day || "Monday",
            academic_year_format: data.academic_year_format || "YYYY-YYYY",
          });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
    loadSettings();
  }, [form]);

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  async function onSaveSettings(values: SettingsFormValues) {
    setIsUpdating(true);
    const result = await updateSettings(values);
    setIsUpdating(false);

    if (result.success) {
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error as string,
        variant: "destructive",
      });
    }
  }

  async function handleResetData() {
    if (!confirm("Are you SURE you want to clear all data? This cannot be undone.")) return;
    
    setIsResetting(true);
    const result = await resetData();
    setIsResetting(false);

    if (result.success) {
      toast({
        title: "Data Reset Complete",
        description: "All timetable data has been cleared.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error as string,
        variant: "destructive",
      });
    }
  }

  async function handleLogout() {
    await logout();
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your account preferences and institution data.
          </p>
        </div>
        <Button 
          onClick={form.handleSubmit(onSaveSettings)} 
          disabled={isUpdating}
          className="h-9 px-5 bg-primary hover:opacity-90 transition-all font-medium rounded-full shadow-lg"
        >
          {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <Separator className="bg-border/40" />

      <div className="grid gap-10 md:grid-cols-12">
        {/* LEFT COLUMN: Main Settings */}
        <div className="md:col-span-12 lg:col-span-7 space-y-10">
          
          {/* PROFILE SETTINGS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <User className="h-4 w-4 text-muted-foreground/70" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">Profile Settings</h3>
            </div>
            <Card className="border-border/40 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardDescription>
                  Institutional details are linked to your academy registration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-5 pb-2">
                  <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xl font-medium">
                      {form.getValues("display_name")?.charAt(0) || initialData?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg">
                      Change Photo
                    </Button>
                    <p className="text-[10px] text-muted-foreground px-1">
                      Synced with login profile.
                    </p>
                  </div>
                </div>

                <Separator className="bg-border/40" />

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium ml-1">College Name</Label>
                      <div className="relative group">
                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                        <Input 
                          value={initialData?.name || "Loading..."} 
                          readOnly 
                          className="pl-10 h-10 bg-muted/30 border-none focus-visible:ring-0 cursor-default text-muted-foreground/80 font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-medium ml-1">Email address</Label>
                       <div className="relative group">
                         <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                         <Input 
                           value={initialData?.email || "Loading..."} 
                           readOnly 
                           className="pl-10 h-10 bg-muted/30 border-none focus-visible:ring-0 cursor-default text-muted-foreground/80 font-medium" 
                         />
                       </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_name" className="text-xs font-medium ml-1">Administrator Name</Label>
                      <Input 
                        id="display_name" 
                        placeholder="John Doe" 
                        {...form.register("display_name")}
                        className="h-10 bg-background/50 border-border/40 focus:ring-1 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-medium ml-1">Phone Number</Label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                        <Input 
                          id="phone" 
                          placeholder="+91 98765 43210" 
                          {...form.register("phone")}
                          className="pl-10 h-10 bg-background/50 border-border/40 focus:ring-1 transition-all" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="ghost" className="h-9 px-0 text-sm font-medium text-primary hover:bg-transparent hover:underline transition-all">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Reset or change password via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* APPLICATION SETTINGS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Settings className="h-4 w-4 text-muted-foreground/70" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">Application Settings</h3>
            </div>
            <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/20">
                  <div className="space-y-1">
                    <Label className="text-sm font-semibold">Appearance Theme</Label>
                    <p className="text-xs text-muted-foreground">Select how you experience Timetable Pro.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-background/50 p-1 rounded-full border border-border/40">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setTheme('light')}
                      className={`h-8 w-8 rounded-full ${theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setTheme('dark')}
                      className={`h-8 w-8 rounded-full ${theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium ml-1 flex items-center gap-2">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      Timezone Preference
                    </Label>
                    <Select value={form.watch("timezone")} onValueChange={(val) => form.setValue("timezone", val)}>
                      <SelectTrigger className="h-10 bg-background/50 border-border/40 focus:ring-1">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Universal)</SelectItem>
                        <SelectItem value="ist">IST (India)</SelectItem>
                        <SelectItem value="est">EST (Eastern)</SelectItem>
                        <SelectItem value="pst">PST (Pacific)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium ml-1 flex items-center gap-2">
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                      Weekly Start Day
                    </Label>
                    <Select value={form.watch("weekly_start_day")} onValueChange={(val) => form.setValue("weekly_start_day", val)}>
                       <SelectTrigger className="h-10 bg-background/50 border-border/40 focus:ring-1">
                         <SelectValue placeholder="Select day" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Monday">Monday</SelectItem>
                         <SelectItem value="Sunday">Sunday</SelectItem>
                         <SelectItem value="Saturday">Saturday</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium ml-1">Academic Year Format</Label>
                  <Select value={form.watch("academic_year_format")} onValueChange={(val) => form.setValue("academic_year_format", val)}>
                    <SelectTrigger className="h-10 bg-background/50 border-border/40 focus:ring-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YYYY-YYYY">YYYY–YYYY (e.g., 2024–2025)</SelectItem>
                      <SelectItem value="YY-YY">YY–YY (e.g., 24–25)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* RIGHT COLUMN: Data & Account */}
        <div className="md:col-span-12 lg:col-span-5 space-y-10">
          
          {/* DATA MANAGEMENT */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Database className="h-4 w-4 text-muted-foreground/70" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">Data Management</h3>
            </div>
            <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardDescription>
                  Export your configurations or restore them from a backup file.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-10 border-border/40 bg-background/50 hover:bg-accent text-xs">
                    <Download className="mr-2 h-4 w-4" />
                    Export Setup
                  </Button>
                  <Button variant="outline" className="h-10 border-border/40 bg-background/50 hover:bg-accent text-xs">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-medium text-destructive/80">Danger Zone</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Clear all your scheduled timetables, subjects, and faculty data. This action is permanent.
                    </p>
                  </div>
                  <Button 
                    onClick={handleResetData}
                    disabled={isResetting}
                    variant="ghost" 
                    className="w-full justify-start h-10 text-xs font-semibold text-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-colors border border-dashed border-destructive/20 bg-destructive/5"
                  >
                    {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                    Reset All College Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ACCOUNT ACTIONS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <LogOut className="h-4 w-4 text-muted-foreground/70" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/80">Account Session</h3>
            </div>
            <Card className="border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4">
                <Button 
                  onClick={handleLogout}
                  variant="secondary" 
                  className="w-full h-11 justify-start font-medium text-sm border-none bg-muted/60 hover:bg-muted/80 transition-all rounded-xl"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out Session
                </Button>
                <div className="p-4 rounded-xl border border-dashed border-destructive/20 bg-destructive/5 space-y-3 text-center">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Closing your account will erase everything permanently.
                  </p>
                  <Button variant="destructive" className="w-full h-9 text-xs font-semibold bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground transition-all border-none">
                    Delete Account Permanently
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* HELP TIP */}
          <Alert className="bg-primary/5 border-none shadow-none rounded-xl">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-semibold">Security Note</AlertTitle>
            <AlertDescription className="text-[11px] text-muted-foreground">
              Always log out if you are using a shared device to protect your institution's schedule.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
