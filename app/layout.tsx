import type React from "react"
import ClientLayout from "./ClientLayout"

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
  return <ClientLayout>{children}</ClientLayout>
}
