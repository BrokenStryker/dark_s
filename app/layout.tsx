import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dark Serenity | Luxury Hair Salon by Amberrose Seiferth",
  description: "Experience the art of luxury hair styling with gothic elegance and personalized artistry.",
  keywords: "luxury hair salon, premium hair services, gothic hair styling, Amberrose Seiferth, dark aesthetic hair, high-end salon, exclusive hair services",
  openGraph: {
    title: "Dark Serenity | Luxury Hair Salon",
    description: "Experience the art of luxury hair styling with gothic elegance and personalized artistry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${cinzel.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
