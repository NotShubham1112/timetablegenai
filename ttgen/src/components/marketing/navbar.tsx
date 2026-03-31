"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, GraduationCap, Users, BookOpen, Menu, X, Sparkles } from "lucide-react"
import { Container } from "./container"

const companyItems = [
  {
    title: "About Us",
    href: "/company/about",
    description: "Our mission to revolutionize college scheduling.",
    icon: Users,
  },
  {
    title: "Blog",
    href: "/company/blog",
    description: "Latest news, updates and scheduling tips.",
    icon: BookOpen,
  },
  {
    title: "Careers",
    href: "/company/careers",
    description: "Join us in building the future of education tech.",
    icon: GraduationCap,
  },
  {
    title: "Contact",
    href: "/company/contact",
    description: "Get in touch with our support and sales teams.",
    icon: GraduationCap,
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Product", href: "/product" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary blur-lg opacity-20"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">TimetablePro</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === link.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {companyItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="hidden text-sm font-medium transition-colors hover:text-primary md:block"
          >
            Sign In
          </Link>
          <Button asChild size="sm" className="rounded-full shadow-lg shadow-primary/20">
            <Link href="/register">Get Started</Link>
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  TimetablePro
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="space-y-3 pt-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Company</p>
                  <div className="grid gap-4">
                    {companyItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-8 flex flex-col gap-3">
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full rounded-full shadow-lg shadow-primary/20">
                    <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        render={
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          />
        }
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary/80" />}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


