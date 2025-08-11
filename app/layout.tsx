import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const trajanPro = localFont({
  src: "../font/Trajan Pro Regular.ttf",
  variable: "--font-trajan",
  display: "swap",
});

const ebGaramond = localFont({
  src: [
    {
      path: "../font/EBGaramond-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../font/EBGaramond-Italic-VariableFont_wght.ttf", 
      style: "italic",
    },
  ],
  variable: "--font-futura",
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
        className={`${trajanPro.variable} ${ebGaramond.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
