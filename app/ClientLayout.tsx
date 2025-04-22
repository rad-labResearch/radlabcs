"use client"

import type React from "react"

import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <title>Rad-Lab Research & Surveys - Binnenkort Beschikbaar</title>
        <meta
          name="description"
          content="Een platform gewijd aan het delen van nucleair onderzoek, informatie en het helpen van mensen om te begrijpen wat straling is."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
