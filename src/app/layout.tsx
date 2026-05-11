import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pawblis Dog Training | Professional Canine Education",
    template: "%s | Pawblis Dog Training",
  },
  description:
    "Professional dog training and canine behavior consulting. Personalized programs for obedience, socialization, and behavior modification. Build a stronger bond with your dog.",
  keywords: [
    "dog training",
    "canine education",
    "dog behavior",
    "puppy training",
    "obedience training",
    "dog socialization",
    "behavior modification",
    "professional dog trainer",
    "positive reinforcement",
    "pet training",
  ],
  openGraph: {
    title: "Pawblis Dog Training | Professional Canine Education",
    description:
      "Transform your dog's behavior with expert, science-based training methods. Personalized programs for every dog.",
    type: "website",
    locale: "en_US",
    siteName: "Pawblis Dog Training",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawblis Dog Training",
    description:
      "Professional dog training and behavior consulting. Build a stronger bond with your dog.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
