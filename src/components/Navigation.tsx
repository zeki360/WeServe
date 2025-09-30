"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BedDouble, CalendarCheck, ClipboardList, LayoutDashboard, User, Utensils, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext"

const allNavItems = [
  { href: "/", label: "Menu", icon: Utensils, roles: ['customer'] },
  { href: "/rooms", label: "Rooms", icon: BedDouble, roles: ['customer', 'receptionist'] },
  { href: "/reservation", label: "Reservation", icon: CalendarCheck, roles: ['customer', 'receptionist'] },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['receptionist'] },
  { href: "/orders", label: "Orders", icon: ClipboardList, roles: ['customer', 'receptionist'] },
  { href: "/profile", label: "Profile", icon: User, roles: ['customer'] },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    if (pathname !== '/login') {
       // On the server, this might not immediately redirect, but will on client hydration
       if (typeof window !== 'undefined') {
        router.push('/login');
       }
    }
    return null; // Don't render navigation on login page or if not authenticated
  }
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = allNavItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="fixed bottom-0 left-0 z-10 w-full border-t bg-background/95 backdrop-blur-sm md:relative md:h-screen md:w-20 md:border-r md:border-t-0 md:bg-background md:backdrop-blur-none">
      <TooltipProvider delayDuration={0}>
        <nav className="flex h-full flex-row items-center justify-around md:flex-col md:justify-start">
          <Link
            href={user.role === 'customer' ? '/' : '/dashboard'}
            className="hidden h-20 w-full items-center justify-center font-bold text-2xl text-primary md:flex"
            aria-label="WeServe Home"
          >
            WS
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
          
          <div className="hidden md:flex md:flex-col md:gap-2 md:pb-4">
             <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <LogOut className="h-6 w-6" />
                    <span className="sr-only">Logout</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
          </div>

        </nav>
      </TooltipProvider>
    </aside>
  )
}
