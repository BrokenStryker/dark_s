import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

export const metadata: Metadata = {
  title: "Dark Serenity | Luxury Hair Salon by Amberrose",
  description: "Experience the art of luxury hair styling with gothic elegance and personalized artistry.",
  keywords: "luxury hair salon, premium hair services, gothic hair styling, Amberrose, dark aesthetic hair, high-end salon, exclusive hair services",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Dark Serenity | Luxury Hair Salon",
    description: "Experience the art of luxury hair styling with gothic elegance and personalized artistry.",
    type: "website",
  },
};

export const links = [
  {
    rel: "stylesheet",
    href: "https://use.typekit.net/kdr2xqb.css",
  },
];

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kdr2xqb.css" />
      </head>
      <body
        className="antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Toaster />
      </body>
    </html>
  );
}
