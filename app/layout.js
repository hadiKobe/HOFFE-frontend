import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Layouts/Navbar"

// Color Description	Approx. Hex Code
// Background beige	#FBE2B7
// Dark brown (text and outlines)	#5B2C0C
// Medium brown (coffee and cup details)	#B3783E
// Light cream (inside cup and circle)	#FFF4D8
// Coffee bean brown	#874E21
// White highlights (sugar scoop, ice)	#FFFFFF

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Hoffee",
  description: "Coffee shop order management system",
  icons: {
    icon: "/hoffee-logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="mt-16 min-h-screen">{children}</main>
      </body>
    </html>
  )
}
