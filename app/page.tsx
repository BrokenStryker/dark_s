'use client'

import { useEffect } from "react";
import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ReviewSection from "@/components/sections/ReviewSection";
import AboutOwner from "@/components/sections/AboutOwner";
import ServicesSection from "@/components/sections/ServicesSection";
import PoliciesSection from "@/components/sections/PoliciesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import MobileStickyButton from "@/components/ui/mobile-sticky-button";
import { usePostHog } from "@/hooks/use-posthog";

export default function Home() {
  const { track } = usePostHog();

  useEffect(() => {
    // Manual test event to verify PostHog is working
    track('homepage_loaded', { 
      timestamp: new Date().toISOString(),
      page: 'home'
    });
  }, [track]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ReviewSection />
      <AboutOwner />
      <ServicesSection />
      <PoliciesSection />
      <ContactSection />
      <Footer />

      {/* Mobile sticky book now button */}
      <MobileStickyButton />
    </div>
  );
}