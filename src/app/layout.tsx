import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim Griffith | Senior Cybersecurity Engineer",
  description:
    "Senior Cybersecurity Engineer specializing in PKI automation, cloud security, and AI. 17+ years of IT experience.",
  openGraph: {
    title: "Tim Griffith | Senior Cybersecurity Engineer",
    description:
      "Senior Cybersecurity Engineer specializing in PKI automation, cloud security, and AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
