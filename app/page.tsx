import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutOwner from "@/components/sections/AboutOwner";
import ServicesSection from "@/components/sections/ServicesSection";
import PoliciesSection from "@/components/sections/PoliciesSection";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Spacing between Navigation and Hero */}
      <div className="h-16" />
      
      <HeroSection />
      
      {/* Spacing between sections */}
      <div className="h-2" />
      
      <AboutOwner />
      
      <div className="h-2" />
      
      <ServicesSection />
      
      <div className="h-2" />
      
      <PoliciesSection />
      
      <div className="h-2" />
      
      <BookingSection />
      
      <div className="h-2" />
      
      <ContactSection />
      
      <div className="h-2" />
      
      <Footer />
    </div>
  );
}