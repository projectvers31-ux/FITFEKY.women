import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitFeky — Premium At-Home Fitness for Women 40+",
  description:
    "Thoughtfully curated walking pads, resistance bands, yoga gear, smart scales and recovery tools for women over 40. Every product is quality-scored so you can move with strength, grace and confidence at home.",
  keywords: [
    "fitness for women over 40",
    "at-home workout equipment",
    "walking pad",
    "resistance bands for women",
    "yoga for women 50+",
    "low-impact cardio",
    "smart body scale",
    "massage gun recovery",
  ],
  authors: [{ name: "FitFeky Editorial Team" }],
  openGraph: {
    title: "FitFeky — Premium At-Home Fitness for Women 40+",
    description:
      "Quality-scored walking pads, resistance bands, yoga gear & recovery tools for women over 40.",
    siteName: "FitFeky",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitFeky — Premium At-Home Fitness for Women 40+",
    description:
      "Quality-scored walking pads, resistance bands, yoga gear & recovery tools for women over 40.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
