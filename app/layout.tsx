import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rad-Lab Research & Surveys - Binnenkort Beschikbaar",
  description:
    "Een platform gewijd aan het delen van nucleair onderzoek, informatie en het helpen van mensen om te begrijpen wat straling is.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
