"use client"

import * as React from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Context ────────────────────────────────────────────────────────────────
interface NavigationMenuCtx {
  openItem: string | null
  setOpenItem: (v: string | null) => void
}
const Ctx = React.createContext<NavigationMenuCtx>({
  openItem: null,
  setOpenItem: () => {},
})

// ── Root ──────────────────────────────────────────────────────────────────
function NavigationMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [openItem, setOpenItem] = React.useState<string | null>(null)
  return (
    <Ctx.Provider value={{ openItem, setOpenItem }}>
      <nav
        data-slot="navigation-menu"
        className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
        {...props}
      >
        {children}
      </nav>
    </Ctx.Provider>
  )
}

// ── List ──────────────────────────────────────────────────────────────────
function NavigationMenuList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
      {...props}
    />
  )
}

// ── Item ──────────────────────────────────────────────────────────────────
interface NavigationMenuItemCtx { id: string }
const ItemCtx = React.createContext<NavigationMenuItemCtx>({ id: "" })

function NavigationMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  const id = React.useId()
  return (
    <ItemCtx.Provider value={{ id }}>
      <li
        data-slot="navigation-menu-item"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </li>
    </ItemCtx.Provider>
  )
}

// ── Trigger style ─────────────────────────────────────────────────────────
const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 bg-transparent"
)

// ── Trigger ───────────────────────────────────────────────────────────────
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openItem, setOpenItem } = React.useContext(Ctx)
  const { id } = React.useContext(ItemCtx)
  const isOpen = openItem === id

  return (
    <button
      data-slot="navigation-menu-trigger"
      data-state={isOpen ? "open" : "closed"}
      className={cn(navigationMenuTriggerStyle(), "gap-0", className)}
      onClick={() => setOpenItem(isOpen ? null : id)}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "relative top-px ml-1 h-3 w-3 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  )
}

// ── Content ───────────────────────────────────────────────────────────────
function NavigationMenuContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { openItem } = React.useContext(Ctx)
  const { id } = React.useContext(ItemCtx)
  const isOpen = openItem === id

  if (!isOpen) return null

  return (
    <div
      data-slot="navigation-menu-content"
      className={cn(
        "absolute left-0 top-full z-50 mt-2 rounded-lg bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10 animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Link ──────────────────────────────────────────────────────────────────
interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  asChild?: boolean
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const inner = (
      <a
        ref={ref}
        data-slot="navigation-menu-link"
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        href={href}
        {...props}
      >
        {children}
      </a>
    )
    return inner
  }
)
NavigationMenuLink.displayName = "NavigationMenuLink"

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
}
