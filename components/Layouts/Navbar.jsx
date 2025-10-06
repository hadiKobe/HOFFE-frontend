"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Navbar component - displays at the top of all pages
// Shows the coffee shop logo and navigation links for Menu, Orders, and POS
export default function Navbar() {
   const pathname = usePathname()

   const styles = {
      navbar:
         "fixed top-0 left-0 right-0 h-16 bg-foreground border-b border-border flex items-center justify-between px-6 z-50",
      logoContainer: "flex items-center gap-3",
      logo: "h-10 w-10",
      title: "text-xl font-semibold text-background",
      navLinks: "flex items-center gap-6",
      navLink: "px-4 py-2 rounded-lg text-background hover:bg-accent transition-colors",
      activeNavLink: "px-4 py-2 rounded-lg bg-primary text-primary-background",
   }

   // Navigation items for the coffee shop
   const navItems = [
      { name: "Menu", path: "/Menu" },
      { name: "Orders", path: "/Orders" },
   ]

   return (
      <nav className={styles.navbar}>
         
         {/* Logo and title section */}
         <Link href="/POS" className={styles.logoContainer}>
            <Image src="/hoffee-logo.png" alt="Hoffee Logo" width={40} height={40} className={styles.logo} />
            <h1 className={styles.title}>Hoffee</h1>
         </Link>

         <div className={styles.navLinks}>
            {navItems.map((item) => (
               <Link
                  key={item.path}
                  href={item.path}
                  className={pathname === item.path ? styles.activeNavLink : styles.navLink}
               >
                  {item.name}
               </Link>
            ))}
         </div>
      </nav>
   )
}
