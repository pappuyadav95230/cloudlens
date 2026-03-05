import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CloudLens — See Every Dollar. Stop Every Leak.",
  description:
    "AI-powered cloud cost monitoring. Track spending, detect anomalies, and optimize your cloud budget in real time.",
  keywords: ["cloud cost", "monitoring", "GCP", "AWS", "analytics", "anomaly detection"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
