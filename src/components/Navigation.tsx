"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BedDouble, ClipboardList, LayoutDashboard, User, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/", label: "Menu", icon: Utensils },
  { href: "/rooms", label: "Rooms", icon: BedDouble },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/profile", label: "Profile", icon: User },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <aside className="fixed bottom-0 left-0 z-10 w-full border-t bg-background/95 backdrop-blur-sm md:relative md:h-screen md:w-20 md:border-r md:border-t-0 md:bg-background md:backdrop-blur-none">
      <TooltipProvider delayDuration={0}>
        <nav className="flex h-full flex-row items-center justify-around md:flex-col md:justify-start">
          <Link
            href="/"
            className="hidden h-20 w-full items-center justify-center font-bold text-2xl text-primary md:flex"
            aria-label="VenueVerse Home"
          >
            VV
          </Link>

          <div className="flex flex-1 items-center justify-around md:flex-none md:flex-col md:gap-2">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs font-medium md:hidden">{item.label}</span>
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden md:block">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </nav>
      </TooltipProvider>
    </aside>
  )
}
