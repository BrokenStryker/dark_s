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
      
      {/* Spacing between Navigation and Hero */}
      <div className="h-17" />
      
      <HeroSection />
      
      {/* Spacing between sections */}
      <div className="h-10" />
      
      <ReviewSection />
      
      <div className="h-10" />
      
      <AboutOwner />
      
      <div className="h-10" />

      <ServicesSection />
      
      <div className="h-10" />
      
      <PoliciesSection />
      
      <div className="h-10" />
      
      <ContactSection />
      
      <div className="h-10" />
      
      <Footer />
    </div>
  );
}